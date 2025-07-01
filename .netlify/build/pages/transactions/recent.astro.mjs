import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate } from '../../chunks/astro/server_BvKLBLe3.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_D6UjjAL9.mjs';
import { g as getBudgets } from '../../chunks/getBudgets_C11CLAo_.mjs';
import { $ as $$FilterTransactions } from '../../chunks/FilterTransactions_DPJzj4gd.mjs';
import { $ as $$MoreTransactionsButton } from '../../chunks/MoreTransactionsButton_DbBD83KL.mjs';
import { $ as $$Transaction } from '../../chunks/Transaction_D6AY5l5Q.mjs';
import { g as getTransactions } from '../../chunks/getTransactions_DKiJpW1w.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://skl-budget.netlify.app");
const $$Recent = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Recent;
  const auth = await Astro2.session?.get("auth");
  if (!auth) {
    return Astro2.redirect("/");
  }
  const [transactions, budgets] = await Promise.all([
    getTransactions(1, { by: "recent", page: 0, perPage: 50 }),
    getBudgets()
  ]);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "FilterTransactions", $$FilterTransactions, { "current": "recent" })} ${renderComponent($$result2, "transaction-list", "transaction-list", { "class": "grid gap-6" }, { "default": () => renderTemplate` ${transactions.data.map((transaction) => renderTemplate`${renderComponent($$result2, "Transaction", $$Transaction, { "transaction": transaction, "budgets": budgets })}`)} <template id="transaction-template"> ${renderComponent($$result2, "Transaction", $$Transaction, { "budgets": budgets })} </template> ` })} ${renderComponent($$result2, "MoreTransactionsButton", $$MoreTransactionsButton, {})} ` })}`;
}, "C:/web-projecs/budget-app/src/pages/transactions/recent.astro", void 0);

const $$file = "C:/web-projecs/budget-app/src/pages/transactions/recent.astro";
const $$url = "/transactions/recent";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Recent,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
