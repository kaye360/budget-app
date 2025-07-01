import { e as createAstro, f as createComponent, h as addAttribute, k as renderComponent, p as renderHead, l as renderScript, o as renderTransition, r as renderTemplate } from '../chunks/astro/server_BvKLBLe3.mjs';
import 'kleur/colors';
import { c as createLucideIcon, A as APP_NAME, $ as $$ClientRouter, S as Skull } from '../chunks/config_C7KY7e6E.mjs';
/* empty css                                 */
import { $ as $$Button } from '../chunks/Button_C8tZvlGl.mjs';
export { renderers } from '../renderers.mjs';

const LogIn = createLucideIcon("log-in", [["path", { "d": "m10 17 5-5-5-5" }], ["path", { "d": "M15 12H3" }], ["path", { "d": "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" }]]);

const $$Astro = createAstro("https://skl-budget.netlify.app");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const auth = await Astro2.session?.get("auth");
  if (auth) {
    Astro2.redirect("/dashboard");
  }
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${APP_NAME} - ${"production"}</title>${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderHead()}</head> <body class="min-h-screen bg-gradient-to-br from-bg-1 to-bg-2 bg-fixed text-base-text font-base"> <main class="flex flex-col h-screen max-w-[500px] w-full mx-auto"> <div class="flex-1 font-theme self-stretch grid place-items-center w-full"> <div class="text-center"> ${renderComponent($$result, "SkullIcon", Skull, { "id": "logo", "width": "96", "height": "96", "class": "mx-auto mb-2", "data-astro-transition-scope": renderTransition($$result, "mf7yhkup", "", "top-logo") })} <span class="block text-2xl font-semibold tracking-wide">BudgetApp</span> <span class="block font-semibold tracking-wide">Dead simple budgeting</span> </div> </div> <form method="post" action="/auth/login" class="shrink-0 grid gap-4 px-4 mb-24 mx-auto w-full"> <span id="error-message" class="text-red"></span> ${auth && renderTemplate`<a href="/dashboard" class="underline">Continue to dashboard</a>`} <label>
Username
<input type="text" name="username" class="w-full p-2 !border-blue"> </label> <label>
Password
<input type="password" name="password" class="w-full p-2 !border-blue"> </label> ${renderComponent($$result, "Button", $$Button, { "type": "submit", "Icon": LogIn, "variant": "fill", "class": "!p-4" }, { "default": async ($$result2) => renderTemplate`
Log In
` })} </form> </main> ${renderScript($$result, "C:/web-projecs/budget-app/src/pages/index.astro?astro&type=script&index=0&lang.ts")}</body></html>`;
}, "C:/web-projecs/budget-app/src/pages/index.astro", "self");
const $$file = "C:/web-projecs/budget-app/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
