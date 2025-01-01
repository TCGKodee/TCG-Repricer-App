import React from 'react';
import { Plus } from 'lucide-react';
import { RuleCard } from '../components/rules/RuleCard';
import { RuleForm } from '../components/rules/RuleForm';
import type { Rule } from '../components/rules/types';

const mockRules: Rule[] = [
  {
    id: '1',
    name: 'Beat Competitor Price',
    type: 'beat_competitor',
    enabled: true,
    conditions: [
      {
        type: 'price',
        operator: 'gt',
        value: 10,
      },
    ],
    actions: [
      {
        type: 'adjust_price',
        value: 0.01,
        unit: 'fixed',
      },
    ],
    priority: 1,
  },
  // Add more mock rules as needed
];

export default function Rules() {
  const [rules, setRules] = React.useState<Rule[]>(mockRules);
  const [showForm, setShowForm] = React.useState(false);
  const [editingRule, setEditingRule] = React.useState<Rule | null>(null);

  const handleSubmit = (data: Partial<Rule>) => {
    if (editingRule) {
      setRules(rules.map((rule) => 
        rule.id === editingRule.id ? { ...rule, ...data } : rule
      ));
    } else {
      setRules([...rules, { ...data, id: Date.now().toString() } as Rule]);
    }
    setShowForm(false);
    setEditingRule(null);
  };

  const handleDelete = (id: string) => {
    setRules(rules.filter((rule) => rule.id !== id));
  };

  const handleToggle = (id: string, enabled: boolean) => {
    setRules(rules.map((rule) =>
      rule.id === id ? { ...rule, enabled } : rule
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Repricing Rules
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Add Rule
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium mb-4">
            {editingRule ? 'Edit Rule' : 'Create New Rule'}
          </h2>
          <RuleForm
            initialData={editingRule || undefined}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingRule(null);
            }}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rules.map((rule) => (
          <RuleCard
            key={rule.id}
            rule={rule}
            onEdit={(rule) => {
              setEditingRule(rule);
              setShowForm(true);
            }}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  );
}