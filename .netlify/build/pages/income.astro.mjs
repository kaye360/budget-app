import { e as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_FhSrvt_g.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_DuBthDQt.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`
Income
` })}`;
}, "C:/web-projecs/budget-app/src/pages/income/index.astro", void 0);

const $$file = "C:/web-projecs/budget-app/src/pages/income/index.astro";
const $$url = "/income";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
