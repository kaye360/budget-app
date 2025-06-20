import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_B3ZJfOQw.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/auth/login.astro.mjs');
const _page2 = () => import('./pages/auth/logout.astro.mjs');
const _page3 = () => import('./pages/budgets.astro.mjs');
const _page4 = () => import('./pages/dashboard.astro.mjs');
const _page5 = () => import('./pages/debt.astro.mjs');
const _page6 = () => import('./pages/income.astro.mjs');
const _page7 = () => import('./pages/transactions/api/get.astro.mjs');
const _page8 = () => import('./pages/transactions/recent.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/auth/login.astro", _page1],
    ["src/pages/auth/logout.astro", _page2],
    ["src/pages/budgets/index.astro", _page3],
    ["src/pages/dashboard.astro", _page4],
    ["src/pages/debt/index.astro", _page5],
    ["src/pages/income/index.astro", _page6],
    ["src/pages/transactions/api/get.ts", _page7],
    ["src/pages/transactions/recent.astro", _page8]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "585566c8-1ec7-40d5-af18-f25fee87db10"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
