import React from 'react';
import { Package, DollarSign, TrendingUp } from 'lucide-react';

export function ProfileStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Active Listings</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">156</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">$24,567</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Buy Box Win Rate</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">68.5%</p>
          </div>
        </div>
      </div>
    </div>
  );
}