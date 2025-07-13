import { d as db } from '../../../chunks/db_C8a6HoWM.mjs';
export { renderers } from '../../../renderers.mjs';

function getQueryParams(url) {
  const searchParams = new URL(url).searchParams;
  const toNumber = (key, defaultValue) => {
    const value = Number(key);
    return isNaN(value) ? defaultValue : value;
  };
  const validBy = (by) => {
    if (typeof by === "string" && ["recent", "month"].includes(by)) {
      return by;
    }
    return "recent";
  };
  return {
    by: validBy(searchParams.get("by")),
    id: toNumber(searchParams.get("id"), 0),
    page: toNumber(searchParams.get("page"), 0),
    perPage: toNumber(searchParams.get("perPage"), 50),
    month: searchParams.get("month") ?? "0125"
  };
}
const handlers = {
  recent: async ({ id, page, perPage }) => {
    const start = page * perPage;
    const end = start + perPage - 1;
    const { data, count } = await db.from("TransactionView").select("*", { count: "exact" }).order("date", { ascending: false }).eq("userId", id).eq("isDeleted", false).range(start, end);
    return { data, count, totalPages: Math.ceil((count ?? 0) / perPage) };
  },
  month: async ({ id, month: date }) => {
    const year = Number("20" + date.slice(0, 2));
    const month = Number(date.slice(-2));
    const startDate = `${year}-${month}-01`;
    const endDate = new Date(year, month, 0).toISOString().split("T")[0];
    const { data } = await db.from("TransactionView").select("*").eq("userId", id).eq("isDeleted", false).gte("date", startDate).lte("date", endDate);
    return { data };
  },
  budget: async ({}) => {
    return {};
  }
};

function errorResponse({ error }) {
  return new Response(
    JSON.stringify(error),
    {
      status: 500,
      headers: { "Content-Type": "application/json" }
    }
  );
}

function createTransactionRequest(data) {
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
    transactions[index].source = "manual";
  }
  return Object.values(transactions);
}

const GET = async ({ request }) => {
  const queryParams = getQueryParams(request.url);
  if (!queryParams.id) return errorResponse({ error: "Invalid user id" });
  if (handlers[queryParams.by]) {
    const response = await handlers[queryParams.by](queryParams);
    return new Response(
      JSON.stringify(response),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
  return new Response(
    JSON.stringify({ error: 'Invalid "by" argument ' }),
    { status: 404, headers: { "Content-Type": "application/json" } }
  );
};
const POST = async ({ request }) => {
  const data = await request.json();
  const createdTransactions = createTransactionRequest(data);
  const { error } = await db.from("Transactions").insert(createdTransactions);
  return new Response(
    JSON.stringify({ error }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};
const PUT = async ({ request, params }) => {
  if (!params.path || !params.path[0]) {
    return errorResponse({ error: "Invalid ID" });
  }
  const id = Number(params.path);
  const body = await request.json();
  const { error } = await db.from("Transactions").update(body).eq("id", id).select();
  return new Response(
    JSON.stringify({ error }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};
const DELETE = async ({ params }) => {
  if (!params.path || !params.path[0]) {
    return errorResponse({ error: "Invalid ID" });
  }
  const id = Number(params.path);
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
