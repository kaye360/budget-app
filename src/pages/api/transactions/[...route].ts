import type { APIRoute } from "astro"
import { db } from "../../../lib/db"
import { createTransactionRequest } from "../../../requests/transaction.requests"
import { getQueryParamsFromUrl, handlers, type QueryParams } from "../../../services/transaction.service"
import { errorResponse } from "../../../services/error.service"



export const GET: APIRoute = async ({ request, session, cookies }) => {
	
	/**
	 * @todo implement auth check
	*/
	const auth = { id: 1 }
	if( !auth ) return errorResponse({ error : 'Invalid user id'})

	const queryParams = getQueryParamsFromUrl(request.url, auth.id)

	if(  typeof handlers[queryParams.filter] === 'function' ) {
		const response = await handlers[queryParams.filter](queryParams)
		return new Response(
			JSON.stringify(response),
			{ status: 200, headers: { 'Content-Type': 'application/json' } }
		)
	}

	return new Response(
		JSON.stringify({ error : 'Invalid transaction filter'}),
		{ status: 404, headers: { 'Content-Type': 'application/json' } }
	)

}



export const POST: APIRoute = async ({ request }) => {

    const data = await request.json()
    const createdTransactions = createTransactionRequest(data)

    const { error } = await db
        .from('Transactions')
        .insert(createdTransactions)

    return new Response(
        JSON.stringify({ error }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
}



export const PUT: APIRoute = async ({ request, params }) => {

	if( !params.route || !params.route[0] ) {
		return errorResponse({error : 'Invalid ID'})
	}

	const id = Number( params.route )
	const body = await request.json()

	const { error } = await db
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

	if( !params.route || !params.route[0] ) {
		return errorResponse({error : 'Invalid ID'})
	}

	const id = Number( params.route )

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
