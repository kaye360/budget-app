import { c as createLucideIcon } from './app.config_DnBzuijw.mjs';
import { e as createAstro, f as createComponent, k as renderComponent, l as renderScript, r as renderTemplate } from './astro/server_BvKLBLe3.mjs';
import 'kleur/colors';
import { $ as $$Button } from './Button_C8tZvlGl.mjs';

const Trash2 = createLucideIcon("trash-2", [["path", { "d": "M3 6h18" }], ["path", { "d": "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }], ["path", { "d": "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" }], ["line", { "x1": "10", "x2": "10", "y1": "11", "y2": "17" }], ["line", { "x1": "14", "x2": "14", "y1": "11", "y2": "17" }]]);

const $$Astro = createAstro("https://skl-budget.netlify.app");
const $$LoadingButton = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
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

export { $$LoadingButton as $, Trash2 as T };
