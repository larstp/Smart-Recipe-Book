import { withApiHandler } from './withApiHandler';
import { RECIPE_URL } from '../config';
import type { Recipe } from '../models';
import type { RecipePayload } from './types';

export const getAllRecipes = withApiHandler<Recipe[]>({
  endpoint: RECIPE_URL,
});

export const getRecipeById = withApiHandler<Recipe, [string]>({
  endpoint: (id: string) => `${RECIPE_URL}/${id}`,
});

export const postNewRecipe = withApiHandler<Recipe, [RecipePayload]>({
  endpoint: RECIPE_URL,
  init: (payload) => ({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Noroff-API-Key': import.meta.env.VITE_NOROFF_API_KEY,
      Authorization: `Bearer ${import.meta.env.VITE_TEST_USER_AUTH}`,
    },
    body: JSON.stringify(payload),
  }),
});
