import { useState } from 'react';

type SelectProps = {
  id: string;
  name: string;
  label: string;
  classes?: string;
  options: string[];
  error?: string;
};

export const Select = ({
  id,
  name,
  label,
  classes,
  options,
  error,
}: SelectProps) => {
  const [value, setValue] = useState('');

  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="font-semibold text-sm">
        {label}
      </label>
      <select
        id={id}
        name={name}
        className={`bg-gray-100 rounded-lg p-1.5 ${classes}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        <option value="">Select...</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};
