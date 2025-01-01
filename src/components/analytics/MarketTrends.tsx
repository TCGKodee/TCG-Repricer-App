import React from 'react';
import { TrendingUp } from 'lucide-react';

interface MarketTrendsProps {
  dateRange: string;
}

export function MarketTrends({ dateRange }: MarketTrendsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium mb-4">Market Trends</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Market Movement</p>
            <div className="flex items-center gap-2 mt-1">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              <span className="text-lg font-medium">Upward</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Market Volume</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg font-medium">High</span>
            </div>
          </div>
        </div>

        <div className="h-48 flex items-center justify-center text-gray-400 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
          Market Trends Chart
        </div>
      </div>
    </div>
  );
}