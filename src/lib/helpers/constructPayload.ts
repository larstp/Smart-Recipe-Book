import type { RecipePayload } from '../../services/api/types';
import type { Ingredient } from '../../services/models';

export const constructPayload = (form: HTMLFormElement): RecipePayload => {
  const formData = new FormData(form);

  const imageUrl = String(formData.get('imageUrl') ?? '');
  const title = String(formData.get('title') ?? '');
  const tags = formData
    .getAll('tags')
    .map((tag) => String(tag).trim())
    .filter(Boolean);

  const instructionsMap = new Map<number, string>();
  const ingredientMap = new Map<number, Partial<Ingredient>>();

  for (const [key, value] of formData.entries()) {
    const instructionMatch = key.match(/^instructions-(\d+)$/);

    if (instructionMatch) {
      const index = Number(instructionMatch[1]);
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

  const instructions = [...instructionsMap.entries()]
    .sort(([a], [b]) => a - b)
    .map(([, item]) => item)
    .filter(Boolean);

  const ingredients: Ingredient[] = [...ingredientMap.entries()]
    .sort(([a], [b]) => a - b)
    .map(([, item]) => {
      const quantity = Number(item.quantity ?? 0);

      return {
        name: item.name ?? '',
        quantity: Number.isFinite(quantity) ? quantity : 0,
        unit: item.unit ?? '',
      };
    })
    .filter((i) => i.name && i.unit);

  return {
    title: title,
    description: String(formData.get('description') ?? ''),
    image: imageUrl
      ? {
          url: imageUrl,
          alt: title || 'Recipe image',
        }
      : null,
    prepTime: Number(formData.get('prepTime') ?? 0),
    cookTime: Number(formData.get('cookTime') ?? 0),
    servings: Number(formData.get('servings') ?? 0),
    difficulty: String(formData.get('difficulty') ?? ''),
    category: String(formData.get('category') ?? ''),
    tags,
    ingredients,
    instructions,
  };
};
