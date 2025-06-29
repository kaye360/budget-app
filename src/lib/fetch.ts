
type FetchOptions = {
	method?: 'GET' | 'PUT' | 'POST' | 'DELETE';
	headers?: Record<string, string>;
	body?: unknown;
};

type FetchResult<T> = {
	response: T | null;
	error: any;
};


export async function fetchData<T = unknown>(
	url: string,
	options: FetchOptions = {}
): Promise<FetchResult<T>> {
	try {

		const baseUrl = import.meta.env.DEV ? 'http://localhost:4321' : import.meta.env.SITE

		const response = await fetch(`${baseUrl}${url}`, {
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

