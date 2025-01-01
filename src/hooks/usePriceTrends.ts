import { useQuery } from '@tanstack/react-query';
import { useProductStore } from '../store/products';
import type { TrendData } from '../types/trends';

export function usePriceTrends() {
  const products = useProductStore((state) => state.products);

  return useQuery({
    queryKey: ['price-trends'],
    queryFn: (): Promise<TrendData> => {
      return new Promise((resolve) => {
        // Calculate trends from imported products
        const importedProducts = products.filter(p => p.lastUpdated);
        
        if (importedProducts.length === 0) {
          resolve({
            metrics: [],
            chartData: [],
            lastUpdated: new Date().toISOString()
          });
          return;
        }

        // Calculate daily average price trend
        const dailyTrend = calculateDailyTrend(importedProducts);
        
        // Calculate 7-day price trend
        const weeklyTrend = calculateWeeklyTrend(importedProducts);
        
        // Calculate 30-day market position
        const marketTrend = calculateMarketTrend(importedProducts);

        const metrics = [
          dailyTrend,
          weeklyTrend,
          marketTrend
        ].filter(metric => metric !== null);

        resolve({
          metrics,
          chartData: generateChartData(importedProducts),
          lastUpdated: new Date().toISOString()
        });
      });
    },
    enabled: products.length > 0,
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
}

function calculateDailyTrend(products: any[]) {
  // Calculate 24-hour price change
  const now = new Date();
  const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  
  const validProducts = products.filter(p => new Date(p.lastUpdated) >= dayAgo);
  if (validProducts.length === 0) return null;

  const avgChange = validProducts.reduce((sum, p) => {
    const priceChange = ((p.currentPrice - p.marketPrice) / p.marketPrice) * 100;
    return sum + priceChange;
  }, 0) / validProducts.length;

  return {
    id: 'daily',
    label: '24h Price Change',
    trend: Number(avgChange.toFixed(2))
  };
}

function calculateWeeklyTrend(products: any[]) {
  // Calculate 7-day price trend
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  const validProducts = products.filter(p => new Date(p.lastUpdated) >= weekAgo);
  if (validProducts.length === 0) return null;

  const avgChange = validProducts.reduce((sum, p) => {
    const priceChange = ((p.currentPrice - p.targetPrice) / p.targetPrice) * 100;
    return sum + priceChange;
  }, 0) / validProducts.length;

  return {
    id: 'weekly',
    label: '7-Day Trend',
    trend: Number(avgChange.toFixed(2))
  };
}

function calculateMarketTrend(products: any[]) {
  // Calculate market position trend
  const validProducts = products.filter(p => p.marketPrice && p.competitorPrice);
  if (validProducts.length === 0) return null;

  const avgChange = validProducts.reduce((sum, p) => {
    const marketDiff = ((p.currentPrice - p.marketPrice) / p.marketPrice) * 100;
    return sum + marketDiff;
  }, 0) / validProducts.length;

  return {
    id: 'market',
    label: 'Market Position',
    trend: Number(avgChange.toFixed(2))
  };
}

function generateChartData(products: any[]) {
  // Generate time series data for the chart
  const days = 7;
  const data = [];
  const now = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const avgPrice = products.reduce((sum, p) => sum + p.currentPrice, 0) / products.length;
    
    data.unshift({
      date: date.toISOString().split('T')[0],
      price: Number(avgPrice.toFixed(2))
    });
  }

  return data;
}