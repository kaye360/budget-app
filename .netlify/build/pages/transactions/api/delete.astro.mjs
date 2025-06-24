import { d as db } from '../../../chunks/supabase_C8a6HoWM.mjs';
export { renderers } from '../../../renderers.mjs';

const DELETE = async ({ request }) => {
  const body = await request.json();
  const { error } = await db.from("Transactions").update({ isDeleted: true }).eq("id", body.transactionId).select().single();
  return new Response(
    JSON.stringify({ error }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	DELETE
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
