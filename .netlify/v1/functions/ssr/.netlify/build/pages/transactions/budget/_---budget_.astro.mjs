import { e as createAstro, f as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../../chunks/astro/server_BvKLBLe3.mjs';
import 'kleur/colors';
import { $ as $$FilterTransactions } from '../../../chunks/FilterTransactions_DSkWepD1.mjs';
import { $ as $$Transaction } from '../../../chunks/Transaction_Cih2a0Vq.mjs';
import { $ as $$H1 } from '../../../chunks/H1_DsOXxaez.mjs';
import { $ as $$Layout } from '../../../chunks/Layout_BjFQCDfi.mjs';
import { f as fetchData } from '../../../chunks/fetch_Cuj3Cw_X.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://skl-budget.netlify.app");
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const auth = await Astro2.session?.get("auth");
  if (!auth) {
    return Astro2.redirect("/");
  }
  const { budget } = Astro2.params;
  let transactions = { data: [] };
  const budgets = await fetchData("/api/budgets");
  if (budget) {
    const transactionsResult = await fetchData(`/api/transactions/budget/${budget}`);
    transactions = transactionsResult.response || { data: [] };
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "FilterTransactions", $$FilterTransactions, { "current": "budget" })} ${maybeRenderHead()}<div class="flex items-center justify-between mb-4"> ${renderComponent($$result2, "H1", $$H1, {}, { "default": async ($$result3) => renderTemplate`${budget ? budgets.response?.data[Number(budget) - 1].name : "Select a budget"}` })} <select id="budget-selector" name="budget-selector" class="w-fit"${addAttribute(budget, "data-budget")}> <option>Select budget to view</option> ${budgets.response?.data.map((budget2) => renderTemplate`<option${addAttribute(budget2.id, "value")}> ${budget2.name} </option>`)} </select> </div> ${renderComponent($$result2, "transaction-list", "transaction-list", { "class": "grid gap-6  transition-all translate-x-24 opacity-0 w-full" }, { "default": () => renderTemplate` ${transactions.data.map((transaction) => renderTemplate`${renderComponent($$result2, "Transaction", $$Transaction, { "transaction": transaction, "budgets": budgets.response?.data })}`)} ` })} ` })} ${renderScript($$result, "C:/web-projecs/budget-app/src/pages/transactions/budget/[...budget].astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/web-projecs/budget-app/src/pages/transactions/budget/[...budget].astro", void 0);

const $$file = "C:/web-projecs/budget-app/src/pages/transactions/budget/[...budget].astro";
const $$url = "/transactions/budget/[...budget]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
