import type { Profile } from './Profile';
import type { Comment } from './Comment';

export interface Recipe {
  id: number;
  title: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: string;
  category: string;
  ingredients: Array<object>;
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
