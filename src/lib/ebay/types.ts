export interface EbayConfig {
  appId: string;
  certId: string;
  devId: string;
  sandbox: boolean;
}

export interface EbayPriceData {
  itemId: string;
  title: string;
  price: number;
  condition: string;
  listingType: string;
  endTime: string;
  url: string;
}

export interface EbaySearchParams {
  keywords: string;
  categoryId?: string;
  condition?: string[];
  minPrice?: number;
  maxPrice?: number;
  sortOrder?: 'BestMatch' | 'CurrentPriceHighest' | 'PricePlusShippingHighest' | 'PricePlusShippingLowest';
}