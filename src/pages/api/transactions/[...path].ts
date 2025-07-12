import type { APIRoute } from "astro"
import { db } from "../../../lib/db"
import { getQueryParams, handlers } from "../../../services/transaction.services"
import { errorResponse } from "../../../services/error.services"
import { createTransactionRequest } from "../../../requests/transaction.requests"



export const GET: APIRoute = async ({ request }) => {

	const queryParams = getQueryParams(request.url)

	if( !queryParams.id ) return errorResponse({ error : 'Invalid user id'})
		
	if( handlers[queryParams.by] ) {
		const response = await handlers[queryParams.by](queryParams)
		return new Response(
			JSON.stringify(response),
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

	if( !params.path || !params.path[0] ) {
		return errorResponse({error : 'Invalid ID'})
	}

	const id = Number( params.path )
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

	if( !params.path || !params.path[0] ) {
		return errorResponse({error : 'Invalid ID'})
	}

	const id = Number( params.path )

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
