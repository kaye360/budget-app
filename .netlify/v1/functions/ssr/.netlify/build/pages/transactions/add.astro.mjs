import { f as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BvKLBLe3.mjs';
import 'kleur/colors';
import { T as Trash2, $ as $$LoadingButton } from '../../chunks/LoadingButton_BiUD550v.mjs';
import { $ as $$Layout, B as BanknoteArrowUp } from '../../chunks/Layout_D6UjjAL9.mjs';
import { $ as $$Button } from '../../chunks/Button_C8tZvlGl.mjs';
import 'clsx';
import { c as createLucideIcon } from '../../chunks/config_C7KY7e6E.mjs';
export { renderers } from '../../renderers.mjs';

const Import = createLucideIcon("import", [["path", { "d": "M12 3v12" }], ["path", { "d": "m8 11 4 4 4-4" }], ["path", { "d": "M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4" }]]);

const $$CreateTransaction = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "transaction-create", "transaction-create", { "class": "grid sm:grid-cols-2 gap-4 border-l border-blue pl-4 mb-12" }, { "default": () => renderTemplate` ${maybeRenderHead()}<label>
Date: <br> <input type="date" name="date-0" data-name="date"> </label> <label>
Description: <br> <input type="text" name="description-0" data-name="description" required> </label> <label>
Amount: <br> <input type="text" name="amount-0" data-name="amount" required> </label> <label>
Budget: <br> <select name="budget-0" data-name="budget" class="w-full"> <option selected value="budget-1">budget 1</option> <option value="budget-2">budget 2</option> </select> </label> <label>
Account: <br> <select name="accountName-0" data-name="accountName" class="w-full"> <option value="account-1">account 1</option> <option selected value="account-2">account 2</option> </select> </label> <div class="md:text-right"> ${renderComponent($$result, "Button", $$Button, { "variant": "ghost", "type": "button", "class": "h-full w-fit flex items-end gap-1 ml-auto text-sm hover:underline" }, { "default": ($$result2) => renderTemplate`
Remove
${renderComponent($$result2, "Trash2Icon", Trash2, { "width": "20", "height": "20", "stroke-width": 2 })} ` })} </div> ` })} ${renderScript($$result, "C:/web-projecs/budget-app/src/pages/transactions/_components/CreateTransaction.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/web-projecs/budget-app/src/pages/transactions/_components/CreateTransaction.astro", void 0);

const $$CreateTransactionCount = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<select id="transaction-count-select" class="!w-fit bg-bg-2"> <option value="1">Adding 1 Transaction</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> <option value="6">6</option> <option value="7">7</option> <option value="8">8</option> <option value="9">9</option> <option value="10">10</option> </select> ${renderScript($$result, "C:/web-projecs/budget-app/src/pages/transactions/_components/CreateTransactionCount.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/web-projecs/budget-app/src/pages/transactions/_components/CreateTransactionCount.astro", void 0);

const $$Add = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex items-center justify-between mb-6"> <h3 class="sm:col-span-2 text-lg font-semibold tracking-wide mb-4">
Add Transactions
</h3> <div class="flex items-stretch gap-2"> ${renderComponent($$result2, "CreateTransactionCount", $$CreateTransactionCount, {})} <button class="flex items-center gap-1 border border-red/60 rounded-md px-2 py-1 cursor-pointer">
Import
${renderComponent($$result2, "ImportIcon", Import, {})} </button> </div> </div> <form> ${renderComponent($$result2, "transaction-create-list", "transaction-create-list", { "class": "grid gap-4" }, { "default": () => renderTemplate` ${renderComponent($$result2, "CreateTransaction", $$CreateTransaction, {})} ` })} <template id="transaction-create"> ${renderComponent($$result2, "CreateTransaction", $$CreateTransaction, {})} </template> <div class="sm:col-span-2 grid grid-cols-2 gap-4"> ${renderComponent($$result2, "LoadingButton", $$LoadingButton, { "state": { initial: "Save", loading: "Saving...", error: " Failed", success: "Saved!" }, "variant": "fill", "Icon": BanknoteArrowUp, "type": "submit", "class": "w-full" })} </div> </form> ` })} ${renderScript($$result, "C:/web-projecs/budget-app/src/pages/transactions/add.astro?astro&type=script&index=0&lang.ts")}`;
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
