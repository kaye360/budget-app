import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate } from '../../chunks/astro/server_BvKLBLe3.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_D6UjjAL9.mjs';
import { $ as $$FilterTransactions } from '../../chunks/FilterTransactions_DPJzj4gd.mjs';
import { $ as $$MoreTransactionsButton } from '../../chunks/MoreTransactionsButton_DbBD83KL.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://skl-budget.netlify.app");
const $$Budget = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Budget;
  const auth = await Astro2.session?.get("auth");
  if (!auth) {
    return Astro2.redirect("/");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "FilterTransactions", $$FilterTransactions, { "current": "budget" })} ${renderComponent($$result2, "transaction-list", "transaction-list", { "class": "grid gap-6" })} ${renderComponent($$result2, "MoreTransactionsButton", $$MoreTransactionsButton, {})} ` })}`;
}, "C:/web-projecs/budget-app/src/pages/transactions/budget.astro", void 0);

const $$file = "C:/web-projecs/budget-app/src/pages/transactions/budget.astro";
const $$url = "/transactions/budget";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Budget,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
