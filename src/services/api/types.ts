import type {
  Ingredient,
  // Profile
} from '../models';

export type RecipePayload = {
  title: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: string;
  category: string;
  image: {
    url: string;
    alt: string;
  } | null;
  tags: string[];
  ingredients: Ingredient[];
  instructions: string[];
  // owner: Profile;
};

export type PantryPayload = {
  name: string;
  quantity: number;
  unit: string;
  category: string;
};

export type PantryField = 'name' | 'quantity' | 'unit' | 'category';
export type PantryErrors = Partial<Record<PantryField, string>>;
