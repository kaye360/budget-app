import { e as createAstro, f as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../../chunks/astro/server_BvKLBLe3.mjs';
import 'kleur/colors';
import { $ as $$FilterTransactions } from '../../../chunks/FilterTransactions_DSkWepD1.mjs';
import { $ as $$Transaction } from '../../../chunks/Transaction_Cih2a0Vq.mjs';
import { $ as $$H1 } from '../../../chunks/H1_DsOXxaez.mjs';
import { $ as $$Layout } from '../../../chunks/Layout_BjFQCDfi.mjs';
import { c as convertDate } from '../../../chunks/convertDate_KzwctwZh.mjs';
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
  let { month = convertDate().to("YYYY-MM") } = Astro2.params;
  const [transactions, budgets] = await Promise.all([
    fetchData(`/api/transactions/month/${month}`),
    fetchData("/api/budgets")
  ]);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "FilterTransactions", $$FilterTransactions, { "current": "month" })} ${maybeRenderHead()}<div class="flex items-center justify-between mb-4"> ${renderComponent($$result2, "H1", $$H1, {}, { "default": async ($$result3) => renderTemplate`${convertDate(month).to("MMMM-YYYY")}` })} <select id="month-selector" name="month-selector" class="w-fit"${addAttribute(month, "data-month")}> <option>Select month to view</option> ${transactions.response?.months.map((month2) => renderTemplate`<option${addAttribute(month2.month, "value")}> ${month2.title} </option>`)} </select> </div> ${renderComponent($$result2, "transaction-list", "transaction-list", { "class": "grid gap-6" }, { "default": () => renderTemplate` ${transactions.response?.data.map((transaction) => renderTemplate`${renderComponent($$result2, "Transaction", $$Transaction, { "transaction": transaction, "budgets": budgets.response?.data })}`)} ` })} ` })} ${renderScript($$result, "C:/web-projecs/budget-app/src/pages/transactions/month/[...month].astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/web-projecs/budget-app/src/pages/transactions/month/[...month].astro", void 0);

const $$file = "C:/web-projecs/budget-app/src/pages/transactions/month/[...month].astro";
const $$url = "/transactions/month/[...month]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
