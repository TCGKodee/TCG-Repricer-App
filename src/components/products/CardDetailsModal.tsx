import React from 'react';
import { createPortal } from 'react-dom';
import { X, DollarSign, TrendingUp, ShoppingCart, ExternalLink } from 'lucide-react';
import type { Product } from './types';

interface CardDetailsModalProps {
  product: Product;
  onClose: () => void;
}

export function CardDetailsModal({ product, onClose }: CardDetailsModalProps) {
  // Close on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Close on background click
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Generate Hot Hitz URL
  const hotHitzUrl = `https://hothitzcollectables.com/search?q=${encodeURIComponent(product.name)}`;

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={handleBackgroundClick}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 flex justify-between items-center p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-10">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Card Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Image */}
            <div>
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full rounded-lg shadow-md"
                />
              ) : (
                <div className="w-full aspect-[2/3] bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 dark:text-gray-500">No image available</span>
                </div>
              )}
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  SKU: {product.sku}
                </p>
              </div>

              {/* Card Details */}
              {product.cardDetails && (
                <div className="grid grid-cols-2 gap-4">
                  {product.cardDetails.rarity && (
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Rarity</span>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {product.cardDetails.rarity}
                      </p>
                    </div>
                  )}
                  {product.cardDetails.setName && (
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Set</span>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {product.cardDetails.setName}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Pricing Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Pricing Details
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Current Price</p>
                      <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        ${product.currentPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Market Price</p>
                      <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        ${product.marketPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* External Links */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col gap-3">
                  {/* Hot Hitz Collectables Button */}
                  <a
                    href={hotHitzUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View on Hot Hitz Collectables
                  </a>

                  <div className="flex gap-3">
                    <a
                      href={`https://www.tcgplayer.com/search/all/product?q=${encodeURIComponent(product.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      View on TCGPlayer
                    </a>
                    <a
                      href={`https://www.cardmarket.com/en/Pokemon/Products/Search?searchString=${encodeURIComponent(product.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      View on Cardmarket
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}