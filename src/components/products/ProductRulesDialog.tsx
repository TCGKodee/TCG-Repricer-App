import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { useRuleStore } from '../../store/rules';
import { useProductRulesStore } from '../../store/productRules';
import type { Rule } from '../rules/types';

interface ProductRulesDialogProps {
  productId: string;
  onClose: () => void;
}

export function ProductRulesDialog({ productId, onClose }: ProductRulesDialogProps) {
  const rules = useRuleStore((state) => state.rules);
  const productRules = useProductRulesStore((state) => state.getProductRules(productId));
  const setProductRules = useProductRulesStore((state) => state.setProductRules);
  
  const [selected, setSelected] = React.useState<string[]>(
    productRules.map(rule => rule.id)
  );

  const handleRuleToggle = (ruleId: string) => {
    setSelected(prev => 
      prev.includes(ruleId)
        ? prev.filter(id => id !== ruleId)
        : [...prev, ruleId]
    );
  };

  const handleSave = () => {
    const selectedRuleObjects = rules.filter(rule => selected.includes(rule.id));
    setProductRules(productId, selectedRuleObjects);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-medium">Select Rules</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          {rules.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No rules available. Create rules in the Repricing Rules section.
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {rules.map(rule => (
                <label
                  key={rule.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(rule.id)}
                    onChange={() => handleRuleToggle(rule.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {rule.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Priority: {rule.priority} | Type: {rule.type.replace('_', ' ')}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Rules
          </button>
        </div>
      </div>
    </div>
  );
}