import React from 'react';
import { ArrowDown, ArrowUp, Info } from 'lucide-react';
import type { PriceChange } from './types';

interface PriceChangeTableProps {
  changes: PriceChange[];
  onViewDetails: (change: PriceChange) => void;
}

export function PriceChangeTable({ changes, onViewDetails }: PriceChangeTableProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Price Change
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Trigger
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Margin Impact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {changes.map((change) => (
              <tr key={change.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {change.productName}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {change.sku}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-900 dark:text-gray-100">
                      ${change.oldPrice.toFixed(2)}
                    </span>
                    {change.newPrice > change.oldPrice ? (
                      <ArrowUp className="h-4 w-4 text-red-500" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-green-500" />
                    )}
                    <span className="text-sm text-gray-900 dark:text-gray-100">
                      ${change.newPrice.toFixed(2)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {change.trigger.replace('_', ' ').toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {change.oldMargin && change.newMargin && (
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${
                        change.newMargin > change.oldMargin
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {change.newMargin > change.oldMargin ? '+' : ''}
                        {(change.newMargin - change.oldMargin).toFixed(2)}%
                      </span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(change.timestamp).toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onViewDetails(change)}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <Info className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}