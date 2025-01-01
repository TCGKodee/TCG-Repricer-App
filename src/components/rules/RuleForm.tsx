import React from 'react';
import type { Rule, RuleType } from './types';

interface RuleFormProps {
  initialData?: Partial<Rule>;
  onSubmit: (data: Partial<Rule>) => void;
  onCancel: () => void;
}

const ruleTypes: { value: RuleType; label: string }[] = [
  { value: 'fixed_price', label: 'Fixed Price' },
  { value: 'beat_competitor', label: 'Beat Competitor' },
  { value: 'match_competitor', label: 'Match Competitor' },
  { value: 'buy_box', label: 'Buy Box Strategy' },
  { value: 'inventory_based', label: 'Inventory Based' },
  { value: 'profit_margin', label: 'Profit Margin' },
];

export function RuleForm({ initialData, onSubmit, onCancel }: RuleFormProps) {
  const [formData, setFormData] = React.useState<Partial<Rule>>(initialData || {});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Rule Name
        </label>
        <input
          type="text"
          value={formData.name || ''}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Rule Type
        </label>
        <select
          value={formData.type || ''}
          onChange={(e) => setFormData({ ...formData, type: e.target.value as RuleType })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg"
          required
        >
          <option value="">Select a type</option>
          {ruleTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Priority
        </label>
        <input
          type="number"
          value={formData.priority || ''}
          onChange={(e) => setFormData({ ...formData, priority: Number(e.target.value) })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg"
          min="1"
          required
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save Rule
        </button>
      </div>
    </form>
  );
}