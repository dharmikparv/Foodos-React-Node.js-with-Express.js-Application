/**
 * API client: JSON fetch with error handling, menu and orders endpoints.
 */
const API_BASE = 'https://foodos-backend-td4r.onrender.com/api';

function getErrorMessage(res, data) {
  if (data?.error) return data.error;
  if (Array.isArray(data?.details) && data.details[0]) return data.details[0];
  return `Request failed (${res.status})`;
}

async function fetchJson(url, options = {}) {
  let res;
  try {
    res = await fetch(`${API_BASE}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
  } catch (err) {
    if (err instanceof TypeError && err.message === 'Failed to fetch') {
      throw new Error(
        'Cannot connect to server. Make sure the backend is running (e.g. npm run dev in server).'
      );
    }
    throw err;
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(getErrorMessage(res, data));
  }

  return data;
}

export const menuApi = {
  async getAll() {
    const data = await fetchJson('/menu');
    return data.items ?? [];
  },
};

export const ordersApi = {
  async getAll() {
    const data = await fetchJson('/orders');
    return data.orders ?? [];
  },

  async create(body) {
    return fetchJson('/orders', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },

  async getById(id) {
    return fetchJson(`/orders/${id}`);
  },

  async advanceStatus(id) {
    return fetchJson(`/orders/${id}/next-status`);
  },
};
