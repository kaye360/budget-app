import { f as fetchData } from './getTransactions_DKiJpW1w.mjs';

async function getBudgets() {
  const res = await fetchData("/api/budgets?id=1");
  if (res.error || !res.response) return [];
  return res.response?.data;
}

export { getBudgets as g };
