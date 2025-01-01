import { supabase } from '../supabase';
import { DashboardQueries } from './queries/dashboard';
import { ProductQueries } from './queries/products';
import { PriceHistoryQueries } from './queries/priceHistory';

// Create a single database interface
class Database {
  public dashboard: DashboardQueries;
  public products: ProductQueries;
  public priceHistory: PriceHistoryQueries;

  constructor() {
    this.dashboard = new DashboardQueries(supabase);
    this.products = new ProductQueries(supabase);
    this.priceHistory = new PriceHistoryQueries(supabase);
  }
}

export const db = new Database();