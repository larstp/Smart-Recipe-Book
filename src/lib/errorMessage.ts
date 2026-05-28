import { ApiError } from '../services/apiError';

export const errorMessage = (error: unknown) => {
  if (error instanceof ApiError) return error.message;
  return String(error);
};
