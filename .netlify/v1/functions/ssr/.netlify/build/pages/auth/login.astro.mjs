import { e as createAstro, f as createComponent } from '../../chunks/astro/server_BvKLBLe3.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://skl-budget.netlify.app");
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  if (Astro2.request.method !== "POST") {
    return Astro2.redirect("/");
  }
  const data = await Astro2.request.formData();
  const password = data.get("password");
  const isAuth = password === "123456";
  Astro2.session?.set(
    "auth",
    isAuth ? {
      userId: 1,
      userName: "Josh"
    } : false
  );
  return Astro2.redirect(isAuth ? "/dashboard" : "/?witherror");
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
