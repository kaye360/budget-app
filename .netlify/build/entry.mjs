import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_TJ5AhvRt.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/budgets/_---routes_.astro.mjs');
const _page2 = () => import('./pages/api/transactions/_---path_.astro.mjs');
const _page3 = () => import('./pages/auth/login.astro.mjs');
const _page4 = () => import('./pages/auth/logout.astro.mjs');
const _page5 = () => import('./pages/budgets/_---path_.astro.mjs');
const _page6 = () => import('./pages/dashboard.astro.mjs');
const _page7 = () => import('./pages/profile.astro.mjs');
const _page8 = () => import('./pages/transactions/add.astro.mjs');
const _page9 = () => import('./pages/transactions/budget.astro.mjs');
const _page10 = () => import('./pages/transactions/deleted.astro.mjs');
const _page11 = () => import('./pages/transactions/month.astro.mjs');
const _page12 = () => import('./pages/transactions/recent.astro.mjs');
const _page13 = () => import('./pages/transactions/search.astro.mjs');
const _page14 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/budgets/[...routes].ts", _page1],
    ["src/pages/api/transactions/[...path].ts", _page2],
    ["src/pages/auth/login.astro", _page3],
    ["src/pages/auth/logout.astro", _page4],
    ["src/pages/budgets/[...path].astro", _page5],
    ["src/pages/dashboard.astro", _page6],
    ["src/pages/profile/index.astro", _page7],
    ["src/pages/transactions/add.astro", _page8],
    ["src/pages/transactions/budget.astro", _page9],
    ["src/pages/transactions/deleted.astro", _page10],
    ["src/pages/transactions/month.astro", _page11],
    ["src/pages/transactions/recent.astro", _page12],
    ["src/pages/transactions/search.astro", _page13],
    ["src/pages/index.astro", _page14]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "b7f94f7b-7075-48e8-b24e-5c2abd538247"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
