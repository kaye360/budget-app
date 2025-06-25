import { e as createAstro, f as createComponent, m as maybeRenderHead, k as renderComponent, n as renderSlot, l as renderScript, r as renderTemplate } from './astro/server_BvKLBLe3.mjs';
import 'kleur/colors';
import { c as createLucideIcon } from './config_C_tZx02p.mjs';
import { $ as $$Button } from './Button_C8tZvlGl.mjs';

const Ban = createLucideIcon("ban", [["circle", { "cx": "12", "cy": "12", "r": "10" }], ["path", { "d": "m4.9 4.9 14.2 14.2" }]]);

const CircleX = createLucideIcon("circle-x", [["circle", { "cx": "12", "cy": "12", "r": "10" }], ["path", { "d": "m15 9-6 6" }], ["path", { "d": "m9 9 6 6" }]]);

const EllipsisVertical = createLucideIcon("ellipsis-vertical", [["circle", { "cx": "12", "cy": "12", "r": "1" }], ["circle", { "cx": "12", "cy": "5", "r": "1" }], ["circle", { "cx": "12", "cy": "19", "r": "1" }]]);

const Save = createLucideIcon("save", [["path", { "d": "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" }], ["path", { "d": "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" }], ["path", { "d": "M7 3v4a1 1 0 0 0 1 1h7" }]]);

const Trash2 = createLucideIcon("trash-2", [["path", { "d": "M3 6h18" }], ["path", { "d": "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }], ["path", { "d": "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" }], ["line", { "x1": "10", "x2": "10", "y1": "11", "y2": "17" }], ["line", { "x1": "14", "x2": "14", "y1": "11", "y2": "17" }]]);

const $$Astro$2 = createAstro("https://skl-budget.netlify.app");
const $$Modal = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Modal;
  const {
    title
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<dialog class="backdrop:bg-bg-1 md:backdrop:bg-bg-1/95 animate-fade-in " closedby="any"> <div class="fixed position-center p-4 sm:p-8 rounded-xl shadow-blue/10 shadow-lg w-[95vw] sm:w-auto sm:min-w-[600px] text-base-text animate-slide-up"> <div class="flex items-center justify-between w-full mb-8"> <h3 class="font-semibold text-2xl text-base-text "> ${title} </h3> ${renderComponent($$result, "close-modal-button", "close-modal-button", {}, { "default": () => renderTemplate` <button data-close-dialog-button class="p-2 cursor-pointer hover:text-red active:scale-90 outline-0 border-0"> ${renderComponent($$result, "CircleXIcon", CircleX, { "width": "30", "height": "30" })} </button> ` })} </div> ${renderSlot($$result, $$slots["default"])} </div> </dialog> ${renderScript($$result, "C:/web-projecs/budget-app/src/components/Modal.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/web-projecs/budget-app/src/components/Modal.astro", void 0);

const $$Astro$1 = createAstro("https://skl-budget.netlify.app");
const $$LoadingButton = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$LoadingButton;
  const {
    state,
    Icon,
    variant,
    class: className = "",
    ...props
  } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "loading-button", "loading-button", { "state": "initial" }, { "default": () => renderTemplate` ${renderComponent($$result, "Button", $$Button, { "variant": variant, "Icon": Icon, "class": className, ...props }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "initial-state", "initial-state", { "class": "inline-block" }, { "default": () => renderTemplate`${state.initial}` })} ${renderComponent($$result2, "loading-state", "loading-state", { "class": "inline-block" }, { "default": () => renderTemplate`${state.loading}` })} ${renderComponent($$result2, "error-state", "error-state", { "class": "inline-block" }, { "default": () => renderTemplate`${state.error}` })} ${renderComponent($$result2, "success-state", "success-state", { "class": "inline-block" }, { "default": () => renderTemplate`${state.success}` })} ` })} ` })} ${renderScript($$result, "C:/web-projecs/budget-app/src/components/Button/LoadingButton.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/web-projecs/budget-app/src/components/Button/LoadingButton.astro", void 0);

const $$TransactionDelete = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "transaction-delete", "transaction-delete", {}, { "default": () => renderTemplate` ${maybeRenderHead()}<div class="grid gap-4 justify-start border-l border-blue pl-4"> <h3 class="text-lg font-semibold tracking-wide">Delete this action?</h3> <p> <strong>Note:</strong> This action can be undone.
</p> ${renderComponent($$result, "LoadingButton", $$LoadingButton, { "state": { initial: "Delete Transaction", loading: "Deleting...", error: "Failed to delete", success: "Deleted!" }, "variant": "destruct", "Icon": Trash2, "class": "w-full" }, { "default": async ($$result2) => renderTemplate`
Delete Transaction
` })} </div> ` })} ${renderScript($$result, "C:/web-projecs/budget-app/src/pages/transactions/_components/TransactionDelete.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/web-projecs/budget-app/src/pages/transactions/_components/TransactionDelete.astro", void 0);

const $$TransactionEdit = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "transaction-edit", "transaction-edit", {}, { "default": () => renderTemplate` ${maybeRenderHead()}<form class="grid sm:grid-cols-2 gap-4 border-l border-blue pl-4 mb-12"> <h3 class="sm:col-span-2 text-lg font-semibold tracking-wide">
Edit Transaction
</h3> <label>
Date: <br> <input type="date" name="date"> </label> <label>
Description: <br> <input type="text" name="description"> </label> <label>
Amount: <br> <input type="text" name="amount"> </label> <label>
Budget: <br> <select name="budget" class="w-full"> <option selected value="budget-1">budget 1</option> <option value="budget-2">budget 2</option> </select> </label> <label>
Account: <br> <select name="account-name" class="w-full"> <option value="account-1">account 1</option> <option selected value="account-2">account 2</option> </select> </label> <div class="sm:col-span-2 grid grid-cols-2 gap-4"> ${renderComponent($$result, "close-modal-button", "close-modal-button", {}, { "default": () => renderTemplate` ${renderComponent($$result, "Button", $$Button, { "variant": "outline", "Icon": Ban, "type": "button", "class": "w-full block" }, { "default": async ($$result2) => renderTemplate`
Cancel
` })} ` })} ${renderComponent($$result, "LoadingButton", $$LoadingButton, { "state": { initial: "Save", loading: "Saving...", error: " Failed", success: "Saved!" }, "variant": "fill", "Icon": Save, "type": "submit", "class": "w-full" })} </div> </form> ` })} ${renderScript($$result, "C:/web-projecs/budget-app/src/pages/transactions/_components/TransactionEdit.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/web-projecs/budget-app/src/pages/transactions/_components/TransactionEdit.astro", void 0);

const $$TransactionModal = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Modal", $$Modal, { "title": "Transaction Options" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "TransactionEdit", $$TransactionEdit, {})} ${renderComponent($$result2, "TransactionDelete", $$TransactionDelete, {})} ` })}`;
}, "C:/web-projecs/budget-app/src/pages/transactions/_components/TransactionModal.astro", void 0);

const $$Astro = createAstro("https://skl-budget.netlify.app");
const $$Transaction = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Transaction;
  const {
    transaction,
    mode = "detailed"
  } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "transaction-item", "transaction-item", { "data-isdeleted": transaction?.isDeleted, "class": "relative flex items-center pb-6 border-b border-red/20  data-[isdeleted=true]:hidden transition-all max-h-[500px]", ...transaction }, { "default": () => renderTemplate` ${renderComponent($$result, "transaction-info", "transaction-info", {}, { "default": () => renderTemplate` ${renderComponent($$result, "transaction-date", "transaction-date", { "class": "block text-sm text-accent-text mb-1 border border-transparent rounded" })} ${renderComponent($$result, "transaction-description", "transaction-description", { "class": "block font-semibold text-lg mb-2 border border-transparent data-[iseditable=true]:hover:border-slate-300 rounded" })} ${renderComponent($$result, "transaction-budget", "transaction-budget", { "class": "bg-blue text-black inline-block px-3 py-1 text-sm font-semibold rounded-xl tracking-wide first-letter:uppercase" })} ${mode === "detailed" && renderTemplate`${maybeRenderHead()}<span class="block sm:inline-block mt-3 sm:mt-auto sm:ml-2 text-sm text-accent-text tracking-wide capitalize"> ${renderComponent($$result, "transaction-account-name", "transaction-account-name", {})}
&#9679;
${renderComponent($$result, "transaction-account-type", "transaction-account-type", {})} ${renderComponent($$result, "transaction-account-number", "transaction-account-number", {})} </span>`} ` })} ${renderComponent($$result, "transaction-amount", "transaction-amount", { "class": "ml-auto text-2xl font-semibold font-theme border border-transparent data-[iseditable=true]:hover:border-slate-300 rounded" })} ${mode === "detailed" && renderTemplate`${renderComponent($$result, "transaction-edit", "transaction-edit", {}, { "default": () => renderTemplate` <button class="p-2 ml-2 border border-red/30 group hover:border-slate-500 rounded-lg cursor-pointer transition-colors active:scale-95"> ${renderComponent($$result, "EllipsisVerticalIcon", EllipsisVertical, { "class": "stroke-slate-400 group-hover:stroke-slate-500 transition-colors" })} </button> ` })}
        ${renderComponent($$result, "TransactionModal", $$TransactionModal, {})}`} ` })} ${renderScript($$result, "C:/web-projecs/budget-app/src/pages/transactions/_components/Transaction.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/web-projecs/budget-app/src/pages/transactions/_components/Transaction.astro", void 0);

export { $$Transaction as $ };
