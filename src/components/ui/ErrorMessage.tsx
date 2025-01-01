import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
      <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
        <AlertCircle className="h-5 w-5" />
        <span className="font-medium">{message}</span>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 flex items-center gap-1 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </button>
      )}
    </div>
  );
}