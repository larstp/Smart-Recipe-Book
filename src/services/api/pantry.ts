import { withApiHandler } from './withApiHandler';
import { PANTRY_URL } from '../config';
import type { PantryItem } from '../models';
import type { PantryPayload } from './types';

export const getFullPantry = withApiHandler<PantryItem[]>({
  endpoint: PANTRY_URL,
  init: () => ({
    headers: {
      'Content-Type': 'application/json',
      'X-Noroff-API-Key': import.meta.env.VITE_NOROFF_API_KEY,
      Authorization: `Bearer ${import.meta.env.VITE_TEST_USER_AUTH}`,
    },
  }),
});

export const postNewPantryItem = withApiHandler<PantryItem, [PantryPayload]>({
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
  [string, PantryPayload]
>({
  endpoint: (id: string) => `${PANTRY_URL}/${id}`,
  init: (id: string, payload: PantryPayload) => ({
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
