import { BaseQueries } from './base';
import type { PriceHistory } from '../types';
import { mockPriceChanges } from '../../../data/mockCards';

export class PriceHistoryQueries extends BaseQueries {
  async getHistory(productId: string, days: number = 30): Promise<PriceHistory[]> {
    return this.withRetry(
      async () => {
        if (process.env.NODE_ENV === 'development') {
          return this.getMockHistory(productId, days);
        }

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        const { data, error } = await this.client
          .from('price_history')
          .select('*')
          .eq('product_id', productId)
          .gte('timestamp', startDate.toISOString())
          .order('timestamp', { ascending: true });

        if (error) throw error;
        return data || [];
      },
      'getHistory',
      this.getMockHistory(productId, days)
    );
  }

  private getMockHistory(productId: string, days: number): PriceHistory[] {
    const now = new Date();
    const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    
    return mockPriceChanges
      .filter(change => 
        change.productId === productId && 
        new Date(change.timestamp) >= startDate
      )
      .sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
  }
}