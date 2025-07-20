import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BvKLBLe3.mjs';
import 'kleur/colors';
import { $ as $$FilterTransactions } from '../../chunks/FilterTransactions_DSkWepD1.mjs';
import { $ as $$Transaction } from '../../chunks/Transaction_Cih2a0Vq.mjs';
import { $ as $$H1 } from '../../chunks/H1_DsOXxaez.mjs';
import { $ as $$Layout } from '../../chunks/Layout_BjFQCDfi.mjs';
import { f as fetchData } from '../../chunks/fetch_Cuj3Cw_X.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://skl-budget.netlify.app");
const $$Deleted = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Deleted;
  const auth = await Astro2.session?.get("auth");
  if (!auth) {
    return Astro2.redirect("/");
  }
  const [transactions, budgets] = await Promise.all([
    fetchData(`/api/transactions/deleted`),
    fetchData("/api/budgets")
  ]);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "FilterTransactions", $$FilterTransactions, { "current": "deleted" })} ${maybeRenderHead()}<div class="mb-4"> ${renderComponent($$result2, "H1", $$H1, {}, { "default": async ($$result3) => renderTemplate`
Deleted Transactions
` })} </div> ${renderComponent($$result2, "transaction-list", "transaction-list", { "class": "grid gap-6" }, { "default": () => renderTemplate` ${transactions.response?.data && transactions.response.data.map((transaction) => renderTemplate`${renderComponent($$result2, "Transaction", $$Transaction, { "transaction": transaction, "budgets": budgets.response?.data })}`)} ` })} ` })}`;
}, "C:/web-projecs/budget-app/src/pages/transactions/deleted.astro", void 0);

const $$file = "C:/web-projecs/budget-app/src/pages/transactions/deleted.astro";
const $$url = "/transactions/deleted";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Deleted,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
