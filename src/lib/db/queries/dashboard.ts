import { BaseQueries } from './base';
import type { DashboardMetrics } from '../types';

export class DashboardQueries extends BaseQueries {
  async getMetrics(): Promise<DashboardMetrics> {
    try {
      const { data, error } = await this.client
        .from('dashboard_metrics')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      return {
        totalRevenue: data?.total_revenue ?? 0,
        activeListings: data?.active_listings ?? 0,
        buyBoxWinRate: data?.buy_box_win_rate ?? 0,
        lastUpdated: data?.last_updated ?? new Date().toISOString()
      };
    } catch (error) {
      return {
        totalRevenue: 0,
        activeListings: 0,
        buyBoxWinRate: 0,
        lastUpdated: new Date().toISOString()
      };
    }
  }
}