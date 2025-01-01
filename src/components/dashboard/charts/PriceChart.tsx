import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { usePriceHistory } from '../../../hooks/useDashboardData';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { ErrorMessage } from '../../ui/ErrorMessage';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions = {
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Price History',
    },
  },
  scales: {
    y: {
      beginAtZero: false,
      ticks: {
        callback: (value: number) => `$${value.toFixed(2)}`
      }
    },
  },
};

export function PriceChart() {
  const productId = '00000000-0000-0000-0000-000000000001';
  const { data: priceHistory, isLoading, error } = usePriceHistory(productId, 30);

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
        <ErrorMessage message="Failed to load price history" />
      </div>
    );
  }

  const chartData = {
    labels: priceHistory?.map(d => new Date(d.timestamp).toLocaleDateString()) || [],
    datasets: [
      {
        label: 'Your Price',
        data: priceHistory?.map(d => d.price) || [],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Market Price',
        data: priceHistory?.map(d => d.marketPrice) || [],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Competitor Price',
        data: priceHistory?.map(d => d.competitorPrice || null) || [],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
        Price Trends
      </h3>
      <div className="h-[300px]">
        <Line options={chartOptions} data={chartData} />
      </div>
    </div>
  );
}