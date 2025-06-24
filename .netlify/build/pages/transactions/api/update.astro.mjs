import { d as db } from '../../../chunks/supabase_C8a6HoWM.mjs';
export { renderers } from '../../../renderers.mjs';

const PUT = async ({ request }) => {
  const body = await request.json();
  const { id, ...update } = body;
  const { error } = await db.from("Transactions").update(update).eq("id", Number(id)).select().single();
  return new Response(
    JSON.stringify({ error }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
