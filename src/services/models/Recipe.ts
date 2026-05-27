import type { Profile } from './Profile';
import type { Comment } from './Comment';
import type { Ingredient } from './Ingredient';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: string;
  category: string;
  ingredients: Array<Ingredient>;
  instructions: Array<string>;
  tags: Array<string>;
  image: {
    url: string;
    alt: string;
  };
  owner: Profile;
  comments: Array<Comment>;
  _count: object;
  created: Date;
  updated: Date;
}
