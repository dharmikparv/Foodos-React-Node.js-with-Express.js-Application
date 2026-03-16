/**
 * Cart page: list cart items, summary, proceed to checkout. Empty state when no items.
 */
import { useCart } from '../store/CartContext';
import { formatCurrency } from '../utils/format';
import { formatItemCount } from '../utils/orderHelpers';
import CartItem from '../components/CartItem';
import { PageHeader, Button, EmptyState } from '../components/ui';

const CartIcon = () => (
  <svg
    className="w-10 h-10"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

export default function CartPage() {
  const { cart, totalPrice, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <EmptyState
        icon={<CartIcon />}
        title="Your cart is empty"
        description="Add some delicious items from our menu."
        actionLabel="Browse Menu"
        actionTo="/"
      />
    );
  }

  return (
    <div>
      <PageHeader
        title="Your Cart"
        subtitle={formatItemCount(totalItems) + ' in your cart'}
      />

      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
        <div className="flex-1 min-w-0 space-y-4">
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <aside className="lg:w-80 flex-shrink-0 w-full" aria-label="Order summary">
          <div className="sticky top-20 lg:top-24 p-4 sm:p-6 bg-white rounded-2xl border border-stone-200 shadow-sm">
            <h3 className="font-display font-semibold text-lg mb-4">Order Summary</h3>
            <div className="flex justify-between text-stone-600 mb-2">
              <span>Subtotal</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-stone-200">
              <span>Total</span>
              <span className="text-primary-600">{formatCurrency(totalPrice)}</span>
            </div>
            <Button
              to="/checkout"
              variant="primary"
              className="mt-6 w-full"
            >
              Proceed to Checkout
            </Button>
            <Button
              to="/"
              variant="ghost"
              className="mt-3 w-full"
            >
              Continue Shopping
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
