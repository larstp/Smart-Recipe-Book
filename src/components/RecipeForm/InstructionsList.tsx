import { useRef, useState } from 'react';
import { Input } from './Input';
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

  return (
    <div className="grid gap-2">
      <ol className="ml-4 list-decimal">
        {rows.map(({ rowId }) => (
          <div key={rowId} className="grid grid-cols-1 items-center">
            <li key={rowId}>
              <Input
                id={`instructions-${rowId}`}
                type="text"
                name={`instructions-${rowId}`}
              />
            </li>

            <Button
              type="button"
              onClick={() => removeInput(rowId)}
              className="bg-transparent w-fit justify-self-end"
            >
              <img src="/Trash-icon.png" alt="Trash" className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </ol>

      <Button
        type="button"
        onClick={addInput}
        className="bg-green-600 text-sm w-fit"
      >
        Add Instruction
      </Button>
    </div>
  );
};
