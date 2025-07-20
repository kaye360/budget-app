import { e as createAstro, f as createComponent, m as maybeRenderHead, h as addAttribute, r as renderTemplate } from './astro/server_BvKLBLe3.mjs';
import 'kleur/colors';
import 'clsx';

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

function getBudgetsWithTotalSpent(budgets, transactions) {
  if (!transactions || !budgets) {
    return [];
  }
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

const $$Astro = createAstro("https://skl-budget.netlify.app");
const $$Budget = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Budget;
  const { budget, index } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute([
    "relative rounded-2xl flex items-center justify-between px-4 py-2 font-semibold",
    index % 5 === 0 && "bg-blue/10",
    index % 5 === 1 && "bg-green/10",
    index % 5 === 2 && "bg-purple/10",
    index % 5 === 3 && "bg-red/10",
    index % 5 === 4 && "bg-orange/10"
  ], "class:list")}> <a${addAttribute(`/transactions/budget/${budget.id}`, "href")} class="hover:underline"> ${budget.name} </a> <span class="text-2xl"> ${budget.totalSpent} / ${budget.amount} </span> <span${addAttribute([
    "absolute left-0 top-0 bottom-0 -z-10 rounded-2xl",
    index % 5 === 0 && "bg-blue/30",
    index % 5 === 1 && "bg-green/30",
    index % 5 === 2 && "bg-purple/30",
    index % 5 === 3 && "bg-red/30",
    index % 5 === 4 && "bg-orange/30"
  ], "class:list")}${addAttribute(`width : ${budget.percentSpent}%`, "style")}></span> </div>`;
}, "C:/web-projecs/budget-app/src/components/_budgets/Budget.astro", void 0);

export { $$Budget as $, getBudgetsWithTotalSpent as g };
