import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { p as NOOP_MIDDLEWARE_HEADER, q as decodeKey } from './chunks/astro/server_FhSrvt_g.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/web-projecs/budget-app/","cacheDir":"file:///C:/web-projecs/budget-app/node_modules/.astro/","outDir":"file:///C:/web-projecs/budget-app/dist/","srcDir":"file:///C:/web-projecs/budget-app/src/","publicDir":"file:///C:/web-projecs/budget-app/public/","buildClientDir":"file:///C:/web-projecs/budget-app/dist/","buildServerDir":"file:///C:/web-projecs/budget-app/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.CPvyyiTs.js"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.CPvyyiTs.js"}],"styles":[],"routeData":{"route":"/auth/login","isIndex":false,"type":"page","pattern":"^\\/auth\\/login\\/?$","segments":[[{"content":"auth","dynamic":false,"spread":false}],[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/auth/login.astro","pathname":"/auth/login","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.CPvyyiTs.js"}],"styles":[],"routeData":{"route":"/auth/logout","isIndex":false,"type":"page","pattern":"^\\/auth\\/logout\\/?$","segments":[[{"content":"auth","dynamic":false,"spread":false}],[{"content":"logout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/auth/logout.astro","pathname":"/auth/logout","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.CPvyyiTs.js"}],"styles":[{"type":"external","src":"/_astro/index.Coxi3Ruo.css"}],"routeData":{"route":"/budgets","isIndex":true,"type":"page","pattern":"^\\/budgets\\/?$","segments":[[{"content":"budgets","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/budgets/index.astro","pathname":"/budgets","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.CPvyyiTs.js"}],"styles":[{"type":"external","src":"/_astro/index.Coxi3Ruo.css"}],"routeData":{"route":"/dashboard","isIndex":false,"type":"page","pattern":"^\\/dashboard\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard.astro","pathname":"/dashboard","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.CPvyyiTs.js"}],"styles":[{"type":"external","src":"/_astro/index.Coxi3Ruo.css"}],"routeData":{"route":"/debt","isIndex":true,"type":"page","pattern":"^\\/debt\\/?$","segments":[[{"content":"debt","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/debt/index.astro","pathname":"/debt","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.CPvyyiTs.js"}],"styles":[{"type":"external","src":"/_astro/index.Coxi3Ruo.css"}],"routeData":{"route":"/income","isIndex":true,"type":"page","pattern":"^\\/income\\/?$","segments":[[{"content":"income","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/income/index.astro","pathname":"/income","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.CPvyyiTs.js"}],"styles":[],"routeData":{"route":"/transactions/api/get","isIndex":false,"type":"endpoint","pattern":"^\\/transactions\\/api\\/get\\/?$","segments":[[{"content":"transactions","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"get","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/transactions/api/get.ts","pathname":"/transactions/api/get","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.CPvyyiTs.js"}],"styles":[{"type":"external","src":"/_astro/index.Coxi3Ruo.css"}],"routeData":{"route":"/transactions","isIndex":true,"type":"page","pattern":"^\\/transactions\\/?$","segments":[[{"content":"transactions","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/transactions/index.astro","pathname":"/transactions","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.CPvyyiTs.js"}],"styles":[],"routeData":{"type":"redirect","isIndex":false,"route":"/","pattern":"^\\/$","segments":[],"params":[],"component":"/","pathname":"/","prerender":false,"redirect":"/dashboard","redirectRoute":{"route":"/dashboard","isIndex":false,"type":"page","pattern":"^\\/dashboard\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard.astro","pathname":"/dashboard","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}},"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/web-projecs/budget-app/src/pages/budgets/index.astro",{"propagation":"none","containsHead":true}],["C:/web-projecs/budget-app/src/pages/dashboard.astro",{"propagation":"none","containsHead":true}],["C:/web-projecs/budget-app/src/pages/debt/index.astro",{"propagation":"none","containsHead":true}],["C:/web-projecs/budget-app/src/pages/income/index.astro",{"propagation":"none","containsHead":true}],["C:/web-projecs/budget-app/src/pages/transactions/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/auth/login@_@astro":"pages/auth/login.astro.mjs","\u0000@astro-page:src/pages/auth/logout@_@astro":"pages/auth/logout.astro.mjs","\u0000@astro-page:src/pages/budgets/index@_@astro":"pages/budgets.astro.mjs","\u0000@astro-page:src/pages/dashboard@_@astro":"pages/dashboard.astro.mjs","\u0000@astro-page:src/pages/debt/index@_@astro":"pages/debt.astro.mjs","\u0000@astro-page:src/pages/income/index@_@astro":"pages/income.astro.mjs","\u0000@astro-page:src/pages/transactions/api/get@_@ts":"pages/transactions/api/get.astro.mjs","\u0000@astro-page:src/pages/transactions/index@_@astro":"pages/transactions.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_SQxor0lA.mjs","C:/web-projecs/budget-app/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","C:/web-projecs/budget-app/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BhcRztwe.mjs","C:/web-projecs/budget-app/src/pages/transactions/_components/MoreTransactionsButton.astro?astro&type=script&index=0&lang.ts":"_astro/MoreTransactionsButton.astro_astro_type_script_index_0_lang.D9ZFBT-2.js","C:/web-projecs/budget-app/src/pages/transactions/_components/Transaction.astro?astro&type=script&index=0&lang.ts":"_astro/Transaction.astro_astro_type_script_index_0_lang.DStr80B4.js","C:/web-projecs/budget-app/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.Cf2AfnBD.js","C:/web-projecs/budget-app/src/components/Dialog.astro?astro&type=script&index=0&lang.ts":"_astro/Dialog.astro_astro_type_script_index_0_lang.BNkmTQoW.js","astro:scripts/page.js":"_astro/page.CPvyyiTs.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/web-projecs/budget-app/src/components/Dialog.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"astro:page-load\",()=>{document.querySelectorAll(\"[data-close-dialog-button]\").forEach(t=>{t.addEventListener(\"click\",()=>t.closest(\"dialog\")?.close())})});"]],"assets":["/_astro/lato-latin-ext-400-normal.C8eBZ-j2.woff2","/_astro/lato-latin-400-normal.BEhtfm5r.woff2","/_astro/lato-latin-400-normal.B11PyLys.woff","/_astro/index.Coxi3Ruo.css","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.Cf2AfnBD.js","/_astro/index.U3IA9L3b.js","/_astro/money.C9QPfWTL.js","/_astro/MoreTransactionsButton.astro_astro_type_script_index_0_lang.D9ZFBT-2.js","/_astro/page.CPvyyiTs.js","/_astro/Transaction.astro_astro_type_script_index_0_lang.DStr80B4.js","/_astro/page.CPvyyiTs.js"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"BLI57n/3EBN+T6YqSwimZLHvFG906AaOFoP97Ae2jD4=","sessionConfig":{"driver":"fs-lite","options":{"base":"C:\\web-projecs\\budget-app\\node_modules\\.astro\\sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
