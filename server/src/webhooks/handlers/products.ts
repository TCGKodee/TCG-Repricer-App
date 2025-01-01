import { WebhookHandlerFunction } from '@shopify/shopify-api';
import { db } from '../../db';

export const handleProductUpdate: WebhookHandlerFunction = async (
  topic,
  shop,
  body
) => {
  try {
    const product = JSON.parse(body);
    await db.query(
      'UPDATE products SET updated_at = NOW() WHERE shopify_product_id = $1',
      [product.id]
    );
  } catch (error) {
    console.error('Product update webhook error:', error);
  }
};