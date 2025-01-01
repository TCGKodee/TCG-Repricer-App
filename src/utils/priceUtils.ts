import type { PokemonCard } from '../lib/pokemon/client';

export function getCardMarketPrice(card: PokemonCard): number {
  // Try TCGPlayer market price first
  const tcgPrice = card.tcgplayer?.prices?.holofoil?.market || 
                  card.tcgplayer?.prices?.normal?.market;
  
  if (tcgPrice) return tcgPrice;

  // Fallback to cardmarket price
  return card.cardmarket?.prices?.trendPrice || 0;
}

export function getCardLowPrice(card: PokemonCard): number {
  // Try TCGPlayer low price first
  const tcgPrice = card.tcgplayer?.prices?.holofoil?.low || 
                  card.tcgplayer?.prices?.normal?.low;
  
  if (tcgPrice) return tcgPrice;

  // Fallback to cardmarket price
  return card.cardmarket?.prices?.lowPrice || 0;
}

export function calculateMargin(sellingPrice: number, marketPrice: number): number {
  if (!marketPrice) return 0;
  return ((sellingPrice - marketPrice) / sellingPrice) * 100;
}