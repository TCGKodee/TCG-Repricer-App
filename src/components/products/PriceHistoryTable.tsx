import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import type { PriceChange } from '../history/types';

interface PriceHistoryTableProps {
  priceHistory: PriceChange[];
}

export function PriceHistoryTable({ priceHistory }: PriceHistoryTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Old Price
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              New Price
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Change
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Trigger
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {priceHistory.map((change) => (
            <tr key={change.id}>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                {new Date(change.timestamp).toLocaleString()}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                ${change.oldPrice.toFixed(2)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                ${change.newPrice.toFixed(2)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center gap-1">
                  {change.newPrice > change.oldPrice ? (
                    <ArrowUp className="h-4 w-4 text-red-500" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-green-500" />
                  )}
                  <span className={`text-sm ${
                    change.newPrice > change.oldPrice 
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-green-600 dark:text-green-400'
                  }`}>
                    {Math.abs(((change.newPrice - change.oldPrice) / change.oldPrice) * 100).toFixed(2)}%
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {change.trigger.replace('_', ' ').toUpperCase()}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}