```typescript
import React from 'react';
import { createPortal } from 'react-dom';
import { X, AlertCircle, CheckCircle } from 'lucide-react';
import { useStockImport } from '../../hooks/useStockImport';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import type { ImportResult, IntegrationConfig } from '../../lib/integrations/types';

interface StockImportModalProps {
  config: IntegrationConfig;
  onClose: () => void;
}

export function StockImportModal({ config, onClose }: StockImportModalProps) {
  const { importStock, isImporting, error } = useStockImport();
  const [result, setResult] = React.useState<ImportResult | null>(null);

  const handleImport = async () => {
    try {
      const importResult = await importStock(config);
      setResult(importResult);
    } catch (err) {
      // Error is handled by the hook
    }
  };

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Import Stock from {config.type === 'shopify' ? 'Shopify' : 'Wix'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {error && (
            <div className="p-3 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {result ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle className="h-5 w-5" />
                <span>Successfully updated {result.updatedCount} products</span>
              </div>

              {result.errors.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Errors ({result.errors.length})
                  </h3>
                  <div className="max-h-40 overflow-y-auto space-y-2">
                    {result.errors.map((error, index) => (
                      <div key={index} className="text-sm text-red-600 dark:text-red-400">
                        {error.sku}: {error.message}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                This will import and update stock levels for all products from your {config.type === 'shopify' ? 'Shopify' : 'Wix'} store.
              </p>
              <button
                onClick={handleImport}
                disabled={isImporting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2 mx-auto"
              >
                {isImporting ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Importing...
                  </>
                ) : (
                  'Start Import'
                )}
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
```