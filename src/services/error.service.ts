/**
 * 
 * @function errorResponse
 * Standard error response
 * 
 */
export function errorResponse({ error } : { error : string}) {
	return new Response(
		JSON.stringify(error), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		}
	)
}