import { getFavoritesStorageKey } from './getFavoritesStorageKey.ts';

export function readCachedFavoriteIds(email: string) {
  try {
    const raw = localStorage.getItem(getFavoritesStorageKey(email));

    if (!raw) {
      return new Set<string>();
    }

    const parsed = JSON.parse(raw) as string[];

    return new Set(parsed);
  } catch {
    return new Set<string>();
  }
}
