export function getFavoritesStorageKey(email: string) {
  return `favorite-ids:${email}`;
}
