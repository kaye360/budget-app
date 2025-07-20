import { d as db } from '../../../chunks/db_C8a6HoWM.mjs';
import { c as convertDate } from '../../../chunks/convertDate_KzwctwZh.mjs';
export { renderers } from '../../../renderers.mjs';

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

function getQueryParamsFromUrl(requestUrl, id) {
  const url = new URL(requestUrl);
  const searchParams = url.searchParams;
  const pathArray = url.pathname.split("/");
  const transactionsIndex = pathArray.indexOf("transactions");
  const filter = pathArray[transactionsIndex + 1];
  const filterValue = pathArray[transactionsIndex + 2] || null;
  const toNumber = (key, defaultValue) => {
    const value = Number(key);
    return isNaN(value) || value === 0 ? defaultValue : value;
  };
  return {
    id,
    filter,
    filterValue,
    page: toNumber(searchParams.get("page"), 0),
    perPage: toNumber(searchParams.get("perPage"), 50)
  };
}
const handlers = {
  recent: async ({ id, page, perPage }) => {
    const start = page * perPage;
    const end = start + perPage - 1;
    const { data, count } = await db.from("TransactionView").select("*", { count: "exact" }).order("date", { ascending: false }).eq("userId", id).eq("isDeleted", false).range(start, end);
    return { data, count, totalPages: Math.ceil((count ?? 0) / perPage) };
  },
  month: async ({ id, filterValue: date }) => {
    if (!date) {
      return { error: "Invalid Date" };
    }
    const [year, month] = date.split("-").map(Number);
    const startDate = `${year}-${month}-01`;
    const endDate = new Date(year, month, 0).toISOString().slice(0, 10);
    const { data } = await db.from("TransactionView").select("*").order("date", { ascending: false }).eq("userId", id).eq("isDeleted", false).gte("date", startDate).lte("date", endDate);
    const { data: monthData } = await db.from("TransactionView").select("date").eq("userId", id).eq("isDeleted", false);
    const uniqueMonths = [...new Set(
      monthData?.map((month2) => month2.date && month2.date.slice(0, 7)).filter(Boolean)
    )];
    const months = uniqueMonths.sort().reverse().map((month2) => ({
      month: month2,
      title: convertDate(month2).to("MMM-YYYY")
    }));
    return { data, months };
  },
  budget: async ({ id, filterValue: budgetId }) => {
    const { data } = await db.from("TransactionView").select("*").order("date", { ascending: false }).eq("userId", id).eq("isDeleted", false).eq("budgetId", Number(budgetId));
    return { data };
  },
  deleted: async ({ id }) => {
    const { data } = await db.from("TransactionView").select("*").order("date", { ascending: false }).eq("userId", id).eq("isDeleted", true);
    return { data };
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

const GET = async ({ request, session, cookies }) => {
  const auth = { id: 1 };
  if (!auth) return errorResponse({ error: "Invalid user id" });
  const queryParams = getQueryParamsFromUrl(request.url, auth.id);
  if (typeof handlers[queryParams.filter] === "function") {
    const response = await handlers[queryParams.filter](queryParams);
    return new Response(
      JSON.stringify(response),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
  return new Response(
    JSON.stringify({ error: "Invalid transaction filter" }),
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
  if (!params.route || !params.route[0]) {
    return errorResponse({ error: "Invalid ID" });
  }
  const id = Number(params.route);
  const body = await request.json();
  const { error } = await db.from("Transactions").update(body).eq("id", id).select();
  return new Response(
    JSON.stringify({ error }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};
const DELETE = async ({ params }) => {
  if (!params.route || !params.route[0]) {
    return errorResponse({ error: "Invalid ID" });
  }
  const id = Number(params.route);
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
