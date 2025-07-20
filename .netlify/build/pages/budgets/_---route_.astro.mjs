import { e as createAstro, f as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_BvKLBLe3.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_BjFQCDfi.mjs';
import { g as getBudgetsWithTotalSpent, $ as $$Budget } from '../../chunks/Budget_CqDB-9uS.mjs';
import { f as fetchData } from '../../chunks/fetch_Cuj3Cw_X.mjs';
import { c as convertDate } from '../../chunks/convertDate_KzwctwZh.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://skl-budget.netlify.app");
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { route } = Astro2.params;
  const month = route ? route : convertDate().to("YYYY-MM");
  const [transactions, budgets] = await Promise.all([
    fetchData(`/api/transactions/month/${month}`),
    fetchData("/api/budgets")
  ]);
  const budgetsWithTotals = getBudgetsWithTotalSpent(budgets.response?.data, transactions.response?.data);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex items-center justify-between mb-4"> <h1 class="text-lg md:text-xl font-semibold font-theme min-w-max"> ${convertDate(month).to("MMMM-YYYY")} </h1> <select id="month-selector" name="month-selector" class="w-fit"${addAttribute(month, "data-month")}> <option>Select month to view</option> ${transactions.response?.months.map((month2) => renderTemplate`<option${addAttribute(month2.month, "value")}> ${month2.title} </option>`)} </select> </div> ${renderComponent($$result2, "budget-list", "budget-list", { "class": "grid gap-6 text-lg transition-all translate-x-24 opacity-0 w-full" }, { "default": () => renderTemplate` ${budgetsWithTotals.map((budget, index) => renderTemplate`${renderComponent($$result2, "Budget", $$Budget, { "budget": budget, "index": index })}`)} ` })} ` })} ${renderScript($$result, "C:/web-projecs/budget-app/src/pages/budgets/[...route].astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/web-projecs/budget-app/src/pages/budgets/[...route].astro", void 0);

const $$file = "C:/web-projecs/budget-app/src/pages/budgets/[...route].astro";
const $$url = "/budgets/[...route]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
