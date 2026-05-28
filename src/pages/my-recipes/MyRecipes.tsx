import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import { getAllRecipes } from '../../services/api/recipes';
import type { Recipe } from '../../services/models';
import { Button } from '../../components/Button';

export default function MyRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getAllRecipes()
      .then((data) => {
        if (cancelled) return;
        setRecipes(data);
        setError(null);
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        setRecipes([]);
        setError(
          error instanceof Error ? error : new Error('Failed to load recipes'),
        );
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const goToNewRecipe = () => {
    window.location.href = '/new-recipe';
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">My Recipes</h1>

      {loading && <p className="mt-2 text-gray-600">Loading recipes...</p>}
      {error && <p className="mt-2 text-red-600">Error: {error.message}</p>}

      {/* Placeholder btn for the testing the Create recipe page form */}
      <div className="justify-self-end">
        <Button
          onClick={goToNewRecipe}
          variant="primary"
          className="bg-orange-400 hover:bg-orange-500"
        >
          Create Recipe
        </Button>
      </div>

      {!loading && !error && (
        <div className="flex flex-wrap w-full gap-6 mt-4">
          {recipes?.map((item) => (
            <Link key={item.id} to={`/my-recipes/${item.id}`}>
              <RecipeCard key={item.id} recipe={item} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
