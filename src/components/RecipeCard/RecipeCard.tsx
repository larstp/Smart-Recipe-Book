import { Link } from 'react-router-dom';
import FavoriteToggleButton from '../FavoriteToggleButton';
import RecipeImage from '../RecipeImage';
import { useAuth } from '../../context/useAuth';
import { normalizedVariants } from '../../lib/helpers/normalizedVariants';
import type { Recipe } from '../../services/models/index';
import { Badge } from '../badge/Badge';

export default function RecipeCard({
  recipe,
  to = `/my-recipes/${recipe.id}`,
}: {
  recipe: Recipe;
  to?: string;
}) {
  const { user } = useAuth();
  const totalTime = recipe.prepTime + recipe.cookTime;
  const { categoryKey, categoryClass, difficultyKey, difficultyVariant } =
    normalizedVariants(recipe);
  const isOwnRecipe = Boolean(user && recipe.owner?.email === user.email);

  return (
    <article className="group relative flex w-full max-w-96 flex-wrap justify-center gap-2 overflow-hidden rounded-lg bg-white shadow-md transition duration-(--duration) hover:scale-102">
      <div className="relative w-full aspect-video">
        <Link
          to={to}
          aria-label={`Open ${recipe.title}`}
          className="absolute inset-0 z-10 rounded-t-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40"
        />

        {!isOwnRecipe && (
          <FavoriteToggleButton
            recipe={recipe}
            className="absolute right-3 top-3 z-20"
          />
        )}

        <Badge
          text={categoryKey}
          classes={`${categoryClass} absolute bottom-4 left-4 z-50`}
        />
        <RecipeImage
          src={recipe.image?.url}
          alt={recipe.image?.alt}
          title={recipe.title}
          className="h-full w-full"
          imageClassName="h-full w-full justify-self-center rounded-t-lg object-cover"
          fallbackClassName="h-full w-full rounded-t-lg"
          fallbackTextClassName="text-6xl"
        />
      </div>

      <div className="relative z-20 flex w-full flex-col gap-2 p-4">
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
    </article>
  );
}
