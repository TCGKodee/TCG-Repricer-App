export interface PokemonRarity {
  id: string;
  name: string;
}

export const POKEMON_RARITIES: PokemonRarity[] = [
  { id: 'common', name: 'Common' },
  { id: 'uncommon', name: 'Uncommon' },
  { id: 'rare', name: 'Rare' },
  { id: 'rareHolo', name: 'Rare Holo' },
  { id: 'rareUltra', name: 'Ultra Rare' },
  { id: 'rareSecret', name: 'Secret Rare' },
  { id: 'rareRainbow', name: 'Rainbow Rare' },
  { id: 'rareGold', name: 'Gold Rare' },
  { id: 'rareSIR', name: 'Special Illustration Rare' },
  { id: 'rareHyper', name: 'Hyper Rare' },
  { id: 'rareArt', name: 'Art Rare' }
];