import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Mail } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const navigate = useNavigate();
  const { signIn, signUp, signInWithGoogle, loading, error } = useAuth();
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Authentication error:', err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Google sign-in error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-8">
          <div className="flex flex-col items-center gap-2 mb-8">
            <BookOpen className="h-12 w-12 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">TCG Repricer</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {isSignUp ? 'Create your account' : 'Sign in to your account'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg 
                  border-2 border-gray-300 dark:border-gray-600 
                  bg-white dark:bg-gray-800 
                  text-gray-900 dark:text-gray-100
                  focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                  focus:border-blue-500 dark:focus:border-blue-400"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-lg 
                  border-2 border-gray-300 dark:border-gray-600 
                  bg-white dark:bg-gray-800 
                  text-gray-900 dark:text-gray-100
                  focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                  focus:border-blue-500 dark:focus:border-blue-400"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="mt-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="mt-4 w-full flex items-center justify-center gap-2 
                bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 
                font-medium py-2 px-4 border-2 border-gray-300 dark:border-gray-700 
                rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 
                transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Mail className="h-5 w-5" />
              Google
            </button>
          </div>

          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              {isSignUp ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}