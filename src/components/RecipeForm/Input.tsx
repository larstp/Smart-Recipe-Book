type InputProps = {
  label?: string;
  classes?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({
  id,
  name,
  label,
  classes,
  error,
  ...props
}: InputProps) => {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="font-semibold text-sm">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={props.type ?? 'text'}
        placeholder={
          props.placeholder ?? (typeof name === 'string' ? name : '')
        }
        className={`bg-gray-100 rounded-lg p-1 ${classes}`}
        {...props}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};
