import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BvKLBLe3.mjs';
import 'kleur/colors';
import { $ as $$FilterTransactions } from '../../chunks/FilterTransactions_DSkWepD1.mjs';
import { $ as $$H1 } from '../../chunks/H1_DsOXxaez.mjs';
import { $ as $$Layout } from '../../chunks/Layout_BjFQCDfi.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://skl-budget.netlify.app");
const $$Search = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Search;
  const auth = await Astro2.session?.get("auth");
  if (!auth) {
    return Astro2.redirect("/");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "FilterTransactions", $$FilterTransactions, { "current": "search" })} ${maybeRenderHead()}<div class="mb-4"> ${renderComponent($$result2, "H1", $$H1, {}, { "default": async ($$result3) => renderTemplate`
Search Transactions
` })} </div> ` })}`;
}, "C:/web-projecs/budget-app/src/pages/transactions/search.astro", void 0);

const $$file = "C:/web-projecs/budget-app/src/pages/transactions/search.astro";
const $$url = "/transactions/search";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Search,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
