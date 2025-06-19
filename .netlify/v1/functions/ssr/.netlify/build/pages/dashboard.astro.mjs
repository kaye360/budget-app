import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_FhSrvt_g.mjs';
import 'kleur/colors';
import { $ as $$Layout, A as ArrowLeftRight } from '../chunks/Layout_DuBthDQt.mjs';
import { $ as $$Transaction } from '../chunks/Transaction_CzZY-UVz.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Dashboard;
  const auth = await Astro2.session?.get("auth");
  let transactions = [];
  if (auth) {
    const res = await fetch(new URL(`/transactions/api/get?id=${auth.userId}&perPage=3`, Astro2.url));
    transactions = await res.json();
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate`${!auth && renderTemplate`${maybeRenderHead()}<form method="post" action="/auth/login"> <input type="text" name="password" class="border"> <input type="submit" class="border px-1"> </form>`}${auth && renderTemplate`<div class="text-xl">
Welcome ${auth.userName} </div>
		<div class="grid gap-4 grid-cols-3 grid-rows-2"> <div class="bg-blue/10 backdrop-blur-lg rounded-xl p-4 col-span-2"> <h2 class="flex items-center gap-2 font-semibold tex-2xl mb-4"> ${renderComponent($$result2, "ArrowLeftRightIcon", ArrowLeftRight, {})}
Recent Transactions
</h2> ${renderComponent($$result2, "transaction-list", "transaction-list", { "class": "grid gap-6" }, { "default": () => renderTemplate` ${transactions.data.map(
    (transaction) => renderTemplate`${renderComponent($$result2, "Transaction", $$Transaction, { "transaction": transaction, "mode": "simple" })}`
  )} ` })} </div> <div class="bg-green rounded-xl p-4 row-span-2">Budgets</div> <div class="bg-purple rounded-xl p-4 min-h-32">Debt</div> <div class="bg-orange border-slate-300 rounded-xl p-4 min-h-32">Income</div> <div class="bg-red rounded-xl p-4 min-h-32">
Upcoming Bills
</div> </div>`}` })}`;
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
