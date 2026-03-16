/**
 * Cart line item: image, name, price, quantity controls, line total, remove button.
 */
import { useCart } from '../store/CartContext';
import { formatCurrency } from '../utils/format';

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 sm:p-5 bg-white rounded-xl border border-stone-100"
      data-testid="cart-item"
    >
      <div className="flex gap-4 sm:flex-1 min-w-0">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <h4 className="font-semibold text-stone-900 text-base sm:text-lg">{item.name}</h4>
            <p className="text-primary-600 font-medium text-sm mt-0.5">
              {formatCurrency(item.price)} each
            </p>
          </div>
          <div className="flex items-center gap-2 mt-3 sm:mt-2">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-9 h-9 sm:w-8 sm:h-8 rounded-lg border border-stone-200 flex items-center justify-center hover:bg-stone-50 font-medium text-lg sm:text-base leading-none transition"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span
              className="min-w-[2.5rem] text-center font-semibold"
              data-testid="cart-item-qty"
            >
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-9 h-9 sm:w-8 sm:h-8 rounded-lg border border-stone-200 flex items-center justify-center hover:bg-stone-50 font-medium text-lg sm:text-base leading-none transition"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between sm:justify-end gap-4 border-t border-stone-100 pt-4 sm:pt-0 sm:border-t-0 sm:min-w-[120px]">
        <span className="font-semibold text-lg sm:text-base">
          {formatCurrency(item.price * item.quantity)}
        </span>
        <button
          onClick={() => removeItem(item.id)}
          className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition -mr-2 sm:mr-0"
          aria-label="Remove item"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
