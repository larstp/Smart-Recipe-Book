import type { ApiConfig, ApiHandler, ApiResponse } from '../types';
import { ApiError } from '../apiError';
import { BASE_URL } from '../config';

/**
 * Creates an API handler function that wraps a fetch request with error handling and optional init customization.
 * @param config - The API configuration options.
 * @returns An API handler function that can be used to make fetch requests with type-safe results.
 */
export function withApiHandler<TResult, TArgs extends unknown[] = []>({
  endpoint,
  init,
  baseUrl = BASE_URL,
}: ApiConfig<TArgs>): ApiHandler<TResult, TArgs> {
  return async (...args: TArgs): Promise<TResult> => {
    try {
      // construct the url and resolved init that we're
      // going to pass to fetch
      const path =
        typeof endpoint === 'function' ? endpoint(...args) : endpoint;
      const resolvedInit = typeof init === 'function' ? init(...args) : init;
      const url = `${baseUrl}${path}`;

      // make the fetch request with the resolved url and init
      const response = await fetch(url, resolvedInit);

      if (response.status === 404) {
        throw new ApiError(`Not found: ${url}`, 404);
      }

      if (!response.ok) {
        const text = await response.text();
        throw new ApiError(text, response.status, text);
      }

      if (response.status === 204 || response.status === 205) {
        return undefined as TResult;
      }

      const text = await response.text();
      if (!text) {
        return undefined as TResult;
      }

      // parse the JSON and type it
      const json = JSON.parse(text) as TResult | ApiResponse<TResult>;

      // parse the response as JSON and type it
      // const json = (await response.json()) as TResult | ApiResponse<TResult>;

      // return the data field if it exists, otherwise return the json as-is
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
