import { d as db } from '../../../chunks/db_C8a6HoWM.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async () => {
  const { data, error } = await db.from("Budgets").select("*").eq("userId", 1);
  return new Response(
    JSON.stringify({ data, error }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};
const POST = async ({ request }) => {
};
const PUT = async ({ request, params }) => {
};
const DELETE = async ({ params }) => {
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	DELETE,
	GET,
	POST,
	PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
