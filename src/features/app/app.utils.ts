
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
 * Takes a number and returns a human readable dollar amount
 */
export function toCurrency(amount: number | string | undefined | null): string {
	if (!amount) {
		return '0.00'
	}

	const num = Number(amount);
	const sign = num < 0 ? '-' : '';
	const abs = Math.abs(num).toFixed(2);

	return `${sign}$${abs}`;
}


/**
 * Convert a string to only digits. Allows 1 decimal
 */
export function toOnlyDigits(value: string | number): number {
	const cleaned = value
		.toString()
		.replace(/[^0-9.]/g, '')         // keep digits and dots
		.replace(/^\.*/g, '')            // remove leading dots
		.replace(/(\..*?)\..*/g, '$1');  // keep only the first decimal

	return Number(cleaned);
}



/**
 * Convert all values in an object to string typ
 */
export function objectValuesToString(obj: Record<string, any>): Record<string, string> {
	return Object.fromEntries(
		Object.entries(obj).map(([key, value]) => [key, String(value)])
	);
}



