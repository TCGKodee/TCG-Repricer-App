import React from 'react';
import { X } from 'lucide-react';
import { PriceHistoryChart } from './PriceHistoryChart';
import { PriceHistoryTable } from './PriceHistoryTable';
import { usePriceHistory } from '../../hooks/usePriceHistory';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import type { Product } from './types';

interface PriceHistoryModalProps {
  product: Product;
  onClose: () => void;
}

export function PriceHistoryModal({ product, onClose }: PriceHistoryModalProps) {
  const [timeRange, setTimeRange] = React.useState(6); // Default 6 months
  const { data, isLoading, error } = usePriceHistory(product.id, timeRange * 30);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            {product.imageUrl && (
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-20 h-auto object-contain rounded-lg"
              />
            )}
            <div>
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Price History
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {product.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 flex-1 overflow-auto">
          <div className="mb-4 flex justify-end">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(Number(e.target.value))}
              className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg"
            >
              <option value={1}>Last Month</option>
              <option value={3}>Last 3 Months</option>
              <option value={6}>Last 6 Months</option>
              <option value={12}>Last Year</option>
            </select>
          </div>

          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="h-64 flex items-center justify-center">
              <ErrorMessage message="Failed to load price history" />
            </div>
          ) : !data?.length ? (
            <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
              No price history available for this period
            </div>
          ) : (
            <div className="space-y-6">
              <div className="h-64">
                <PriceHistoryChart data={data} />
              </div>
              <PriceHistoryTable priceHistory={data} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}