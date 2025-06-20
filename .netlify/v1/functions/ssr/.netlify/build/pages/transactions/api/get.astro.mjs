import { createClient } from '@supabase/supabase-js';
export { renderers } from '../../../renderers.mjs';

const db = createClient(
  "https://cicspmzvopyopqcybnno.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpY3NwbXp2b3B5b3BxY3libm5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MzA3ODEsImV4cCI6MjA2NTUwNjc4MX0.JE8-m7y5wO3xNOTTNVbAaTTPgLFXHurP7D8hO1UldbM"
);

const GET = async ({ request }) => {
  const url = new URL(request.url);
  const id = Number(url.searchParams.get("id"));
  const by = url.searchParams.get("by") || "recent";
  const page = Number(url.searchParams.get("page")) || 0;
  const perPage = Number(url.searchParams.get("perPage")) || 50;
  url.searchParams.get("month") || "0125";
  if (!id) {
    return invalidIdErrorResponse();
  }
  let data = [];
  let count = 0;
  if (by === "recent") {
    const res = await getRecentByUserId(id, { page, perPage });
    data = res.data;
    count = res.count || 0;
  }
  return new Response(
    JSON.stringify({
      data,
      count,
      totalPages: Math.ceil(count / perPage)
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};
async function getRecentByUserId(userId, options) {
  const start = options.page * options.perPage;
  const end = start + options.perPage - 1;
  const { data, count } = await db.from("Transactions").select("*", { count: "exact" }).order("date", { ascending: false }).eq("userId", userId).range(start, end);
  return { data, count };
}
function invalidIdErrorResponse() {
  return new Response(
    JSON.stringify({ message: `User ID is undefined` }),
    {
      status: 500,
      headers: { "Content-Type": "application/json" }
    }
  );
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
