type SelectProps = {
  id: string;
  name: string;
  label: string;
  classes?: string;
  options: string[];
  error?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = ({
  id,
  name,
  label,
  classes,
  options,
  error,
  ...props
}: SelectProps) => {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="font-semibold text-sm">
        {label}
      </label>
      <select
        id={id}
        name={name}
        className={`bg-gray-100 rounded-lg p-1.5 ${classes}`}
        {...props}
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
