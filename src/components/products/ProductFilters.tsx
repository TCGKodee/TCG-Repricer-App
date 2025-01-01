import React from 'react';
import { Search } from 'lucide-react';
import { POKEMON_SETS } from '../../lib/pokemon/sets';
import { POKEMON_RARITIES } from '../../lib/pokemon/types';
import { SearchInput } from '../ui/SearchInput';
import type { ProductFilters as Filters } from './types';

interface ProductFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export function ProductFilters({ filters, onFiltersChange }: ProductFiltersProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Search Cards
          </label>
          <SearchInput
            value={filters.search}
            onChange={(value) => onFiltersChange({ ...filters, search: value })}
            placeholder="Search by name or SKU..."
            icon={<Search className="h-5 w-5 text-gray-400" />}
          />
        </div>

        {/* Set Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Set
          </label>
          <select
            value={filters.set || 'all'}
            onChange={(e) => onFiltersChange({ 
              ...filters, 
              set: e.target.value === 'all' ? null : e.target.value 
            })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="all">All Sets</option>
            {Object.entries(groupSetsBySeries()).map(([series, sets]) => (
              <optgroup key={series} label={series}>
                {sets.map((set) => (
                  <option key={set.id} value={set.id}>
                    {set.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Rarity Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Rarity
          </label>
          <select
            value={filters.rarity || 'all'}
            onChange={(e) => onFiltersChange({ 
              ...filters, 
              rarity: e.target.value === 'all' ? null : e.target.value 
            })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="all">All Rarities</option>
            {POKEMON_RARITIES.map((rarity) => (
              <option key={rarity.id} value={rarity.id}>
                {rarity.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

// Helper function to group sets by series
function groupSetsBySeries() {
  return POKEMON_SETS.reduce((acc, set) => {
    if (!acc[set.series]) {
      acc[set.series] = [];
    }
    acc[set.series].push(set);
    return acc;
  }, {} as Record<string, typeof POKEMON_SETS[number][]>);
}