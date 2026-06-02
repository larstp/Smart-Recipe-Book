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

  const safeTrim = (value: unknown) => String(value ?? '').trim();

  if (recipe) {
    const normalizedCategory = safeTrim(recipe.category);
    const normalizedDifficulty = safeTrim(recipe.difficulty);

    const categoryKey = (normalizedCategory.charAt(0).toUpperCase() +
      normalizedCategory.slice(1)) as Recipe['category'];
    const difficultyKey = (normalizedDifficulty.charAt(0).toUpperCase() +
      normalizedDifficulty.slice(1)) as Recipe['difficulty'];

    const categoryClass =
      RECIPE_CATEGORY_STYLES[categoryKey] ?? 'bg-gray-100 text-gray-700';
    const difficultyVariant = DIFFICULTY_VARIANTS[difficultyKey] ?? 'default';

    return { categoryKey, categoryClass, difficultyKey, difficultyVariant };
  }

  const rawPantryItem = (pantryItem?.category ?? '').trim().toLowerCase();

  const categoryClass =
    PANTRY_CATEGORY_STYLES[rawPantryItem as PantryItem['category']] ??
    'bg-gray-100 text-gray-700';

  const categoryKey = rawPantryItem
    ? rawPantryItem.charAt(0).toUpperCase() + rawPantryItem.slice(1)
    : '';

  const difficultyKey = '';
  const difficultyVariant = 'default' as const;

  return { categoryKey, categoryClass, difficultyKey, difficultyVariant };
};
