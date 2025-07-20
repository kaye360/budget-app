import { f as createComponent, m as maybeRenderHead, n as renderSlot, r as renderTemplate } from './astro/server_BvKLBLe3.mjs';
import 'kleur/colors';
import 'clsx';

const $$H1 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<h1 class="text-lg md:text-xl font-semibold font-theme min-w-max"> ${renderSlot($$result, $$slots["default"])} </h1>`;
}, "C:/web-projecs/budget-app/src/components/H1.astro", void 0);

export { $$H1 as $ };
