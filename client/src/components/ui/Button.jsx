// Button or Link styled as button (variants: primary, secondary, ghost, link)
import { Link } from 'react-router-dom';

const variants = {
  primary:
    'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition disabled:opacity-50 disabled:cursor-not-allowed',
  secondary:
    'inline-flex items-center justify-center gap-2 px-6 py-3 text-stone-600 hover:text-stone-800 font-medium transition',
  ghost:
    'inline-flex items-center justify-center gap-2 px-6 py-3 text-stone-500 hover:text-stone-700 font-medium transition',
  link: 'text-primary-600 hover:underline font-medium',
};

export default function Button({
  to,
  variant = 'primary',
  type = 'button',
  disabled = false,
  children,
  className = '',
  ...rest
}) {
  const base = variants[variant] ?? variants.primary;

  if (to) {
    return (
      <Link to={to} className={`${base} ${className}`.trim()} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${base} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
}
