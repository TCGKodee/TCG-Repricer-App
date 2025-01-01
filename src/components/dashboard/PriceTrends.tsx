import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { usePriceTrends } from '../../hooks/usePriceTrends';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import { PriceTrendChart } from './charts/PriceTrendChart';
import type { TrendMetric } from '../../types/trends';

export function PriceTrends() {
  const { data, isLoading, error } = usePriceTrends();

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm h-[400px] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <ErrorMessage message="Failed to load price trends" />
      </div>
    );
  }

  if (!data?.metrics.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm flex items-center justify-center h-[400px] text-gray-500 dark:text-gray-400">
        No price trend data available for these items.
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Price Trends
        </h3>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {new Date(data.lastUpdated).toLocaleString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {data.metrics.map((metric: TrendMetric) => (
          <div key={metric.id} className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              metric.trend > 0 
                ? 'bg-green-100 dark:bg-green-900/30' 
                : 'bg-red-100 dark:bg-red-900/30'
            }`}>
              {metric.trend > 0 ? (
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {metric.label}
              </p>
              <p className={`text-lg font-medium ${
                metric.trend > 0 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {metric.trend > 0 ? '+' : ''}{metric.trend}%
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="h-64">
        <PriceTrendChart data={data.chartData} />
      </div>
    </div>
  );
}