export interface ShopifyConfig {
  shop: string;
  accessToken: string;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  variants: ShopifyVariant[];
}

export interface ShopifyVariant {
  id: string;
  price: string;
  sku: string;
}