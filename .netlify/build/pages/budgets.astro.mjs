import { f as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_BvKLBLe3.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_D6UjjAL9.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`
Budgets
` })}`;
}, "C:/web-projecs/budget-app/src/pages/budgets/index.astro", void 0);

const $$file = "C:/web-projecs/budget-app/src/pages/budgets/index.astro";
const $$url = "/budgets";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
