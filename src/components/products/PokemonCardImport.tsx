import React from 'react';
import { Search, AlertTriangle } from 'lucide-react';
import { usePokemonCards } from '../../hooks/usePokemonCards';
import { useProductStore } from '../../store/products';
import { PokemonCardList } from './pokemon/PokemonCardList';
import { SetSelector } from './pokemon/SetSelector';
import { SearchInput } from '../ui/SearchInput';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';

export function PokemonCardImport() {
  const [query, setQuery] = React.useState('');
  const [selectedSet, setSelectedSet] = React.useState<string | null>(null);
  const { data, isLoading, error } = usePokemonCards(query, selectedSet);
  const { importPokemonCards, clearProducts } = useProductStore();
  const [showResetWarning, setShowResetWarning] = React.useState(false);

  const handleImport = (cards: any[]) => {
    if (showResetWarning) {
      clearProducts();
      importPokemonCards(cards);
      setShowResetWarning(false);
    } else {
      setShowResetWarning(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search Pokémon cards..."
          icon={<Search className="h-5 w-5 text-gray-400" />}
        />
        <SetSelector
          selectedSet={selectedSet}
          onSetSelect={setSelectedSet}
        />
      </div>

      {showResetWarning && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-yellow-600 dark:text-yellow-400">
              This will replace all existing products with the newly imported cards. Are you sure?
            </p>
            <div className="mt-3 flex gap-3">
              <button
                onClick={() => handleImport(data?.data || [])}
                className="text-sm bg-yellow-600 text-white px-3 py-1 rounded-md hover:bg-yellow-700"
              >
                Yes, Import and Replace
              </button>
              <button
                onClick={() => setShowResetWarning(false)}
                className="text-sm text-yellow-600 dark:text-yellow-400 hover:text-yellow-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center p-8">
          <LoadingSpinner />
        </div>
      )}

      {error && (
        <ErrorMessage message="Failed to fetch Pokémon cards" />
      )}

      {data && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Found {data.totalCount} cards
            </p>
            {data.data.length > 0 && !showResetWarning && (
              <button
                onClick={() => handleImport(data.data)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Import All Cards
              </button>
            )}
          </div>
          <PokemonCardList 
            cards={data.data}
            onImport={(card) => handleImport([card])}
          />
        </div>
      )}
    </div>
  );
}