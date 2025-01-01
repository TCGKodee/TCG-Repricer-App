import React from 'react';
import { TrendingUp, DollarSign, Package } from 'lucide-react';
import { useDashboardMetrics } from '../../../hooks/useDashboardData';

interface MetricCardProps {
  title: string;
  value: string;
  trend: number;
  icon: React.ReactNode;
}

const MetricCard = ({ title, value, trend, icon }: MetricCardProps) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div className="text-blue-600 dark:text-blue-400">{icon}</div>
    </div>
    <div className={`mt-2 text-sm ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
      {trend > 0 ? '+' : ''}{trend}% from last period
    </div>
  </div>
);

export function SalesMetrics() {
  const { data, isLoading, error } = useDashboardMetrics();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm animate-pulse">
            <div className="h-16"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-red-600 dark:text-red-400">
        Failed to load metrics
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard
        title="Total Revenue"
        value={`$${data?.totalRevenue.toLocaleString()}`}
        trend={8.2}
        icon={<DollarSign className="h-6 w-6" />}
      />
      <MetricCard
        title="Active Listings"
        value={data?.activeListings.toString() || '0'}
        trend={-2.1}
        icon={<Package className="h-6 w-6" />}
      />
      <MetricCard
        title="Buy Box Win Rate"
        value={`${data?.buyBoxWinRate}%`}
        trend={5.4}
        icon={<TrendingUp className="h-6 w-6" />}
      />
    </div>
  );
}