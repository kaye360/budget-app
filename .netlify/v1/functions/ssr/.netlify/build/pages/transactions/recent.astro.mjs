import { f as createComponent, m as maybeRenderHead, l as renderScript, r as renderTemplate, e as createAstro, k as renderComponent } from '../../chunks/astro/server_BvKLBLe3.mjs';
import 'kleur/colors';
import { $ as $$FilterTransactions } from '../../chunks/FilterTransactions_DSkWepD1.mjs';
import 'clsx';
import { $ as $$Transaction } from '../../chunks/Transaction_Cih2a0Vq.mjs';
import { $ as $$H1 } from '../../chunks/H1_DsOXxaez.mjs';
import { $ as $$Layout } from '../../chunks/Layout_BjFQCDfi.mjs';
import { f as fetchData } from '../../chunks/fetch_Cuj3Cw_X.mjs';
export { renderers } from '../../renderers.mjs';

const $$MoreTransactionsButton = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<button id="more-transactions-button" class="bg-slate-700 p-6 mt-6 rounded-xl mb-36 w-full cursor-pointer text-lg hover:bg-blue ">
More Transactions
</button> ${renderScript($$result, "C:/web-projecs/budget-app/src/components/_transactions/MoreTransactionsButton.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/web-projecs/budget-app/src/components/_transactions/MoreTransactionsButton.astro", void 0);

const $$Astro = createAstro("https://skl-budget.netlify.app");
const $$Recent = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Recent;
  const auth = await Astro2.session?.get("auth");
  if (!auth) {
    return Astro2.redirect("/");
  }
  const [transactions, budgets] = await Promise.all([
    fetchData("/api/transactions/recent"),
    fetchData("/api/budgets")
  ]);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "FilterTransactions", $$FilterTransactions, { "current": "recent" })} ${maybeRenderHead()}<div class="mb-4"> ${renderComponent($$result2, "H1", $$H1, {}, { "default": async ($$result3) => renderTemplate`
Recent Transactions
` })} </div> ${renderComponent($$result2, "transaction-list", "transaction-list", { "class": "grid gap-6" }, { "default": () => renderTemplate` ${transactions.response?.data.map((transaction) => renderTemplate`${renderComponent($$result2, "Transaction", $$Transaction, { "transaction": transaction, "budgets": budgets.response?.data })}`)} <template id="transaction-template"> ${renderComponent($$result2, "Transaction", $$Transaction, { "budgets": budgets.response?.data })} </template> ` })} ${renderComponent($$result2, "MoreTransactionsButton", $$MoreTransactionsButton, {})} ` })}`;
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
