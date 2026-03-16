/**
 * App shell: header (logo, nav, cart badge), main content, footer.
 */
import { Link } from 'react-router-dom';
import { useCart } from '../store/CartContext';

export default function Layout({ children }) {
  const { totalItems } = useCart();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <Link
              to="/"
              className="font-display font-bold text-lg sm:text-xl text-primary-600 hover:text-primary-700 shrink-0"
            >
              Foodos
            </Link>
            <nav className="flex items-center gap-2 sm:gap-4 md:gap-6 min-w-0">
              <Link
                to="/"
                className="text-stone-600 hover:text-stone-900 font-medium text-sm sm:text-base transition whitespace-nowrap"
              >
                Menu
              </Link>
              <Link
                to="/orders"
                className="text-stone-600 hover:text-stone-900 font-medium text-sm sm:text-base transition whitespace-nowrap"
              >
                My Orders
              </Link>
              <Link
                to="/cart"
                className="relative inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg bg-primary-50 text-primary-700 font-medium hover:bg-primary-100 transition text-sm sm:text-base shrink-0"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Cart</span>
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 min-w-[18px] h-[18px] sm:min-w-[20px] sm:h-5 px-1 flex items-center justify-center rounded-full bg-primary-500 text-white text-[10px] sm:text-xs font-bold">
                    {totalItems}
                  </span>
                )}
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {children}
      </main>
      <footer className="bg-stone-100 border-t border-stone-200 py-4 sm:py-6">
        <div className="max-w-6xl mx-auto px-3 sm:px-4">
          <p className="text-center text-stone-500 text-xs sm:text-sm">
            © {new Date().getFullYear()} Foodos - Order Management
          </p>
        </div>
      </footer>
    </div>
  );
}
