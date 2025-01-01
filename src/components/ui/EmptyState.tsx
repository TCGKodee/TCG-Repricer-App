import React from 'react';
import { FileQuestion } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ title, message, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <FileQuestion className="h-12 w-12 text-gray-400 dark:text-gray-600 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {message}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}