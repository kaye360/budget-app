import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, e as createAstro, h as addAttribute, l as renderScript, o as renderTransition, p as renderHead, n as renderSlot } from './astro/server_BvKLBLe3.mjs';
import 'kleur/colors';
import { c as createLucideIcon, S as Skull, A as APP_NAME, $ as $$ClientRouter } from './app.config_C9KMaloa.mjs';
/* empty css                          */
/* empty css                          */

const ArrowLeftRight = createLucideIcon("arrow-left-right", [["path", { "d": "M8 3 4 7l4 4" }], ["path", { "d": "M4 7h16" }], ["path", { "d": "m16 21 4-4-4-4" }], ["path", { "d": "M20 17H4" }]]);

const Bot = createLucideIcon("bot", [["path", { "d": "M12 8V4H8" }], ["rect", { "width": "16", "height": "12", "x": "4", "y": "8", "rx": "2" }], ["path", { "d": "M2 14h2" }], ["path", { "d": "M20 14h2" }], ["path", { "d": "M15 13v2" }], ["path", { "d": "M9 13v2" }]]);

const ChartColumnIncreasing = createLucideIcon("chart-column-increasing", [["path", { "d": "M13 17V9" }], ["path", { "d": "M18 17V5" }], ["path", { "d": "M3 3v16a2 2 0 0 0 2 2h16" }], ["path", { "d": "M8 17v-3" }]]);

const ChartPie = createLucideIcon("chart-pie", [["path", { "d": "M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z" }], ["path", { "d": "M21.21 15.89A10 10 0 1 1 8 2.83" }]]);

const CircleUserRound = createLucideIcon("circle-user-round", [["path", { "d": "M18 20a6 6 0 0 0-12 0" }], ["circle", { "cx": "12", "cy": "10", "r": "4" }], ["circle", { "cx": "12", "cy": "12", "r": "10" }]]);

const LayoutDashboard = createLucideIcon("layout-dashboard", [["rect", { "width": "7", "height": "9", "x": "3", "y": "3", "rx": "1" }], ["rect", { "width": "7", "height": "5", "x": "14", "y": "3", "rx": "1" }], ["rect", { "width": "7", "height": "9", "x": "14", "y": "12", "rx": "1" }], ["rect", { "width": "7", "height": "5", "x": "3", "y": "16", "rx": "1" }]]);

const $$Loader = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "page-loader", "page-loader", { "class": "grid items-center justify-center w-full h-[100vh] animate-loader-delay" }, { "default": () => renderTemplate` ${maybeRenderHead()}<div class="text-center"> ${renderComponent($$result, "SkullIcon", Skull, { "width": 64, "height": 64, "class": "animate-loader" })} </div> ` })}`;
}, "C:/web-projecs/budget-app/src/components/Loader/Loader.astro", void 0);

const $$Astro$3 = createAstro("https://skl-budget.netlify.app");
const $$UserAvatar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$UserAvatar;
  const auth = await Astro2.session?.get("auth");
  return renderTemplate`${auth && renderTemplate`${maybeRenderHead()}<a href="/profile">${renderComponent($$result, "CircleUserRoundIcon", CircleUserRound, { "width": "30", "height": "30" })}</a>`}`;
}, "C:/web-projecs/budget-app/src/components/UserAvatar.astro", void 0);

const $$Astro$2 = createAstro("https://skl-budget.netlify.app");
const $$NavLink = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$NavLink;
  const { href, title, Icon, isActive } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}${addAttribute([
    "relative flex flex-col md:flex-row md:gap-2 items-center p-4 hover:text-red hover:scale-105 active:scale-95 active:text-red transition-all duration-75",
    isActive && "text-blue",
    href === "/transactions/add" && "bg-black/70 scale-105"
  ], "class:list")}> ${renderComponent($$result, "Icon", Icon, { "stroke-width": 1, "width": "30", "height": "30" })} <span class="hidden sm:block font-theme"> ${title} </span> ${isActive && renderTemplate`<span class="absolute bottom-0 left-0 right-0 md:left-auto md:top-0 bg-red h-1 md:h-full md:w-1 rounded-full"${addAttribute(renderTransition($$result, "ly7ojr5a", "", "navlink-active"), "data-astro-transition-scope")}></span>`} </a> ${renderScript($$result, "C:/web-projecs/budget-app/src/components/NavLink.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/web-projecs/budget-app/src/components/NavLink.astro", "self");

const $$Astro$1 = createAstro("https://skl-budget.netlify.app");
const $$Nav = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Nav;
  const auth = await Astro2.session?.get("auth");
  const navLinks = [
    { href: "/dashboard", title: "Dashboard", Icon: LayoutDashboard },
    { href: "/transactions/recent", title: "Transactions", Icon: ArrowLeftRight },
    // { href : '/transactions/add', title : 'Add',   Icon : BanknoteArrowUpIcon},
    { href: "/budgets", title: "Budgets", Icon: ChartPie },
    { href: "/trends", title: "Trends", Icon: ChartColumnIncreasing },
    { href: "/profile", title: "Profile", Icon: CircleUserRound }
  ];
  return renderTemplate`${auth && renderTemplate`${maybeRenderHead()}<div${addAttribute([
    "fixed bottom-4 w-full z-[9999] flex items-center md:items-start justify-center",
    "md:relative  md:bottom-auto"
  ], "class:list")}><nav${addAttribute([
    "bg-bg-1/65 backdrop-blur-lg rounded-md shadow-lg shadow-blue/20",
    "flex w-[95vw] justify-evenly md:w-full mx-auto ",
    "md:grid md:gap-2 md:sticky md:top-16"
  ], "class:list")}${addAttribute(renderTransition($$result, "rdbymfjo", "", "nav"), "data-astro-transition-scope")}>${navLinks.map(
    (link) => renderTemplate`${renderComponent($$result, "NavLink", $$NavLink, { ...link, "isActive": Astro2.url.pathname.startsWith(link.href) })}`
  )}</nav></div>`}`;
}, "C:/web-projecs/budget-app/src/components/Nav.astro", "self");

const $$Astro = createAstro("https://skl-budget.netlify.app");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    loader = false
  } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${APP_NAME} - ${"production"}</title>${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderHead()}</head> <body class="min-h-screen bg-gradient-to-br from-bg-1 to-bg-2 bg-fixed text-base-text font-base"> <header class="flex items-center justify-between gap-4 p-4 mb-4 text-blue"> <a href="/" class="flex items-center gap-1 font-theme"> <!-- <SkullIcon size={30} transition:name="top-logo" /> --> ${renderComponent($$result, "BotIcon", Bot, { "size": 30, "data-astro-transition-scope": renderTransition($$result, "ekcrbxgw", "", "top-logo") })} <span class="text-xl font-semibold tracking-wide translate-y-[2px]">${APP_NAME}</span> </a> ${renderComponent($$result, "UserAvatar", $$UserAvatar, {})} </header> <div${addAttribute([
    "md:grid md:grid-cols-[200px_1fr] md:gap-8 md:mx-4"
  ], "class:list")}> ${renderComponent($$result, "Nav", $$Nav, {})} ${loader && renderTemplate`${renderComponent($$result, "Loader", $$Loader, {})}`} <main class="p-4 transition-opacity"> ${renderSlot($$result, $$slots["default"])} </main> </div> </body></html>`;
}, "C:/web-projecs/budget-app/src/layouts/Layout.astro", "self");

export { $$Layout as $, ArrowLeftRight as A };
