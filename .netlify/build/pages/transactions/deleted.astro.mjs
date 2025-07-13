import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate } from '../../chunks/astro/server_BvKLBLe3.mjs';
import 'kleur/colors';
import { $ as $$FilterTransactions } from '../../chunks/FilterTransactions_6d9Zd0ub.mjs';
import { $ as $$MoreTransactionsButton } from '../../chunks/MoreTransactionsButton_BWwX5iwm.mjs';
import { $ as $$Layout } from '../../chunks/Layout_DgpgtHox.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://skl-budget.netlify.app");
const $$Deleted = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Deleted;
  const auth = await Astro2.session?.get("auth");
  if (!auth) {
    return Astro2.redirect("/");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "FilterTransactions", $$FilterTransactions, { "current": "deleted" })} ${renderComponent($$result2, "MoreTransactionsButton", $$MoreTransactionsButton, {})} ` })}`;
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
