import { db } from '../db';
import { ShopifyClient } from './client';
import { Logger } from '../utils/logger';

export class ShopifySync {
  private client: ShopifyClient;
  private logger: Logger;

  constructor(client: ShopifyClient) {
    this.client = client;
    this.logger = new Logger('ShopifySync');
  }

  async syncProducts() {
    try {
      const products = await this.client.getProducts();
      
      for (const product of products) {
        await db.shopify.syncProduct(product);
      }

      this.logger.info(`Synced ${products.length} products from Shopify`);
    } catch (error) {
      this.logger.error('Failed to sync products:', error);
      throw error;
    }
  }

  async updateShopifyPrice(productId: string, price: number) {
    try {
      const mapping = await db.shopify.getShopifyMapping(productId);
      if (!mapping) {
        throw new Error('Product not found in Shopify mapping');
      }

      await this.client.updatePrice(
        mapping.shopify_product_id,
        mapping.shopify_variant_id,
        price
      );

      this.logger.info(`Updated Shopify price for product ${productId}`);
    } catch (error) {
      this.logger.error('Failed to update Shopify price:', error);
      throw error;
    }
  }
}