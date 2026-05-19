import type { Profile } from './Profile';
import type { Recipe } from './recipe';

export interface Comment {
  id: number;
  text: string;
  recipeId: Recipe['id'];
  author: Profile;
  created: Date;
  updated: Date;
}
