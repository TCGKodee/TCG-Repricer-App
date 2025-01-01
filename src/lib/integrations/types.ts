```typescript
export interface IntegrationConfig {
  type: 'wix' | 'shopify';
  apiKey: string;
  apiSecret?: string;
  accessToken?: string;
  storeUrl?: string;
}

export interface StockData {
  sku: string;
  quantity: number;
  lastUpdated: string;
}

export interface ImportResult {
  success: boolean;
  updatedCount: number;
  errors: Array<{
    sku: string;
    message: string;
  }>;
}
```