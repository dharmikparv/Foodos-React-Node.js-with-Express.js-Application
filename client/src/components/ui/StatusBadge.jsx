// Order status pill with color from orderHelpers
import { getOrderStatusStyle } from '../../utils/orderHelpers';

export default function StatusBadge({ status }) {
  const style = getOrderStatusStyle(status);
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${style}`}>
      {status}
    </span>
  );
}
