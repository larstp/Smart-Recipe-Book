import { useEffect, useMemo, useState } from 'react';
import { FavoritesContext } from './favorites-context.ts';
import { useAuth } from './useAuth';
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from '../services/api/favorites';
import type { Recipe } from '../services/models';

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [syncingIds, setSyncingIds] = useState<Set<string>>(new Set());

  const favoriteIds = useMemo(
    () => new Set(favorites.map((recipe) => recipe.id)),
    [favorites],
  );

  const refreshFavorites = async () => {
    if (!user) {
      setFavorites([]);
      setError(null);
      setIsLoading(false);

      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await getFavorites();
      setFavorites(data);
    } catch (loadError) {
      setFavorites([]);
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
      setError(null);
      setIsLoading(false);

      return undefined;
    }

    setIsLoading(true);
    setError(null);

    getFavorites()
      .then((data) => {
        if (cancelled) {
          return;
        }

        setFavorites(data);
      })
      .catch((loadError: unknown) => {
        if (cancelled) {
          return;
        }

        setFavorites([]);
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

    try {
      if (currentlyFavorited) {
        await removeFavorite(recipe.id);
      } else {
        await addFavorite(recipe.id);
      }
    } catch (updateError) {
      setFavorites(previousFavorites);

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
