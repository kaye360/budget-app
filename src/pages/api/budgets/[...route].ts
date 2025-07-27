import type { APIRoute } from "astro"
import { db } from "../../../lib/db"
import { errorResponse } from "../../../services/error.service"


export const GET: APIRoute = async ({ request }) => {

	/**
	 * @todo implement auth
	 */
	const id = 1

    const { data, error } = await db.from('Budgets')
        .select('*')
        .order('name')
        .eq('userId', id)

	return new Response(
		JSON.stringify({ data, error }),
		{ status: 200, headers: { 'Content-Type': 'application/json' } }
	)
}



export const POST: APIRoute = async ({ request }) => {

    const formData = await request.json()

    /**
     * @todo implement auth
     */
    const { data, error } = await db.from('Budgets')
        .insert([{ 
            userId : 1, 
            name : formData.name,
            amount : Number(formData.amount)
        }])
        .select()

    if(!data) {
        return new Response(
            JSON.stringify({data, error}),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
    )}

	return new Response(
        JSON.stringify({data : data[0], error}),
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
        .from('Budgets')
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
        .from('Budgets')
        .delete()
        .eq('id', id)

	return new Response(
        JSON.stringify({ error }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
}
