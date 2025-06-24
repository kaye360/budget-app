import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_BVTRZaq_.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/auth/login.astro.mjs');
const _page2 = () => import('./pages/auth/logout.astro.mjs');
const _page3 = () => import('./pages/budgets.astro.mjs');
const _page4 = () => import('./pages/dashboard.astro.mjs');
const _page5 = () => import('./pages/debt.astro.mjs');
const _page6 = () => import('./pages/income.astro.mjs');
const _page7 = () => import('./pages/profile.astro.mjs');
const _page8 = () => import('./pages/transactions/api/delete.astro.mjs');
const _page9 = () => import('./pages/transactions/api/get.astro.mjs');
const _page10 = () => import('./pages/transactions/api/update.astro.mjs');
const _page11 = () => import('./pages/transactions/recent.astro.mjs');
const _page12 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/auth/login.astro", _page1],
    ["src/pages/auth/logout.astro", _page2],
    ["src/pages/budgets/index.astro", _page3],
    ["src/pages/dashboard.astro", _page4],
    ["src/pages/debt/index.astro", _page5],
    ["src/pages/income/index.astro", _page6],
    ["src/pages/profile/index.astro", _page7],
    ["src/pages/transactions/api/delete.ts", _page8],
    ["src/pages/transactions/api/get.ts", _page9],
    ["src/pages/transactions/api/update.ts", _page10],
    ["src/pages/transactions/recent.astro", _page11],
    ["src/pages/index.astro", _page12]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "d1dcabf2-8958-46ca-af5d-dcdf814c94e8"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
