/**
 * Menu page: fetch menu, filter by type/category, render grid of MenuItem cards.
 */
import { useState } from 'react';
import { useMenu } from '../hooks';
import { filterMenuItems, MENU_FILTERS } from '../utils/menuFilters';
import MenuItem from '../components/MenuItem';
import {
  LoadingSpinner,
  ErrorMessage,
  PageHeader,
} from '../components/ui';

export default function MenuPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const { items, loading, error } = useMenu();
  const filteredItems = filterMenuItems(items, activeFilter);

  if (loading) return <LoadingSpinner />;
  if (error) {
    return (
      <ErrorMessage
        message={`Failed to load menu: ${error}. Make sure the backend is running on port 3001.`}
      />
    );
  }

  return (
    <div>
      <PageHeader
        title="Our Menu"
        subtitle="Add items to your cart and proceed to checkout when you're ready."
      />

      <div
        className="flex flex-wrap gap-2 mb-8"
        role="group"
        aria-label="Menu filters"
      >
        {MENU_FILTERS.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              activeFilter === filter.id
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-white text-stone-600 border border-stone-200 hover:border-primary-300 hover:bg-primary-50'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        data-testid="menu-list"
      >
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => <MenuItem key={item.id} item={item} />)
        ) : (
          <p className="col-span-full text-center py-12 text-stone-500">
            No items match this filter.
          </p>
        )}
      </div>
    </div>
  );
}
