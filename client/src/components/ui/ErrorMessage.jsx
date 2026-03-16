// Inline error message with optional back link (e.g. API errors)
import { Link } from 'react-router-dom';

export default function ErrorMessage({ message, backTo = '/', backLabel = 'Back to Menu' }) {
  return (
    <div className="p-6 rounded-xl bg-red-50 border border-red-200 text-red-700">
      <p>{message}</p>
      {backTo && (
        <Link
          to={backTo}
          className="block mt-4 text-primary-600 hover:underline font-medium"
        >
          {backLabel}
        </Link>
      )}
    </div>
  );
}
