import { useMemo } from 'react';
import { useProductStore } from '../store/products';
import { usePriceHistoryStore } from '../store/priceHistory';

export function useAnalytics(dateRange: string) {
  const products = useProductStore((state) => state.products);
  const priceChanges = usePriceHistoryStore((state) => state.changes);

  return useMemo(() => {
    const days = parseInt(dateRange) || 7;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const recentChanges = priceChanges.filter(
      change => new Date(change.timestamp) >= startDate
    );

    const averagePriceChange = recentChanges.reduce(
      (sum, change) => sum + ((change.newPrice - change.oldPrice) / change.oldPrice) * 100,
      0
    ) / recentChanges.length;

    const competitorMetrics = products.reduce(
      (acc, product) => {
        if (product.buyBoxStatus === 'winning') acc.winningProducts++;
        if (product.competitorPrice) acc.trackedProducts++;
        return acc;
      },
      { winningProducts: 0, trackedProducts: 0 }
    );

    return {
      averagePriceChange,
      priceVolatility: Math.abs(averagePriceChange) / 2,
      competitorMetrics,
      averageMargin: products.reduce((sum, p) => sum + p.margin, 0) / products.length,
      stockTurnover: 4.2, // This would be calculated from actual sales data
    };
  }, [products, priceChanges, dateRange]);
}