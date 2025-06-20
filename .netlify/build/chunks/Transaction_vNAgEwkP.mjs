import { e as createComponent, f as createAstro, m as maybeRenderHead, k as renderComponent, n as renderSlot, l as renderScript, r as renderTemplate, h as addAttribute } from './astro/server_DGojjh1G.mjs';
import 'kleur/colors';
import { c as createLucideIcon } from './Layout_ByrAVERX.mjs';

const Ban = createLucideIcon("ban", [["circle", { "cx": "12", "cy": "12", "r": "10" }], ["path", { "d": "m4.9 4.9 14.2 14.2" }]]);

const CircleX = createLucideIcon("circle-x", [["circle", { "cx": "12", "cy": "12", "r": "10" }], ["path", { "d": "m15 9-6 6" }], ["path", { "d": "m9 9 6 6" }]]);

const EllipsisVertical = createLucideIcon("ellipsis-vertical", [["circle", { "cx": "12", "cy": "12", "r": "1" }], ["circle", { "cx": "12", "cy": "5", "r": "1" }], ["circle", { "cx": "12", "cy": "19", "r": "1" }]]);

const Save = createLucideIcon("save", [["path", { "d": "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" }], ["path", { "d": "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" }], ["path", { "d": "M7 3v4a1 1 0 0 0 1 1h7" }]]);

const Trash2 = createLucideIcon("trash-2", [["path", { "d": "M3 6h18" }], ["path", { "d": "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }], ["path", { "d": "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" }], ["line", { "x1": "10", "x2": "10", "y1": "11", "y2": "17" }], ["line", { "x1": "14", "x2": "14", "y1": "11", "y2": "17" }]]);

const $$Astro$2 = createAstro();
const $$Dialog = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Dialog;
  const {
    title
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<dialog class="backdrop:bg-bg-1 md:backdrop:bg-bg-1/95 " closedby="any"> <div class="fixed position-center p-4 sm:p-8 rounded-xl shadow-blue/10 shadow-lg w-[95vw] sm:w-auto sm:min-w-[600px] text-base-text"> <div class="flex items-center justify-between w-full mb-8"> <h3 class="font-semibold text-2xl text-base-text "> ${title} </h3> <button data-close-dialog-button class="p-2 cursor-pointer hover:text-red active:scale-90 outline-0 border-0"> ${renderComponent($$result, "CircleXIcon", CircleX, { "width": "30", "height": "30" })} </button> </div> ${renderSlot($$result, $$slots["default"])} </div> </dialog> ${renderScript($$result, "C:/web-projecs/budget-app/src/components/Dialog.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/web-projecs/budget-app/src/components/Dialog.astro", void 0);

const $$Astro$1 = createAstro();
const $$Button = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Button;
  const {
    Icon,
    variant
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<button${addAttribute([
    "relative py-2 border text-center font-semibold rounded-md cursor-pointer active:scale-95 transition-all duration-100 hover:scale-[102%]",
    variant === "outline" && "border-blue text-blue hover:border-red hover:text-red",
    variant === "fill" && "bg-blue border-blue text-black hover:bg-red hover:border-red",
    variant === "ghost" && "border-transparent text-base-text",
    variant === "destruct" && "bg-red border-red text-white hover:bg-blue hover:border-blue hover:text-black"
  ], "class:list")}> ${Icon && renderTemplate`${renderComponent($$result, "Icon", Icon, { "class": "absolute left-2 top-1/2 -translate-y-1/2" })}`} ${renderSlot($$result, $$slots["default"])} </button>`;
}, "C:/web-projecs/budget-app/src/components/Button.astro", void 0);

const $$Astro = createAstro();
const $$Transaction = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Transaction;
  const {
    transaction,
    mode = "detailed"
  } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "transaction-item", "transaction-item", { "data-isdeleted": transaction?.isDeleted, "class": "relative flex items-center pb-6 border-b border-red/20  data-[isdeleted=true]:opacity-30", ...transaction }, { "default": () => renderTemplate` ${renderComponent($$result, "transaction-info", "transaction-info", {}, { "default": () => renderTemplate` ${renderComponent($$result, "transaction-date", "transaction-date", { "class": "block text-sm text-accent-text mb-1 border border-transparent rounded" })} ${renderComponent($$result, "transaction-description", "transaction-description", { "class": "block font-semibold text-lg mb-2 border border-transparent data-[iseditable=true]:hover:border-slate-300 rounded" })} ${renderComponent($$result, "transaction-budget", "transaction-budget", { "class": "bg-blue text-black inline-block px-3 py-1 text-sm font-semibold rounded-xl tracking-wide first-letter:uppercase" })} ${mode === "detailed" && renderTemplate`${maybeRenderHead()}<span class="block sm:inline-block mt-3 sm:mt-auto sm:ml-2 text-sm text-accent-text tracking-wide capitalize"> ${renderComponent($$result, "transaction-account-name", "transaction-account-name", {})}
&#9679;
${renderComponent($$result, "transaction-account-type", "transaction-account-type", {})} ${renderComponent($$result, "transaction-account-number", "transaction-account-number", {})} </span>`} ` })} ${renderComponent($$result, "transaction-amount", "transaction-amount", { "class": "ml-auto text-2xl font-semibold font-theme border border-transparent data-[iseditable=true]:hover:border-slate-300 rounded" })} ${mode === "detailed" && renderTemplate`${renderComponent($$result, "transaction-edit", "transaction-edit", {}, { "default": () => renderTemplate` <button class="p-2 border border-transparent group hover:border-slate-500 rounded-lg cursor-pointer transition-colors active:scale-95"> ${renderComponent($$result, "EllipsisVerticalIcon", EllipsisVertical, { "class": "stroke-slate-400 group-hover:stroke-slate-500 transition-colors" })} </button> ` })}
        ${renderComponent($$result, "Dialog", $$Dialog, { "title": "Transaction Options" }, { "default": ($$result2) => renderTemplate` <form method="post" class="grid sm:grid-cols-2 gap-4 border-l border-blue pl-4 mb-12"> <h3 class="sm:col-span-2 text-lg font-semibold tracking-wide">
Edit Transaction
</h3> <label>
Date: <br> <input type="date" name="date"> </label> <label>
Description: <br> <input type="text" name="description"> </label> <label>
Amount: <br> <input type="text" name="amount"> </label> <label>
Budget: <br> <select name="budget" class="w-full"> <option>option 1</option> <option>option 2</option> </select> </label> <label>
Account: <br> <select name="acount-name" class="w-full"> <option>option 1</option> <option>option 2</option> </select> </label> <div class="sm:col-span-2 grid grid-cols-2 gap-4"> ${renderComponent($$result2, "Button", $$Button, { "variant": "outline", "Icon": Ban }, { "default": ($$result3) => renderTemplate`
Cancel
` })} ${renderComponent($$result2, "Button", $$Button, { "variant": "fill", "Icon": Save, "type": "submit" }, { "default": ($$result3) => renderTemplate`
Save
` })} </div> </form> <div class="grid gap-4 justify-start border-l border-blue pl-4"> <h3 class="text-lg font-semibold tracking-wide">Delete this transaction?</h3> <p> <strong>Note:</strong> This action can be undone.
</p> ${renderComponent($$result2, "Button", $$Button, { "variant": "destruct", "Icon": Trash2, "class": "w-1/2" }, { "default": ($$result3) => renderTemplate`
Delete Transaction
` })} </div> ` })}`} ` })} ${renderScript($$result, "C:/web-projecs/budget-app/src/pages/transactions/_components/Transaction.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/web-projecs/budget-app/src/pages/transactions/_components/Transaction.astro", void 0);

export { $$Transaction as $ };
