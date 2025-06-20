import { e as createComponent, f as createAstro, h as addAttribute, l as renderScript, r as renderTemplate, m as maybeRenderHead, k as renderComponent, o as renderTransition, s as spreadAttributes, n as renderSlot, p as renderHead } from './astro/server_DGojjh1G.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                         */

const $$Astro$3 = createAstro();
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "C:/web-projecs/budget-app/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/web-projecs/budget-app/node_modules/astro/components/ClientRouter.astro", void 0);

const $$Astro$2 = createAstro();
const $$NavLink = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$NavLink;
  const { href, title, Icon, isActive } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}${addAttribute([
    "relative flex flex-col items-center p-4 hover:text-red active:scale-95",
    isActive && "text-blue"
  ], "class:list")}> ${renderComponent($$result, "Icon", Icon, { "stroke-width": 1, "width": "30", "height": "30" })} <span class="hidden sm:block font-semibold tracking-wide"> ${title} </span> ${isActive && renderTemplate`<span class="absolute bottom-0 left-0 right-0 bg-blue h-1 rounded-full"${addAttribute(renderTransition($$result, "ly7ojr5a", "", "navlink-active"), "data-astro-transition-scope")}></span>`} </a>`;
}, "C:/web-projecs/budget-app/src/components/NavLink.astro", "self");

const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();

const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};

const $$Astro$1 = createAstro();
const $$Icon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Icon;
  const {
    color = "currentColor",
    size = 24,
    "stroke-width": strokeWidth = 2,
    absoluteStrokeWidth = false,
    iconNode = [],
    class: className,
    ...rest
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes({
    ...defaultAttributes,
    width: size,
    height: size,
    stroke: color,
    "stroke-width": absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
    ...rest
  })}${addAttribute(["lucide", className], "class:list")}> ${iconNode.map(([Tag, attrs]) => renderTemplate`${renderComponent($$result, "Tag", Tag, { ...attrs })}`)} ${renderSlot($$result, $$slots["default"])} </svg>`;
}, "C:/web-projecs/budget-app/node_modules/@lucide/astro/src/Icon.astro", void 0);

const createLucideIcon = (iconName, iconNode) => {
  const Component = createComponent(
    ($$result, $$props, $$slots) => {
      const { class: className, ...restProps } = $$props;
      return renderTemplate`${renderComponent(
        $$result,
        "Icon",
        $$Icon,
        {
          class: mergeClasses(
            Boolean(iconName) && `lucide-${toKebabCase(iconName)}`,
            Boolean(className) && className
          ),
          iconNode,
          ...restProps
        },
        { default: () => renderTemplate`${renderSlot($$result, $$slots["default"])}` }
      )}`;
    },
    void 0,
    "none"
  );
  return Component;
};

const ArrowLeftRight = createLucideIcon("arrow-left-right", [["path", { "d": "M8 3 4 7l4 4" }], ["path", { "d": "M4 7h16" }], ["path", { "d": "m16 21 4-4-4-4" }], ["path", { "d": "M20 17H4" }]]);

const Calendar = createLucideIcon("calendar", [["path", { "d": "M8 2v4" }], ["path", { "d": "M16 2v4" }], ["rect", { "width": "18", "height": "18", "x": "3", "y": "4", "rx": "2" }], ["path", { "d": "M3 10h18" }]]);

const ChartColumnDecreasing = createLucideIcon("chart-column-decreasing", [["path", { "d": "M13 17V9" }], ["path", { "d": "M18 17v-3" }], ["path", { "d": "M3 3v16a2 2 0 0 0 2 2h16" }], ["path", { "d": "M8 17V5" }]]);

const ChartColumnIncreasing = createLucideIcon("chart-column-increasing", [["path", { "d": "M13 17V9" }], ["path", { "d": "M18 17V5" }], ["path", { "d": "M3 3v16a2 2 0 0 0 2 2h16" }], ["path", { "d": "M8 17v-3" }]]);

const CircleUserRound = createLucideIcon("circle-user-round", [["path", { "d": "M18 20a6 6 0 0 0-12 0" }], ["circle", { "cx": "12", "cy": "10", "r": "4" }], ["circle", { "cx": "12", "cy": "12", "r": "10" }]]);

const LayoutDashboard = createLucideIcon("layout-dashboard", [["rect", { "width": "7", "height": "9", "x": "3", "y": "3", "rx": "1" }], ["rect", { "width": "7", "height": "5", "x": "14", "y": "3", "rx": "1" }], ["rect", { "width": "7", "height": "9", "x": "14", "y": "12", "rx": "1" }], ["rect", { "width": "7", "height": "5", "x": "3", "y": "16", "rx": "1" }]]);

const Skull = createLucideIcon("skull", [["path", { "d": "m12.5 17-.5-1-.5 1h1z" }], ["path", { "d": "M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z" }], ["circle", { "cx": "15", "cy": "12", "r": "1" }], ["circle", { "cx": "9", "cy": "12", "r": "1" }]]);

const $$Astro = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const auth = await Astro2.session?.get("auth");
  const navLinks = [
    { href: "/dashboard", title: "Dashboard", Icon: LayoutDashboard },
    { href: "/transactions/recent", title: "Transactions", Icon: ArrowLeftRight },
    { href: "/budgets", title: "Budgets", Icon: Calendar },
    { href: "/debt", title: "Debt Tracker", Icon: ChartColumnDecreasing },
    { href: "/income", title: "Income Tracker", Icon: ChartColumnIncreasing }
  ];
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Budget-App</title>${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderHead()}</head> <body class="min-h-screen bg-gradient-to-br from-bg-1 to-bg-2 bg-fixed text-base-text font-base"> <header class="flex items-center justify-between gap-4 p-4 mb-4 text-blue"> <a href="/" class="flex items-center gap-1 font-theme"> ${renderComponent($$result, "SkullIcon", Skull, { "size": 30 })} <span class="text-xl font-semibold tracking-wide">SKLbudget</span> </a> ${auth && renderTemplate`<a href="/profile"> ${renderComponent($$result, "CircleUserRoundIcon", CircleUserRound, { "width": "30", "height": "30" })} </a>`} </header> <div class="fixed bottom-4 w-full z-[9999]"> <nav class="flex w-[80vw] md:w-fit justify-between mx-auto bg-bg-1/90 backdrop-blur-lg rounded-md text-sm"> ${navLinks.map(
    (link) => renderTemplate`${renderComponent($$result, "NavLink", $$NavLink, { ...link, "isActive": Astro2.url.pathname.startsWith(link.href) })}`
  )} </nav> </div> <main class="p-4"> ${renderSlot($$result, $$slots["default"])} </main> </body></html>`;
}, "C:/web-projecs/budget-app/src/layouts/Layout.astro", void 0);

export { $$Layout as $, ArrowLeftRight as A, createLucideIcon as c };
