import { d as db } from '../../../chunks/supabase_C8a6HoWM.mjs';
export { renderers } from '../../../renderers.mjs';

async function getRecentByUserId(userId, options) {
  const start = options.page * options.perPage;
  const end = start + options.perPage - 1;
  const { data, count } = await db.from("TransactionView").select("*", { count: "exact" }).order("date", { ascending: false }).eq("userId", userId).eq("isDeleted", false).range(start, end);
  return { data, count };
}
function getParams(url) {
  const searchParams = new URL(url).searchParams;
  const getNumber = (key, defaultValue) => {
    const value = Number(searchParams.get(key));
    return isNaN(value) ? defaultValue : value;
  };
  return {
    id: getNumber("id", 0),
    by: searchParams.get("by") ?? "recent",
    page: getNumber("page", 0),
    perPage: getNumber("perPage", 50),
    month: searchParams.get("month") ?? "0125"
  };
}
function groupTransactionsByIndex(data) {
  const transactions = {};
  for (const key in data) {
    const [col, indexStr] = key.split("-");
    const index = Number(indexStr);
    const value = data[key];
    if (!transactions[index]) {
      transactions[index] = {};
    }
    transactions[index][col] = col === "amount" ? Number(value) : value;
    transactions[index].isDeleted = false;
    transactions[index].userId = 1;
    transactions[index].accountType = "Checking";
    transactions[index].accountNumber = "1234";
    transactions[index].source = "manual";
  }
  return Object.values(transactions);
}
function errorResponse({ error }) {
  return new Response(
    JSON.stringify(error),
    {
      status: 500,
      headers: { "Content-Type": "application/json" }
    }
  );
}

const GET = async ({ request }) => {
  const { id, by, page, perPage } = getParams(request.url);
  if (!id) return errorResponse({ error: "Invalid user id" });
  let data = [];
  let count = 0;
  if (by === "recent") {
    const res = await getRecentByUserId(id, { page, perPage });
    data = res.data;
    count = res.count || 0;
  }
  return new Response(
    JSON.stringify({ data, count, totalPages: Math.ceil(count / perPage) }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};
const POST = async ({ request }) => {
  const data = await request.json();
  const createdTransactions = groupTransactionsByIndex(data);
  const { error } = await db.from("Transactions").insert(createdTransactions);
  return new Response(
    JSON.stringify({ error }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};
const PUT = async ({ request, params }) => {
  if (!params.slug || !params.slug[0]) {
    return errorResponse({ error: "Invalid ID" });
  }
  const id = Number(params.slug);
  const body = await request.json();
  const { error, data } = await db.from("Transactions").update(body).eq("id", id).select();
  return new Response(
    JSON.stringify({ error }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};
const DELETE = async ({ params }) => {
  if (!params.slug || !params.slug[0]) {
    return errorResponse({ error: "Invalid ID" });
  }
  const id = Number(params.slug);
  const { error } = await db.from("Transactions").update({ isDeleted: true }).eq("id", id).select().single();
  return new Response(
    JSON.stringify({ error }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
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
