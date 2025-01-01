import type { Rule } from '../components/rules/types';

export const mockRules: Rule[] = [
  {
    id: '1',
    name: 'Beat Competitor Price',
    type: 'beat_competitor',
    enabled: true,
    conditions: [
      {
        type: 'price',
        operator: 'gt',
        value: 10,
      },
    ],
    actions: [
      {
        type: 'adjust_price',
        value: 0.01,
        unit: 'fixed',
      },
    ],
    priority: 1,
  },
  {
    id: '2',
    name: 'Match Market Price',
    type: 'match_competitor',
    enabled: true,
    conditions: [
      {
        type: 'price',
        operator: 'gt',
        value: 20,
      },
    ],
    actions: [
      {
        type: 'match_price',
        value: 'market',
        unit: 'fixed',
      },
    ],
    priority: 2,
  },
  {
    id: '3',
    name: 'Low Stock Premium',
    type: 'inventory_based',
    enabled: true,
    conditions: [
      {
        type: 'inventory',
        operator: 'lt',
        value: 5,
      },
    ],
    actions: [
      {
        type: 'adjust_price',
        value: 10,
        unit: 'percentage',
      },
    ],
    priority: 3,
  },
];