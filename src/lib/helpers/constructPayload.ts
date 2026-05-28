import type { RecipePayload } from '../../services/api/types';
import type { Ingredient } from '../../services/models';

export const constructPayload = (form: HTMLFormElement): RecipePayload => {
  const formData = new FormData(form);

  const imageUrl = String(formData.get('imageUrl') ?? '');
  const title = String(formData.get('title') ?? '');
  const tags = String(formData.get('tags') ?? '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

  const instructions = String(formData.get('instructions') ?? '')
    .split(',')
    .map((step) => step.trim())
    .filter(Boolean);

  const names = formData.getAll('name').map(String);
  const qantities = formData.getAll('quantity').map((q) => Number(q));
  const units = formData.getAll('unit').map(String);

  const ingredients: Ingredient[] = names
    .map((name, index) => ({
      name: name.trim(),
      quantity: Number.isFinite(qantities[index]) ? qantities[index] : 0,
      unit: (units[index] ?? '').trim(),
    }))
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
