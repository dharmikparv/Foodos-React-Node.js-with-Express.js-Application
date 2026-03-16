/**
 * Fetches menu items once on mount. Returns items, loading, error, refetch.
 */
import { useAsync } from './useAsync';
import { menuApi } from '../services/api';

export function useMenu() {
  const { data, loading, error, refetch } = useAsync(
    async () => {
      const items = await menuApi.getAll();
      return items ?? [];
    },
    []
  );

  return {
    items: Array.isArray(data) ? data : [],
    loading,
    error,
    refetch,
  };
}
