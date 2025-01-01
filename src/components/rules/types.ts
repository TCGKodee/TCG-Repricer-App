export interface Rule {
  id: string;
  name: string;
  type: RuleType;
  enabled: boolean;
  conditions: RuleCondition[];
  actions: RuleAction[];
  priority: number;
  schedule?: Schedule;
}

export type RuleType = 
  | 'fixed_price'
  | 'beat_competitor'
  | 'match_competitor'
  | 'buy_box'
  | 'inventory_based'
  | 'profit_margin'
  | 'custom';

export interface RuleCondition {
  type: 'price' | 'inventory' | 'competitor' | 'sales_velocity';
  operator: 'gt' | 'lt' | 'eq' | 'gte' | 'lte' | 'between';
  value: number | [number, number];
}

export interface RuleAction {
  type: 'set_price' | 'adjust_price' | 'match_price';
  value: number | string;
  unit?: 'fixed' | 'percentage';
}

export interface Schedule {
  active: boolean;
  startTime?: string;
  endTime?: string;
  days?: number[];
}