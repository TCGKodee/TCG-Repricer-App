import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { useAuthStore } from './auth';

interface Profile {
  id: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  location?: string;
  website?: string;
  twitter?: string;
  created_at?: string;
  updated_at?: string;
}

interface ProfileState {
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  profile: null,
  isLoading: false,
  error: null,

  fetchProfile: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    try {
      set({ isLoading: true, error: null });
      
      // First check if profile exists
      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        throw fetchError;
      }

      if (!existingProfile) {
        // Create initial profile if it doesn't exist
        const { data: newProfile, error: insertError } = await supabase
          .from('profiles')
          .insert([
            {
              id: user.id,
              displayName: user.name || user.email?.split('@')[0] || 'User',
            }
          ])
          .select()
          .single();

        if (insertError) throw insertError;
        set({ profile: newProfile });
      } else {
        set({ profile: existingProfile });
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
      set({ error: 'Failed to fetch profile' });
    } finally {
      set({ isLoading: false });
    }
  },

  updateProfile: async (updates: Partial<Profile>) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    try {
      set({ isLoading: true, error: null });
      
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...updates,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      // Update local state
      const currentProfile = get().profile;
      set({ 
        profile: currentProfile ? {
          ...currentProfile,
          ...updates,
          updated_at: new Date().toISOString(),
        } : null
      });
    } catch (error) {
      console.error('Profile update error:', error);
      set({ error: 'Failed to update profile' });
    } finally {
      set({ isLoading: false });
    }
  },
}));

// Initialize profile on auth state change
useAuthStore.subscribe(
  (state) => state.user,
  (user) => {
    if (user) {
      useProfileStore.getState().fetchProfile();
    } else {
      useProfileStore.setState({ profile: null });
    }
  }
);