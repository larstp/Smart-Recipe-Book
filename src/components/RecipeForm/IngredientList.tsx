import { useRef, useState } from 'react';
import { Input } from './Input';
import { Select } from './Select';
import { Button } from '../Button';

type IngredientRow = {
  rowId: number;
};

export const IngredientList = () => {
  const nextId = useRef(1);
  const [rows, setRows] = useState<IngredientRow[]>([{ rowId: 0 }]);

  const addInput = () => {
    const id = nextId.current++;
    setRows((previous) => [...previous, { rowId: id }]);
  };

  const removeInput = (rowId: number) => {
    setRows((previous) => previous.filter((row) => row.rowId !== rowId));
  };

  return (
    <div className="grid gap-2">
      {rows.map(({ rowId }) => (
        <div
          key={rowId}
          className="grid grid-cols-1 items-center rounded-lg bg-gray-100 p-2"
        >
          <div key={rowId} className="grid grid-cols-1 gap-2 items-center">
            <Input
              id={`name-${rowId}`}
              type="text"
              name={`name-${rowId}`}
              label="Name"
              className="border-b"
            />
            <Input
              id={`quantity-${rowId}`}
              type="number"
              name={`quantity-${rowId}`}
              label="Quantity"
              className="border-b"
            />
            <Select
              id={`unit-${rowId}`}
              name={`unit-${rowId}`}
              label="Unit"
              options={['piece', 'g', 'ml', 'cup', 'tbsp', 'tsp', 'oz', 'lb']}
              classes="w-fit border"
            />

            <Button
              disabled={rows.length === 1}
              onClick={() => removeInput(rowId)}
              className="bg-transparent hover:bg-red-300 w-fit justify-self-end disabled:opacity-40"
            >
              <img src="/Trash-icon.png" alt="Trash" className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}

      <Button
        type="button"
        onClick={addInput}
        className="bg-green-600 hover:bg-green-500 text-sm w-fit"
      >
        Add Ingredient
      </Button>
    </div>
  );
};
