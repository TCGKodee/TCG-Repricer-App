import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { useRuleStore } from '../../store/rules';
import type { Rule } from '../rules/types';

interface ProductRulesProps {
  productId: string;
  selectedRules: Rule[];
  onClose: () => void;
  onSave: (rules: Rule[]) => void;
}

export function ProductRules({ productId, selectedRules, onClose, onSave }: ProductRulesProps) {
  const rules = useRuleStore((state) => state.rules);
  const [selected, setSelected] = React.useState<string[]>(
    selectedRules.map(rule => rule.id)
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
    onSave(selectedRuleObjects);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <AlertCircle className="h-4 w-4" />
          <span>Select rules to apply</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {rules.length === 0 ? (
        <div className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
          No rules available. Create rules in Listing Rules settings.
        </div>
      ) : (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {rules.map(rule => (
            <label key={rule.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={selected.includes(rule.id)}
                onChange={() => handleRuleToggle(rule.id)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {rule.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Priority: {rule.priority} | Type: {rule.type.replace('_', ' ')}
                </div>
              </div>
            </label>
          ))}
        </div>
      )}

      <div className="flex justify-end pt-2 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save Rules
        </button>
      </div>
    </div>
  );
}