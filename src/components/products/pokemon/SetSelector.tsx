import React from 'react';
import { POKEMON_SETS } from '../../../lib/pokemon/sets';

interface SetSelectorProps {
  selectedSet: string | null;
  onSetSelect: (setId: string) => void;
}

export function SetSelector({ selectedSet, onSetSelect }: SetSelectorProps) {
  // Group sets by series
  const groupedSets = POKEMON_SETS.reduce((acc, set) => {
    if (!acc[set.series]) {
      acc[set.series] = [];
    }
    acc[set.series].push(set);
    return acc;
  }, {} as Record<string, typeof POKEMON_SETS[number][]>);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Select Set
      </label>
      <select
        value={selectedSet || ''}
        onChange={(e) => onSetSelect(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      >
        <option value="">All Sets</option>
        {Object.entries(groupedSets).map(([series, sets]) => (
          <optgroup key={series} label={series}>
            {sets.map((set) => (
              <option key={set.id} value={set.id}>
                {set.name} ({set.totalCards} cards)
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}