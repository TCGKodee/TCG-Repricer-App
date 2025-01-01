import React from 'react';
import { Plus, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProductsTable } from '../components/products/ProductsTable';
import { ProductFilters } from '../components/products/ProductFilters';
import { useProductStore } from '../store/products';
import type { ProductFilters as Filters } from '../components/products/types';

export default function Products() {
  const navigate = useNavigate();
  const products = useProductStore((state) => state.products);
  const [filters, setFilters] = React.useState<Filters>({
    search: '',
    set: null,
    rarity: null,
    status: 'all',
  });

  const filteredProducts = React.useMemo(() => {
    return products.filter(product => {
      // Search filter
      const searchMatch = !filters.search || 
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.sku.toLowerCase().includes(filters.search.toLowerCase());

      // Set filter
      const setMatch = !filters.set || 
        product.cardDetails?.setName?.toLowerCase().includes(filters.set.toLowerCase());

      // Rarity filter
      const rarityMatch = !filters.rarity || 
        product.cardDetails?.rarity?.toLowerCase() === filters.rarity.toLowerCase();

      // Status filter
      const statusMatch = filters.status === 'all' || product.status === filters.status;
      
      return searchMatch && setMatch && rarityMatch && statusMatch;
    });
  }, [products, filters]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Products ({filteredProducts.length})
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/import')}
            className="flex items-center gap-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Upload className="h-5 w-5" />
            Import Cards
          </button>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            <Plus className="h-5 w-5" />
            Add Product
          </button>
        </div>
      </div>

      <ProductFilters
        filters={filters}
        onFiltersChange={setFilters}
      />

      <ProductsTable products={filteredProducts} />
    </div>
  );
}