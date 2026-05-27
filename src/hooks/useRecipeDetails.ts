import { useState, useEffect } from 'react';
import { getRecipeById } from '../services/api/recipes';
import type { Recipe } from '../services/models';

type UseRecipeDetailsProps = {
  recipe: Recipe | null;
  instructions: string[];
  hasInstructions: boolean;
  createdAt: string;
  updatedAt: string;
  isUpdated: boolean;
  error: Error | null;
};

export function useRecipeDetails(
  id: string | undefined,
): UseRecipeDetailsProps {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    getRecipeById(id)
      .then((data) => {
        if (cancelled) return;
        setRecipe(data);
        setError(null);
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        setRecipe(null);
        setError(
          error instanceof Error ? error : new Error('Failed to load recipe'),
        );
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const instructions = recipe
    ? recipe.instructions.filter(
        (instruction: string) =>
          instruction.trim() && instruction !== 'No instructions provided.',
      )
    : [];
  const hasInstructions = instructions.length > 0;

  const createdAt = recipe?.created
    ? new Date(recipe.created).toLocaleDateString()
    : '';
  const updatedAt = recipe?.updated
    ? new Date(recipe.updated).toLocaleDateString()
    : '';
  const isUpdated = recipe?.updated !== recipe?.created;

  return {
    recipe,
    instructions,
    hasInstructions,
    createdAt,
    updatedAt,
    isUpdated,
    error,
  };
}
