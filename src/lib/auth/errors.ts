import { AuthError } from './types';

export const getAuthErrorMessage = (error: AuthError): string => {
  if (error.code) {
    switch (error.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'Invalid email or password';
      case 'auth/email-already-in-use':
        return 'Email already in use';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters';
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/popup-closed-by-user':
        return 'Sign in was cancelled';
      default:
        return error.message || 'An error occurred during authentication';
    }
  }
  return error.message || 'An unexpected error occurred';
};