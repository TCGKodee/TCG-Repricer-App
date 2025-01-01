import React from 'react';
import { X } from 'lucide-react';
import { debounce } from '../../utils/searchUtils';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
}

export function SearchInput({ 
  value, 
  onChange, 
  placeholder, 
  icon,
  suggestions = [],
  onSuggestionClick 
}: SearchInputProps) {
  const [isFocused, setIsFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const debouncedOnChange = React.useMemo(
    () => debounce((value: string) => onChange(value), 300),
    [onChange]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    debouncedOnChange(newValue);
  };

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      onChange('');
    }
  };

  return (
    <div className="relative">
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <input
          ref={inputRef}
          type="text"
          defaultValue={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={placeholder}
          className={`w-full ${icon ? 'pl-10' : 'pl-3'} pr-10 py-2 
            border border-gray-300 dark:border-gray-700 
            rounded-lg bg-white dark:bg-gray-800 
            text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            dark:focus:ring-blue-400 dark:focus:border-blue-400`}
        />
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Suggestions dropdown */}
      {isFocused && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick?.(suggestion)}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}