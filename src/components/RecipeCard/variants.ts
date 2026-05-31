import type { PantryItem, Recipe } from '../../services/models/index';

export const RECIPE_CATEGORY_STYLES: Record<Recipe['category'], string> = {
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

export const PANTRY_CATEGORY_STYLES: Record<PantryItem['category'], string> = {
  produce: 'bg-blue-100 text-blue-700',
  dairy: 'bg-orange-100 text-orange-700',
  protein: 'bg-yellow-100 text-yellow-700',
  grain: 'bg-purple-100 text-purple-700',
  spice: 'bg-pink-100 text-pink-700',
  condiment: 'bg-amber-100 text-amber-700',
  frozen: 'bg-cyan-100 text-cyan-700',
  other: 'bg-gray-100 text-gray-700',
};
