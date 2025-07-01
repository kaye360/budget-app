import { BASE_URL } from "../../config";

type FetchOptions = {
	method?: 'GET' | 'PUT' | 'POST' | 'DELETE';
	headers?: Record<string, string>;
	body?: unknown;
};

type FetchResult<T> = {
	response: T | null;
	error: any;
};


/**
 * 
 * Safe fetch function with try/catch and returns { data, error }
 * Automatically appends full site url if called from server
 * 
 */
export async function fetchData<T = unknown>(
	url: string,
	options: FetchOptions = {}
): Promise<FetchResult<T>> {
	try {

		const isServer = typeof window === 'undefined'
		const fullUrl = isServer ? `${BASE_URL}${url}` : url

		const response = await fetch(fullUrl, {
			method: options.method || 'GET',
			headers: {
				'Content-Type': 'application/json',
				...options.headers,
			},
			body: options.body ? JSON.stringify(options.body) : undefined,
		})

		const data = await response.json()

		if (!response.ok) {
			return { response: null, error: data }
		}

		return { response: data, error: null }

	} catch (error) {

		return { response: null, error }

	}
}

