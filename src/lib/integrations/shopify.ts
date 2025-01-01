```typescript
import type { StockData, ImportResult } from './types';

export class ShopifyIntegration {
  private accessToken: string;
  private shopDomain: string;

  constructor(accessToken: string, shopDomain: string) {
    this.accessToken = accessToken;
    this.shopDomain = shopDomain;
  }

  async fetchStock(): Promise<StockData[]> {
    try {
      const response = await fetch(`https://${this.shopDomain}/admin/api/2024-01/inventory_levels.json`, {
        headers: {
          'X-Shopify-Access-Token': this.accessToken,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch Shopify inventory');
      }

      const data = await response.json();
      return data.inventory_levels.map((item: any) => ({
        sku: item.sku,
        quantity: item.available,
        lastUpdated: item.updated_at
      }));
    } catch (error) {
      console.error('Shopify stock fetch error:', error);
      throw error;
    }
  }
}
```