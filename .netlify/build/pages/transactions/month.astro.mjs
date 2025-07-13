import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate } from '../../chunks/astro/server_BvKLBLe3.mjs';
import 'kleur/colors';
import { $ as $$FilterTransactions } from '../../chunks/FilterTransactions_6d9Zd0ub.mjs';
import { $ as $$MoreTransactionsButton } from '../../chunks/MoreTransactionsButton_BWwX5iwm.mjs';
import { $ as $$Layout } from '../../chunks/Layout_DgpgtHox.mjs';
import { a as getTransactions, b as getBudgets } from '../../chunks/budget.utils_Dv1ePa-3.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://skl-budget.netlify.app");
const $$Month = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Month;
  const auth = await Astro2.session?.get("auth");
  if (!auth) {
    return Astro2.redirect("/");
  }
  const [transactions, budgets] = await Promise.all([
    getTransactions(1, { by: "month", month: 2506 }),
    getBudgets()
  ]);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "FilterTransactions", $$FilterTransactions, { "current": "month" })} ${renderComponent($$result2, "transaction-list", "transaction-list", { "class": "grid gap-6" })} ${renderComponent($$result2, "MoreTransactionsButton", $$MoreTransactionsButton, {})} ` })}`;
}, "C:/web-projecs/budget-app/src/pages/transactions/month.astro", void 0);

const $$file = "C:/web-projecs/budget-app/src/pages/transactions/month.astro";
const $$url = "/transactions/month";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Month,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
