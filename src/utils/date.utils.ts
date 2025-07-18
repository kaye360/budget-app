
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
	const year = String(now.getFullYear())
	const month = String(now.getMonth() + 1).padStart(2, '0')
	return `${year}-${month}`
}


/**
 * Convert YYYY-MM to human readable Month Year date
 */
export function yyyymmToMonthYear(
	yyyymm: string,
	offset: number = 0
): string {

	const [year, month] = yyyymm.split('-').map(Number)
	const date = new Date(year, month -1 + offset)
	
	return date.toLocaleDateString('en-US', {
		month: 'long',
		year: 'numeric'
	});
}


/**
 * Convert a human readable Month Year date to yyyy-mm
 */
export function monthYearToYyyymm(
	monthYear: string,
	offset: number = 0
): string {

	const [monthName, yearStr] = monthYear.split(' ')
	const year = Number(yearStr)

	const baseDate = new Date(`${monthName} 1, ${year}`)
	baseDate.setMonth(baseDate.getMonth() + offset)

	const newYear = baseDate.getFullYear()
	const newMonth = String(baseDate.getMonth() + 1).padStart(2, '0')

	return `${newYear}-${newMonth}`
}


/**
 * Get the next or previous month in and from the format of yyyy-mm
 */
export function getRelativeYyyymm(
	yyyymm: string, 
	offset: number = 0
): string {

	const [yearStr, monthStr] = yyyymm.split('-')
	const year = Number(yearStr)
	const month = Number(monthStr) - 1 

	const date = new Date(year, month + offset)
	const newYear = date.getFullYear()
	const newMonth = String(date.getMonth() + 1).padStart(2, '0')

	return `${newYear}-${newMonth}`
}
