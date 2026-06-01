import { withApiHandler } from './withApiHandler';
import { PANTRY_URL } from '../config';
import type { Pantry, PantryItem } from '../models';
import type { RecipePayload } from './types';

export const getFullPantry = withApiHandler<Pantry>({
  endpoint: PANTRY_URL,
  init: () => ({
    headers: {
      'Content-Type': 'application/json',
      'X-Noroff-API-Key': import.meta.env.VITE_NOROFF_API_KEY,
      Authorization: `Bearer ${import.meta.env.VITE_TEST_USER_AUTH}`,
    },
  }),
});

export const postNewPantryItem = withApiHandler<PantryItem, [RecipePayload]>({
  endpoint: PANTRY_URL,
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

export const updatePantryItem = withApiHandler<
  PantryItem,
  [string, RecipePayload]
>({
  endpoint: (id: string) => `${PANTRY_URL}/${id}`,
  init: (id: string, payload: RecipePayload) => ({
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Noroff-API-Key': import.meta.env.VITE_NOROFF_API_KEY,
      Authorization: `Bearer ${import.meta.env.VITE_TEST_USER_AUTH}`,
    },
    body: JSON.stringify({ id, ...payload }),
  }),
});

export const deletePantryItem = withApiHandler<void, [string]>({
  endpoint: (id: string) => `${PANTRY_URL}/${id}`,
  init: () => ({
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'X-Noroff-API-Key': import.meta.env.VITE_NOROFF_API_KEY,
      Authorization: `Bearer ${import.meta.env.VITE_TEST_USER_AUTH}`,
    },
  }),
});
