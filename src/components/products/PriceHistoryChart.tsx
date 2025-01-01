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
import type { PriceHistory } from '../../lib/db/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PriceHistoryChartProps {
  data: PriceHistory[];
}

export function PriceHistoryChart({ data }: PriceHistoryChartProps) {
  const chartData = React.useMemo(() => ({
    labels: data.map(item => new Date(item.timestamp).toLocaleDateString()),
    datasets: [
      {
        label: 'Price',
        data: data.map(item => item.price),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Market Price',
        data: data.map(item => item.marketPrice),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Competitor Price',
        data: data.map(item => item.competitorPrice || null),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        tension: 0.4,
      },
    ],
  }), [data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `$${context.raw.toFixed(2)}`
        }
      }
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

  return (
    <div className="h-full w-full">
      <Line options={options} data={chartData} />
    </div>
  );
}