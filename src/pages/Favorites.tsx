import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard/RecipeCard';
import { useAuth } from '../context/useAuth';
import { useFavorites } from '../context/useFavorites';

export default function Favorites() {
  const { user } = useAuth();
  const { favorites, isLoading, error } = useFavorites();

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Favorite Recipes</h1>
          <p className="mt-1 text-sm text-gray-600">
            {favorites.length} recipes saved
          </p>
        </div>

        {!user && (
          <Link
            to="/login"
            className="rounded-md bg-[#ff6900] px-4 py-2 font-medium text-white"
          >
            Log in
          </Link>
        )}
      </div>

      {isLoading && <p className="mt-2 text-gray-600">Loading favorites...</p>}

      {error && <p className="mt-2 text-red-600">Error: {error}</p>}

      {!isLoading && !error && favorites.length === 0 && (
        <div className="flex min-h-72 flex-col items-center justify-center gap-4 rounded-lg border border-gray-200 bg-white shadow-2xs p-8 text-center">
          <div className="mb-4 h-12 w-12 flex items-center justify-center">
            <img
              src="/icons/like-icon.svg"
              alt=""
              aria-hidden="true"
              className="h-full w-full"
            />
          </div>

          <h2 className="text-xl font-semibold w-full">
            {user ? 'No favorites yet' : 'You are not logged in'}
          </h2>

          <p className="text-gray-600 w-full">
            {user
              ? 'Start exploring recipes and save your favorites by clicking the heart icon!'
              : 'Log in to save recipes and keep them here for later.'}
          </p>

          <Link
            to={user ? '/' : '/login'}
            className="mt-4 inline-block rounded bg-[#ff6900] px-4 py-2 text-white"
          >
            {user ? 'Browse Recipes' : 'Log in'}
          </Link>
        </div>
      )}

      {!isLoading && !error && favorites.length > 0 && (
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
