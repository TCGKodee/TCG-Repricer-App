import React from 'react';

interface SettingsInputProps {
  label: string;
  type: string;
  defaultValue: string | number;
  description?: string;
  onBlur?: (value: string) => void;
}

export function SettingsInput({ 
  label, 
  type, 
  defaultValue, 
  description,
  onBlur 
}: SettingsInputProps) {
  const [value, setValue] = React.useState(defaultValue);

  const handleBlur = () => {
    onBlur?.(value.toString());
  };

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        className="mt-1 block w-1/6 rounded-md 
          border-2 border-gray-300 dark:border-gray-600 
          bg-white dark:bg-gray-800 
          text-gray-900 dark:text-gray-100
          shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 
          dark:focus:border-blue-400 dark:focus:ring-blue-400
          dark:placeholder-gray-400"
      />
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      )}
    </div>
  );
}