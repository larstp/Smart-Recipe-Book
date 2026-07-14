import { useEffect, useState } from 'react';
import { useAuth } from '../context/useAuth';
import { getFullPantry } from '../services/api/pantry';
import { normalizedVariants } from '../lib/helpers/normalizedVariants';
import { Button } from '../components/Button';
import { Badge } from '../components/badge/Badge';
import type { PantryItem } from '../services/models';
import { Modal } from '../components/Modal';
import { PantryItemForm } from '../components/PantryItemForm';

const panelClassName =
  'rounded-2xl border border-gray-200 bg-white/90 p-4 shadow-sm sm:p-6 lg:p-8';

export default function Pantry() {
  const { user } = useAuth();

  const [pantry, setPantry] = useState<PantryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedPantryItemIds, setSelectedPantryItemIds] = useState<string[]>(
    [],
  );

  const [preferences, setPreferences] = useState('');
  const [category, setCategory] = useState('');

  const numberOfPantryItems = pantry.length;

  useEffect(() => {
    const fetchPantry = async () => {
      setLoading(true);
      setError(null);

      try {
        const items = await getFullPantry();
        setPantry(items);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'An unknown error occurred',
        );
      } finally {
        setLoading(false);
      }
    };

    void fetchPantry();
  }, []);

  const groupByCategory = (items: PantryItem[]) => {
    return items.reduce<Record<string, PantryItem[]>>((acc, item) => {
      const itemCategory = item.category;

      if (!acc[itemCategory]) {
        acc[itemCategory] = [];
      }

      acc[itemCategory].push(item);

      return acc;
    }, {});
  };

  const groupedItems = groupByCategory(pantry);
  const groups = Object.entries(groupedItems);

  const areAllItemsSelected =
    pantry.length > 0 && selectedPantryItemIds.length === pantry.length;

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handlePantryItemAdded = (item: PantryItem) => {
    setPantry((previousPantry) => [...previousPantry, item]);
    setModalOpen(false);
  };

  const handleTogglePantryItem = (itemId: string) => {
    setSelectedPantryItemIds((previousIds) => {
      const isAlreadySelected = previousIds.includes(itemId);

      if (isAlreadySelected) {
        return previousIds.filter((id) => id !== itemId);
      }

      return [...previousIds, itemId];
    });
  };

  const handleToggleAllItems = () => {
    if (areAllItemsSelected) {
      setSelectedPantryItemIds([]);
      return;
    }

    setSelectedPantryItemIds(pantry.map((item) => item.id));
  };

  const handleGenerateRecipe = () => {
    const payload = {
      pantryItemIds: selectedPantryItemIds,
      preferences: preferences.trim() || undefined,
      category: category || undefined,
    };

    console.log('Generate recipe payload:', payload);
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-6 sm:px-6">
        <div className="flex items-center justify-center py-20">
          <div className="flex items-center gap-4 rounded-full border border-orange-100 bg-orange-50 px-6 py-4 text-orange-700 shadow-sm">
            <p className="text-sm font-medium">Log in to view your pantry.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add items to your pantry"
      >
        <PantryItemForm onSuccess={handlePantryItemAdded} />
      </Modal>

      <main className="container mx-auto px-4 py-6 sm:px-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Pantry
            </h1>

            <p className="mt-2 text-gray-600">
              {numberOfPantryItems}{' '}
              {numberOfPantryItems === 1 ? 'item' : 'items'} in stock
            </p>
          </div>

          <Button
            className="w-full cursor-pointer bg-(--brand)! hover:brightness-90 sm:w-auto"
            onClick={handleOpenModal}
          >
            + Add Item
          </Button>
        </header>

        {error && (
          <div
            className={`${panelClassName} mt-6 border-red-200 bg-red-50`}
            role="alert"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 font-bold text-red-700">
                !
              </div>

              <div className="flex-1">
                <p className="font-semibold text-red-900">
                  Error loading pantry
                </p>

                <p className="mt-1 text-sm text-red-700">{error}</p>

                <p className="mt-2 text-sm text-red-600">
                  Try refreshing the page or check your API connection.
                </p>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-4 rounded-full border border-orange-100 bg-orange-50 px-6 py-4 text-orange-700 shadow-sm">
              <div
                className="h-4 w-4 animate-spin rounded-full border-2 border-orange-200 border-t-orange-500"
                aria-hidden="true"
              />

              <p className="text-sm font-medium">Loading pantry...</p>
            </div>
          </div>
        )}

        {!loading && !error && numberOfPantryItems === 0 && (
          <div className={`${panelClassName} mt-6 text-center`}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
              Empty kitchen
            </p>

            <h2 className="mt-3 text-2xl font-bold text-gray-900">
              No pantry items yet
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-gray-600">
              Once there are items in the pantry, they will appear here in a
              tidy grid. Feel free to add some!
            </p>
          </div>
        )}

        {!loading && !error && numberOfPantryItems > 0 && (
          <>
            <section className="mt-8">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Select pantry items
                  </h2>

                  <p className="mt-1 text-sm text-gray-600">
                    Choose the ingredients you want the AI to use.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleToggleAllItems}
                  className="self-start text-sm font-semibold text-orange-600 transition hover:text-orange-700"
                >
                  {areAllItemsSelected ? 'Clear selection' : 'Select all'}
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
                {groups.map(([groupCategory, groupItems]) => {
                  const { categoryKey, categoryClass } = normalizedVariants(
                    undefined,
                    groupItems[0] ?? null,
                  );

                  const displayedCategory =
                    categoryKey ||
                    groupCategory.charAt(0).toUpperCase() +
                      groupCategory.slice(1);

                  return (
                    <section
                      key={groupCategory}
                      className="rounded-xl border border-gray-200 bg-gray-50/50 p-4"
                    >
                      <h3 className="text-lg font-semibold text-gray-900">
                        {displayedCategory}
                      </h3>

                      <div className="mt-3 grid gap-3">
                        {groupItems.map((item) => {
                          const isSelected = selectedPantryItemIds.includes(
                            item.id,
                          );

                          return (
                            <div
                              key={item.id}
                              className={`w-full rounded-xl border-2 p-4 transition sm:p-5 ${
                                isSelected
                                  ? 'border-orange-400 bg-orange-50'
                                  : 'border-gray-100 bg-white hover:border-gray-200'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <label className="flex min-w-0 cursor-pointer items-start gap-3">
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() =>
                                      handleTogglePantryItem(item.id)
                                    }
                                    className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-gray-300 accent-orange-500"
                                  />

                                  <span className="min-w-0">
                                    <span className="block break-words font-medium text-gray-900">
                                      {item.name}
                                    </span>

                                    <span className="mt-1 block text-sm text-gray-600">
                                      {item.quantity} {item.unit}
                                    </span>
                                  </span>
                                </label>

                                <div className="flex shrink-0 items-center gap-3">
                                  <button
                                    type="button"
                                    aria-label={`Edit ${item.name}`}
                                    className="cursor-pointer rounded p-1 transition hover:bg-gray-100"
                                  >
                                    <img
                                      src="/icons/black/lucide_pen.svg"
                                      alt=""
                                      className="h-4 w-4"
                                    />
                                  </button>

                                  <button
                                    type="button"
                                    aria-label={`Delete ${item.name}`}
                                    className="cursor-pointer rounded p-1 transition hover:bg-orange-50"
                                  >
                                    <img
                                      src="/icons/orange/lucide_trash-2.svg"
                                      alt=""
                                      className="h-4 w-4"
                                    />
                                  </button>
                                </div>
                              </div>

                              <div className="mt-3 pl-7">
                                <Badge
                                  text={categoryKey}
                                  classes={categoryClass}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  );
                })}
              </div>
            </section>

            <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-orange-500">
                  AI recipe generator
                </p>

                <h2 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                  Generate a recipe from your pantry
                </h2>

                <p className="mt-2 max-w-2xl text-sm text-gray-600">
                  Select pantry items, add optional preferences and choose a
                  meal category.
                </p>
              </div>

              <div className="mt-5 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-700">
                Selected ingredients:{' '}
                <span className="font-semibold">
                  {selectedPantryItemIds.length}
                </span>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="recipe-preferences"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Preferences
                  <span className="ml-1 font-normal text-gray-500">
                    (optional)
                  </span>
                </label>

                <textarea
                  id="recipe-preferences"
                  value={preferences}
                  onChange={(event) => setPreferences(event.target.value)}
                  placeholder="E.g. quick and healthy, high protein, vegetarian..."
                  rows={4}
                  className="w-full resize-none rounded-xl border border-gray-300 px-3 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />
              </div>

              <div className="mt-4">
                <label
                  htmlFor="recipe-category"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Category
                  <span className="ml-1 font-normal text-gray-500">
                    (optional)
                  </span>
                </label>

                <select
                  id="recipe-category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-3 text-sm text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                >
                  <option value="">Any category</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Snack</option>
                  <option value="dessert">Dessert</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleGenerateRecipe}
                disabled={selectedPantryItemIds.length === 0}
                className="mt-6 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-3 text-sm font-semibold text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Generate Recipe
              </button>
            </section>
          </>
        )}
      </main>
    </>
  );
}
