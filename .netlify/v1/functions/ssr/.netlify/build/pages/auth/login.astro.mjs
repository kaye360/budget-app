import { e as createComponent, f as createAstro } from '../../chunks/astro/server_FhSrvt_g.mjs';
import 'kleur/colors';
import 'clsx';
import { A as APP_PASSWORD } from '../../chunks/config_CYRDzic7.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  if (Astro2.request.method !== "POST") {
    return Astro2.redirect("/");
  }
  const data = await Astro2.request.formData();
  const password = data.get("password");
  Astro2.session?.set(
    "auth",
    password === APP_PASSWORD ? {
      userId: 1,
      userName: "Josh"
    } : false
  );
  return Astro2.redirect("/");
}, "C:/web-projecs/budget-app/src/pages/auth/login.astro", void 0);

const $$file = "C:/web-projecs/budget-app/src/pages/auth/login.astro";
const $$url = "/auth/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Login,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
