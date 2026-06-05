import { getFavoritesStorageKey } from './getFavoritesStorageKey.ts';

export function writeCachedFavoriteIds(email: string, ids: Set<string>) {
  try {
    localStorage.setItem(
      getFavoritesStorageKey(email),
      JSON.stringify(Array.from(ids)),
    );
  } catch {
    // Ignore storage failures; the server remains the source of truth.
  }
}
