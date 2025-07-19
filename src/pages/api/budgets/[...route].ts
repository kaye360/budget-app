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

	return new Response(
        JSON.stringify({}),
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
