import React from 'react';

interface SettingsSelectProps {
  label: string;
  options: { value: string; label: string }[];
  defaultValue: string;
  description?: string;
  onChange?: (value: string) => void;
}

export function SettingsSelect({ 
  label, 
  options, 
  defaultValue, 
  description,
  onChange 
}: SettingsSelectProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <select
        defaultValue={defaultValue}
        onChange={(e) => onChange?.(e.target.value)}
        className="mt-1 block w-1/6 rounded-md 
          border-2 border-gray-300 dark:border-gray-600 
          bg-white dark:bg-gray-800 
          text-gray-900 dark:text-gray-100
          shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 
          dark:focus:border-blue-400 dark:focus:ring-blue-400"
      >
        {options.map(option => (
          <option key={option.value} value={option.value} 
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            {option.label}
          </option>
        ))}
      </select>
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      )}
    </div>
  );
}