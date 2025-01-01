import { POKEMON_TCG_API_KEY } from '../config';

export interface PokemonCard {
  id: string;
  name: string;
  number: string;
  rarity: string;
  images: {
    small: string;
    large: string;
  };
  cardmarket: {
    prices: {
      averageSellPrice: number;
      lowPrice: number;
      trendPrice: number;
    };
  };
  tcgplayer?: {
    prices?: {
      normal?: {
        market: number;
        low: number;
      };
      holofoil?: {
        market: number;
        low: number;
      };
    };
  };
  set: {
    id: string;
    name: string;
    series: string;
  };
}

export class PokemonTcgClient {
  private baseUrl = 'https://api.pokemontcg.io/v2';
  private headers: HeadersInit = {
    'X-Api-Key': POKEMON_TCG_API_KEY
  };

  async searchCards(params: { 
    query?: string; 
    setId?: string; 
    rarity?: string;
    page?: number; 
    pageSize?: number; 
  }): Promise<{ data: PokemonCard[]; totalCount: number }> {
    try {
      const { query, setId, rarity, page = 1, pageSize = 20 } = params;
      
      // Build search query
      const queryParts = [];
      if (query) queryParts.push(`name:"${query}*"`);
      if (setId) queryParts.push(`set.id:${setId}`);
      if (rarity) queryParts.push(`rarity:"${rarity}"`);
      
      const url = new URL(`${this.baseUrl}/cards`);
      if (queryParts.length > 0) {
        url.searchParams.append('q', queryParts.join(' '));
      }
      url.searchParams.append('page', page.toString());
      url.searchParams.append('pageSize', pageSize.toString());
      url.searchParams.append('orderBy', 'number');

      const response = await fetch(url.toString(), { 
        headers: this.headers,
        // Add cache control headers
        cache: 'no-cache'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch cards');
      }

      const data = await response.json();
      return {
        data: data.data,
        totalCount: data.totalCount || 0
      };
    } catch (error) {
      console.error('Failed to fetch cards:', error);
      throw error;
    }
  }
}