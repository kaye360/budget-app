import { B as BASE_URL } from './config_C7KY7e6E.mjs';

function objectValuesToString(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, String(value)])
  );
}

async function fetchData(url, options = {}) {
  try {
    const isServer = typeof window === "undefined";
    const fullUrl = isServer ? `${BASE_URL}${url}` : url;
    const response = await fetch(fullUrl, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...options.headers
      },
      body: options.body ? JSON.stringify(options.body) : void 0
    });
    const data = await response.json();
    if (!response.ok) {
      return { response: null, error: data };
    }
    return { response: data, error: null };
  } catch (error) {
    return { response: null, error };
  }
}

async function getTransactions(userId, options) {
  const params = options ? "&" + new URLSearchParams(objectValuesToString(options)) : "";
  const res = await fetchData(`/api/transactions?id=${userId}&${params}`);
  if (res.error || !res.response) return { data: [], totalPages: 0, count: 0 };
  return res.response;
}

export { fetchData as f, getTransactions as g };
