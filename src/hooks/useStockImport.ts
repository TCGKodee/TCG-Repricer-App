```typescript
import { useState } from 'react';
import { useProductStore } from '../store/products';
import { ShopifyIntegration } from '../lib/integrations/shopify';
import { WixIntegration } from '../lib/integrations/wix';
import type { ImportResult, StockData, IntegrationConfig } from '../lib/integrations/types';

export function useStockImport() {
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { products, updateProduct } = useProductStore();

  const importStock = async (config: IntegrationConfig): Promise<ImportResult> => {
    setIsImporting(true);
    setError(null);

    try {
      let stockData: StockData[] = [];

      // Fetch stock data from the appropriate integration
      if (config.type === 'shopify') {
        const shopify = new ShopifyIntegration(
          config.accessToken!,
          config.storeUrl!
        );
        stockData = await shopify.fetchStock();
      } else if (config.type === 'wix') {
        const wix = new WixIntegration(
          config.apiKey,
          config.apiSecret!
        );
        stockData = await wix.fetchStock();
      }

      // Update local product stock
      const errors: Array<{ sku: string; message: string }> = [];
      let updatedCount = 0;

      for (const item of stockData) {
        const product = products.find(p => p.sku === item.sku);
        if (product) {
          try {
            await updateProduct(product.id, {
              stock: item.quantity,
              lastUpdated: item.lastUpdated
            });
            updatedCount++;
          } catch (err) {
            errors.push({
              sku: item.sku,
              message: err instanceof Error ? err.message : 'Failed to update stock'
            });
          }
        } else {
          errors.push({
            sku: item.sku,
            message: 'Product not found'
          });
        }
      }

      return {
        success: errors.length === 0,
        updatedCount,
        errors
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to import stock';
      setError(message);
      throw err;
    } finally {
      setIsImporting(false);
    }
  };

  return {
    importStock,
    isImporting,
    error
  };
}
```