import React from 'react';
import { PokemonCardItem } from './PokemonCardItem';
import type { PokemonCard } from '../../../lib/pokemon/client';

interface PokemonCardListProps {
  cards: PokemonCard[];
  onImport: (card: PokemonCard) => void;
}

export function PokemonCardList({ cards, onImport }: PokemonCardListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {cards.map(card => (
        <PokemonCardItem
          key={card.id}
          card={card}
          onImport={onImport}
        />
      ))}
    </div>
  );
}