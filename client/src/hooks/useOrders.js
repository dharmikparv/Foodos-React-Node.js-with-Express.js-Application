/**
 * Fetches orders list once on mount. Returns orders, loading, error, refetch.
 */
import { useAsync } from './useAsync';
import { ordersApi } from '../services/api';

export function useOrders() {
  const { data, loading, error, refetch } = useAsync(
    async () => {
      const orders = await ordersApi.getAll();
      return orders ?? [];
    },
    []
  );

  return {
    orders: Array.isArray(data) ? data : [],
    loading,
    error,
    refetch,
  };
}
