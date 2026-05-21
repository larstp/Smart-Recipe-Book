import {
  CATEGORY_STYLES,
  DIFFICULTY_VARIANTS,
} from '../components/RecipeCard/variants';
import type { Recipe } from '../services/models/index';

export const useNormalizedVariants = (recipe: Recipe | null) => {
  if (!recipe)
    return {
      categoryKey: '',
      categoryClass: 'bg-gray-100 text-gray-700',
      difficultyKey: '',
      difficultyVariant: 'default' as const,
    };

  const categoryKey = (recipe.category.trim().charAt(0).toUpperCase() +
    recipe.category.trim().slice(1)) as Recipe['category'];
  const difficultyKey = (recipe.difficulty.trim().charAt(0).toUpperCase() +
    recipe.difficulty.trim().slice(1)) as Recipe['difficulty'];

  const categoryClass =
    CATEGORY_STYLES[categoryKey] ?? 'bg-gray-100 text-gray-700';
  const difficultyVariant = DIFFICULTY_VARIANTS[difficultyKey] ?? 'default';

  return { categoryKey, categoryClass, difficultyKey, difficultyVariant };
};
