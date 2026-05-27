import type { ApiError } from '../services/apiError';

export default function NotFound({ error }: { error: ApiError }) {
  return (
    <div className="container mx-auto p-6 border border-red-500 bg-red-200 text-red-700 rounded-lg">
      <h2>
        <strong>
          This recipe was not found, please check the URL and try again.
        </strong>{' '}
        {error.message}
      </h2>
    </div>
  );
}
