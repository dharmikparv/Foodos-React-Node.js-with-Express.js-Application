// Page title and optional subtitle
export default function PageHeader({ title, subtitle, className = '' }) {
  return (
    <div className={className}>
      <h1 className="font-display font-bold text-2xl sm:text-3xl text-stone-900 mb-2">
        {title}
      </h1>
      {subtitle && <p className="text-stone-500 mb-6 sm:mb-8">{subtitle}</p>}
    </div>
  );
}
