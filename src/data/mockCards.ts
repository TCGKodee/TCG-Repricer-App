import type { PriceChange } from '../components/history/types';
import { mockProducts } from './mockProducts';

// Generate price history based on actual products
export const mockPriceChanges: PriceChange[] = mockProducts.flatMap(product => {
  const baseChange: Omit<PriceChange, 'id' | 'oldPrice' | 'newPrice' | 'timestamp'> = {
    productId: product.id,
    productName: product.name,
    sku: product.sku,
    trigger: 'competitor',
    oldMargin: product.margin - 2,
    newMargin: product.margin,
    competitorPrice: product.competitorPrice,
  };

  // Generate two changes per product
  return [
    {
      ...baseChange,
      id: `${product.id}-1`,
      oldPrice: product.currentPrice - 10,
      newPrice: product.currentPrice,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    },
    {
      ...baseChange,
      id: `${product.id}-2`,
      oldPrice: product.currentPrice - 20,
      newPrice: product.currentPrice - 10,
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 2 days ago
    }
  ];
});