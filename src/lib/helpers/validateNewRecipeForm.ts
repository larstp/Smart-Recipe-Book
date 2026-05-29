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
  if (!getValue('category')) errors.category = 'Category is required.';
  if (!getValue('difficulty')) errors.difficulty = 'Difficulty is required.';

  const instructionsMap = new Map<number, string>();

  const ingredientMap = new Map<
    number,
    { name?: string; quantity?: number; unit?: string }
  >();

  for (const [key, value] of formData.entries()) {
    const instructionsMatch = key.match(/^instructions-(\d+)$/);
    if (instructionsMatch) {
      const index = Number(instructionsMatch[1]);
      instructionsMap.set(index, String(value).trim());
    }

    const nameMatch = key.match(/^name-(\d+)$/);
    const qntyMatch = key.match(/^quantity-(\d+)$/);
    const unitMatch = key.match(/^unit-(\d+)$/);

    if (nameMatch) {
      const index = Number(nameMatch[1]);
      ingredientMap.set(index, {
        ...ingredientMap.get(index),
        name: String(value).trim(),
      });
    }

    if (qntyMatch) {
      const index = Number(qntyMatch[1]);
      ingredientMap.set(index, {
        ...ingredientMap.get(index),
        quantity: Number(value),
      });
    }

    if (unitMatch) {
      const index = Number(unitMatch[1]);
      ingredientMap.set(index, {
        ...ingredientMap.get(index),
        unit: String(value).trim(),
      });
    }
  }

  const hasInstructions = [...instructionsMap.values()].some(Boolean);

  if (!hasInstructions) {
    errors.instructions = 'At least one instruction is required.';
  }

  const completeIngredientList = [...ingredientMap.values()].some(
    (i) => i.name && i.quantity && i.unit,
  );

  if (!completeIngredientList) {
    errors.ingredients =
      'Add at least one ingredient with name, quantity and unit.';
  }

  return errors;
};
