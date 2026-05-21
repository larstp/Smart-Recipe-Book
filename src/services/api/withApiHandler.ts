import type { ApiConfig, ApiHandler, ApiResponse } from '../types';
import { ApiError } from '../apiError';
import { BASE_URL } from '../config';

export function withApiHandler<TResult, TArgs extends unknown[] = []>({
  endpoint,
  init,
  baseUrl = BASE_URL,
}: ApiConfig<TArgs>): ApiHandler<TResult, TArgs> {
  return async (...args: TArgs): Promise<TResult> => {
    try {
      const path =
        typeof endpoint === 'function' ? endpoint(...args) : endpoint;
      const url = `${baseUrl}${path}`;
      const response = await fetch(url, init);

      if (response.status === 404) {
        throw new ApiError(`Not found: ${url}`, 404);
      }

      if (!response.ok) {
        throw new ApiError(`Invalid response from ${url}`, response.status);
      }

      const json = (await response.json()) as TResult | ApiResponse<TResult>;

      if (json && typeof json === 'object' && 'data' in json) {
        return (json as ApiResponse<TResult>).data;
      }

      return json as TResult;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError('Internal server error', 500, error);
    }
  };
}
