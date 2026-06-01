import { withApiHandler } from './withApiHandler';
import { getAuthHeaders } from './getAuthHeaders';
import { PANTRY_URL } from '../config';
import type { Pantry, PantryItem } from '../models';
import type { RecipePayload } from './types';

export const getFullPantry = withApiHandler<Pantry>({
  endpoint: PANTRY_URL,
  init: () => ({
    headers: getAuthHeaders(),
  }),
});

export const postNewPantryItem = withApiHandler<PantryItem, [RecipePayload]>({
  endpoint: PANTRY_URL,
  init: (payload) => ({
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  }),
});

export const updatePantryItem = withApiHandler<
  PantryItem,
  [string, RecipePayload]
>({
  endpoint: (id: string) => `${PANTRY_URL}/${id}`,
  init: (id: string, payload: RecipePayload) => ({
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ id, ...payload }),
  }),
});

export const deletePantryItem = withApiHandler<void, [string]>({
  endpoint: (id: string) => `${PANTRY_URL}/${id}`,
  init: () => ({
    method: 'DELETE',
    headers: getAuthHeaders(),
  }),
});
