/**
 * Orders list: fetch orders, show cards with status and total. Empty state when none.
 */
import { Link } from 'react-router-dom';
import { useOrders } from '../hooks';
import {
  calculateOrderTotal,
  calculateItemCount,
  formatItemCount,
} from '../utils/orderHelpers';
import { formatCurrency, formatDate } from '../utils/format';
import { LoadingSpinner, ErrorMessage, PageHeader, StatusBadge } from '../components/ui';
import EmptyOrders from '../components/OrdersEmpty';

export default function OrdersListPage() {
  const { orders, loading, error } = useOrders();

  if (loading) return <LoadingSpinner />;
  if (error) {
    return (
      <ErrorMessage
        message={`Failed to load orders: ${error}. Make sure the backend is running.`}
      />
    );
  }

  return (
    <div>
      <PageHeader
        title="My Orders"
        subtitle="View your previous orders and their status."
      />

      {orders.length === 0 ? (
        <EmptyOrders />
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const total = calculateOrderTotal(order.items);
            const itemCount = calculateItemCount(order.items);

            return (
              <Link
                key={order.id}
                to={`/order/${order.id}`}
                className="block p-6 bg-white rounded-xl border border-stone-200 hover:border-primary-200 hover:shadow-md transition"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display font-semibold text-lg text-stone-900">
                      Order #{order.id}
                    </h3>
                    <p className="text-stone-500 text-sm mt-0.5">
                      {formatDate(order.createdAt)} · {formatItemCount(itemCount)}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status={order.status} />
                    <span className="font-semibold text-primary-600">
                      {formatCurrency(total)}
                    </span>
                    <span className="text-stone-400" aria-hidden>→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
