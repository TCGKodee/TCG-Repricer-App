import { Shopify } from '@shopify/shopify-api';
import { handleProductUpdate } from './handlers/products';

export async function setupWebhooks(shop: string, accessToken: string) {
  const webhooks = [
    {
      topic: 'PRODUCTS_UPDATE',
      address: `${process.env.HOST}/webhooks/products/update`,
      format: 'json'
    }
  ];

  for (const webhook of webhooks) {
    try {
      await Shopify.Webhooks.Registry.register({
        shop,
        accessToken,
        path: webhook.address,
        topic: webhook.topic,
        format: webhook.format
      });
    } catch (error) {
      console.error(`Failed to register ${webhook.topic} webhook:`, error);
    }
  }
}