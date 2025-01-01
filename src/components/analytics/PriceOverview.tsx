import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PriceOverviewProps {
  dateRange: string;
}

export function PriceOverview({ dateRange }: PriceOverviewProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium mb-4">Price Overview</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Average Price Change</p>
            <div className="flex items-center gap-2 mt-1">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span className="text-lg font-medium text-green-600">+5.2%</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Price Volatility</p>
            <div className="flex items-center gap-2 mt-1">
              <TrendingDown className="h-5 w-5 text-yellow-500" />
              <span className="text-lg font-medium text-yellow-600">3.8%</span>
            </div>
          </div>
        </div>
        
        <div className="h-48 flex items-center justify-center text-gray-400 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
          Price History Chart
        </div>
      </div>
    </div>
  );
}