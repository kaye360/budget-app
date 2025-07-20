import { e as createAstro, f as createComponent, h as addAttribute, l as renderScript, r as renderTemplate, m as maybeRenderHead, s as spreadAttributes, n as renderSlot, k as renderComponent } from './astro/server_BvKLBLe3.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                         */

const $$Astro$1 = createAstro("https://skl-budget.netlify.app");
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "C:/web-projecs/budget-app/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/web-projecs/budget-app/node_modules/astro/components/ClientRouter.astro", void 0);

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

const $$Astro = createAstro("https://skl-budget.netlify.app");
const $$Icon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
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

const Bot = createLucideIcon("bot", [["path", { "d": "M12 8V4H8" }], ["rect", { "width": "16", "height": "12", "x": "4", "y": "8", "rx": "2" }], ["path", { "d": "M2 14h2" }], ["path", { "d": "M20 14h2" }], ["path", { "d": "M15 13v2" }], ["path", { "d": "M9 13v2" }]]);

const APP_NAME = "BudgetApp";
const BASE_URL = "https://skl-budget.netlify.app";

export { $$ClientRouter as $, APP_NAME as A, BASE_URL as B, Bot as a, createLucideIcon as c };
