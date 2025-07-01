import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from './astro/server_BvKLBLe3.mjs';
import 'kleur/colors';

const $$Astro = createAstro("https://skl-budget.netlify.app");
const $$FilterTransactions = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$FilterTransactions;
  const { current } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "filter-transactions", "filter-transactions", { "class": "flex items-center gap-2 rounded mb-8 text-xs w-full overflow-x-auto sm:overflow-x-visible" }, { "default": () => renderTemplate` ${maybeRenderHead()}<a${addAttribute([
    "px-3 py-1 rounded-full border border-accent-text",
    current === "recent" && "bg-accent-text text-black font-semibold"
  ], "class:list")} href="/transactions/recent">
Recent
</a> <a${addAttribute([
    "px-3 py-1 rounded-full border border-accent-text font-semibold",
    current === "month" && "bg-accent-text text-black font-semibold"
  ], "class:list")} href="/transactions/month">
Month
</a> <a${addAttribute([
    "px-3 py-1 rounded-full border border-accent-text font-semibold",
    current === "budget" && "bg-accent-text text-black font-semibold"
  ], "class:list")} href="/transactions/budget">
Budget
</a> <a${addAttribute([
    "px-3 py-1 rounded-full border border-accent-text font-semibold",
    current === "deleted" && "bg-accent-text text-black font-semibold"
  ], "class:list")} href="/transactions/deleted">
Deleted
</a> <a${addAttribute([
    "px-3 py-1 rounded-full border border-accent-text font-semibold",
    current === "search" && "bg-accent-text text-black font-semibold"
  ], "class:list")} href="/transactions/search">
Search
</a> ` })}`;
}, "C:/web-projecs/budget-app/src/pages/transactions/_components/FilterTransactions.astro", void 0);

export { $$FilterTransactions as $ };
