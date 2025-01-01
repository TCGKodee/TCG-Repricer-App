import React from 'react';
import type { Product } from '../types';

interface CardAttacksProps {
  product: Product;
}

export function CardAttacks({ product }: CardAttacksProps) {
  const { cardDetails } = product;
  if (!cardDetails?.attacks?.length) return null;

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">
        Attacks
      </h4>
      <div className="space-y-4">
        {cardDetails.attacks.map((attack, index) => (
          <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {attack.name}
              </span>
              {attack.damage && (
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {attack.damage}
                </span>
              )}
            </div>
            {attack.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {attack.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}