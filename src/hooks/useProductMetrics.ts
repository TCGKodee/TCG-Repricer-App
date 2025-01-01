import { useMemo } from 'react';
import { useProductStore } from '../store/products';
import type { ProductMetrics } from '../lib/db/types';

export function useProductMetrics() {
  const products = useProductStore((state) => state.products);

  const metrics = useMemo(() => {
    const totalRevenue = products.reduce((sum, product) => 
      sum + (product.currentPrice * product.stock), 0);

    const activeListings = products.filter(p => p.status === 'active').length;

    const winningProducts = products.filter(p => 
      p.status === 'active' && p.buyBoxStatus === 'winning'
    ).length;

    const buyBoxWinRate = (winningProducts / activeListings) * 100;

    return {
      totalRevenue,
      activeListings,
      buyBoxWinRate: Math.round(buyBoxWinRate * 10) / 10,
      lastUpdated: new Date().toISOString(),
    };
  }, [products]);

  return metrics;
}