import { BaseQueries } from './base';
import type { ShopifyProduct } from '../../shopify/types';

export class ShopifyQueries extends BaseQueries {
  async syncProduct(shopifyProduct: ShopifyProduct) {
    try {
      const { data, error } = await this.client
        .from('products')
        .upsert({
          shopify_product_id: shopifyProduct.id,
          name: shopifyProduct.title,
          sku: shopifyProduct.variants[0]?.sku || '',
          current_price: parseFloat(shopifyProduct.variants[0]?.price || '0'),
          status: 'active',
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'shopify_product_id'
        });

      return this.validateResponse(data, error, 'syncProduct', null);
    } catch (error) {
      return this.handleError(error, 'syncProduct', null);
    }
  }

  async getShopifyMapping(productId: string) {
    try {
      const { data, error } = await this.client
        .from('products')
        .select('shopify_product_id, shopify_variant_id')
        .eq('id', productId)
        .single();

      return this.validateResponse(data, error, 'getShopifyMapping', null);
    } catch (error) {
      return this.handleError(error, 'getShopifyMapping', null);
    }
  }
}