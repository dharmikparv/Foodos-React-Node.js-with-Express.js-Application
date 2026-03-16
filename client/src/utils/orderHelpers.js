/**
 * Order helpers: status badge styles, totals, item counts, and pluralized labels.
 */

// Tailwind classes per order status for StatusBadge
export const ORDER_STATUS_STYLES = {
  Delivered: 'bg-green-100 text-green-800',
  'Out for Delivery': 'bg-orange-100 text-orange-800',
  Preparing: 'bg-amber-100 text-amber-800',
  'Order Received': 'bg-blue-100 text-blue-800',
};

const DEFAULT_STATUS_STYLE = 'bg-blue-100 text-blue-800';

export function getOrderStatusStyle(status) {
  return ORDER_STATUS_STYLES[status] ?? DEFAULT_STATUS_STYLE;
}

export function calculateOrderTotal(items = []) {
  return items.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );
}

export function calculateItemCount(items = []) {
  return items.reduce((count, item) => count + (Number(item.quantity) || 0), 0);
}

export function formatItemCount(count) {
  return count === 1 ? '1 item' : `${count} items`;
}
