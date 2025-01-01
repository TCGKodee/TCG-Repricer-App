import React from 'react';
import { Settings, History, BarChart2, Book, DollarSign } from 'lucide-react';
import { ProductRulesDialog } from './ProductRulesDialog';
import { RepricingMenu } from './RepricingMenu';
import { useProductRulesStore } from '../../store/productRules';

interface ProductActionsProps {
  productId: string;
  onViewHistory?: () => void;
  onViewAnalytics?: () => void;
}

export function ProductActions({ productId, onViewHistory, onViewAnalytics }: ProductActionsProps) {
  const [showMenu, setShowMenu] = React.useState(false);
  const [showRules, setShowRules] = React.useState(false);
  const [showRepricing, setShowRepricing] = React.useState(false);
  const productRules = useProductRulesStore((state) => state.getProductRules(productId));

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <Settings className="h-5 w-5" />
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10">
          <div className="py-1">
            <button
              onClick={() => {
                setShowRepricing(true);
                setShowMenu(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <DollarSign className="h-4 w-4" />
              Reprice
            </button>
            <button
              onClick={() => {
                setShowRules(true);
                setShowMenu(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Book className="h-4 w-4" />
              Rules {productRules.length > 0 && `(${productRules.length})`}
            </button>
            {onViewHistory && (
              <button
                onClick={() => {
                  onViewHistory();
                  setShowMenu(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <History className="h-4 w-4" />
                View History
              </button>
            )}
            {onViewAnalytics && (
              <button
                onClick={() => {
                  onViewAnalytics();
                  setShowMenu(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <BarChart2 className="h-4 w-4" />
                Analytics
              </button>
            )}
          </div>
        </div>
      )}

      {showRules && (
        <ProductRulesDialog
          productId={productId}
          onClose={() => {
            setShowRules(false);
            setShowMenu(false);
          }}
        />
      )}

      {showRepricing && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10">
          <RepricingMenu
            productId={productId}
            onClose={() => {
              setShowRepricing(false);
              setShowMenu(false);
            }}
          />
        </div>
      )}
    </div>
  );
}