import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard/RecipeCard';
import { getAllRecipes } from '../services/api/recipes';
import type { Recipe } from '../services/models/index';
import { useDebounce } from '../hooks/useDebounce';

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchInput, setSearchInput] = useState<string>('');
  const debouncedSearch = useDebounce(searchInput, 300);

  const panelClassName =
    'rounded-2xl border border-gray-200 bg-white/90 p-8 shadow-sm';

  const categories = [
    'breakfast',
    'lunch',
    'dinner',
    'dessert',
    'snack',
    'drink',
  ];
  const difficulties = ['easy', 'medium', 'hard'];

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getAllRecipes();
        setRecipes(data);
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

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());
    return matchesSearch;
  });

  return (
    <main className="container mx-auto px-6 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Discover Delicious Recipes</h1>
        <p className="text-gray-600">
          Save, organize, and share your favorite recipes with AI-powered
          features
        </p>
      </div>

      {!loading && !error && recipes.length > 0 && (
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search recipes by name or description..."
              className="w-full rounded-full border border-gray-300 bg-white px-5 py-3 pl-12 text-sm shadow-sm transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
            <svg
              className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="flex items-center gap-4 rounded-full border border-orange-100 bg-orange-50 px-6 py-4 text-orange-700 shadow-sm">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-orange-200 border-t-orange-500"></div>
            <p className="text-sm font-medium">Loading recipes...</p>
          </div>
        </div>
      )}

      {error && (
        <div className={`${panelClassName} mb-6 border-red-200 bg-red-50`}>
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700">
              !
            </div>
            <div className="flex-1">
              <p className="font-semibold text-red-900">
                Error loading recipes
              </p>
              <p className="mt-1 text-sm text-red-700">{error}</p>
              <p className="mt-2 text-sm text-red-600">
                Try refreshing the page or check your API connection.
              </p>
            </div>
          </div>
        </div>
      )}

      {!loading &&
        !error &&
        recipes.length > 0 &&
        filteredRecipes.length === 0 && (
          <div className={`${panelClassName} mb-6 text-center`}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
              No matches
            </p>
            <h2 className="mt-3 text-2xl font-bold text-gray-900">
              No recipes found
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-gray-600">
              No recipes match your search "{searchInput}". Try a different
              search term.
            </p>
            <button
              onClick={() => setSearchInput('')}
              className="mt-6 inline-flex items-center rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Clear Search
            </button>
          </div>
        )}

      {!loading && !error && recipes.length === 0 && (
        <div className={`${panelClassName} mb-6 text-center`}>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            Empty kitchen
          </p>
          <h2 className="mt-3 text-2xl font-bold text-gray-900">
            No recipes yet
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-gray-600">
            Once recipes are available, they will appear here in a tidy grid.
            For now, you can head to your personal recipe area and add the first
            one.
          </p>
          <Link
            to="/my-recipes"
            className="mt-6 inline-flex items-center rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Go to My Recipes
          </Link>
        </div>
      )}

      {!loading && !error && filteredRecipes.length > 0 && (
        <>
          <p className="text-gray-600 mb-6">
            {filteredRecipes.length}{' '}
            {filteredRecipes.length === 1 ? 'recipe' : 'recipes'} found
            {searchInput && ` for "${searchInput}"`}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <Link
                key={recipe.id}
                to={`/my-recipes/${recipe.id}`}
                className="flex w-full justify-center md:block"
              >
                <RecipeCard recipe={recipe} />
              </Link>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
