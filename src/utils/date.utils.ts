

/**
 * Get current date as YYMM
 */
export function getCurrentYYMM(): string {
	const now = new Date()
	const year = String(now.getFullYear())
	const month = String(now.getMonth() + 1).padStart(2, '0')
	return `${year}-${month}`
}
