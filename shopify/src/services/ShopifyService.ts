import { PriceUpdate } from '../types';
import { Logger } from '../utils/logger';

export class ShopifyService {
  private logger: Logger;

  constructor() {
    this.logger = new Logger('ShopifyService');
  }

  async updatePrices(updates: PriceUpdate[]): Promise<void> {
    for (const update of updates) {
      try {
        await fetch(`/admin/api/2024-01/products/${update.productId}.json`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            product: {
              variants: [{
                id: update.variantId,
                price: update.newPrice
              }]
            }
          })
        });
      } catch (error) {
        this.logger.error(`Failed to update price for product ${update.productId}:`, error);
      }
    }
  }
}