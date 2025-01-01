import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Rule } from '../components/rules/types';

interface ProductRulesState {
  productRules: Record<string, Rule[]>;
  setProductRules: (productId: string, rules: Rule[]) => void;
  bulkSetRules: (productIds: string[], rules: Rule[]) => void;
  getProductRules: (productId: string) => Rule[];
}

export const useProductRulesStore = create<ProductRulesState>()(
  persist(
    (set, get) => ({
      productRules: {},
      setProductRules: (productId, rules) => set((state) => ({
        productRules: {
          ...state.productRules,
          [productId]: rules,
        },
      })),
      bulkSetRules: (productIds, rules) => set((state) => {
        const updates = productIds.reduce((acc, id) => ({
          ...acc,
          [id]: rules,
        }), {});

        return {
          productRules: {
            ...state.productRules,
            ...updates,
          },
        };
      }),
      getProductRules: (productId) => get().productRules[productId] || [],
    }),
    {
      name: 'product-rules-storage',
    }
  )
);