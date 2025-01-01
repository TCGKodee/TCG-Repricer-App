import React from 'react';
import { SalesMetrics } from '../components/dashboard/metrics/SalesMetrics';
import { ProductTable } from '../components/dashboard/products/ProductTable';
import { PriceChart } from '../components/dashboard/charts/PriceChart';

export default function Dashboard() {
  const [timeRange, setTimeRange] = React.useState('7d');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
        <div className="flex gap-4">
          <select 
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      <SalesMetrics />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PriceChart />
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Market Overview
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
              <span className="text-sm">3 products below market average</span>
            </div>
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <span className="text-sm">5 competitor price changes detected</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Product Overview
          </h2>
        </div>
        <ProductTable />
      </div>
    </div>
  );
}