import { e as createComponent, m as maybeRenderHead, l as renderScript, r as renderTemplate, f as createAstro, k as renderComponent } from '../chunks/astro/server_FhSrvt_g.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_Dl2Yzz1i.mjs';
import 'clsx';
import { $ as $$Transaction } from '../chunks/Transaction_yjJZuRP3.mjs';
export { renderers } from '../renderers.mjs';

const $$MoreTransactionsButton = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<button id="more-transactions-button" class="bg-white p-6 mt-6 rounded-xl mb-36 w-full cursor-pointer text-lg hover:bg-orange">
More Transactions
</button> ${renderScript($$result, "C:/web-projecs/budget-app/src/pages/transactions/_components/MoreTransactionsButton.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/web-projecs/budget-app/src/pages/transactions/_components/MoreTransactionsButton.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const auth = await Astro2.session?.get("auth");
  if (!auth) {
    return Astro2.redirect("/");
  }
  const res = await fetch(new URL(`/transactions/api/get?id=${auth.userId}&perPage=50`, Astro2.url));
  const transactions = await res.json();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate`
Transactions
${renderComponent($$result2, "filter-options", "filter-options", { "class": "flex items-center gap-4 rounded mb-4" }, { "default": () => renderTemplate` ${maybeRenderHead()}<button>Most Recent</button> <button>Monthly</button> <button>Weekly</button> <button>Search</button> ` })} ${renderComponent($$result2, "transaction-list", "transaction-list", { "class": "grid gap-6" }, { "default": () => renderTemplate` ${transactions.data.map(
    (transaction) => renderTemplate`${renderComponent($$result2, "Transaction", $$Transaction, { "transaction": transaction })}`
  )} <template id="transaction-item"> ${renderComponent($$result2, "Transaction", $$Transaction, {})} </template> ` })} ${renderComponent($$result2, "MoreTransactionsButton", $$MoreTransactionsButton, {})} ` })}`;
}, "C:/web-projecs/budget-app/src/pages/transactions/index.astro", void 0);

const $$file = "C:/web-projecs/budget-app/src/pages/transactions/index.astro";
const $$url = "/transactions";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
