import React from 'react';
import { Package } from 'lucide-react';

interface InventoryMetricsProps {
  dateRange: string;
}

export function InventoryMetrics({ dateRange }: InventoryMetricsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium mb-4">Inventory Metrics</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Stock Value</p>
            <div className="flex items-center gap-2 mt-1">
              <Package className="h-5 w-5 text-emerald-500" />
              <span className="text-lg font-medium">$24,567</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Stock Turnover</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg font-medium">4.2x</span>
            </div>
          </div>
        </div>

        <div className="h-48 flex items-center justify-center text-gray-400 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
          Inventory Distribution
        </div>
      </div>
    </div>
  );
}