import { useQuery } from '@tanstack/react-query';
import { EbayClient } from '../lib/ebay/client';
import { EbaySearchParams } from '../lib/ebay/types';
import { FALLBACK_PRICE_DATA, EBAY_DEFAULTS } from '../lib/ebay/constants';

const ebayClient = new EbayClient({
  sandbox: true // Always use sandbox in development
});

export function useEbayPrices(searchParams: EbaySearchParams) {
  return useQuery({
    queryKey: ['ebayPrices', searchParams],
    queryFn: async () => {
      try {
        return await ebayClient.searchItems(searchParams);
      } catch (error) {
        console.warn('Using fallback price data:', error);
        return FALLBACK_PRICE_DATA;
      }
    },
    staleTime: EBAY_DEFAULTS.STALE_TIME,
    retry: 1
  });
}

export function useCompletedSales(searchParams: EbaySearchParams) {
  return useQuery({
    queryKey: ['completedSales', searchParams],
    queryFn: async () => {
      try {
        return await ebayClient.getCompletedSales(searchParams);
      } catch (error) {
        console.warn('Using fallback sales data:', error);
        return FALLBACK_PRICE_DATA;
      }
    },
    staleTime: EBAY_DEFAULTS.COMPLETED_SALES_STALE_TIME,
    retry: 1
  });
}