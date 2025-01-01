import { useState } from 'react';
import { GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useAuthStore } from '../store/auth';
import { getAuthErrorMessage } from '../lib/auth/errors';
import type { AuthError } from '../lib/auth/types';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser, setToken } = useAuthStore();

  const handleAuth = async (
    authFn: () => Promise<{ user: any }>
  ) => {
    try {
      setLoading(true);
      setError(null);
      const result = await authFn();
      const token = await result.user.getIdToken();
      
      setUser({
        id: result.user.uid,
        email: result.user.email || '',
        name: result.user.displayName || result.user.email || '',
      });
      setToken(token);
    } catch (err) {
      const message = getAuthErrorMessage(err as AuthError);
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const signIn = (email: string, password: string) =>
    handleAuth(() => auth.signInWithEmailAndPassword(email, password));

  const signUp = (email: string, password: string) =>
    handleAuth(() => auth.createUserWithEmailAndPassword(email, password));

  const signInWithGoogle = () =>
    handleAuth(() => auth.signInWithPopup(new GoogleAuthProvider()));

  return {
    signIn,
    signUp,
    signInWithGoogle,
    loading,
    error
  };
}