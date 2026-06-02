import { useEffect, useState } from 'react';
import { ApiError } from '../services/apiError';
import { FavoritesContext } from './favorites-context.ts';
import { useAuth } from './useAuth';
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from '../services/api/favorites';
import type { Recipe } from '../services/models';

const FAVORITES_STORAGE_PREFIX = 'favorite-ids:';

function getFavoritesStorageKey(email: string) {
  return `${FAVORITES_STORAGE_PREFIX}${email}`;
}

function readCachedFavoriteIds(email: string) {
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

function writeCachedFavoriteIds(email: string, ids: Set<string>) {
  try {
    localStorage.setItem(
      getFavoritesStorageKey(email),
      JSON.stringify(Array.from(ids)),
    );
  } catch {
    // Ignore storage failures; the server remains the source of truth.
  }
}

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [syncingIds, setSyncingIds] = useState<Set<string>>(new Set());

  const refreshFavorites = async () => {
    if (!user) {
      setFavorites([]);
      setFavoriteIds(new Set());
      setError(null);
      setIsLoading(false);

      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await getFavorites();
      setFavorites(data);
      const nextFavoriteIds = new Set(data.map((recipe) => recipe.id));
      setFavoriteIds(nextFavoriteIds);
      writeCachedFavoriteIds(user.email, nextFavoriteIds);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'Failed to load favorites',
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    if (!user) {
      setFavorites([]);
      setFavoriteIds(new Set());
      setError(null);
      setIsLoading(false);

      return undefined;
    }

    const cachedFavoriteIds = readCachedFavoriteIds(user.email);
    setFavoriteIds(cachedFavoriteIds);

    setIsLoading(true);
    setError(null);

    getFavorites()
      .then((data) => {
        if (cancelled) {
          return;
        }

        setFavorites(data);
        const nextFavoriteIds = new Set(data.map((recipe) => recipe.id));
        setFavoriteIds(nextFavoriteIds);
        writeCachedFavoriteIds(user.email, nextFavoriteIds);
      })
      .catch((loadError: unknown) => {
        if (cancelled) {
          return;
        }

        setError(
          loadError instanceof Error
            ? loadError.message
            : 'Failed to load favorites',
        );
      })
      .finally(() => {
        if (cancelled) {
          return;
        }

        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user]);

  const isFavorite = (recipeId: string) => favoriteIds.has(recipeId);

  const isSyncing = (recipeId: string) => syncingIds.has(recipeId);

  const toggleFavorite = async (recipe: Recipe) => {
    if (!user) {
      return;
    }

    const currentlyFavorited = favoriteIds.has(recipe.id);
    const previousFavorites = favorites;
    const previousFavoriteIds = favoriteIds;
    const nextFavoriteIds = new Set(favoriteIds);

    if (currentlyFavorited) {
      nextFavoriteIds.delete(recipe.id);
    } else {
      nextFavoriteIds.add(recipe.id);
    }

    setSyncingIds((current) => {
      const next = new Set(current);
      next.add(recipe.id);

      return next;
    });

    setFavorites((currentFavorites) =>
      currentlyFavorited
        ? currentFavorites.filter((item) => item.id !== recipe.id)
        : [recipe, ...currentFavorites.filter((item) => item.id !== recipe.id)],
    );
    setFavoriteIds(nextFavoriteIds);
    writeCachedFavoriteIds(user.email, nextFavoriteIds);

    try {
      if (currentlyFavorited) {
        await removeFavorite(recipe.id);
      } else {
        await addFavorite(recipe.id);
      }
    } catch (updateError) {
      if (updateError instanceof ApiError && updateError.status === 409) {
        await refreshFavorites();
        return;
      }

      setFavorites(previousFavorites);
      setFavoriteIds(previousFavoriteIds);
      writeCachedFavoriteIds(user.email, previousFavoriteIds);

      throw updateError;
    } finally {
      setSyncingIds((current) => {
        const next = new Set(current);
        next.delete(recipe.id);

        return next;
      });
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        favoriteIds,
        isLoading,
        error,
        isFavorite,
        isSyncing,
        refreshFavorites,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
