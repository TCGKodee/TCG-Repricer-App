import React from 'react';
import type { Product } from '../types';

interface CardInfoProps {
  product: Product;
}

export function CardInfo({ product }: CardInfoProps) {
  const { cardDetails } = product;
  if (!cardDetails) return null;

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">
        Card Information
      </h4>
      <div className="grid grid-cols-2 gap-4">
        {cardDetails.rarity && (
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Rarity</span>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {cardDetails.rarity}
            </p>
          </div>
        )}
        {cardDetails.artist && (
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Artist</span>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {cardDetails.artist}
            </p>
          </div>
        )}
        {cardDetails.setName && (
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Set</span>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {cardDetails.setName}
            </p>
          </div>
        )}
        {cardDetails.setNumber && (
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Card Number</span>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {cardDetails.setNumber}
            </p>
          </div>
        )}
        {cardDetails.regulationMark && (
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Regulation Mark</span>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {cardDetails.regulationMark}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}