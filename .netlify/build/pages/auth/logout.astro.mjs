import { e as createAstro, f as createComponent } from '../../chunks/astro/server_BvKLBLe3.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://skl-budget.netlify.app");
const $$Logout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Logout;
  Astro2.session?.destroy();
  return Astro2.redirect("/");
}, "C:/web-projecs/budget-app/src/pages/auth/logout.astro", void 0);

const $$file = "C:/web-projecs/budget-app/src/pages/auth/logout.astro";
const $$url = "/auth/logout";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Logout,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
