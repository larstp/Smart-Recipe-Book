export async function createApiKey(token: string) {
  const response = await fetch(
    'https://v2.api.noroff.dev/auth/create-api-key',
    {
      method: 'POST',

      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        name: 'smart-recipe-book',
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.errors?.[0]?.message || 'Failed to create API key');
  }

  return data;
}
