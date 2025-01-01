import React from 'react';
import { Users } from 'lucide-react';

interface CompetitorAnalysisProps {
  dateRange: string;
}

export function CompetitorAnalysis({ dateRange }: CompetitorAnalysisProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium mb-4">Competitor Analysis</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Active Competitors</p>
            <div className="flex items-center gap-2 mt-1">
              <Users className="h-5 w-5 text-indigo-500" />
              <span className="text-lg font-medium">12</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Buy Box Win Rate</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg font-medium text-green-600">68%</span>
            </div>
          </div>
        </div>

        <div className="h-48 flex items-center justify-center text-gray-400 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
          Competitor Price Distribution
        </div>
      </div>
    </div>
  );
}