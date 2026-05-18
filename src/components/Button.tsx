interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The visual style variant of the button. @default 'primary' */
  variant?: 'primary' | 'secondary';
}

/**
 * A reusable button component with primary and secondary style variants.
 *
 * @param props - Standard button HTML attributes plus custom variant styling.
 */
export function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const base = 'px-6 py-3 rounded-lg transition-colors font-medium';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
