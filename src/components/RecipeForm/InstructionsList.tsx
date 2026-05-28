import { useRef, useState } from 'react';
import { Button } from '../Button';

type InstructionsRow = {
  rowId: number;
};

export const InstructionsList = () => {
  const nextId = useRef(1);
  const [rows, setRows] = useState<InstructionsRow[]>([{ rowId: 0 }]);

  const addInput = () => {
    const id = nextId.current++;
    setRows((previous) => [...previous, { rowId: id }]);
  };

  const removeInput = (rowId: number) => {
    setRows((previous) => previous.filter((row) => row.rowId !== rowId));
  };

  const moveRow = (rowId: number, direction: -1 | 1) => {
    setRows((prev) => {
      const index = prev.findIndex((row) => row.rowId === rowId);
      const target = index + direction;

      if (index < 0 || target < 0 || target >= prev.length) return prev;

      const updated = [...prev];
      [updated[index], updated[target]] = [updated[target], updated[index]];
      return updated;
    });
  };

  return (
    <div className="grid gap-2">
      <ol className="grid gap-2 items-center">
        {rows.map(({ rowId }, index) => {
          const isFirst = index === 0;
          const isLast = index === rows.length - 1;
          const fieldName = `instructions-${index}`;

          return (
            <li key={rowId} className="rounded-lg bg-gray-100 p-2">
              <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2">
                <span className="mt-2 text-sm font-semibold text-gray-600">
                  {index + 1}.
                </span>

                <textarea
                  id={fieldName}
                  name={fieldName}
                  className="w-full border-b rounded-none"
                  aria-label={`Instruction step ${index + 1}`}
                />

                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    onClick={() => moveRow(rowId, -1)}
                    disabled={isFirst}
                    className="px-2 py-1 bg-transparent hover:bg-gray-200 disabled:opacity-40"
                    aria-label={`Move instruction ${index + 1} up`}
                    title="Move up"
                  >
                    <img
                      src="/Arrow_up.png"
                      alt="Arrow up"
                      className="w-4 h-4"
                    />
                  </Button>

                  <Button
                    type="button"
                    onClick={() => moveRow(rowId, 1)}
                    disabled={isLast}
                    className="px-2 py-1 bg-transparent hover:bg-gray-200 disabled:opacity-40"
                    aria-label={`Move instruction ${index + 1} down`}
                    title="Move down"
                  >
                    <img
                      src="/Arrow_down.png"
                      alt="Arrow down"
                      className="w-4 h-4"
                    />
                  </Button>

                  <Button
                    type="button"
                    onClick={() => removeInput(rowId)}
                    disabled={rows.length === 1}
                    className="px-2 py-1 bg-transparent hover:bg-red-300 disabled:opacity-40"
                    aria-label={`Remove instruction ${index + 1}`}
                    title="Remove step"
                  >
                    <img
                      src="/Trash-icon.png"
                      alt="Trash"
                      className="w-4 h-4"
                    />
                  </Button>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <Button
        type="button"
        onClick={addInput}
        className="bg-green-600 hover:bg-green-500 text-sm w-fit"
      >
        + Add Instruction
      </Button>
    </div>
  );
};
