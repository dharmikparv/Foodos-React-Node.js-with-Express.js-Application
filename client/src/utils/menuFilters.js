/**
 * Menu filtering: filter config (type/category) and client-side filter function.
 */

export const MENU_FILTERS = [
  { id: 'all', label: 'All', type: null, category: null },
  { id: 'veg', label: 'Veg', type: 'veg', category: null },
  { id: 'non-veg', label: 'Non-Veg', type: 'non-veg', category: null },
  { id: 'pizza', label: 'Pizza', type: null, category: 'pizza' },
  { id: 'burger', label: 'Burger', type: null, category: 'burger' },
  { id: 'tacos', label: 'Tacos', type: null, category: 'tacos' },
  { id: 'salad', label: 'Salad', type: null, category: 'salad' },
  { id: 'seafood', label: 'Seafood', type: null, category: 'seafood' },
  { id: 'pasta', label: 'Pasta', type: null, category: 'pasta' },
];

export function filterMenuItems(items, activeFilter) {
  if (!activeFilter || activeFilter === 'all') return items;
  const filter = MENU_FILTERS.find((f) => f.id === activeFilter);
  if (!filter) return items;
  return items.filter((item) => {
    if (filter.type) return (item.type || '').toLowerCase() === filter.type;
    if (filter.category) return (item.category || '').toLowerCase() === filter.category;
    return true;
  });
}
