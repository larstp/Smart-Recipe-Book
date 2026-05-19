import { RecipeObject } from '../../services/api/mockRecipe';

export function RecipeDetails({ id }: { id: number }) {
  const recipe = RecipeObject.find((r) => r.id === id);
  if (!recipe) return <div>Recipe not found</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Recipe {id}</h1>
      <p className="mt-2 text-gray-600">
        <strong>Description:</strong> {recipe.description}
      </p>
    </div>
  );
}
