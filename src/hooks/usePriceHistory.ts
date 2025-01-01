import { useQuery } from '@tanstack/react-query';
import { db } from '../lib/db';

export function usePriceHistory(productId: string, days: number) {
  return useQuery({
    queryKey: ['priceHistory', productId, days],
    queryFn: () => db.priceHistory.getHistory(productId, days),
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    refetchInterval: 15 * 60 * 1000, // 15 minutes
    onError: (error) => {
      console.error('Failed to fetch price history:', error);
    }
  });
}