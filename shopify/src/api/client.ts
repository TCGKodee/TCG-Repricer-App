import { ShopifyConfig } from '../types';

export class ApiClient {
  private apiEndpoint: string;
  private config: ShopifyConfig;

  constructor(config: ShopifyConfig) {
    this.config = config;
    this.apiEndpoint = 'https://api.tcgrepricer.com';
  }

  async connect(): Promise<boolean> {
    const response = await fetch(`${this.apiEndpoint}/connect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        shop: this.config.shop,
        apiKey: this.config.apiKey
      })
    });
    return response.ok;
  }

  async checkPrices(): Promise<PriceUpdate[]> {
    const response = await fetch(`${this.apiEndpoint}/check-prices`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ shop: this.config.shop })
    });
    
    if (!response.ok) {
      throw new Error('Failed to check prices');
    }
    
    return response.json();
  }
}