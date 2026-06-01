import { Link } from 'react-router-dom';
import RecipeForm from '../components/RecipeForm/RecipeForm';

export default function NewRecipe() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Create New Recipe</h1>
      <p className="mt-2 text-gray-600">Share your favourite dish.</p>

      <Link
        to="/my-recipes"
        className="flex gap-2 w-fit mt-8 items-center hover:underline"
      >
        <img
          src="/icons/black/lucide_arrow-left.svg"
          alt="Go back"
          className="w-4"
        />
        Back to recipes
      </Link>

      <div className="max-w-150 mx-auto m-8">
        <RecipeForm />
      </div>
    </div>
  );
}
