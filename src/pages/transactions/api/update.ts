
import type { APIRoute } from "astro";
import { db } from "../../../lib/supabase";

export const PUT: APIRoute = async ({ request }) => {

	const body = await request.json()
	const { id, ...update } = body

	const { error } = await db
		.from('Transactions')
		.update(update)
		.eq('id', Number(id))
		.select()
		.single()

    return new Response(
		JSON.stringify({ error }),
		{ status: 200, headers: { 'Content-Type': 'application/json' } }
	)
}