import { useCallback } from 'react';
import { useProductStore } from '../store/products';
import { useRuleStore } from '../store/rules';
import { usePriceHistoryStore } from '../store/priceHistory';
import type { Product } from '../components/products/types';
import type { Rule } from '../components/rules/types';

export function useRuleEngine() {
  const { products, updateProduct } = useProductStore();
  const rules = useRuleStore((state) => state.rules);
  const addPriceChange = usePriceHistoryStore((state) => state.addChange);

  const evaluateProduct = useCallback((product: Product, rule: Rule) => {
    // Rule evaluation logic here
    // This is a simplified example
    if (rule.type === 'beat_competitor' && product.competitorPrice) {
      const newPrice = product.competitorPrice - 0.01;
      if (newPrice !== product.currentPrice) {
        const newMargin = ((newPrice - product.marketPrice) / newPrice) * 100;
        
        updateProduct(product.id, { 
          currentPrice: newPrice,
          margin: Math.round(newMargin * 10) / 10,
          buyBoxStatus: 'winning'
        });
        
        addPriceChange({
          id: Date.now().toString(),
          productId: product.id,
          productName: product.name,
          sku: product.sku,
          timestamp: new Date().toISOString(),
          oldPrice: product.currentPrice,
          newPrice,
          trigger: 'rule',
          ruleName: rule.name,
          competitorPrice: product.competitorPrice,
          oldMargin: product.margin,
          newMargin,
        });
      }
    }
  }, [updateProduct, addPriceChange]);

  const runRules = useCallback(() => {
    const enabledRules = rules
      .filter(rule => rule.enabled)
      .sort((a, b) => a.priority - b.priority);

    products.forEach(product => {
      enabledRules.forEach(rule => {
        evaluateProduct(product, rule);
      });
    });
  }, [products, rules, evaluateProduct]);

  return { runRules };
}