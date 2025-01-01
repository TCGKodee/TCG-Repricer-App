import React from 'react';
import { BarChart } from 'lucide-react';

interface SalesVelocityProps {
  dateRange: string;
}

export function SalesVelocity({ dateRange }: SalesVelocityProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium mb-4">Sales Velocity</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Average Time to Sell</p>
            <div className="flex items-center gap-2 mt-1">
              <BarChart className="h-5 w-5 text-blue-500" />
              <span className="text-lg font-medium">2.3 days</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Daily Sales Volume</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg font-medium">24.5 units</span>
            </div>
          </div>
        </div>

        <div className="h-48 flex items-center justify-center text-gray-400 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
          Sales Velocity Chart
        </div>
      </div>
    </div>
  );
}