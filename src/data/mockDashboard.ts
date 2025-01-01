import type { ProductMetrics } from '../lib/db/types';

export const mockTopProducts: ProductMetrics[] = [
  {
    id: '1',
    name: 'Charizard VMAX (Secret)',
    sku: 'SWSH04-200',
    currentPrice: 279.99,
    marketPrice: 295.99,
    competitorPrice: 289.99,
    lastSoldPrice: 285.00,
    lastSoldDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    stock: 5,
    buyBoxStatus: 'losing',
    margin: 35,
    status: 'active'
  },
  {
    id: '2',
    name: 'Lugia V (Alt Art)',
    sku: 'SWSH11-186',
    currentPrice: 189.99,
    marketPrice: 195.99,
    competitorPrice: 192.99,
    lastSoldPrice: 188.50,
    lastSoldDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    stock: 3,
    buyBoxStatus: 'winning',
    margin: 32,
    status: 'active'
  },
  {
    id: '3',
    name: 'Portgas D. Ace (Secret)',
    sku: 'OP02-100',
    currentPrice: 299.99,
    marketPrice: 305.99,
    competitorPrice: 302.99,
    lastSoldPrice: 298.50,
    lastSoldDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    stock: 2,
    buyBoxStatus: 'losing',
    margin: 42,
    status: 'active'
  },
  {
    id: '4',
    name: 'Monkey D. Luffy (Leader)',
    sku: 'OP01-001',
    currentPrice: 149.99,
    marketPrice: 155.99,
    competitorPrice: 152.99,
    lastSoldPrice: 148.50,
    lastSoldDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    stock: 8,
    buyBoxStatus: 'winning',
    margin: 28,
    status: 'active'
  },
  {
    id: '5',
    name: 'Umbreon VMAX (Alt Art)',
    sku: 'SWSH07-215',
    currentPrice: 259.99,
    marketPrice: 265.99,
    competitorPrice: 262.99,
    lastSoldPrice: 255.00,
    lastSoldDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    stock: 2,
    buyBoxStatus: 'winning',
    margin: 38,
    status: 'active'
  }
];

export const mockDashboardMetrics = {
  totalRevenue: 124567.89,
  activeListings: 156,
  buyBoxWinRate: 68.5,
  lastUpdated: new Date().toISOString()
};