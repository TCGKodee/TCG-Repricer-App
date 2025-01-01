import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { useProductStore } from '../../store/products';
import type { Product } from './types';

interface QuickActionsProps {
  product: Product;
  onAdjust: () => void;
}

export function QuickActions({ product, onAdjust }: QuickActionsProps) {
  const updateProduct = useProductStore((state) => state.updateProduct);

  const handleStockChange = (change: number) => {
    const newStock = Math.max(0, product.stock + change);
    updateProduct(product.id, { stock: newStock });
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <button
          onClick={() => handleStockChange(-1)}
          className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          title="Decrease stock"
        >
          <Minus className="h-4 w-4" />
        </button>
        <button
          onClick={() => handleStockChange(1)}
          className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          title="Increase stock"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <button
        onClick={onAdjust}
        className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
      >
        Adjust
      </button>
    </div>
  );
}