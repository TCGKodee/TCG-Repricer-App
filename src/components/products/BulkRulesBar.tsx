import React from 'react';
import { Book, X } from 'lucide-react';
import { useRuleStore } from '../../store/rules';
import type { Rule } from '../rules/types';

interface BulkRulesBarProps {
  selectedProducts: string[];
  onClose: () => void;
  onApplyRules: (productIds: string[], rules: Rule[]) => void;
}

export function BulkRulesBar({ selectedProducts, onClose, onApplyRules }: BulkRulesBarProps) {
  const rules = useRuleStore((state) => state.rules);
  const [selectedRules, setSelectedRules] = React.useState<string[]>([]);

  const handleRuleToggle = (ruleId: string) => {
    setSelectedRules(prev => 
      prev.includes(ruleId) 
        ? prev.filter(id => id !== ruleId)
        : [...prev, ruleId]
    );
  };

  const handleApply = () => {
    const rulesToApply = rules.filter(rule => selectedRules.includes(rule.id));
    onApplyRules(selectedProducts, rulesToApply);
    onClose();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {selectedProducts.length} items selected
          </span>

          <div className="flex items-center gap-2">
            {rules.map(rule => (
              <label key={rule.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedRules.includes(rule.id)}
                  onChange={() => handleRuleToggle(rule.id)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{rule.name}</span>
              </label>
            ))}
          </div>

          <button
            onClick={handleApply}
            disabled={selectedRules.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Book className="h-4 w-4" />
            Apply Rules
          </button>
        </div>

        <button
          onClick={onClose}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}