import { STORAGE_KEYS } from '../../constants/storage';

export function getAuthHeaders() {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  const apiKey =
    localStorage.getItem(STORAGE_KEYS.API_KEY) ?? import.meta.env.VITE_API_KEY;

  return {
    'Content-Type': 'application/json',
    ...(apiKey ? { 'X-Noroff-API-Key': apiKey } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}
