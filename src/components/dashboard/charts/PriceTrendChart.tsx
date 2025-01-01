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
import type { ChartDataPoint } from '../../../types/trends';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PriceTrendChartProps {
  data: ChartDataPoint[];
}

export function PriceTrendChart({ data }: PriceTrendChartProps) {
  const chartData = {
    labels: data.map(d => d.date),
    datasets: [
      {
        label: 'Average Price',
        data: data.map(d => d.price),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
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

  return <Line options={options} data={chartData} />;
}