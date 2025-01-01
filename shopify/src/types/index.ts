export interface ShopifyConfig {
  shop: string;
  apiKey: string;
}

export interface PriceUpdate {
  productId: string;
  variantId: string;
  newPrice: number;
}