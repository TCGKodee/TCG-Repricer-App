import { ApiVersion } from '@shopify/shopify-api';

if (!process.env.SHOPIFY_API_KEY || !process.env.SHOPIFY_API_SECRET) {
  throw new Error('Missing required Shopify API credentials');
}

export const shopifyConfig = {
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  scopes: [
    'read_products',
    'write_products',
    'read_inventory',
    'write_inventory'
  ],
  hostName: process.env.HOST || 'localhost:3000',
  apiVersion: ApiVersion.January24,
  isEmbeddedApp: true
};