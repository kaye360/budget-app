import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_BvKLBLe3.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_DgpgtHox.mjs';
import { g as getCurrentYYMM, a as getTransactions, b as getBudgets, c as getBudgetsWithTotalSpent, y as yymmToMonthYear } from '../../chunks/budget.utils_Dv1ePa-3.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://skl-budget.netlify.app");
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { path } = Astro2.params;
  const month = Number(path ? path : getCurrentYYMM());
  const [transactions, budgets] = await Promise.all([
    getTransactions(1, { by: "month", month }),
    getBudgets()
  ]);
  const budgetsWithTotals = getBudgetsWithTotalSpent(budgets, transactions.data);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex items-center justify-between mb-4"> <span> ${yymmToMonthYear(month, -1)} </span> <h1 class="text-xl font-semibold font-theme"> ${yymmToMonthYear(month)} Spending
</h1> <span> ${yymmToMonthYear(month, 1)} </span> </div> <div class="grid gap-6 text-lg"> ${budgetsWithTotals.map((budget, i) => renderTemplate`<div${addAttribute([
    "relative rounded-2xl flex items-center justify-between px-4 py-2 font-semibold",
    i % 5 === 0 && "bg-blue/10",
    i % 5 === 1 && "bg-green/10",
    i % 5 === 2 && "bg-purple/10",
    i % 5 === 3 && "bg-red/10",
    i % 5 === 4 && "bg-orange/10"
  ], "class:list")}> <span> ${budget.name} </span> <span class="text-2xl"> ${budget.totalSpent} / ${budget.amount} </span> <span${addAttribute([
    "absolute left-0 top-0 bottom-0 -z-10 rounded-2xl",
    i % 5 === 0 && "bg-blue/30",
    i % 5 === 1 && "bg-green/30",
    i % 5 === 2 && "bg-purple/30",
    i % 5 === 3 && "bg-red/30",
    i % 5 === 4 && "bg-orange/30"
  ], "class:list")}${addAttribute(`width : ${budget.percentSpent}%`, "style")}></span> </div>`)} </div> ` })}`;
}, "C:/web-projecs/budget-app/src/pages/budgets/[...path].astro", void 0);

const $$file = "C:/web-projecs/budget-app/src/pages/budgets/[...path].astro";
const $$url = "/budgets/[...path]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
