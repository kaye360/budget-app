
import type { APIRoute } from "astro";
import { db } from "../../../lib/supabase";

export const DELETE: APIRoute = async ({ request }) => {

	const body = await request.json()

	const { error } = await db
		.from('Transactions')
		.update({ isDeleted : true})
		.eq('id', body.transactionId)
		.select()
		.single()

    return new Response(
		JSON.stringify({ error }),
		{ status: 200, headers: { 'Content-Type': 'application/json' } }
	)

}