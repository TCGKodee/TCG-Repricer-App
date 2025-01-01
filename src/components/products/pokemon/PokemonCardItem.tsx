import React from 'react';
import { Plus, DollarSign, TrendingUp } from 'lucide-react';
import type { PokemonCard } from '../../../lib/pokemon/client';
import { getCardMarketPrice, getCardLowPrice } from '../../../utils/priceUtils';

interface PokemonCardItemProps {
  card: PokemonCard;
  onImport: (card: PokemonCard) => void;
}

export function PokemonCardItem({ card, onImport }: PokemonCardItemProps) {
  const marketPrice = getCardMarketPrice(card);
  const lowPrice = getCardLowPrice(card);
  const [showLargeImage, setShowLargeImage] = React.useState(false);

  return (
    <div className="relative group">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative">
          <img 
            src={card.images.small} 
            alt={card.name}
            className="w-full h-auto object-contain transform transition-transform group-hover:scale-105"
            loading="lazy"
            onMouseEnter={() => setShowLargeImage(true)}
            onMouseLeave={() => setShowLargeImage(false)}
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              onClick={() => onImport(card)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              Import Card
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2 truncate" title={card.name}>
            {card.name}
          </h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <DollarSign className="h-4 w-4" />
              <span>Market: ${marketPrice.toFixed(2)}</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <TrendingUp className="h-4 w-4" />
              <span>Low: ${lowPrice.toFixed(2)}</span>
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-400">
              {card.set.name} · #{card.number} · {card.rarity}
            </div>
          </div>
        </div>
      </div>

      {/* Large image popup on hover */}
      {showLargeImage && (
        <div className="absolute z-50 left-full ml-4 top-0 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 transform transition-transform origin-left">
          <img 
            src={card.images.large} 
            alt={card.name}
            className="w-[300px] h-auto rounded"
          />
        </div>
      )}
    </div>
  );
}