import React from 'react';
import { Camera, Save, Mail, MapPin, Globe, Twitter, Shield } from 'lucide-react';
import { useAuthStore } from '../../store/auth';
import { useProfileStore } from '../../store/profile';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import { ProfileStats } from './ProfileStats';
import { ProfileSecurity } from './ProfileSecurity';

export function UserProfile() {
  const { user } = useAuthStore();
  const { profile, updateProfile, isLoading, error } = useProfileStore();
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState<'profile' | 'security'>('profile');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [formData, setFormData] = React.useState({
    displayName: profile?.displayName || user?.name || '',
    bio: profile?.bio || '',
    location: profile?.location || '',
    website: profile?.website || '',
    twitter: profile?.twitter || '',
    email: user?.email || '',
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      ...formData,
      avatarUrl: imagePreview || profile?.avatarUrl,
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        {/* Profile Header */}
        <div className="relative h-32 bg-gradient-to-r from-blue-600 to-blue-400">
          <div className="absolute -bottom-16 left-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-700">
                <img
                  src={imagePreview || profile?.avatarUrl || `https://ui-avatars.com/api/?name=${formData.displayName}&background=random`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-lg"
              >
                <Camera className="h-4 w-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-20 px-8 border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'security'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Security
            </button>
          </nav>
        </div>

        <div className="p-8">
          {activeTab === 'profile' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={formData.displayName}
                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-600 text-gray-500 dark:text-gray-400">
                      <Mail className="h-4 w-4" />
                    </span>
                    <input
                      type="email"
                      value={formData.email}
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-r-lg bg-gray-50 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Bio
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Location
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-600 text-gray-500 dark:text-gray-400">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-r-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Website
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-600 text-gray-500 dark:text-gray-400">
                      <Globe className="h-4 w-4" />
                    </span>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-r-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      placeholder="https://"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Twitter
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-600 text-gray-500 dark:text-gray-400">
                      <Twitter className="h-4 w-4" />
                    </span>
                    <input
                      type="text"
                      value={formData.twitter}
                      onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-r-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      placeholder="username"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <ErrorMessage message="Failed to update profile" />
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {isLoading ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <ProfileSecurity />
          )}
        </div>
      </div>

      <div className="mt-6">
        <ProfileStats />
      </div>
    </div>
  );
}