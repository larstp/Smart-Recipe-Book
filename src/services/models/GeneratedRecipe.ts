export interface GeneratedRecipeIngredient {
  name: string;
  quantity: string | number;
  unit: string;
  inPantry: boolean;
}

export interface GeneratedRecipe {
  title: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: string;
  category: string;
  ingredients: GeneratedRecipeIngredient[];
  instructions: string[];
  tags: string[];
}

export interface GenerateRecipeResponse {
  recipe: GeneratedRecipe;
}
