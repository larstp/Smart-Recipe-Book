import type { Recipe } from '../../services/models/index';

export const CATEGORY_STYLES: Record<string, string> = {
  dinner: 'bg-purple-100 text-purple-700',
  lunch: 'bg-orange-100 text-orange-700',
  breakfast: 'bg-blue-100 text-blue-700',
  snack: 'bg-green-100 text-green-700',
  dessert: 'bg-pink-100 text-pink-700',
  drink: 'bg-cyan-100 text-cyan-700',
};

export const DIFFICULTY_VARIANTS: Record<
  Recipe['difficulty'],
  'success' | 'warning' | 'destructive'
> = {
  easy: 'success',
  medium: 'warning',
  hard: 'destructive',
};
