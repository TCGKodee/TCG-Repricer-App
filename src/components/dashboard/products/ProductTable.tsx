import React from 'react';
import { useProductStore } from '../../../store/products';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { ProductTableRow } from './ProductTableRow';
import { ErrorMessage } from '../../ui/ErrorMessage';
import { PriceHistoryModal } from '../../products/PriceHistoryModal';
import type { Product } from '../../products/types';

export function ProductTable() {
  const { products, isLoading, error } = useProductStore();
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <ErrorMessage message="Failed to load products" />
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center text-gray-500 dark:text-gray-400">
        No products found
      </div>
    );
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Product
                </th>
                {/* ... other table headers ... */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {products.map((product) => (
                <ProductTableRow
                  key={product.id}
                  product={product}
                  onViewHistory={() => {}}
                  onViewAnalytics={() => {}}
                  onShowPriceHistory={setSelectedProduct}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedProduct && (
        <PriceHistoryModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}