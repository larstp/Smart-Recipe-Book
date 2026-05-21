import type { Recipe } from '../../services/models/index';

export const CATEGORY_STYLES: Record<Recipe['category'], string> = {
  Breakfast: 'bg-blue-100 text-blue-700',
  Lunch: 'bg-orange-100 text-orange-700',
  Snack: 'bg-yellow-100 text-yellow-700',
  Dinner: 'bg-purple-100 text-purple-700',
  Dessert: 'bg-red-100 text-red-700',
  Drink: 'bg-green-100 text-green-700',
};

export const DIFFICULTY_VARIANTS: Record<
  Recipe['difficulty'],
  'success' | 'warning' | 'destructive'
> = {
  Easy: 'success',
  Medium: 'warning',
  Hard: 'destructive',
};
