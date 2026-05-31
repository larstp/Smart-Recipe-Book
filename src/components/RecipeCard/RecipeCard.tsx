import { normalizedVariants } from '../../lib/helpers/normalizedVariants';
import type { Recipe } from '../../services/models/index';
import { Badge } from '../badge/Badge';

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const totalTime = recipe.prepTime + recipe.cookTime;
  const { categoryKey, categoryClass, difficultyKey, difficultyVariant } =
    normalizedVariants(recipe);

  return (
    <div className="flex flex-wrap gap-2 max-w-96 justify-center rounded-lg shadow-md overflow-hidden hover:scale-102 transition duration-(--duration)">
      <div className="relative w-full aspect-video">
        <Badge
          text={categoryKey}
          classes={`${categoryClass} absolute bottom-4 left-4 z-50`}
        />
        {recipe.image && (
          <img
            src={recipe.image.url}
            alt={recipe.image.alt}
            className="w-full h-full object-cover justify-self-center rounded-t-lg"
          />
        )}
      </div>

      <div className="flex flex-col w-full gap-2 p-4">
        <h2 className="text-xl font-semibold truncate">{recipe.title}</h2>
        <p className="text-sm text-(--text-muted) truncate">
          {recipe.description}
        </p>

        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center gap-2 text-(--text-muted)">
            <span
              className="inline-block w-4 h-4 bg-(--text-muted) rounded-full"
              aria-hidden
            />
            <p>{totalTime} minutes</p>
          </div>

          <div className="flex items-center gap-2 text-(--text-muted)">
            <span
              className="inline-block w-4 h-4 bg-(--text-muted) rounded-full"
              aria-hidden
            />
            <p>{recipe.servings} servings</p>
          </div>
          <Badge text={difficultyKey} variant={difficultyVariant} />
        </div>

        <p className="text-xs text-(--text-muted)">by {recipe.owner.name}</p>
      </div>
    </div>
  );
}
