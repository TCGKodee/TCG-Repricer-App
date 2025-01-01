import React from 'react';
import { PokemonCardImport } from '../components/products/pokemon/PokemonCardImport';

export default function ImportCards() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Import Cards
        </h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <PokemonCardImport />
      </div>
    </div>
  );
}