import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PriceChange } from '../components/history/types';

interface PriceHistoryState {
  changes: PriceChange[];
  isLoading: boolean;
  error: string | null;
  setChanges: (changes: PriceChange[]) => void;
  addChange: (change: PriceChange) => void;
  clearHistory: () => void;
}

export const usePriceHistoryStore = create<PriceHistoryState>()(
  persist(
    (set) => ({
      changes: [],
      isLoading: false,
      error: null,
      setChanges: (changes) => set({ changes }),
      addChange: (change) => set((state) => ({
        changes: [change, ...state.changes].sort(
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )
      })),
      clearHistory: () => set({ changes: [] }),
    }),
    {
      name: 'price-history-storage',
    }
  )
);