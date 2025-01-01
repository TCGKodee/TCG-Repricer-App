import { ShopifyConfig } from './types';

export class ShopifyClient {
  private config: ShopifyConfig;
  private baseUrl: string;

  constructor(config: ShopifyConfig) {
    this.config = config;
    this.baseUrl = `/api/shopify/${config.shop}`;
  }

  async getProducts() {
    const response = await fetch(`${this.baseUrl}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  }

  async updatePrice(productId: string, variantId: string, price: number) {
    const response = await fetch(`${this.baseUrl}/products/${productId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ variantId, price })
    });
    if (!response.ok) throw new Error('Failed to update price');
    return response.json();
  }
}