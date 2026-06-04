import type { Recipe } from './Recipe';

export interface Favorite {
  id: string;
  recipeId: Recipe['id'];
  recipe: Recipe;
  owner: string;
  created: Date;
}
