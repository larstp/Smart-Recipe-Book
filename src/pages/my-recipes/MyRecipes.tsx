import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import { getAllRecipes } from '../../services/api/recipes';
import type { Recipe } from '../../services/models';
import { useAuth } from '../../context/useAuth';

export default function MyRecipes() {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    if (!user) {
      return;
    }

    getAllRecipes()
      .then((data) => {
        if (cancelled) return;

        const myRecipes = data.filter(
          (recipe) => recipe.owner?.email === user.email,
        );

        setRecipes(myRecipes);
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
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Recipes</h1>
          <p className="mt-1 text-sm text-gray-600">
            {recipes.length} recipes created
          </p>
        </div>

        {user && (
          <Link
            to="/new-recipe"
            className="rounded-md bg-[#ff6900] px-4 py-2 font-medium text-white"
          >
            + Create Recipe
          </Link>
        )}
      </div>

      {loading && <p className="mt-2 text-gray-600">Loading recipes...</p>}
      {error && <p className="mt-2 text-red-600">Error: {error.message}</p>}

      {!loading && !error && recipes.length === 0 && (
        <div className="flex min-h-72 flex-col items-center justify-center gap-4 rounded-lg border border-gray-200 bg-white shadow-2xs p-8 text-center">
          <div className="mb-4 flex w-14 h-14 items-center justify-center bg-gray-100 rounded-full text-3xl text-gray-400">
            +
          </div>

          <h2 className="text-xl font-semibold w-full">
            {user ? 'No recipes yet' : 'You are not logged in'}
          </h2>

          <p className="text-gray-600 w-full">
            Start creating your own recipes and build your personal cookbook!
          </p>

          <Link
            to={user ? '/new-recipe' : '/login'}
            className="mt-4 inline-block rounded bg-[#ff6900] px-4 py-2 text-white"
          >
            {user ? '+ Create your first recipe' : 'Log in to create recipes'}
          </Link>
        </div>
      )}

      {!loading && !error && recipes.length > 0 && (
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
