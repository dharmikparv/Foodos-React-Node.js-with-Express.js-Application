/**
 * Order detail: fetch order by ID with polling, show status tracker, delivery details, items.
 */
import { useParams } from 'react-router-dom';
import { useOrderWithPolling } from '../hooks';
import { calculateOrderTotal } from '../utils/orderHelpers';
import { formatCurrency, formatDate } from '../utils/format';
import OrderStatusTracker from '../components/OrderStatusTracker';
import {
  LoadingSpinner,
  ErrorMessage,
  PageHeader,
  Button,
} from '../components/ui';

export default function OrderStatusPage() {
  const { orderId } = useParams();
  const { order, loading, error } = useOrderWithPolling(orderId);

  if (loading) return <LoadingSpinner />;
  if (error || !order) {
    return (
      <ErrorMessage
        message={error ?? 'Order not found'}
        backTo="/"
        backLabel="Back to Menu"
      />
    );
  }

  const total = calculateOrderTotal(order.items);
  const delivery = order.deliveryDetails ?? {};

  return (
    <div>
      <div className="mb-8">
        <PageHeader
          title={`Order #${order.id}`}
          subtitle={`Placed on ${formatDate(order.createdAt)}`}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <section aria-label="Order status">
          <h2 className="font-display font-semibold text-lg mb-4">Order Status</h2>
          <OrderStatusTracker currentStatus={order.status} />
        </section>

        <section aria-label="Order details">
          <h2 className="font-display font-semibold text-lg mb-4">
            Delivery Details
          </h2>
          <div className="p-6 bg-white rounded-2xl border border-stone-200">
            <p className="font-medium text-stone-900">{delivery.name}</p>
            <p className="text-stone-600 mt-1">{delivery.address}</p>
            <p className="text-stone-600">{delivery.phoneNumber}</p>
          </div>

          <h2 className="font-display font-semibold text-lg mt-6 mb-4">Items</h2>
          <div className="space-y-2">
            {order.items?.map((item, idx) => (
              <div
                key={`${item.name}-${idx}`}
                className="flex justify-between py-2 border-b border-stone-100"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span className="font-medium">
                  {formatCurrency((item.price ?? 0) * (item.quantity ?? 0))}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-bold text-lg mt-4 pt-4">
            <span>Total</span>
            <span className="text-primary-600">{formatCurrency(total)}</span>
          </div>
        </section>
      </div>

      <div className="mt-10 flex gap-4">
        <Button to="/" variant="primary">
          Order Again
        </Button>
      </div>
    </div>
  );
}
