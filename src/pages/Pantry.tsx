import { useState, useEffect } from 'react';
import { useAuth } from '../context/useAuth';
import { getFullPantry } from '../services/api/pantry';
// import { pantryMock } from '../services/mockData/pantryItemsMock';
import { normalizedVariants } from '../lib/helpers/normalizedVariants';
import { Button } from '../components/Button';
import { Badge } from '../components/badge/Badge';
import type { Pantry, PantryItem } from '../services/models';

const panelClassName =
  'rounded-2xl border border-gray-200 bg-white/90 p-8 shadow-sm';

export default function Pantry() {
  const { user } = useAuth();
  const [pantry, setPantry] = useState<Pantry>({} as Pantry);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPantry = async () => {
      setLoading(true);
      setError(null);

      try {
        const items = await getFullPantry();

        // For testing UI as user w/ pantry items
        // const items = pantryMock;

        // type error here is expected when using mock data, not an issue in production
        setPantry(items);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'An unknown error occurred',
        );
      } finally {
        setLoading(false);
      }
    };
    fetchPantry();
  }, []);

  if (!user) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center py-20">
          <div className="flex items-center gap-4 rounded-full border border-orange-100 bg-orange-50 px-6 py-4 text-orange-700 shadow-sm">
            <p className="text-sm font-medium">Log in to view your pantry.</p>
          </div>
        </div>
      </div>
    );
  }

  const items = pantry?.items ?? [];
  const isOwner = items.some((item) => item.owner?.email === user.email);
  const numberOfItems = items.length;

  const handleAddItem = () => {
    // placeholder for next feature
    console.log('Add item clicked');
  };

  const groupByCategory = (items: PantryItem[]) => {
    return items.reduce(
      (acc, item) => {
        const category = item.category;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(item);
        return acc;
      },
      {} as Record<string, PantryItem[]>,
    );
  };

  const groupedItems = groupByCategory(items);
  const groups = Object.entries(groupedItems) as [string, PantryItem[]][];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Pantry</h1>
      <p className="mt-2 text-gray-600">{numberOfItems} items in stock</p>

      <Button
        className="flex justify-self-end m-2 bg-(--brand)! hover:brightness-90 cursor-pointer"
        onClick={handleAddItem}
      >
        + Add Item
      </Button>

      {error && (
        <div className={`${panelClassName} mb-6 border-red-200 bg-red-50`}>
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700">
              !
            </div>
            <div className="flex-1">
              <p className="font-semibold text-red-900">Error loading pantry</p>
              <p className="mt-1 text-sm text-red-700">{error}</p>
              <p className="mt-2 text-sm text-red-600">
                Try refreshing the page or check your API connection.
              </p>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="flex items-center gap-4 rounded-full border border-orange-100 bg-orange-50 px-6 py-4 text-orange-700 shadow-sm">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-orange-200 border-t-orange-500"></div>
            <p className="text-sm font-medium">Loading pantry...</p>
          </div>
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className={`${panelClassName} mb-6 text-center`}>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            Empty kitchen
          </p>
          <h2 className="mt-3 text-2xl font-bold text-gray-900">
            No pantry items yet
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-gray-600">
            Once there are items in the pantry, they will appear here in a tidy
            grid. Feel free to add some!
          </p>
        </div>
      )}

      {!loading && !error && pantry && isOwner && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 justify-items-center">
          {groups.map(([category, groupItems]) => {
            const { categoryKey, categoryClass } = normalizedVariants(
              undefined,
              groupItems[0] ?? null,
            );

            return (
              <section key={category} className="p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold">
                  {categoryKey ||
                    category.charAt(0).toUpperCase() + category.slice(1)}
                </h3>

                <div className="grid gap-2">
                  {groupItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-6 w-80 h-40 bg-white rounded-lg border-2 border-gray-100"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex gap-2 items-center">
                          <input type="checkbox" value={item.name} />
                          <h2 key={item.id}>{item.name}</h2>
                        </div>

                        <div className="flex gap-2 items-center">
                          <img
                            src="/icons/black/lucide_pen.svg"
                            alt="Edit icon"
                            className="w-4 h-4 hover:scale-105 cursor-pointer"
                          />

                          <img
                            src="/icons/orange/lucide_trash-2.svg"
                            alt="Trash icon"
                            className="w-4 h-4 hover:scale-105 cursor-pointer"
                          />
                        </div>
                      </div>

                      <div className="pl-6">
                        <p className="mb-2">
                          {item.quantity} {item.unit}
                        </p>

                        <Badge
                          key="category"
                          text={categoryKey}
                          classes={`${categoryClass}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
