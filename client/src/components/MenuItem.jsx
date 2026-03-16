/**
 * Single menu item card: image, name, type indicator, price, quantity input, Add to Cart.
 */
import { useState } from 'react';
import { useCart } from '../store/CartContext';
import { formatCurrency } from '../utils/format';

export default function MenuItem({ item }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  const handleAdd = () => {
    addItem(item, qty);
    setQty(1);
  };

  return (
    <article
      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-lg hover:border-primary-100 transition-all duration-300"
      data-testid="menu-item"
    >
      <div className="aspect-[4/3] overflow-hidden bg-stone-100">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-display font-semibold text-lg text-stone-900">
            {item.name}
          </h3>
          {item.type && (
            <span
              className={`w-2 h-2 rounded-full flex-shrink-0 ${
                item.type === 'veg' ? 'bg-green-500' : 'bg-red-500'
              }`}
              title={item.type === 'veg' ? 'Vegetarian' : 'Non-vegetarian'}
              aria-hidden
            />
          )}
        </div>
        <p className="text-stone-500 text-sm mb-3 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-primary-600">{formatCurrency(item.price)}</span>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              max={99}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value) || 1)}
              className="w-14 px-2 py-1 text-center text-sm border border-stone-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              aria-label="Quantity"
            />
            <button
              onClick={handleAdd}
              className="px-4 py-2 rounded-xl bg-primary-500 text-white font-medium text-sm hover:bg-primary-600 active:scale-95 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
