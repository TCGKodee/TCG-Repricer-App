import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { createPortal } from 'react-dom';
import { ProductActions } from './ProductActions';
import { CardDetailsModal } from './CardDetailsModal';
import type { Product } from './types';

interface ProductTableRowProps {
  product: Product;
  onViewHistory: (id: string) => void;
  onViewAnalytics: (id: string) => void;
  onShowPriceHistory: (product: Product) => void;
}

export function ProductTableRow({ 
  product, 
  onViewHistory, 
  onViewAnalytics,
  onShowPriceHistory 
}: ProductTableRowProps) {
  const [showDetails, setShowDetails] = React.useState(false);

  const handleCardClick = () => {
    setShowDetails(true);
  };

  return (
    <>
      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center gap-4">
            {/* Make image clickable */}
            <button
              onClick={handleCardClick}
              className="relative group cursor-pointer"
            >
              {product.imageUrl ? (
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-12 h-12 object-contain rounded-lg transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-gray-400">No image</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-lg transition-colors" />
            </button>
            <div>
              {/* Make name clickable */}
              <button
                onClick={handleCardClick}
                className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 text-left"
              >
                {product.name}
              </button>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {product.sku}
              </div>
            </div>
          </div>
        </td>
        {/* ... other table cells ... */}
      </tr>

      {showDetails && (
        <CardDetailsModal
          product={product}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
}