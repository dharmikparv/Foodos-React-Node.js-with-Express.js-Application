// Empty state: optional icon, title, description, and CTA button
import Button from './Button';

export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionTo,
  className = '',
}) {
  return (
    <div
      className={`text-center py-16 ${className}`.trim()}
      role="status"
      aria-label={`${title}. ${description ?? ''}`}
    >
      {icon && (
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-stone-100 text-stone-400 mb-4">
          {icon}
        </div>
      )}
      <h2 className="font-display font-semibold text-xl text-stone-800 mb-2">{title}</h2>
      {description && <p className="text-stone-500 mb-6">{description}</p>}
      <Button to={actionTo} variant="primary">
        {actionLabel}
      </Button>
    </div>
  );
}
