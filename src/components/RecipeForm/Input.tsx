type InputProps = {
  id: string;
  type: string;
  name: string;
  label?: string;
  classes?: string;
  error?: string;
};

export const Input = ({
  id,
  type,
  name,
  label,
  classes,
  error,
}: InputProps) => {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="font-semibold text-sm">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={name}
        className={`bg-gray-100 rounded-lg p-1 ${classes}`}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};
