import { useQuery } from '@tanstack/react-query';
import { db } from '../lib/db';

export function useDashboardMetrics() {
  return useQuery({
    queryKey: ['dashboardMetrics'],
    queryFn: () => db.dashboard.getMetrics(),
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    retry: 2,
    staleTime: 60 * 1000 // Consider data stale after 1 minute
  });
}

export function usePriceHistory(productId: string, days: number) {
  return useQuery({
    queryKey: ['priceHistory', productId, days],
    queryFn: () => db.priceHistory.getHistory(productId, days),
    refetchInterval: 15 * 60 * 1000, // Refetch every 15 minutes
    retry: 2,
    staleTime: 5 * 60 * 1000 // Consider data stale after 5 minutes
  });
}

export function useTopProducts() {
  return useQuery({
    queryKey: ['topProducts'],
    queryFn: () => db.products.getTopProducts(5),
    refetchInterval: 5 * 60 * 1000,
    retry: 2,
    staleTime: 60 * 1000
  });
}