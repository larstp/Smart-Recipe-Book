type InputProps = {
  id: string;
  type: string;
  name: string;
  label?: string;
  value?: string;
  classes?: string;
  error?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  props?: React.InputHTMLAttributes<HTMLInputElement>;
};

export const Input = ({
  id,
  type,
  name,
  label,
  value,
  classes,
  error,
  onChange,
  onKeyDown,
  props,
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
        value={value}
        className={`bg-gray-100 rounded-lg p-1 ${classes}`}
        onChange={onChange}
        onKeyDown={onKeyDown}
        {...props}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};
