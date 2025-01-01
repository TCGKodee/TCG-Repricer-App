import React from 'react';
import { DollarSign, X } from 'lucide-react';
import { useProductStore } from '../../store/products';
import { usePriceHistoryStore } from '../../store/priceHistory';

interface BulkRepricingBarProps {
  selectedProducts: string[];
  onClose: () => void;
}

export function BulkRepricingBar({ selectedProducts, onClose }: BulkRepricingBarProps) {
  const { products, updateProduct } = useProductStore();
  const addPriceChange = usePriceHistoryStore((state) => state.addChange);
  const [action, setAction] = React.useState<string>('');

  const updateBuyBoxStatus = (price: number, tcgLow: number | undefined) => {
    if (!tcgLow) return 'no_competition';
    return price <= tcgLow ? 'winning' : 'losing';
  };

  const handleReprice = () => {
    const selectedItems = products.filter(p => selectedProducts.includes(p.id));
    
    selectedItems.forEach(product => {
      let newPrice: number | undefined;
      
      switch (action) {
        case 'match_competitor':
          newPrice = product.competitorPrice;
          break;
        case 'beat_competitor':
          newPrice = product.competitorPrice ? product.competitorPrice - 0.01 : undefined;
          break;
        case 'match_market':
          newPrice = product.tcgPlayerMarket;
          break;
        case 'beat_market':
          newPrice = product.tcgPlayerMarket ? product.tcgPlayerMarket - 0.01 : undefined;
          break;
        case 'match_low':
          newPrice = product.tcgPlayerLow;
          break;
        case 'beat_low':
          newPrice = product.tcgPlayerLow ? product.tcgPlayerLow - 0.01 : undefined;
          break;
      }

      if (newPrice !== undefined) {
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
          trigger: 'manual',
          competitorPrice: product.competitorPrice,
          oldMargin: product.margin,
          newMargin,
        });
      }
    });

    onClose();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {selectedProducts.length} items selected
          </span>

          <select
            value={action}
            onChange={(e) => setAction(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="">Select Action</option>
            <option value="match_market">Match Market Price</option>
            <option value="beat_market">Beat Market Price</option>
            <option value="match_low">Match Low Price</option>
            <option value="beat_low">Beat Low Price</option>
            <option value="match_competitor">Match Competitor</option>
            <option value="beat_competitor">Beat Competitor</option>
          </select>

          <button
            onClick={handleReprice}
            disabled={!action}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <DollarSign className="h-4 w-4" />
            Apply Price Changes
          </button>
        </div>

        <button
          onClick={onClose}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}