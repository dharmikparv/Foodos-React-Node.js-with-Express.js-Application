/**
 * Fetches one order by ID and polls next-status until delivered. Used on order detail page.
 */
import { useState, useEffect, useCallback } from 'react';
import { ordersApi } from '../services/api';

const POLL_INTERVAL_MS = 4000;
const DELIVERED_STATUS = 'Delivered';

export function useOrderWithPolling(orderId) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrder = useCallback(async () => {
    if (!orderId) {
      setLoading(false);
      setOrder(null);
      setError('No order ID');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await ordersApi.getById(orderId);
      setOrder(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load order');
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  // Poll for status updates until delivered
  useEffect(() => {
    if (!orderId || !order || order.status === DELIVERED_STATUS) return;

    const interval = setInterval(async () => {
      try {
        const res = await ordersApi.advanceStatus(orderId);
        if (res?.order) setOrder(res.order);
      } catch {
        // Ignore poll errors; keep current state
      }
    }, POLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [orderId, order?.id, order?.status]);

  return { order, loading, error, refetch: fetchOrder };
}
