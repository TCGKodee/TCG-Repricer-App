import React from 'react';
import { Download } from 'lucide-react';
import { PriceChangeTable } from '../components/history/PriceChangeTable';
import { HistoryFilters } from '../components/history/HistoryFilters';
import { PriceChangeDetails } from '../components/history/PriceChangeDetails';
import { usePriceHistoryStore } from '../store/priceHistory';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import type { PriceChange, HistoryFilters as Filters } from '../components/history/types';

export default function History() {
  const { changes, isLoading } = usePriceHistoryStore();
  const [selectedChange, setSelectedChange] = React.useState<PriceChange | null>(null);
  const [filters, setFilters] = React.useState<Filters>({
    dateRange: [new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()],
  });

  // Filter changes based on current filters
  const filteredChanges = React.useMemo(() => {
    return changes.filter(change => {
      const date = new Date(change.timestamp);
      const matchesDateRange = date >= filters.dateRange[0] && date <= filters.dateRange[1];
      const matchesSku = !filters.sku || change.sku.toLowerCase().includes(filters.sku.toLowerCase());
      const matchesTrigger = !filters.trigger || change.trigger === filters.trigger;
      
      return matchesDateRange && matchesSku && matchesTrigger;
    });
  }, [changes, filters]);

  const handleExport = () => {
    const csv = [
      ['Product', 'SKU', 'Old Price', 'New Price', 'Change %', 'Trigger', 'Time'].join(','),
      ...filteredChanges.map(change => [
        `"${change.productName}"`,
        change.sku,
        change.oldPrice.toFixed(2),
        change.newPrice.toFixed(2),
        ((change.newPrice - change.oldPrice) / change.oldPrice * 100).toFixed(2) + '%',
        change.trigger,
        new Date(change.timestamp).toLocaleString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `price-history-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Price Change History
        </h1>
        <button
          onClick={handleExport}
          disabled={filteredChanges.length === 0}
          className="flex items-center gap-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
        >
          <Download className="h-5 w-5" />
          Export
        </button>
      </div>

      <HistoryFilters
        filters={filters}
        onFiltersChange={setFilters}
      />

      {isLoading ? (
        <div className="flex justify-center p-8">
          <LoadingSpinner />
        </div>
      ) : filteredChanges.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center text-gray-500 dark:text-gray-400">
          No price changes found for the selected filters.
        </div>
      ) : (
        <PriceChangeTable
          changes={filteredChanges}
          onViewDetails={setSelectedChange}
        />
      )}

      {selectedChange && (
        <PriceChangeDetails
          change={selectedChange}
          onClose={() => setSelectedChange(null)}
        />
      )}
    </div>
  );
}