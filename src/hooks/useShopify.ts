import { useCallback } from 'react';
import { ShopifyClient } from '../lib/shopify/client';
import { useAuthStore } from '../store/auth';

export function useShopify() {
  const { user } = useAuthStore();
  
  const getClient = useCallback(() => {
    if (!user?.shopifyConfig) {
      throw new Error('Shopify configuration not found');
    }
    return new ShopifyClient(user.shopifyConfig);
  }, [user]);

  const updatePrice = useCallback(async (productId: string, variantId: string, price: number) => {
    const client = getClient();
    return client.updatePrice(productId, variantId, price);
  }, [getClient]);

  return {
    updatePrice,
    getClient
  };
}