import {
  RECIPE_CATEGORY_STYLES,
  DIFFICULTY_VARIANTS,
  PANTRY_CATEGORY_STYLES,
} from '../../components/RecipeCard/variants';
import type { PantryItem, Recipe } from '../../services/models/index';

export const normalizedVariants = (
  recipe?: Recipe | null,
  pantryItem?: PantryItem | null,
) => {
  const defaultReturn = {
    categoryKey: '',
    categoryClass: 'bg-gray-100 text-gray-700',
    difficultyKey: '',
    difficultyVariant: 'default' as const,
  };

  if (!recipe && !pantryItem) return defaultReturn;

  if (recipe) {
    const categoryKey = (recipe.category.trim().charAt(0).toUpperCase() +
      recipe.category.trim().slice(1)) as Recipe['category'];
    const difficultyKey = (recipe.difficulty.trim().charAt(0).toUpperCase() +
      recipe.difficulty.trim().slice(1)) as Recipe['difficulty'];

    const categoryClass =
      RECIPE_CATEGORY_STYLES[categoryKey] ?? 'bg-gray-100 text-gray-700';
    const difficultyVariant = DIFFICULTY_VARIANTS[difficultyKey] ?? 'default';

    return { categoryKey, categoryClass, difficultyKey, difficultyVariant };
  }

  const rawPantryItem = pantryItem?.category.trim() ?? '';
  const categoryKey = rawPantryItem
    ? rawPantryItem.charAt(0).toUpperCase() + rawPantryItem.slice(1)
    : '';
  const categoryClass =
    (PANTRY_CATEGORY_STYLES as Record<string, string>)[categoryKey] ??
    'bg-gray-100 text-gray-700';

  const difficultyKey = '';
  const difficultyVariant = 'default' as const;

  return { categoryKey, categoryClass, difficultyKey, difficultyVariant };
};
