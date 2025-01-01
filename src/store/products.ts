import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PokemonTcgClient } from '../lib/pokemon/client';
import { getCardMarketPrice, getCardLowPrice, calculateMargin } from '../utils/priceUtils';
import type { Product } from '../components/products/types';
import type { PokemonCard } from '../lib/pokemon/client';

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  setProducts: (products: Product[]) => void;
  clearProducts: () => void;
  importPokemonCards: (cards: PokemonCard[]) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

const pokemonClient = new PokemonTcgClient();

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: [],
      isLoading: false,
      error: null,

      setProducts: (products) => set({ products }),
      
      clearProducts: () => set({ products: [] }),

      importPokemonCards: (cards) => {
        const currentProducts = get().products;
        const newProducts: Product[] = cards.map(card => {
          const marketPrice = getCardMarketPrice(card);
          const lowPrice = getCardLowPrice(card);
          const currentPrice = marketPrice || lowPrice;
          
          return {
            id: card.id,
            name: card.name,
            sku: `PKM-${card.set.series}-${card.number}`,
            category: 'pokemon',
            currentPrice,
            targetPrice: marketPrice,
            marketPrice,
            competitorPrice: lowPrice,
            stock: 0,
            status: 'active',
            buyBoxStatus: currentPrice <= lowPrice ? 'winning' : 'losing',
            margin: calculateMargin(currentPrice, marketPrice),
            lastUpdated: new Date().toISOString(),
            imageUrl: card.images.small,
            cardDetails: {
              rarity: card.rarity,
              artist: card.artist,
              setName: card.set.name,
              setNumber: card.number,
              regulationMark: card.regulationMark,
              attributes: {
                weakness: card.weaknesses?.[0]?.type,
                resistance: card.resistances?.[0]?.type,
                retreatCost: card.retreatCost?.length || 0
              },
              attacks: card.attacks?.map(attack => ({
                name: attack.name,
                cost: attack.cost,
                damage: attack.damage,
                description: attack.text
              }))
            }
          };
        });

        // Merge new products with existing ones, avoiding duplicates
        const mergedProducts = [...currentProducts];
        
        newProducts.forEach(newProduct => {
          const existingIndex = mergedProducts.findIndex(p => p.id === newProduct.id);
          if (existingIndex === -1) {
            // Add new product if it doesn't exist
            mergedProducts.push(newProduct);
          } else {
            // Update existing product with new data while preserving stock and status
            mergedProducts[existingIndex] = {
              ...mergedProducts[existingIndex],
              ...newProduct,
              stock: mergedProducts[existingIndex].stock,
              status: mergedProducts[existingIndex].status
            };
          }
        });

        set({ products: mergedProducts });
      },

      updateProduct: (id, updates) => set((state) => ({
        products: state.products.map((product) =>
          product.id === id ? { ...product, ...updates } : product
        ),
      })),

      deleteProduct: (id) => set((state) => ({
        products: state.products.filter((product) => product.id !== id),
      })),
    }),
    {
      name: 'product-storage', // Storage key in localStorage
      version: 1, // Version number for migrations if needed
      partialize: (state) => ({ products: state.products }), // Only persist products array
    }
  )
);