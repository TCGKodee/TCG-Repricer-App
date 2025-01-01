import { ApiClient } from '../api/client';
import { ShopifyService } from './ShopifyService';
import { Logger } from '../utils/logger';

export class PriceMonitor {
  private apiClient: ApiClient;
  private shopifyService: ShopifyService;
  private logger: Logger;
  private interval: number = 5 * 60 * 1000; // 5 minutes

  constructor(apiClient: ApiClient, shopifyService: ShopifyService) {
    this.apiClient = apiClient;
    this.shopifyService = shopifyService;
    this.logger = new Logger('PriceMonitor');
  }

  start(): void {
    setInterval(async () => {
      try {
        const updates = await this.apiClient.checkPrices();
        if (updates.length > 0) {
          await this.shopifyService.updatePrices(updates);
        }
      } catch (error) {
        this.logger.error('Price monitoring failed:', error);
      }
    }, this.interval);
  }
}