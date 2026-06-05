import type { Profile } from './Profile';
import type { Recipe } from './Recipe';

export interface Comment {
  id: string;
  text: string;
  recipeId: Recipe['id'];
  profile: Profile;

  author: {
    name: string;
    email: string;
  };
  created: string;
  updated: string;
}
