import { withApiHandler } from './withApiHandler';
import { getAuthHeaders } from './getAuthHeaders';
import { COMMENT_URL, RECIPE_URL } from '../config';
import type { Comment } from '../models';

export const createComment = withApiHandler<
  Comment,
  [string, { text: string }]
>({
  endpoint: (recipeId) => `${RECIPE_URL}/${recipeId}/comments`,

  init: (_, body) => ({
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  }),
});

export const updateComment = withApiHandler<
  Comment,
  [string, { text: string }]
>({
  endpoint: (commentId) => `${COMMENT_URL}/${commentId}`,

  init: (_, body) => ({
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  }),
});

export const deleteComment = withApiHandler<void, [string]>({
  endpoint: (commentId) => {
    console.log('DELETE URL:', `${COMMENT_URL}/${commentId}`);
    return `${COMMENT_URL}/${commentId}`;
  },

  init: () => ({
    method: 'DELETE',
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json',
    },
  }),
});
