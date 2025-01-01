export interface DashboardMetrics {
  totalRevenue: number;
  activeListings: number;
  buyBoxWinRate: number;
  lastUpdated: string;
}

export interface PriceHistory {
  id: string;
  productId: string;
  price: number;
  marketPrice: number;
  competitorPrice: number | null;
  timestamp: string;
}

export interface ProductMetrics {
  id: string;
  name: string;
  sku: string;
  currentPrice: number;
  marketPrice: number;
  competitorPrice: number | null;
  lastSoldPrice: number | null;
  lastSoldDate: string | null;
  stock: number;
  buyBoxStatus: 'winning' | 'losing' | 'no_competition';
  margin: number;
  status: 'active' | 'inactive' | 'out_of_stock';
}