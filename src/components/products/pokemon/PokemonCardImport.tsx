import React from 'react';
import { Search } from 'lucide-react';
import { usePokemonCards } from '../../../hooks/usePokemonCards';
import { useProductStore } from '../../../store/products';
import { PokemonCardList } from './PokemonCardList';
import { SetSelector } from './SetSelector';
import { RarityFilter } from './RarityFilter';
import { SearchInput } from '../../ui/SearchInput';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { ErrorMessage } from '../../ui/ErrorMessage';
import { Pagination } from '../../ui/Pagination';
import type { PokemonCard } from '../../../lib/pokemon/client';

export function PokemonCardImport() {
  const [query, setQuery] = React.useState('');
  const [selectedSet, setSelectedSet] = React.useState<string | null>(null);
  const [selectedRarity, setSelectedRarity] = React.useState<string | null>(null);
  const [page, setPage] = React.useState(1);
  const pageSize = 20;

  const { data, isLoading, error } = usePokemonCards({
    query,
    setId: selectedSet,
    rarity: selectedRarity,
    page,
    pageSize
  });

  const { importPokemonCards } = useProductStore();

  // Reset page when filters change
  React.useEffect(() => {
    setPage(1);
  }, [query, selectedSet, selectedRarity]);

  const handleImport = (cards: PokemonCard[]) => {
    importPokemonCards(cards);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Search Cards
          </label>
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search Pokémon cards..."
            icon={<Search className="h-5 w-5 text-gray-400" />}
          />
        </div>

        <SetSelector
          selectedSet={selectedSet}
          onSetSelect={setSelectedSet}
        />

        <RarityFilter
          selectedRarity={selectedRarity}
          onRaritySelect={setSelectedRarity}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center p-8">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <ErrorMessage message="Failed to fetch Pokémon cards" />
      ) : data?.data.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center text-gray-500 dark:text-gray-400">
          No cards found matching your criteria.
        </div>
      ) : data ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Found {data.totalCount} cards
            </p>
          </div>

          <PokemonCardList 
            cards={data.data}
            onImport={(card) => handleImport([card])}
          />

          {data.totalCount > pageSize && (
            <Pagination
              currentPage={page}
              totalPages={Math.ceil(data.totalCount / pageSize)}
              onPageChange={setPage}
            />
          )}
        </div>
      ) : null}
    </div>
  );
}