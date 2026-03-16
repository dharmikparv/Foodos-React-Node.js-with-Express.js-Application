/**
 * Display formatting: currency (USD) and dates.
 */

export function formatCurrency(amount) {
  if (typeof amount !== 'number' || Number.isNaN(amount)) return '$0.00';
  return `$${amount.toFixed(2)}`;
}

export function formatDate(isoString) {
  if (!isoString) return '—';
  try {
    return new Date(isoString).toLocaleString();
  } catch {
    return '—';
  }
}
