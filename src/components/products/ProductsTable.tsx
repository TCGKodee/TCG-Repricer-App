import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { ProductActions } from './ProductActions';
import { CardDetailsModal } from './CardDetailsModal';
import { PriceAdjustmentModal } from './PriceAdjustmentModal';
import { QuickActions } from './QuickActions';
import type { Product } from './types';

interface ProductsTableProps {
  products: Product[];
}

export function ProductsTable({ products }: ProductsTableProps) {
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [adjustingProduct, setAdjustingProduct] = React.useState<Product | null>(null);
  const [selectedProducts, setSelectedProducts] = React.useState<string[]>([]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedProducts(e.target.checked ? products.map(p => p.id) : []);
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
  };

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
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === products.length}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Buy Box
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Margin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleSelectProduct(product.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleCardClick(product)}
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
                        <button
                          onClick={() => handleCardClick(product)}
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
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${
                        product.stock < 0 ? 'text-red-600 dark:text-red-400' : 
                        product.stock > 0 ? 'text-green-600 dark:text-green-400' :
                        'text-gray-500 dark:text-gray-400'
                      }`}>
                        {product.stock}
                      </span>
                      <QuickActions
                        product={product}
                        onAdjust={() => setAdjustingProduct(product)}
                      />
                    </div>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedProduct && (
        <CardDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {adjustingProduct && (
        <PriceAdjustmentModal
          product={adjustingProduct}
          onClose={() => setAdjustingProduct(null)}
        />
      )}
    </>
  );
}