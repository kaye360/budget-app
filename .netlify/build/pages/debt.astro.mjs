import { e as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_DGojjh1G.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_ByrAVERX.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`
Debt
` })}`;
}, "C:/web-projecs/budget-app/src/pages/debt/index.astro", void 0);

const $$file = "C:/web-projecs/budget-app/src/pages/debt/index.astro";
const $$url = "/debt";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
