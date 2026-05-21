import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard/RecipeCard';
import type { Recipe } from '../services/models/index';

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/recipes`,
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch recipes: ${response.status}`);
        }

        const data = await response.json();
        setRecipes(data.data || data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <main className="container mx-auto px-6 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Discover Delicious Recipes</h1>
        <p className="text-gray-600">
          Save, organize, and share your favorite recipes with AI-powered
          features
        </p>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          <p className="font-semibold">Error loading recipes</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {!loading && !error && recipes.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">
            No recipes found. Be the first to add one!
          </p>
        </div>
      )}

      {!loading && !error && recipes.length > 0 && (
        <>
          <p className="text-gray-600 mb-6">{recipes.length} recipes found</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <Link key={recipe.id} to={`/recipes/${recipe.id}`}>
                <RecipeCard recipe={recipe} />
              </Link>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
