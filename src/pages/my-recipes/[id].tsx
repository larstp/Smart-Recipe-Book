import { useParams } from 'react-router-dom';
import FavoriteToggleButton from '../../components/FavoriteToggleButton';
import { useAuth } from '../../context/useAuth';
import { normalizedVariants } from '../../lib/helpers/normalizedVariants';
import { ApiError } from '../../services/apiError';
import NotFound from '../../lib/NotFound';
import { Badge } from '.././../components/badge/Badge';
import { useRecipeDetails } from '../../hooks/useRecipeDetails';

export default function RecipeDetails() {
  const { user } = useAuth();
  const { id: paramId } = useParams<{ id: string }>();

  const {
    recipe,
    instructions,
    hasInstructions,
    createdAt,
    updatedAt,
    isUpdated,
    error,
  } = useRecipeDetails(paramId);

  const { categoryKey, categoryClass, difficultyKey, difficultyVariant } =
    normalizedVariants(recipe);

  if (!paramId) {
    return (
      <div className="container mx-auto p-6">
        <h2>Recipe not found</h2>
      </div>
    );
  }

  if (
    (error instanceof ApiError && error.status === 404) ||
    (error instanceof ApiError && error.status === 400)
  ) {
    return <NotFound error={error as ApiError} />;
  }

  if (!recipe) {
    return (
      <div className="container mx-auto p-6 text-lg font-semibold rounded-lg shadow-md justify-items-center">
        <h2>Loading recipe...</h2>
      </div>
    );
  }

  const isOwnRecipe = Boolean(user && recipe.owner?.email === user.email);

  return (
    <div className="container mx-auto p-6">
      <div className="grid gap-8 justify-center max-w-200 justify-self-center">
        <img
          src={recipe?.image?.url}
          alt={recipe?.image?.alt}
          className="mb-4 max-w-150 h-auto rounded-lg object-cover justify-self-center"
        />

        <div className="mb-4 flex items-center gap-3 justify-self-center">
          <h1 className="text-2xl font-bold"># {recipe.title}</h1>
          {!isOwnRecipe && (
            <FavoriteToggleButton recipe={recipe} shape="square" />
          )}
        </div>

        <div className="flex flex-wrap gap-4 justify-self-center">
          <Badge
            key="category"
            text={categoryKey}
            classes={`${categoryClass}`}
          />
          <Badge
            key="servings"
            text={`${recipe.servings} servings`}
            variant="default"
          />
          <Badge
            key="difficulty"
            text={`Difficulty: ${difficultyKey}`}
            variant={difficultyVariant || 'default'}
          />
          <Badge
            key="prepTime"
            text={`Prep: ${recipe.prepTime} minutes`}
            variant="default"
          />
          <Badge
            key="cookTime"
            text={`Cook: ${recipe.cookTime} minutes`}
            variant="default"
          />
        </div>

        <p className="mt-2 text-(--text-muted) max-w-prose justify-self-center">
          <strong>Description:</strong> {recipe.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold mt-6">Ingredients</h2>
            <ul className="mt-2 ml-4 text-(--text-muted) list-disc max-w-prose">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.name}: {ingredient.quantity} {ingredient.unit}
                </li>
              ))}
            </ul>
          </div>

          {hasInstructions ? (
            <div>
              <h2 className="text-xl font-bold mt-6">Instructions</h2>
              <ol className="mt-2 ml-4 text-(--text-muted) list-decimal max-w-prose">
                {instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold mt-6">Instructions</h2>
              <p>{instructions}</p>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 justify-between text-(--text-muted) text-xs">
          <p>
            <strong>Created:</strong> {createdAt}
          </p>

          {isUpdated && (
            <p>
              <strong>Updated:</strong> {updatedAt}
            </p>
          )}
        </div>

        <hr className="mb-6 text-(--text-muted)" />

        {recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-4 justify-self-center">
            {recipe.tags.map((tag) => (
              <Badge key={tag} text={tag} variant="default" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
