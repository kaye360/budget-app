import { B as BASE_URL } from './app.config_C9KMaloa.mjs';

function getCurrentYYMM() {
  const now = /* @__PURE__ */ new Date();
  const yy = String(now.getFullYear()).slice(2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  return yy + mm;
}
function yymmToMonthYear(yymm, offset = 0) {
  const str = String(yymm).padStart(4, "0");
  const year = 2e3 + Number(str.slice(0, 2));
  const month = Number(str.slice(2, 4)) - 1;
  const date = new Date(year, month + offset);
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });
}
function objectValuesToString(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, String(value)])
  );
}

async function fetchData(url, options = {}) {
  try {
    const isServer = typeof window === "undefined";
    const fullUrl = isServer ? `${BASE_URL}${url}` : url;
    const response = await fetch(fullUrl, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...options.headers
      },
      body: options.body ? JSON.stringify(options.body) : void 0
    });
    const data = await response.json();
    if (!response.ok) {
      return { response: null, error: data };
    }
    return { response: data, error: null };
  } catch (error) {
    return { response: null, error };
  }
}

async function getTransactions(userId, options) {
  const params = options ? "&" + new URLSearchParams(objectValuesToString(options)) : "";
  const res = await fetchData(`/api/transactions?id=${userId}&${params}`);
  if (res.error || !res.response) return { data: [], totalPages: 0, count: 0 };
  return res.response;
}
function groupTransactionsByBudget(transactions) {
  const transactionsGrouped = {};
  transactions.forEach((transaction) => {
    if (!(typeof transaction.budgetId === "number")) {
      return;
    }
    if (!transactionsGrouped[transaction.budgetId]) {
      transactionsGrouped[transaction.budgetId] = [];
    }
    transactionsGrouped[transaction.budgetId].push(transaction);
  });
  return transactionsGrouped;
}

async function getBudgets() {
  const res = await fetchData("/api/budgets?id=1");
  if (res.error || !res.response) return [];
  return res.response?.data;
}
function getBudgetsWithTotalSpent(budgets, transactions) {
  const transactionsGroupedByBudget = groupTransactionsByBudget(transactions);
  const budgetTotals = [];
  for (const budgetId in transactionsGroupedByBudget) {
    const total = transactionsGroupedByBudget[budgetId].reduce((sum, { amount }) => {
      return sum + Number(amount);
    }, 0);
    budgetTotals.push({
      budgetId: Number(budgetId),
      total: Math.abs(Math.round(total * 100) / 100)
    });
  }
  return budgets.map((budget) => {
    const match = budgetTotals.find((t) => t.budgetId === budget.id);
    const totalSpent = match ? match.total : 0;
    let percentSpent = Math.min(Math.round(totalSpent / budget.amount * 100), 100);
    return { ...budget, totalSpent, percentSpent };
  });
}

export { getTransactions as a, getBudgets as b, getBudgetsWithTotalSpent as c, getCurrentYYMM as g, yymmToMonthYear as y };
