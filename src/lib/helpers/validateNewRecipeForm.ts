type InputKeys =
  | 'title'
  | 'description'
  | 'prepTime'
  | 'cookTime'
  | 'servings'
  | 'ingredients'
  | 'instructions'
  | 'category'
  | 'difficulty';

type InputErrors = Partial<Record<InputKeys, string>>;

export const validateNewRecipeForm = (form: HTMLFormElement): InputErrors => {
  const formData = new FormData(form);
  const errors: InputErrors = {};

  const getValue = (name: string) => String(formData.get(name) ?? '').trim();

  if (!getValue('title')) errors.title = 'Title is required.';
  if (!getValue('description')) errors.description = 'Description is required.';
  if (!getValue('prepTime')) errors.prepTime = 'Prep time is required.';
  if (!getValue('cookTime')) errors.cookTime = 'Cook time is required.';
  if (!getValue('servings')) errors.servings = 'Servings is required.';
  if (!getValue('instructions'))
    errors.instructions = 'Instructions are required.';
  if (!getValue('category')) errors.category = 'Category is required.';
  if (!getValue('difficulty')) errors.difficulty = 'Difficulty is required.';

  const names = formData.getAll('name').map((name) => String(name).trim());
  const units = formData.getAll('unit').map((unit) => String(unit).trim());
  const quantities = formData
    .getAll('quantity')
    .map((quantity) => String(quantity).trim());

  const completeIngredientList = names.some(
    (name, index) => name && quantities[index] && units[index],
  );

  if (!completeIngredientList) {
    errors.ingredients =
      'Add at least one ingredient with name, quantity and unit.';
  }

  return errors;
};
