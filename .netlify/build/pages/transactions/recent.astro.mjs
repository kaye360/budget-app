import { f as createComponent, m as maybeRenderHead, l as renderScript, r as renderTemplate, e as createAstro, k as renderComponent } from '../../chunks/astro/server_BvKLBLe3.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_CGRk1GVH.mjs';
import 'clsx';
import { $ as $$Transaction } from '../../chunks/Transaction_Bsvy4piN.mjs';
export { renderers } from '../../renderers.mjs';

const $$MoreTransactionsButton = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<button id="more-transactions-button" class="bg-slate-700 p-6 mt-6 rounded-xl mb-36 w-full cursor-pointer text-lg hover:bg-blue ">
More Transactions
</button> ${renderScript($$result, "C:/web-projecs/budget-app/src/pages/transactions/_components/MoreTransactionsButton.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/web-projecs/budget-app/src/pages/transactions/_components/MoreTransactionsButton.astro", void 0);

const $$Astro = createAstro("https://skl-budget.netlify.app");
const $$Recent = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Recent;
  const auth = await Astro2.session?.get("auth");
  if (!auth) {
    return Astro2.redirect("/");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "loader": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "filter-options", "filter-options", { "class": "flex items-center gap-2 rounded mb-8 text-xs w-full overflow-x-auto sm:overflow-x-visible" }, { "default": () => renderTemplate` ${maybeRenderHead()}<a class="px-3 py-1 rounded-full border border-accent-text bg-accent-text text-black font-semibold" href="/transactions/recent">
Recent
</a> <a class="px-3 py-1 rounded-full border border-accent-text font-semibold" href="/transactions/monthly">
Month
</a> <a class="px-3 py-1 rounded-full border border-accent-text font-semibold" href="/transactions/monthly">
Budget
</a> <a class="px-3 py-1 rounded-full border border-accent-text font-semibold" href="/transactions/search">
Search
</a> <a class="px-3 py-1 rounded-full border border-accent-text font-semibold" href="/transactions/deleted">
Deleted
</a> ` })} ${renderComponent($$result2, "transaction-list", "transaction-list", { "class": "grid gap-6" }, { "default": () => renderTemplate` <div class="hidden"> ${renderComponent($$result2, "Transaction", $$Transaction, {})} </div> <template id="transaction-template"> ${renderComponent($$result2, "Transaction", $$Transaction, {})} </template> ` })} ${renderComponent($$result2, "MoreTransactionsButton", $$MoreTransactionsButton, {})} ` })} ${renderScript($$result, "C:/web-projecs/budget-app/src/pages/transactions/recent.astro?astro&type=script&index=0&lang.ts")}`;
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
