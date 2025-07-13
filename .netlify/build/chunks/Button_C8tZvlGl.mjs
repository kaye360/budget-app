import { e as createAstro, f as createComponent, m as maybeRenderHead, s as spreadAttributes, h as addAttribute, n as renderSlot, k as renderComponent, r as renderTemplate } from './astro/server_BvKLBLe3.mjs';

const $$Astro = createAstro("https://skl-budget.netlify.app");
const $$Button = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Button;
  const {
    Icon,
    variant,
    class: className = "",
    ...props
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<button${spreadAttributes(props)}${addAttribute([
    "relative py-2 border text-center font-semibold rounded-md cursor-pointer active:scale-95 transition-all duration-100 hover:scale-[102%] min-w-fit disabled:opacity-80 disabled:cursor-not-allowed select-none",
    variant === "outline" && "border-blue text-blue hover:border-red hover:text-red",
    variant === "fill" && "bg-blue border-blue text-black hover:bg-red hover:border-red",
    variant === "ghost" && "border-transparent text-base-text",
    variant === "destruct" && "bg-red border-red text-white hover:bg-blue hover:border-blue hover:text-black",
    className
  ], "class:list")}> ${Icon && renderTemplate`${renderComponent($$result, "Icon", Icon, { "class": "absolute left-2 top-1/2 -translate-y-1/2" })}`} ${renderSlot($$result, $$slots["default"])} </button>`;
}, "C:/web-projecs/budget-app/src/components/Button/Button.astro", void 0);

export { $$Button as $ };
