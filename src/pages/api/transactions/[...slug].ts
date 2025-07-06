import type { APIRoute } from "astro"
import { db } from "../../../lib/supabase"
import { errorResponse, getByMonth, getParams, getRecentByUserId, groupTransactionsByIndex } from "./_lib"
import type { Transaction } from "../../../types/types"


export const GET: APIRoute = async ({ request }) => {

	const { id, by, page, perPage, month } = getParams(request.url)

	if( !id ) return errorResponse({ error : 'Invalid user id'})

	let data : Transaction[] | null = []
	let count = 0

	if( by === 'recent' ) {
		const res = await getRecentByUserId(id, { page, perPage })
		data = res.data
		count = res.count || 0

		return new Response(
			JSON.stringify({ data, count, totalPages : Math.ceil(count/perPage) }),
			{ status: 200, headers: { 'Content-Type': 'application/json' } }
		)
	}

	if( by === 'month' ) {
		const res = await getByMonth(id, month)
		const data = res.data
		return new Response(
			JSON.stringify({ data }),
			{ status: 200, headers: { 'Content-Type': 'application/json' } }
		)
	}

	return new Response(
		JSON.stringify({ error : 'Invalid "by" argument '}),
		{ status: 404, headers: { 'Content-Type': 'application/json' } }
	)

}



export const POST: APIRoute = async ({ request }) => {

    const data = await request.json()
    const createdTransactions = groupTransactionsByIndex(data)

    const { error } = await db
        .from('Transactions')
        .insert(createdTransactions)

    return new Response(
        JSON.stringify({ error }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
}



export const PUT: APIRoute = async ({ request, params }) => {

	if( !params.slug || !params.slug[0] ) {
		return errorResponse({error : 'Invalid ID'})
	}

	const id = Number( params.slug )
	const body = await request.json()

	const { error, data } = await db
		.from('Transactions')
		.update(body)
		.eq('id', id)
		.select()

    return new Response(
		JSON.stringify({ error }),
		{ status: 200, headers: { 'Content-Type': 'application/json' } }
	)
}



export const DELETE: APIRoute = async ({ params }) => {

	if( !params.slug || !params.slug[0] ) {
		return errorResponse({error : 'Invalid ID'})
	}

	const id = Number( params.slug )

	const { error } = await db
		.from('Transactions')
		.update({ isDeleted : true})
		.eq('id', id)
		.select()
		.single()

    return new Response(
		JSON.stringify({ error }),
		{ status: 200, headers: { 'Content-Type': 'application/json' } }
	)

}
