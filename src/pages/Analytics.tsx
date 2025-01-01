import React from 'react';
import { PriceOverview } from '../components/analytics/PriceOverview';
import { SalesVelocity } from '../components/analytics/SalesVelocity';
import { CompetitorAnalysis } from '../components/analytics/CompetitorAnalysis';
import { MarketTrends } from '../components/analytics/MarketTrends';
import { InventoryMetrics } from '../components/analytics/InventoryMetrics';
import { ProfitMargins } from '../components/analytics/ProfitMargins';

export default function Analytics() {
  const [dateRange, setDateRange] = React.useState('7d');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Analytics</h1>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PriceOverview dateRange={dateRange} />
        <SalesVelocity dateRange={dateRange} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MarketTrends dateRange={dateRange} />
        <CompetitorAnalysis dateRange={dateRange} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InventoryMetrics dateRange={dateRange} />
        <ProfitMargins dateRange={dateRange} />
      </div>
    </div>
  );
}