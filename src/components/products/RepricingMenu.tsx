import React from 'react';
import { DollarSign, ArrowDown, ArrowUp } from 'lucide-react';
import { useProductStore } from '../../store/products';
import { usePriceHistoryStore } from '../../store/priceHistory';
import { useRuleEngine } from '../../hooks/useRuleEngine';

interface RepricingMenuProps {
  productId: string;
  onClose: () => void;
}

export function RepricingMenu({ productId, onClose }: RepricingMenuProps) {
  const { products, updateProduct } = useProductStore();
  const addPriceChange = usePriceHistoryStore((state) => state.addChange);
  const { runRules } = useRuleEngine();
  
  const product = products.find(p => p.id === productId);
  if (!product) return null;

  const updateBuyBoxStatus = (price: number, tcgLow: number | undefined) => {
    if (!tcgLow) return 'no_competition';
    return price <= tcgLow ? 'winning' : 'losing';
  };

  const handleReprice = (type: 'match' | 'beat' | 'rules' | 'tcg_market' | 'tcg_low' | 'beat_market' | 'beat_low') => {
    let newPrice: number;
    let trigger: 'manual' | 'rule';

    switch (type) {
      case 'match':
        if (!product.competitorPrice) return;
        newPrice = product.competitorPrice;
        trigger = 'manual';
        break;
      case 'beat':
        if (!product.competitorPrice) return;
        newPrice = product.competitorPrice - 0.01;
        trigger = 'manual';
        break;
      case 'tcg_market':
        if (!product.tcgPlayerMarket) return;
        newPrice = product.tcgPlayerMarket;
        trigger = 'manual';
        break;
      case 'tcg_low':
        if (!product.tcgPlayerLow) return;
        newPrice = product.tcgPlayerLow;
        trigger = 'manual';
        break;
      case 'beat_market':
        if (!product.tcgPlayerMarket) return;
        newPrice = product.tcgPlayerMarket - 0.01;
        trigger = 'manual';
        break;
      case 'beat_low':
        if (!product.tcgPlayerLow) return;
        newPrice = product.tcgPlayerLow - 0.01;
        trigger = 'manual';
        break;
      case 'rules':
        runRules();
        onClose();
        return;
      default:
        return;
    }

    const newMargin = ((newPrice - product.marketPrice) / newPrice) * 100;
    const buyBoxStatus = updateBuyBoxStatus(newPrice, product.tcgPlayerLow);

    updateProduct(product.id, {
      currentPrice: newPrice,
      margin: Math.round(newMargin * 10) / 10,
      buyBoxStatus
    });

    addPriceChange({
      id: Date.now().toString(),
      productId: product.id,
      productName: product.name,
      sku: product.sku,
      timestamp: new Date().toISOString(),
      oldPrice: product.currentPrice,
      newPrice,
      trigger,
      competitorPrice: product.competitorPrice,
      oldMargin: product.margin,
      newMargin,
    });

    onClose();
  };

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">TCGPlayer Actions</h3>
        <div className="grid grid-cols-1 gap-2">
          <button
            onClick={() => handleReprice('tcg_market')}
            disabled={!product.tcgPlayerMarket}
            className="flex items-center justify-between w-full px-3 py-2 text-sm text-left bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-600 disabled:opacity-50"
          >
            <span>Match Market Price</span>
            {product.tcgPlayerMarket && (
              <span>${product.tcgPlayerMarket.toFixed(2)}</span>
            )}
          </button>
          <button
            onClick={() => handleReprice('beat_market')}
            disabled={!product.tcgPlayerMarket}
            className="flex items-center justify-between w-full px-3 py-2 text-sm text-left bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-600 disabled:opacity-50"
          >
            <span>Beat Market Price</span>
            {product.tcgPlayerMarket && (
              <span>${(product.tcgPlayerMarket - 0.01).toFixed(2)}</span>
            )}
          </button>
          <button
            onClick={() => handleReprice('tcg_low')}
            disabled={!product.tcgPlayerLow}
            className="flex items-center justify-between w-full px-3 py-2 text-sm text-left bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-600 disabled:opacity-50"
          >
            <span>Match Low Price</span>
            {product.tcgPlayerLow && (
              <span>${product.tcgPlayerLow.toFixed(2)}</span>
            )}
          </button>
          <button
            onClick={() => handleReprice('beat_low')}
            disabled={!product.tcgPlayerLow}
            className="flex items-center justify-between w-full px-3 py-2 text-sm text-left bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-600 disabled:opacity-50"
          >
            <span>Beat Low Price</span>
            {product.tcgPlayerLow && (
              <span>${(product.tcgPlayerLow - 0.01).toFixed(2)}</span>
            )}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Competitor Actions</h3>
        <div className="grid grid-cols-1 gap-2">
          <button
            onClick={() => handleReprice('match')}
            disabled={!product.competitorPrice}
            className="flex items-center justify-between w-full px-3 py-2 text-sm text-left bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-600 disabled:opacity-50"
          >
            <span>Match Competitor</span>
            {product.competitorPrice && (
              <span>${product.competitorPrice.toFixed(2)}</span>
            )}
          </button>
          <button
            onClick={() => handleReprice('beat')}
            disabled={!product.competitorPrice}
            className="flex items-center justify-between w-full px-3 py-2 text-sm text-left bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-600 disabled:opacity-50"
          >
            <span>Beat Competitor</span>
            {product.competitorPrice && (
              <span>${(product.competitorPrice - 0.01).toFixed(2)}</span>
            )}
          </button>
        </div>
      </div>

      <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => handleReprice('rules')}
          className="flex items-center justify-center w-full px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <DollarSign className="h-4 w-4 mr-2" />
          Run Pricing Rules
        </button>
      </div>
    </div>
  );
}