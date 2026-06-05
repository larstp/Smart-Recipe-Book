import { ApiError } from '../apiError';
import { BASE_URL } from '../config';
import { getAuthHeaders } from './getAuthHeaders';
import { FAVORITES_URL } from './config';
import type { Favorite, Recipe } from '../models';

type FavoriteRecipeResponse = Recipe | Favorite | { recipe: Recipe };

function normalizeFavoriteRecipe(item: FavoriteRecipeResponse): Recipe {
  if ('recipe' in item && item.recipe) {
    return item.recipe;
  }

  return item as Recipe;
}

async function requestFavorites<TResult>(
  path: string,
  init?: RequestInit,
): Promise<TResult> {
  const method = init?.method?.toUpperCase() ?? 'GET';
  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      ...getAuthHeaders(),
      ...(init?.headers ?? {}),
    },
  });

  if (response.status === 404) {
    throw new ApiError(`Not found: ${path}`, 404);
  }

  if (!response.ok) {
    const text = await response.text();
    throw new ApiError(
      text ||
        (method === 'GET'
          ? 'Failed to load favorites'
          : 'Failed to update favorites'),
      response.status,
      text,
    );
  }

  const text = await response.text();

  if (!text) {
    return undefined as TResult;
  }

  const json = JSON.parse(text) as TResult | { data?: TResult };

  if (json && typeof json === 'object' && 'data' in json) {
    return (json as { data: TResult }).data;
  }

  return json as TResult;
}

export function getFavorites() {
  return requestFavorites<FavoriteRecipeResponse[]>(FAVORITES_URL, {
    method: 'GET',
  }).then((favorites) => favorites.map(normalizeFavoriteRecipe));
}

export function addFavorite(recipeId: string) {
  return requestFavorites<void>(FAVORITES_URL, {
    method: 'POST',
    body: JSON.stringify({ recipeId }),
  });
}

export function removeFavorite(recipeId: string) {
  return requestFavorites<void>(`${FAVORITES_URL}/${recipeId}`, {
    method: 'DELETE',
  });
}
