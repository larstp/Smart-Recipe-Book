import { withApiHandler } from './withApiHandler';
import { RECIPE_URL } from '../config';
import type { Recipe } from '../models';

export const getAllRecipes = withApiHandler<Recipe[]>({
  endpoint: RECIPE_URL,
});

export const getRecipeById = withApiHandler<Recipe, [string]>({
  endpoint: (id: string) => `${RECIPE_URL}/${id}`,
});
