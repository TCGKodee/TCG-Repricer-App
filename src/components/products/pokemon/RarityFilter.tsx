import React from 'react';
import { POKEMON_RARITIES } from '../../../lib/pokemon/types';

interface RarityFilterProps {
  selectedRarity: string | null;
  onRaritySelect: (rarity: string | null) => void;
}

export function RarityFilter({ selectedRarity, onRaritySelect }: RarityFilterProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Card Rarity
      </label>
      <select
        value={selectedRarity || ''}
        onChange={(e) => onRaritySelect(e.target.value || null)}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      >
        <option value="">All Rarities</option>
        {POKEMON_RARITIES.map((rarity) => (
          <option key={rarity.id} value={rarity.id}>
            {rarity.name}
          </option>
        ))}
      </select>
    </div>
  );
}