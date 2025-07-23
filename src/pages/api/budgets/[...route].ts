import type { APIRoute } from "astro"
import { db } from "../../../lib/db"


export const GET: APIRoute = async () => {

	/**
	 * @todo implement auth
	 */
	const id = 1

    const { data, error } = await db.from('Budgets')
        .select('*')
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

	return new Response(
        JSON.stringify({}),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
}



export const DELETE: APIRoute = async ({ params }) => {

	return new Response(
        JSON.stringify({}),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
}
