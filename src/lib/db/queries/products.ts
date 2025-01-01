import { BaseQueries } from './base';
import type { ProductMetrics } from '../types';

export class ProductQueries extends BaseQueries {
  async getTopProducts(limit: number = 5): Promise<ProductMetrics[]> {
    try {
      const { data, error } = await this.client
        .from('products')
        .select('*')
        .eq('status', 'active')
        .order('margin', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return data || [];
    } catch (error) {
      this.handleError(error, 'getTopProducts');
    }
  }
}