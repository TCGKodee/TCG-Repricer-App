import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { Rule, RuleCondition, RuleAction } from '../rules/types';

interface CustomRuleBuilderProps {
  onSave: (rule: Rule) => void;
}

export function CustomRuleBuilder({ onSave }: CustomRuleBuilderProps) {
  const [name, setName] = React.useState('');
  const [conditions, setConditions] = React.useState<RuleCondition[]>([]);
  const [actions, setActions] = React.useState<RuleAction[]>([]);

  const handleAddCondition = () => {
    setConditions([
      ...conditions,
      { type: 'price', operator: 'gt', value: 0 }
    ]);
  };

  const handleAddAction = () => {
    setActions([
      ...actions,
      { type: 'set_price', value: 0, unit: 'fixed' }
    ]);
  };

  const handleSave = () => {
    if (!name || conditions.length === 0 || actions.length === 0) return;

    const newRule: Rule = {
      id: Date.now().toString(),
      name,
      type: 'custom',
      enabled: true,
      conditions,
      actions,
      priority: 1
    };

    onSave(newRule);
    setName('');
    setConditions([]);
    setActions([]);
  };

  return (
    <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Rule Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          placeholder="Enter rule name"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Conditions</h3>
          <button
            onClick={handleAddCondition}
            className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400"
          >
            <Plus className="h-4 w-4" />
            Add Condition
          </button>
        </div>
        <div className="space-y-2">
          {conditions.map((condition, index) => (
            <div key={index} className="flex items-center gap-2">
              <select
                value={condition.type}
                onChange={(e) => {
                  const newConditions = [...conditions];
                  newConditions[index] = {
                    ...condition,
                    type: e.target.value as RuleCondition['type']
                  };
                  setConditions(newConditions);
                }}
                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="price">Price</option>
                <option value="inventory">Inventory</option>
                <option value="competitor">Competitor</option>
                <option value="sales_velocity">Sales Velocity</option>
              </select>
              <select
                value={condition.operator}
                onChange={(e) => {
                  const newConditions = [...conditions];
                  newConditions[index] = {
                    ...condition,
                    operator: e.target.value as RuleCondition['operator']
                  };
                  setConditions(newConditions);
                }}
                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="gt">Greater Than</option>
                <option value="lt">Less Than</option>
                <option value="eq">Equal To</option>
                <option value="gte">Greater Than or Equal</option>
                <option value="lte">Less Than or Equal</option>
              </select>
              <input
                type="number"
                value={condition.value as number}
                onChange={(e) => {
                  const newConditions = [...conditions];
                  newConditions[index] = {
                    ...condition,
                    value: parseFloat(e.target.value)
                  };
                  setConditions(newConditions);
                }}
                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              <button
                onClick={() => {
                  setConditions(conditions.filter((_, i) => i !== index));
                }}
                className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Actions</h3>
          <button
            onClick={handleAddAction}
            className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400"
          >
            <Plus className="h-4 w-4" />
            Add Action
          </button>
        </div>
        <div className="space-y-2">
          {actions.map((action, index) => (
            <div key={index} className="flex items-center gap-2">
              <select
                value={action.type}
                onChange={(e) => {
                  const newActions = [...actions];
                  newActions[index] = {
                    ...action,
                    type: e.target.value as RuleAction['type']
                  };
                  setActions(newActions);
                }}
                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="set_price">Set Price</option>
                <option value="adjust_price">Adjust Price</option>
                <option value="match_price">Match Price</option>
              </select>
              <input
                type="number"
                value={action.value as number}
                onChange={(e) => {
                  const newActions = [...actions];
                  newActions[index] = {
                    ...action,
                    value: parseFloat(e.target.value)
                  };
                  setActions(newActions);
                }}
                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              <select
                value={action.unit}
                onChange={(e) => {
                  const newActions = [...actions];
                  newActions[index] = {
                    ...action,
                    unit: e.target.value as 'fixed' | 'percentage'
                  };
                  setActions(newActions);
                }}
                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="fixed">Fixed</option>
                <option value="percentage">Percentage</option>
              </select>
              <button
                onClick={() => {
                  setActions(actions.filter((_, i) => i !== index));
                }}
                className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={!name || conditions.length === 0 || actions.length === 0}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save Rule
        </button>
      </div>
    </div>
  );
}