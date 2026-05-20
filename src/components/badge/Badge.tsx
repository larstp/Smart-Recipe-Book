type BadgeProps = {
  text: string;
  classes?: string;
  variant?: 'destructive' | 'warning' | 'success' | 'default';
};

export const Badge = ({ text, classes, variant }: BadgeProps) => {
  return (
    <span
      className={`${classes} p-2 pt-1 pb-1 rounded-full text-xs
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
    </span>
  );
};
