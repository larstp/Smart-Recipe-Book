import { useNavigate } from 'react-router-dom';
import { useState, type SubmitEvent } from 'react';
import { Button } from '../Button';
import { Input } from './Input';
import { Select } from './Select';
import { IngredientList } from './IngredientList';
import { InstructionsList } from './InstructionsList';
import { TagsList } from './TagsList';
import { postNewRecipe } from '../../services/api/recipes';
import { constructPayload } from '../../lib/helpers/constructPayload';
import { errorMessage } from '../../lib/errorMessage';
import { validateNewRecipeForm } from '../../lib/helpers/validateNewRecipeForm';
import { getApiMessage } from '../../lib/helpers/getApiMessage';
import toast from 'react-hot-toast';

export default function RecipeForm() {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const [inputErrors, setInputErrors] = useState<Record<string, string>>({});
  const [apiErrors, setApiErrors] = useState<string[]>([]);
  const apiMessage = (name: string) => getApiMessage(apiErrors, name);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const errors = validateNewRecipeForm(form);

    if (Object.keys(errors).length > 0) {
      setInputErrors(errors);
      return;
    }

    setInputErrors({});
    setApiErrors([]);
    setDisabled(true);
    const payload = constructPayload(form);

    try {
      const data = await postNewRecipe(payload);
      toast.success(`Recipe added: ${data.title}`);

      navigate(`/my-recipes/${data.id}`);
    } catch (error) {
      setApiErrors([errorMessage(error)]);
      toast.error("Something went wrong. Couldn't add recipe.");
    } finally {
      setDisabled(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 grid-cols-1 rounded-lg p-4 bg-gray-200"
    >
      <Input
        id="title"
        type="text"
        name="title"
        label="Recipe Title"
        error={inputErrors.title || apiMessage('title')}
      />

      <div className="grid gap-2">
        <label htmlFor="description" className="font-semibold text-sm">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="bg-gray-100 rounded-lg p-1"
          placeholder="write a description of the recipe here..."
        />
        {inputErrors.description && (
          <p className="text-red-500">
            {inputErrors.description || apiMessage('description')}
          </p>
        )}
      </div>

      <Input
        id="imageUrl"
        type="text"
        name="imageUrl"
        label="Image URL"
        error={inputErrors.imageUrl || apiMessage('imageUrl')}
      />

      <Input
        id="prepTime"
        type="number"
        name="prepTime"
        label="Prep Time (min)"
        error={inputErrors.prepTime || apiMessage('prepTime')}
      />
      <Input
        id="cookTime"
        type="number"
        name="cookTime"
        label="Cook Time (min)"
        error={inputErrors.cookTime || apiMessage('cookTime')}
      />
      <Input
        id="servings"
        type="number"
        name="servings"
        label="Servings"
        error={inputErrors.servings || apiMessage('servings')}
      />

      <Select
        id="difficulty"
        name="difficulty"
        label="Difficulty"
        options={['Easy', 'Medium', 'Hard']}
        error={inputErrors.difficulty || apiMessage('difficulty')}
      />
      <Select
        id="category"
        name="category"
        label="Category"
        options={['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Drink']}
        error={inputErrors.category || apiMessage('category')}
      />

      <div>
        <h2 className="text-lg font-semibold">Ingredient List</h2>
        <IngredientList />
        {inputErrors.ingredients && (
          <p className="text-red-500 mt-2">
            {inputErrors.ingredients || apiMessage('ingredients')}
          </p>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold">Instructions List</h2>
        <InstructionsList />
        {inputErrors.instructions && (
          <p className="text-red-500 mt-2">
            {inputErrors.instructions || apiMessage('instructions')}
          </p>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold">Tags List</h2>
        <p className="text-xs">Press 'Enter' to add a tag</p>
        <TagsList />
      </div>

      <Button
        disabled={disabled}
        type="submit"
        className={disabled ? 'opacity-80' : 'cursor-pointer'}
      >
        Save
      </Button>
    </form>
  );
}
