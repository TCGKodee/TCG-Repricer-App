export interface Product {
  id: string;
  name: string;
  sku: string;
  category: 'pokemon' | 'one_piece';
  currentPrice: number;
  targetPrice: number;
  competitorPrice?: number;
  tcgPlayerMarket?: number;
  tcgPlayerLow?: number;
  lastSold?: {
    price: number;
    date: string;
  };
  stock: number;
  status: 'active' | 'inactive' | 'out_of_stock';
  buyBoxStatus: 'winning' | 'losing' | 'no_competition';
  margin: number;
  lastUpdated: string;
  imageUrl?: string;
  cardDetails?: {
    rarity?: string;
    artist?: string;
    setName?: string;
    setNumber?: string;
    regulationMark?: string;
    attributes?: {
      weakness?: string;
      resistance?: string;
      retreatCost?: number;
    };
    attacks?: Array<{
      name: string;
      cost?: string[];
      damage?: string;
      description?: string;
    }>;
  };
}

export interface ProductFilters {
  search: string;
  set: string | null;
  rarity: string | null;
  status: 'all' | 'active' | 'inactive' | 'out_of_stock';
}