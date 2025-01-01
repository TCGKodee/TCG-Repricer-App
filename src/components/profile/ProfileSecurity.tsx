import React from 'react';
import { Shield, Key, AlertTriangle } from 'lucide-react';

export function ProfileSecurity() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg">
          <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
            Two-factor authentication not enabled
          </h3>
          <p className="text-sm text-yellow-600 dark:text-yellow-400">
            Protect your account with an extra layer of security
          </p>
        </div>
        <button className="ml-auto px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
          Enable 2FA
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Security Settings
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <Key className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Password
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Last changed 3 months ago
                </p>
              </div>
            </div>
            <button className="px-4 py-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              Change
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <Shield className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Login History
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  View your recent login activity
                </p>
              </div>
            </div>
            <button className="px-4 py-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}