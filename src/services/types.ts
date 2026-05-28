type EndpointResolver<TArgs extends unknown[]> =
  | string
  | ((...args: TArgs) => string);

type InitResolver<TArgs extends unknown[]> =
  | RequestInit
  | ((...args: TArgs) => RequestInit);

export type ApiConfig<TArgs extends unknown[] = []> = {
  endpoint: EndpointResolver<TArgs>;
  init?: InitResolver<TArgs>;
  baseUrl?: string;
};

export type ApiHandler<TResult, TArgs extends unknown[] = []> = (
  ...args: TArgs
) => Promise<TResult>;

export type ApiResponse<T> = {
  data: T;
  meta?: unknown;
};
