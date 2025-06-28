
/**
 * Delay script - setTimeout wrapper. 
 */
export function sleep(ms: number) {
	return new Promise((res) => setTimeout(res, ms));
}



/**
 * Get a range of numbers
 */
export function range(start: number, end: number): number[] {
	return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}



/**
 * Convert a timestamp from the db to human readable date
 */
export function toDateWithYear(datestring: string): string {

	return new Date(datestring).toLocaleDateString('en-us', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	})
}



/**
 * Takes a number and returns a human readable dollar amount
 */
export function toCurrency(amount: number | string | undefined): string {
	if (!amount) {
		return '0.00'
	}

	const num = Number(amount);
	const sign = num < 0 ? '-' : '';
	const abs = Math.abs(num).toFixed(2);

	return `${sign}$${abs}`;
}



/**
 * Convert all values in an object to string typ
 */
export function objectValuesToString(obj: Record<string, any>): Record<string, string> {
	return Object.fromEntries(
		Object.entries(obj).map(([key, value]) => [key, String(value)])
	);
}



