import React from 'react';
import { createPortal } from 'react-dom';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { ProductActions } from '../../products/ProductActions';
import { CardDetailsModal } from '../../products/CardDetailsModal';
import type { Product } from '../../products/types';

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

  const handleImageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDetails(true);
  };

  const handleNameClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDetails(true);
  };

  return (
    <>
      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center gap-4">
            {/* Clickable image */}
            <button
              onClick={handleImageClick}
              className="relative group cursor-pointer focus:outline-none"
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
              {/* Clickable name */}
              <button
                onClick={handleNameClick}
                className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 text-left focus:outline-none"
              >
                {product.name}
              </button>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {product.sku}
              </div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900 dark:text-gray-100">
            ${product.currentPrice.toFixed(2)}
          </div>
          {product.competitorPrice && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              vs ${product.competitorPrice.toFixed(2)}
            </div>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`text-sm ${
            product.stock < 10 ? 'text-red-600 dark:text-red-400' : 
            product.stock < 50 ? 'text-yellow-600 dark:text-yellow-400' :
            'text-green-600 dark:text-green-400'
          }`}>
            {product.stock}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
            ${product.buyBoxStatus === 'winning' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
              product.buyBoxStatus === 'losing' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 
              'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'}`}>
            {product.buyBoxStatus === 'winning' ? <ArrowUp className="w-3 h-3 mr-1" /> :
             product.buyBoxStatus === 'losing' ? <ArrowDown className="w-3 h-3 mr-1" /> : null}
            {product.buyBoxStatus.replace('_', ' ').toUpperCase()}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`text-sm ${
            product.margin < 15 ? 'text-red-600 dark:text-red-400' :
            product.margin < 25 ? 'text-yellow-600 dark:text-yellow-400' :
            'text-green-600 dark:text-green-400'
          }`}>
            {product.margin}%
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <ProductActions productId={product.id} />
        </td>
      </tr>

      {showDetails && createPortal(
        <CardDetailsModal
          product={product}
          onClose={() => setShowDetails(false)}
        />,
        document.body
      )}
    </>
  );
}