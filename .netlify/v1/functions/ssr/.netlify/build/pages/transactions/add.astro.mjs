import { e as createAstro, f as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_BvKLBLe3.mjs';
import 'kleur/colors';
import { T as Trash2, $ as $$LoadingButton } from '../../chunks/LoadingButton_BnS14llA.mjs';
import { $ as $$Layout } from '../../chunks/Layout_BjFQCDfi.mjs';
import { $ as $$Button } from '../../chunks/Button_C8tZvlGl.mjs';
import 'clsx';
import { $ as $$H1 } from '../../chunks/H1_DsOXxaez.mjs';
import { f as fetchData } from '../../chunks/fetch_Cuj3Cw_X.mjs';
import { c as createLucideIcon } from '../../chunks/app.config_DnBzuijw.mjs';
export { renderers } from '../../renderers.mjs';

const BanknoteArrowUp = createLucideIcon("banknote-arrow-up", [["path", { "d": "M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5" }], ["path", { "d": "M18 12h.01" }], ["path", { "d": "M19 22v-6" }], ["path", { "d": "m22 19-3-3-3 3" }], ["path", { "d": "M6 12h.01" }], ["circle", { "cx": "12", "cy": "12", "r": "2" }]]);

const Import = createLucideIcon("import", [["path", { "d": "M12 3v12" }], ["path", { "d": "m8 11 4 4 4-4" }], ["path", { "d": "M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4" }]]);

const $$Astro = createAstro("https://skl-budget.netlify.app");
const $$CreateTransaction = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CreateTransaction;
  const { budgets } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "transaction-create", "transaction-create", { "class": "grid sm:grid-cols-2 gap-4 border-l border-blue pl-4 mb-12" }, { "default": () => renderTemplate` ${maybeRenderHead()}<label>
Date: <br> <input type="date" name="date-0" data-name="date"> </label> <label>
Description: <br> <input type="text" name="description-0" data-name="description" required> </label> <label>
Amount: <br> <input type="text" name="amount-0" data-name="amount" required> </label> <label>
Budget: <br> <select name="budgetId-0" data-name="budgetId" class="w-full"> ${budgets && budgets.map((budget) => renderTemplate`<option${addAttribute(budget.id, "value")}>${budget.name}</option>`)} </select> </label> <label>
Account: <br> <select name="accountId-0" data-name="accountId" class="w-full"> <option value="1">account 1</option> <option selected value="2">account 2</option> </select> </label> <div class="md:text-right"> ${renderComponent($$result, "Button", $$Button, { "variant": "ghost", "type": "button", "class": "h-full w-fit flex items-end gap-1 ml-auto text-sm hover:underline" }, { "default": ($$result2) => renderTemplate`
Remove
${renderComponent($$result2, "Trash2Icon", Trash2, { "width": "20", "height": "20", "stroke-width": 2 })} ` })} </div> ` })} ${renderScript($$result, "C:/web-projecs/budget-app/src/components/_transactions/CreateTransaction.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/web-projecs/budget-app/src/components/_transactions/CreateTransaction.astro", void 0);

const $$CreateTransactionCount = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<select id="transaction-count-select" class="!w-fit"> <option value="1">Adding 1 Transaction</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> <option value="6">6</option> <option value="7">7</option> <option value="8">8</option> <option value="9">9</option> <option value="10">10</option> </select> ${renderScript($$result, "C:/web-projecs/budget-app/src/components/_transactions/CreateTransactionCount.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/web-projecs/budget-app/src/components/_transactions/CreateTransactionCount.astro", void 0);

const $$Add = createComponent(async ($$result, $$props, $$slots) => {
  const budgets = await fetchData("/api/budgets");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex items-center justify-between mb-6"> ${renderComponent($$result2, "H1", $$H1, {}, { "default": async ($$result3) => renderTemplate`
Add Transactions
` })} <div class="flex items-stretch gap-2"> ${renderComponent($$result2, "CreateTransactionCount", $$CreateTransactionCount, {})} <button class="flex items-center gap-1 border border-red/60 rounded-md px-2 py-1 cursor-pointer">
Import
${renderComponent($$result2, "ImportIcon", Import, {})} </button> </div> </div> <form> ${renderComponent($$result2, "transaction-create-list", "transaction-create-list", { "class": "grid gap-4" }, { "default": () => renderTemplate` ${renderComponent($$result2, "CreateTransaction", $$CreateTransaction, { "budgets": budgets.response?.data })} ` })} <template id="transaction-create"> ${renderComponent($$result2, "CreateTransaction", $$CreateTransaction, { "budgets": budgets.response?.data })} </template> <div class="sm:col-span-2 grid grid-cols-2 gap-4"> ${renderComponent($$result2, "LoadingButton", $$LoadingButton, { "state": { initial: "Save", loading: "Saving...", error: " Failed", success: "Saved!" }, "variant": "fill", "Icon": BanknoteArrowUp, "type": "submit", "class": "w-full" })} ${renderComponent($$result2, "view-transactions-link", "view-transactions-link", { "class": "self-center opacity-0 -translate-x-4 pl-2 transition-all" }, { "default": () => renderTemplate` <a href="/transactions/recent">
View Transactions &rarr;
</a> ` })} </div> </form> ` })} ${renderScript($$result, "C:/web-projecs/budget-app/src/pages/transactions/add.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/web-projecs/budget-app/src/pages/transactions/add.astro", void 0);

const $$file = "C:/web-projecs/budget-app/src/pages/transactions/add.astro";
const $$url = "/transactions/add";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Add,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
