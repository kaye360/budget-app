import type { APIRoute } from "astro"
import { db } from "../../../lib/db"


export const GET: APIRoute = async () => {

    const { data, error } = await db.from('Budgets')
        .select('*')
        .eq('userId', 1)

	return new Response(
		JSON.stringify({ data, error }),
		{ status: 200, headers: { 'Content-Type': 'application/json' } }
	)
}



export const POST: APIRoute = async ({ request }) => {

    // const data = await request.json()
    // const createdTransactions = groupTransactionsByIndex(data)

    // const { error } = await db
    //     .from('Transactions')
    //     .insert(createdTransactions)

    // return new Response(
    //     JSON.stringify({ error }),
    //     { status: 200, headers: { 'Content-Type': 'application/json' } }
    // )
}



export const PUT: APIRoute = async ({ request, params }) => {

	// if( !params.slug || !params.slug[0] ) {
	// 	return errorResponse({error : 'Invalid ID'})
	// }

	// const id = Number( params.slug )
	// const body = await request.json()

	// const { error } = await db
	// 	.from('Transactions')
	// 	.update(body)
	// 	.eq('id', id)
	// 	.select()

    // return new Response(
	// 	JSON.stringify({ error }),
	// 	{ status: 200, headers: { 'Content-Type': 'application/json' } }
	// )
}



export const DELETE: APIRoute = async ({ params }) => {

	// if( !params.slug || !params.slug[0] ) {
	// 	return errorResponse({error : 'Invalid ID'})
	// }

	// const id = Number( params.slug )

	// const { error } = await db
	// 	.from('Transactions')
	// 	.update({ isDeleted : true})
	// 	.eq('id', id)
	// 	.select()
	// 	.single()

    // return new Response(
	// 	JSON.stringify({ error }),
	// 	{ status: 200, headers: { 'Content-Type': 'application/json' } }
	// )

}
