import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BvKLBLe3.mjs';
import 'kleur/colors';
import { $ as $$Layout, A as ArrowLeftRight } from '../chunks/Layout_D6UjjAL9.mjs';
import { $ as $$Transaction } from '../chunks/Transaction_D6AY5l5Q.mjs';
import { g as getTransactions } from '../chunks/getTransactions_DKiJpW1w.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://skl-budget.netlify.app");
const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Dashboard;
  const auth = await Astro2.session?.get("auth");
  if (!auth) {
    return Astro2.redirect("/");
  }
  const transactions = await getTransactions(1, {
    by: "recent",
    page: 0,
    perPage: 3
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="text-xl">
Welcome ${auth.userName} </div> <div class="grid gap-4 grid-cols-3 grid-rows-2"> <div class="bg-blue/10 backdrop-blur-lg rounded-xl p-4 col-span-2"> <h2 class="flex items-center gap-2 font-semibold tex-2xl mb-4"> ${renderComponent($$result2, "ArrowLeftRightIcon", ArrowLeftRight, {})}
Recent Transactions
</h2> ${renderComponent($$result2, "transaction-list", "transaction-list", { "class": "grid gap-6" }, { "default": () => renderTemplate` ${transactions.data.map(
    (transaction) => renderTemplate`${renderComponent($$result2, "Transaction", $$Transaction, { "transaction": transaction, "mode": "simple" })}`
  )} ` })} </div> <div class="border border-slate-700 rounded-xl p-4 row-span-2">Budgets</div> <div class="border border-slate-700 rounded-xl p-4 min-h-32">Debt</div> <div class="border border-slate-700 rounded-xl p-4 min-h-32">Income</div> <div class="border border-slate-700 rounded-xl p-4 min-h-32">
Upcoming Bills
</div> </div> ` })}`;
}, "C:/web-projecs/budget-app/src/pages/dashboard.astro", void 0);

const $$file = "C:/web-projecs/budget-app/src/pages/dashboard.astro";
const $$url = "/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Dashboard,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
