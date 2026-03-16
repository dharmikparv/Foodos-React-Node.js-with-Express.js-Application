/**
 * Empty state for orders list: message + link to menu.
 */
import Button from './ui/Button';

export default function EmptyOrders() {
  return (
    <div className="text-center py-16 bg-white rounded-2xl border border-stone-100">
      <p className="text-stone-500 mb-6">No orders yet.</p>
      <Button to="/" variant="primary">
        Browse Menu
      </Button>
    </div>
  );
}
