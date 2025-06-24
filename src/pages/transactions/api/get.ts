import { type Transaction } from './../../../types/Transaction';
import type { APIRoute } from 'astro';
import { db } from "../../../lib/supabase";

export const GET: APIRoute = async ({ request }) => {

	const url = new URL(request.url)
	const id = Number(url.searchParams.get('id'))
	const by = url.searchParams.get('by') || 'recent'
	const page = Number(url.searchParams.get('page')) || 0
	const perPage = Number(url.searchParams.get('perPage')) || 50
	const month = url.searchParams.get('month') || '0125'

	if( !id ) {
		return invalidIdErrorResponse()
	}

	let data : Transaction[] | null = []
	let count = 0

	if( by === 'recent' ) {
		const res = await getRecentByUserId(id, { page, perPage })
		data = res.data
		count = res.count || 0
	}

	return new Response(
		JSON.stringify({ 
			data, 
			count,
			totalPages : Math.ceil(count/perPage)
		}),
		{ status: 200, headers: { 'Content-Type': 'application/json' } }
	)
}

async function getRecentByUserId(
    userId : number,
    options : { page : number , perPage : number }
) {
    const start = options.page * options.perPage
    const end = start + options.perPage - 1

    const { data, count } = await db.from('Transactions')
        .select('*', { count: 'exact'})
        .order('date', { ascending : false })
        .eq('userId', userId)
		.eq('isDeleted', false)
        .range(start, end)
    return { data, count}
}

async function getDeletedByUserId() {

}

function invalidIdErrorResponse() {
	return new Response(
		JSON.stringify({ message: `User ID is undefined` }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		}
	)
}