import React from 'react';
import { Switch } from '../ui/Switch';
import { Settings2, Trash2 } from 'lucide-react';
import type { Rule } from './types';

interface RuleCardProps {
  rule: Rule;
  onEdit: (rule: Rule) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string, enabled: boolean) => void;
}

export function RuleCard({ rule, onEdit, onDelete, onToggle }: RuleCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {rule.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Priority: {rule.priority}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            checked={rule.enabled}
            onCheckedChange={(checked) => onToggle(rule.id, checked)}
          />
          <button
            onClick={() => onEdit(rule)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <Settings2 className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
          <button
            onClick={() => onDelete(rule.id)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <Trash2 className="h-5 w-5 text-red-500" />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-sm">
          <span className="font-medium">Type: </span>
          <span className="text-gray-600 dark:text-gray-300">
            {rule.type.replace('_', ' ').toUpperCase()}
          </span>
        </div>
        {rule.schedule?.active && (
          <div className="text-sm">
            <span className="font-medium">Schedule: </span>
            <span className="text-gray-600 dark:text-gray-300">
              {rule.schedule.startTime} - {rule.schedule.endTime}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}