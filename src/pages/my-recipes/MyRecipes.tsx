import RecipeCard from '../../components/RecipeCard/RecipeCard';
import { RecipeObject } from '../../services/api/mockRecipe';
import { Link } from 'react-router';

export default function MyRecipes() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">My Recipes</h1>
      <p className="mt-2 text-gray-600">Placeholder My Recipes page.</p>

      <div className="flex flex-wrap w-full gap-6 mt-4">
        {RecipeObject.map((recipe) => (
          <Link key={recipe.id} to={`/my-recipes/${recipe.id}`}>
            <RecipeCard key={recipe.id} recipe={recipe} />
          </Link>
        ))}
      </div>
    </div>
  );
}
