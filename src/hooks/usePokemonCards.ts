import { useQuery } from '@tanstack/react-query';
import { PokemonTcgClient } from '../lib/pokemon/client';

interface PokemonCardsParams {
  query: string;
  setId?: string | null;
  rarity?: string | null;
  page?: number;
  pageSize?: number;
}

const pokemonClient = new PokemonTcgClient();

export function usePokemonCards({
  query,
  setId,
  rarity,
  page = 1,
  pageSize = 20
}: PokemonCardsParams) {
  return useQuery({
    queryKey: ['pokemon-cards', query, setId, rarity, page, pageSize],
    queryFn: () => pokemonClient.searchCards({
      query,
      setId: setId || undefined,
      rarity: rarity || undefined,
      page,
      pageSize
    }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    keepPreviousData: true, // Keep previous data while fetching new data
    retry: 2,
    enabled: Boolean(query) || Boolean(setId) || Boolean(rarity)
  });
}