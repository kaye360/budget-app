import { B as BASE_URL } from './app.config_DnBzuijw.mjs';

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

export { fetchData as f };
