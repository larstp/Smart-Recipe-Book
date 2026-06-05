import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FavoriteToggleButton from '../../components/FavoriteToggleButton';
import { useAuth } from '../../context/useAuth';
import { normalizedVariants } from '../../lib/helpers/normalizedVariants';
import { ApiError } from '../../services/apiError';
import NotFound from '../../lib/NotFound';
import { Badge } from '.././../components/badge/Badge';
import { useRecipeDetails } from '../../hooks/useRecipeDetails';
import { getRecipeComments } from '../../services/api/recipes';
import type { Comment } from '../../services/models';
import {
  createComment,
  updateComment,
  deleteComment,
} from '../../services/api/comments';

export default function RecipeDetails() {
  const { user } = useAuth();
  const isLoggedIn = !!user;

  const { id: paramId } = useParams<{ id: string }>();

  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsloading] = useState(true);

  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState('');

  const {
    recipe,
    instructions,
    hasInstructions,
    createdAt,
    updatedAt,
    isUpdated,
    error,
  } = useRecipeDetails(paramId);

  useEffect(() => {
    if (!paramId) return;

    getRecipeComments(paramId)
      .then((data) => {
        setComments(data);
      })
      .catch(() => {
        setComments([]);
      })
      .finally(() => {
        setCommentsloading(false);
      });
  }, [paramId]);

  function getRelativeTime(date: string) {
    const now = new Date().getTime();
    const commentDate = new Date(date).getTime();

    const diff = now - commentDate;

    const minutes = Math.floor(diff / 1000 / 60);

    if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }

    const days = Math.floor(hours / 24);

    return `${days} day${days !== 1 ? 's' : ''} ago`;
  }

  async function handleCommentSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    if (!paramId || !commentText.trim()) {
      return;
    }

    try {
      setSubmittingComment(true);

      const newComment = await createComment(paramId, {
        text: commentText,
      });

      setComments((prev) => [newComment, ...prev]);

      setCommentText('');
    } catch (error) {
      console.error('Failed to post comment', error);
    } finally {
      setSubmittingComment(false);
    }
  }

  async function handleUpdateComment(commentId: string) {
    if (!editedText.trim()) return;

    try {
      const updatedComment = await updateComment(commentId, {
        text: editedText,
      });

      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId ? updatedComment : comment,
        ),
      );

      setEditingCommentId(null);
      setEditedText('');
    } catch (error) {
      console.error('Failed to update comment', error);
    }
  }

  async function handleDeleteComment(commentId: string) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this comment?',
    );

    if (!confirmed) return;

    try {
      await deleteComment(commentId);

      setComments((prevComments) => {
        const updatedComments = prevComments.filter(
          (comment) => String(comment.id) !== String(commentId),
        );

        return updatedComments;
      });
    } catch (error) {
      console.error('Delete error:', error);

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

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
      <div className="grid gap-8 justify-center w-full max-w-200 justify-self-center">
        <img
          src={recipe?.image?.url}
          alt={recipe?.image?.alt}
          className="mb-4 w-full max-w-150 h-auto rounded-lg object-cover justify-self-center"
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

      <div className="mt-8">
        {isLoggedIn ? (
          <form onSubmit={handleCommentSubmit} className="space-y-4">
            <h3 className="font-semibold">Leave a comment</h3>

            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write your comment..."
              rows={4}
              className="w-full rounded-lg border border-gray-300 p-3"
            ></textarea>

            <button
              type="submit"
              disabled={submittingComment}
              className="rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 disabled:opacity-50"
            >
              {submittingComment ? 'posting...' : 'Post Comment'}
            </button>
          </form>
        ) : (
          <p className="text-gray-500">Log in to leave a comment.</p>
        )}
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Comments ({comments.length})</h2>

        {commentsLoading ? (
          <p className="text-gray-500">loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          <div className="divide-y divide-gray-200">
            {comments.map((comment) => (
              <div key={comment.id} className="py-4">
                <div className="flex justify-between items-center">
                  <p className="font-semibold">By: {comment.author.name}</p>

                  {user?.email === comment.author.email && (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingCommentId(comment.id);
                          setEditedText(comment.text);
                        }}
                        className="text-sm text-blue-500 hover:underline"
                      >
                        Edit
                      </button>

                      <span className="text-black" aria-hidden="true">
                        |
                      </span>

                      <button
                        type="button"
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-sm text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>

                {editingCommentId === comment.id ? (
                  <div className="mt-3 space-y-2">
                    <textarea
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      rows={3}
                      className="w-full rounded-lg border border-gray-300 p-3"
                    />

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleUpdateComment(comment.id)}
                        className="rounded bg-green-500 px-3 py-1 text-white"
                      >
                        Save
                      </button>

                      <button
                        onClick={() => {
                          setEditingCommentId(null);
                          setEditedText('');
                        }}
                        className="rounded bg-gray-300 px-3 py-1"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="mt-2 text-gray-700">{comment.text}</p>
                )}

                <p className="mt-2 text-sm text-gray-500">
                  {getRelativeTime(comment.created)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
