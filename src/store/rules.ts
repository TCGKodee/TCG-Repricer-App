import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockRules } from '../data/mockRules';
import type { Rule } from '../components/rules/types';

interface RuleState {
  rules: Rule[];
  setRules: (rules: Rule[]) => void;
  updateRule: (id: string, updates: Partial<Rule>) => void;
  deleteRule: (id: string) => void;
  addRule: (rule: Rule) => void;
}

export const useRuleStore = create<RuleState>()(
  persist(
    (set) => ({
      rules: mockRules, // Initialize with mock rules
      setRules: (rules) => set({ rules }),
      updateRule: (id, updates) => set((state) => ({
        rules: state.rules.map((rule) =>
          rule.id === id ? { ...rule, ...updates } : rule
        ),
      })),
      deleteRule: (id) => set((state) => ({
        rules: state.rules.filter((rule) => rule.id !== id),
      })),
      addRule: (rule) => set((state) => ({
        rules: [...state.rules, rule],
      })),
    }),
    {
      name: 'rules-storage',
    }
  )
);