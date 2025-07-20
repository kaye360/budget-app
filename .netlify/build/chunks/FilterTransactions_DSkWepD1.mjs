import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from './astro/server_BvKLBLe3.mjs';
import 'kleur/colors';
import { c as createLucideIcon } from './app.config_DnBzuijw.mjs';

const CirclePlus = createLucideIcon("circle-plus", [["circle", { "cx": "12", "cy": "12", "r": "10" }], ["path", { "d": "M8 12h8" }], ["path", { "d": "M12 8v8" }]]);

const $$Astro = createAstro("https://skl-budget.netlify.app");
const $$FilterTransactions = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$FilterTransactions;
  const { current } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "filter-transactions", "filter-transactions", { "class": "flex items-center gap-1 md:gap-3 rounded mb-8 text-xs w-full overflow-x-auto sm:overflow-x-visible" }, { "default": () => renderTemplate` ${maybeRenderHead()}<a${addAttribute([
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
</a> <a class="flex items-center gap-2 text-base ml-auto text-red hover:text-blue" href="/transactions/add"> ${renderComponent($$result, "CirclePlusIcon", CirclePlus, { "width": 36, "height": 36 })} </a> ` })}`;
}, "C:/web-projecs/budget-app/src/components/_transactions/FilterTransactions.astro", void 0);

export { $$FilterTransactions as $ };
