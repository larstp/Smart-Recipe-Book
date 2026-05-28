type ApiErrorItem = {
  message?: string;
  path?: Array<string | number>;
  status?: number;
};

type ApiErrorPayload = {
  errors?: ApiErrorItem[];
};

export const getApiMessage = (
  apiErrors: string[],
  fieldName: string,
): string | undefined => {
  const rawError = apiErrors[0];
  if (!rawError) return undefined;

  let parsed: ApiErrorPayload | null = null;

  try {
    parsed = JSON.parse(rawError) as ApiErrorPayload;
  } catch {
    // in cases where we dont get JSON we've got nothing to map
    return undefined;
  }

  if (!parsed?.errors?.length) return undefined;

  const match = parsed.errors.find((e) => {
    const path = e.path?.[0];
    return typeof path === 'string' && path === fieldName;
  });

  return match?.message;
};
