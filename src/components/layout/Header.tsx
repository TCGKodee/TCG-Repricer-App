import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { useAuthStore } from '../../store/auth';
import { useProfileStore } from '../../store/profile';
import { LogOut, User, Settings } from 'lucide-react';

export function Header() {
  const { user, logout } = useAuthStore();
  const { profile } = useProfileStore();
  const [showDropdown, setShowDropdown] = React.useState(false);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showDropdown && !(event.target as Element).closest('.profile-dropdown')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  return (
    <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex-1" />
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {user && (
            <div className="relative profile-dropdown">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {profile?.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={profile.displayName}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                )}
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {profile?.displayName || user.email}
                </span>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10 py-1">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setShowDropdown(false)}
                  >
                    <Settings className="h-4 w-4" />
                    Profile Settings
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setShowDropdown(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}