type BadgeProps = {
  text: string;
  close?: boolean;
  onClick?: () => void;
  classes?: string;
  variant?: 'destructive' | 'warning' | 'success' | 'default';
};

export const Badge = ({
  text,
  close,
  onClick,
  classes,
  variant,
}: BadgeProps) => {
  return (
    <span
      onClick={onClick}
      className={`${classes} w-fit p-2 pt-1 pb-1 rounded-full text-xs
        ${
          variant === 'destructive'
            ? 'bg-red-100 text-red-700'
            : variant === 'warning'
              ? 'bg-yellow-100 text-yellow-700'
              : variant === 'success'
                ? 'bg-green-100 text-green-700'
                : variant === 'default'
                  ? 'bg-gray-100 text-gray-700'
                  : ''
        }`}
    >
      {text}
      {close && <span className="ml-2">&times;</span>}
    </span>
  );
};
