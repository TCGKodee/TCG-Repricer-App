import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';
import { mockPriceChanges } from '../data/mockCards';

function validateSupabaseConfig() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Missing Supabase credentials, using mock client');
    return null;
  }

  try {
    // Validate URL format
    new URL(supabaseUrl);
    return { supabaseUrl, supabaseAnonKey };
  } catch (error) {
    console.warn('Invalid Supabase URL, using mock client');
    return null;
  }
}

// Enhanced mock client with better type support
const createMockClient = () => ({
  from: (table: string) => ({
    select: () => Promise.resolve({ data: table === 'price_history' ? mockPriceChanges : [], error: null }),
    eq: () => ({
      gte: () => ({
        order: () => Promise.resolve({ data: mockPriceChanges, error: null })
      })
    }),
    gte: () => ({
      order: () => Promise.resolve({ data: mockPriceChanges, error: null })
    }),
    order: () => Promise.resolve({ data: [], error: null }),
    single: () => Promise.resolve({ data: null, error: null }),
    maybeSingle: () => Promise.resolve({ data: null, error: null })
  })
});

const config = validateSupabaseConfig();
export const supabase = config
  ? createClient<Database>(config.supabaseUrl, config.supabaseAnonKey)
  : createMockClient();