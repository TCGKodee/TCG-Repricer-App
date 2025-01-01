import React from 'react';
import { createPortal } from 'react-dom';
import { X, DollarSign, Package } from 'lucide-react';
import { useProductStore } from '../../store/products';
import { usePriceHistoryStore } from '../../store/priceHistory';
import type { Product } from './types';

interface PriceAdjustmentModalProps {
  product: Product;
  onClose: () => void;
}

export function PriceAdjustmentModal({ product, onClose }: PriceAdjustmentModalProps) {
  const updateProduct = useProductStore((state) => state.updateProduct);
  const addPriceChange = usePriceHistoryStore((state) => state.addChange);
  const [price, setPrice] = React.useState(product.currentPrice.toString());
  const [stock, setStock] = React.useState(product.stock.toString());
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPrice = parseFloat(price);
    const newStock = parseInt(stock, 10);

    if (isNaN(newPrice) || newPrice < 0) {
      setError('Please enter a valid price');
      return;
    }

    if (isNaN(newStock) || newStock < 0) {
      setError('Please enter a valid stock quantity');
      return;
    }

    // Calculate new margin
    const newMargin = ((newPrice - product.marketPrice) / newPrice) * 100;

    // Update product
    updateProduct(product.id, {
      currentPrice: newPrice,
      stock: newStock,
      margin: Math.round(newMargin * 10) / 10,
      buyBoxStatus: newPrice <= (product.competitorPrice || Infinity) ? 'winning' : 'losing'
    });

    // Add price change record if price changed
    if (newPrice !== product.currentPrice) {
      addPriceChange({
        id: Date.now().toString(),
        productId: product.id,
        productName: product.name,
        sku: product.sku,
        timestamp: new Date().toISOString(),
        oldPrice: product.currentPrice,
        newPrice,
        trigger: 'manual',
        oldMargin: product.margin,
        newMargin,
        imageUrl: product.imageUrl
      });
    }

    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Adjust Price & Stock
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {error && (
            <div className="p-3 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Price
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                step="0.01"
                min="0"
                className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Stock
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Package className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                min="0"
                className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}