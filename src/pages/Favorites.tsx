import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard/RecipeCard';
import { useAuth } from '../context/useAuth';
import { useFavorites } from '../context/useFavorites';

export default function Favorites() {
  const { user } = useAuth();
  const { favorites, isLoading, error } = useFavorites();

  if (!user) {
    return (
      <main className="container mx-auto p-6">
        <h1 className="text-2xl font-bold">Favorites</h1>
        <p className="mt-2 text-gray-600">
          Log in to save recipes and keep them here for later.
        </p>
        <Link
          to="/login"
          className="mt-4 inline-flex rounded-md bg-[#ff6900] px-4 py-2 font-medium text-white"
        >
          Log in
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Favorites</h1>

      {isLoading && <p className="mt-2 text-gray-600">Loading favorites...</p>}

      {error && <p className="mt-2 text-red-600">Error: {error}</p>}

      {!isLoading && !error && favorites.length === 0 && (
        <p className="mt-2 text-gray-600">
          You have not saved any recipes yet.
        </p>
      )}

      {!isLoading && !error && favorites.length > 0 && (
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </main>
  );
}
