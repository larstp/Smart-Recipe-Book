import { type SubmitEvent } from 'react';
import type { Recipe } from '../../services/models';
import { updateRecipe } from '../../services/api/recipes';
import { constructPayload } from '../../lib/helpers/constructPayload';

type EditRecipeFormProps = {
  recipe: Recipe;
};

export default function EditRecipeForm({ recipe }: EditRecipeFormProps) {
  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const payload = {
      ...constructPayload(form),
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      tags: recipe.tags,
    };
    console.log('recipe id:', recipe.id);
    console.log('payload:', payload);

    await updateRecipe(recipe.id, payload);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-6 rounded-lg bg-gray-200 p-4 md:grid-cols-2"
    >
      <div className="grid gap-2">
        <label className="grid gap-2">
          <span className="font-semibold text-sm">Recipe Title</span>
          <input
            name="title"
            type="text"
            defaultValue={recipe.title}
            className="bg-gray-100 rounded-lg p-2"
          />
        </label>
        <label className="grid gap-2">
          <span className="font-semibold text-sm">Image URL</span>
          <input
            name="imageUrl"
            type="text"
            defaultValue={recipe.image?.url || ''}
            className="bg-gray-100 rounded-lg p-2"
          />
        </label>

        <label className="grid gap-2">
          <span className="font-semibold text-sm">Description</span>
          <textarea
            name="description"
            rows={6}
            defaultValue={recipe.description}
            className="bg-gray-100 rounded-lg p-2 h-48 min-h-30"
          />
        </label>

        <label className="grid gap-2">
          <span className="font-semibold text-sm">Ingredients</span>
          <textarea
            name="ingredients"
            rows={6}
            defaultValue={recipe.ingredients
              .map(
                (ingredient, index) =>
                  `${index + 1}. ${ingredient.name}, ${ingredient.quantity}, ${ingredient.unit}`,
              )
              .join('\n')}
            className="bg-gray-100 rounded-lg p-2 h-48 min-h-30"
          />
        </label>

        <label className="grid gap-2">
          <span className="font-semibold text-sm">Instructions</span>
          <textarea
            name="instructions"
            rows={6}
            defaultValue={recipe.instructions
              .map((step, index) => `${index + 1}. ${step}`)
              .join('\n')}
            className="bg-gray-100 rounded-lg p-2 h-48 min-h-30"
          />
        </label>
      </div>

      <div className="grid gap-4">
        <label className="grid gap-2">
          <span className="font-semibold text-sm">Prep Time</span>
          <input
            type="number"
            name="prepTime"
            defaultValue={recipe.prepTime}
            className="bg-gray-100 rounded-lg p-2"
          />
        </label>

        <label className="grid gap-2">
          <span className="font-semibold text-sm">Cook Time</span>
          <input
            type="number"
            name="cookTime"
            defaultValue={recipe.cookTime}
            className="bg-gray-100 rounded-lg p-2"
          />
        </label>

        <label className="grid gap-2">
          <span className="font-semibold text-sm">Servings</span>
          <input
            type="number"
            name="servings"
            defaultValue={recipe.servings}
            className="bg-gray-100 rounded-lg p-2"
          />
        </label>

        <label className="grid gap-2">
          <span className="font-semibold text-sm">Difficulty</span>
          <select
            name="difficulty"
            defaultValue={recipe.difficulty}
            className="bg-gray-100 rounded-lg p-2"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </label>

        <label className="grid gap-2">
          <span className="font-semibold text-sm">Category</span>
          <select
            name="category"
            defaultValue={recipe.category}
            className="bg-gray-100 rounded-lg p-2"
          >
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Dessert">Dessert</option>
            <option value="Snack">Snack</option>
          </select>
        </label>
      </div>

      <button
        type="submit"
        className="self-end rounded-md bg-[#ff6900] px-4 py-2 font-medium text-white md:col-span-2"
      >
        Save Changes
      </button>
    </form>
  );
}
