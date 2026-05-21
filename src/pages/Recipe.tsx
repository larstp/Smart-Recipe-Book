import { Link } from 'react-router-dom';

export default function Recipe() {
  return (
    <main className="container mx-auto p-6">
      <Link
        to="/"
        className="inline-block mb-4 text-orange-500 hover:text-orange-600 font-medium"
      >
        ← Back to Home
      </Link>
      <h1 className="text-2xl font-bold">Recipe Detail</h1>
      <p className="mt-2 text-gray-600">Placeholder Recipe detail page.</p>
    </main>
  );
}
