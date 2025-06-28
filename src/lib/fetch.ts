
type FetchOptions = {
	method?: 'GET' | 'PUT' | 'POST' | 'DELETE';
	headers?: Record<string, string>;
	body?: unknown;
};

type FetchResult<T> = {
	data: T | null;
	error: any;
};


export async function fetchData<T = unknown>(
	url: string,
	options: FetchOptions = {}
): Promise<FetchResult<T>> {
	try {

		const response = await fetch(url, {
			method: options.method || 'GET',
			headers: {
				'Content-Type': 'application/json',
				...options.headers,
			},
			body: options.body ? JSON.stringify(options.body) : undefined,
		})

		const data = await response.json()

		if (!response.ok) {
			return { data: null, error: data }
		}

		return { data, error: null }

	} catch (error) {

		return { data: null, error }

	}
}

