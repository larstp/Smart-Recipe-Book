import { createContext } from 'react';
import type { Recipe } from '../services/models';

export type FavoritesContextType = {
  favorites: Recipe[];
  favoriteIds: Set<string>;
  isLoading: boolean;
  error: string | null;
  isFavorite: (recipeId: string) => boolean;
  isSyncing: (recipeId: string) => boolean;
  refreshFavorites: () => Promise<void>;
  toggleFavorite: (recipe: Recipe) => Promise<void>;
};

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);
