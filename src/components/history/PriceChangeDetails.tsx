import React from 'react';
import { X } from 'lucide-react';
import type { PriceChange } from './types';

interface PriceChangeDetailsProps {
  change: PriceChange;
  onClose: () => void;
}

export function PriceChangeDetails({ change, onClose }: PriceChangeDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Price Change Details
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Product</h4>
              <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{change.productName}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{change.sku}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Time</h4>
              <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                {new Date(change.timestamp).toLocaleString()}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Price Change</h4>
              <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                ${change.oldPrice.toFixed(2)} → ${change.newPrice.toFixed(2)}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Margin Impact</h4>
              <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                {change.oldMargin?.toFixed(2)}% → {change.newMargin?.toFixed(2)}%
              </p>
            </div>

            {change.competitorPrice && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Competitor Price
                </h4>
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                  ${change.competitorPrice.toFixed(2)}
                </p>
              </div>
            )}

            {change.buyBoxPrice && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Buy Box Price
                </h4>
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                  ${change.buyBoxPrice.toFixed(2)}
                </p>
              </div>
            )}
          </div>

          {change.note && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Notes</h4>
              <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{change.note}</p>
            </div>
          )}

          {change.userName && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Changed By</h4>
              <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{change.userName}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}