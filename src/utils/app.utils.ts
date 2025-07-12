
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
 * Note: Keep the 12 hour time shift otherwise days are off
 */
export function toDateWithYear(datestring: string): string {

	return new Date(datestring + 'T12:00:00').toLocaleDateString('en-us', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	})
}


/**
 * Get current date as YYMM
 */
export function getCurrentYYMM(): string {
	const now = new Date()
	const yy = String(now.getFullYear()).slice(2)
	const mm = String(now.getMonth() + 1).padStart(2, '0')
	return yy + mm
}


/**
 * Convert YYMM to human readable Month Year date
 */
export function yymmToMonthYear(
	yymm: string | number,
	offset: number = 0
): string {

	const str = String(yymm).padStart(4, '0')
	const year = 2000 + Number(str.slice(0, 2))
	const month = Number(str.slice(2, 4)) - 1
	const date = new Date(year, month + offset)
	
	return date.toLocaleDateString('en-US', {
		month: 'long',
		year: 'numeric'
	});
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



