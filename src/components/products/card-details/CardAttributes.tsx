import React from 'react';
import type { Product } from '../types';

interface CardAttributesProps {
  product: Product;
}

export function CardAttributes({ product }: CardAttributesProps) {
  const { cardDetails } = product;
  if (!cardDetails?.attributes) return null;

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">
        Card Attributes
      </h4>
      <div className="grid grid-cols-3 gap-4">
        {cardDetails.attributes.weakness && (
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Weakness</span>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {cardDetails.attributes.weakness}
            </p>
          </div>
        )}
        {cardDetails.attributes.resistance && (
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Resistance</span>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {cardDetails.attributes.resistance}
            </p>
          </div>
        )}
        {cardDetails.attributes.retreatCost !== undefined && (
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Retreat Cost</span>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {cardDetails.attributes.retreatCost}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}