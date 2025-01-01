export interface PriceChange {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  timestamp: string;
  oldPrice: number;
  newPrice: number;
  trigger: PriceTrigger;
  userId?: string;
  userName?: string;
  competitorPrice?: number;
  buyBoxPrice?: number;
  oldMargin?: number;
  newMargin?: number;
  note?: string;
  ruleId?: string;
  ruleName?: string;
  imageUrl?: string;
}

export type PriceTrigger = 
  | 'rule'
  | 'manual'
  | 'min_price'
  | 'max_price'
  | 'competitor'
  | 'buy_box'
  | 'system';

export interface HistoryFilters {
  dateRange: [Date, Date];
  sku?: string;
  trigger?: PriceTrigger;
  userId?: string;
  ruleId?: string;
}