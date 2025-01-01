import React from 'react';
import { UserProfile } from '../components/profile/UserProfile';

export default function Profile() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Profile Settings
      </h1>
      <UserProfile />
    </div>
  );
}