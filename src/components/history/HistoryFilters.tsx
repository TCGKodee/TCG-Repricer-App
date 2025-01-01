import React from 'react';
import type { HistoryFilters, PriceTrigger } from './types';

interface HistoryFiltersProps {
  filters: HistoryFilters;
  onFiltersChange: (filters: HistoryFilters) => void;
}

const triggers: { value: PriceTrigger; label: string }[] = [
  { value: 'rule', label: 'Rule-based' },
  { value: 'manual', label: 'Manual' },
  { value: 'min_price', label: 'Minimum Price' },
  { value: 'max_price', label: 'Maximum Price' },
  { value: 'competitor', label: 'Competitor' },
  { value: 'buy_box', label: 'Buy Box' },
  { value: 'system', label: 'System' },
];

export function HistoryFilters({ filters, onFiltersChange }: HistoryFiltersProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Date Range
          </label>
          <div className="flex gap-2">
            <input
              type="date"
              value={filters.dateRange[0].toISOString().split('T')[0]}
              onChange={(e) => onFiltersChange({
                ...filters,
                dateRange: [new Date(e.target.value), filters.dateRange[1]]
              })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg"
            />
            <input
              type="date"
              value={filters.dateRange[1].toISOString().split('T')[0]}
              onChange={(e) => onFiltersChange({
                ...filters,
                dateRange: [filters.dateRange[0], new Date(e.target.value)]
              })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            SKU
          </label>
          <input
            type="text"
            value={filters.sku || ''}
            onChange={(e) => onFiltersChange({
              ...filters,
              sku: e.target.value
            })}
            placeholder="Search by SKU"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Trigger
          </label>
          <select
            value={filters.trigger || ''}
            onChange={(e) => onFiltersChange({
              ...filters,
              trigger: e.target.value as PriceTrigger
            })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg"
          >
            <option value="">All Triggers</option>
            {triggers.map((trigger) => (
              <option key={trigger.value} value={trigger.value}>
                {trigger.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}