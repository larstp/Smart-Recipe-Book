type EndpointResolver<TArgs extends unknown[]> =
  | string
  | ((...args: TArgs) => string);

export type ApiConfig<TArgs extends unknown[] = []> = {
  endpoint: EndpointResolver<TArgs>;
  init?: RequestInit;
  baseUrl?: string;
};

export type ApiHandler<TResult, TArgs extends unknown[] = []> = (
  ...args: TArgs
) => Promise<TResult>;

export type ApiResponse<T> = {
  data: T;
  meta?: unknown;
};
