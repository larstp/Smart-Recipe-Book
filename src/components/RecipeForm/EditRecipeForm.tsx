import type { Recipe } from '../../services/models';

type EditRecipeFormProps = {
  recipe: Recipe;
};

export default function EditRecipeForm({ recipe }: EditRecipeFormProps) {
  return (
    <form className="grid gap-4 rounded-lg bg-gray-200 p-4">
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
        <span className="font-semibold text-sm">Description</span>
        <textarea
          name="description"
          defaultValue={recipe.description}
          className="bg-gray-100 rounded-lg p-2 h-24"
        />
      </label>

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

      <button
        type="submit"
        className="self-end rounded-md bg-[#ff6900] px-4 py-2 font-medium text-white"
      >
        Save Changes
      </button>
    </form>
  );
}
