import { withApiHandler } from './withApiHandler';
import { getAuthHeaders } from './getAuthHeaders';
import { RECIPE_URL } from '../config';
import type { Recipe, Comment } from '../models';
import type { RecipePayload } from './types';

export const getAllRecipes = withApiHandler<Recipe[]>({
  endpoint: RECIPE_URL,
});

export const getRecipeById = withApiHandler<Recipe, [string]>({
  endpoint: (id: string) => `${RECIPE_URL}/${id}`,
});

export const getRecipeComments = withApiHandler<Comment[], [string]>({
  endpoint: (id: string) => `${RECIPE_URL}/${id}/comments`,
});

export const postNewRecipe = withApiHandler<Recipe, [RecipePayload]>({
  endpoint: RECIPE_URL,
  init: (payload) => ({
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  }),
});
