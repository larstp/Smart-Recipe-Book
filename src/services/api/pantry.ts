import { withApiHandler } from './withApiHandler';
import { getAuthHeaders } from './getAuthHeaders';
import { PANTRY_URL } from './config';
import type { PantryItem } from '../models';
import type { PantryPayload } from './types';

export const getFullPantry = withApiHandler<PantryItem[]>({
  endpoint: PANTRY_URL,
  init: () => ({
    headers: getAuthHeaders(),
  }),
});

export const postNewPantryItem = withApiHandler<PantryItem, [PantryPayload]>({
  endpoint: PANTRY_URL,
  init: (payload) => ({
    method: 'POST',
    headers: getAuthHeaders(),
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
