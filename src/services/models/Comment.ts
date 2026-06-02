import type { Profile } from './Profile';
import type { Recipe } from './Recipe';

export interface Comment {
  id: number;
  text: string;
  recipeId: Recipe['id'];
  profile: Profile;
  author: {
    id: number;
    displayName: string;
  };
  createdAt: string;
  updatedAt: string;
}
