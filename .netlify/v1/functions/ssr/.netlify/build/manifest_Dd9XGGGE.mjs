import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { q as NOOP_MIDDLEWARE_HEADER, v as decodeKey } from './chunks/astro/server_BvKLBLe3.mjs';
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

const manifest = deserializeManifest({"hrefRoot":"file:///C:/web-projecs/budget-app/","cacheDir":"file:///C:/web-projecs/budget-app/node_modules/.astro/","outDir":"file:///C:/web-projecs/budget-app/dist/","srcDir":"file:///C:/web-projecs/budget-app/src/","publicDir":"file:///C:/web-projecs/budget-app/public/","buildClientDir":"file:///C:/web-projecs/budget-app/dist/","buildServerDir":"file:///C:/web-projecs/budget-app/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/budgets/[...route]","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/budgets(?:\\/(.*?))?\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"budgets","dynamic":false,"spread":false}],[{"content":"...route","dynamic":true,"spread":true}]],"params":["...route"],"component":"src/pages/api/budgets/[...route].ts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/transactions/[...route]","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/transactions(?:\\/(.*?))?\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"transactions","dynamic":false,"spread":false}],[{"content":"...route","dynamic":true,"spread":true}]],"params":["...route"],"component":"src/pages/api/transactions/[...route].ts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/auth/login","isIndex":false,"type":"page","pattern":"^\\/auth\\/login\\/?$","segments":[[{"content":"auth","dynamic":false,"spread":false}],[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/auth/login.astro","pathname":"/auth/login","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/auth/logout","isIndex":false,"type":"page","pattern":"^\\/auth\\/logout\\/?$","segments":[[{"content":"auth","dynamic":false,"spread":false}],[{"content":"logout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/auth/logout.astro","pathname":"/auth/logout","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}\n"},{"type":"external","src":"/_astro/_route_.C4aCjt7Z.css"},{"type":"external","src":"/_astro/_route_.KcO0QJNT.css"}],"routeData":{"route":"/budgets/[...route]","isIndex":false,"type":"page","pattern":"^\\/budgets(?:\\/(.*?))?\\/?$","segments":[[{"content":"budgets","dynamic":false,"spread":false}],[{"content":"...route","dynamic":true,"spread":true}]],"params":["...route"],"component":"src/pages/budgets/[...route].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}\n"},{"type":"external","src":"/_astro/_route_.C4aCjt7Z.css"},{"type":"external","src":"/_astro/_route_.KcO0QJNT.css"}],"routeData":{"route":"/dashboard","isIndex":false,"type":"page","pattern":"^\\/dashboard\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard.astro","pathname":"/dashboard","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}\n"},{"type":"external","src":"/_astro/_route_.C4aCjt7Z.css"},{"type":"external","src":"/_astro/_route_.KcO0QJNT.css"}],"routeData":{"route":"/profile","isIndex":true,"type":"page","pattern":"^\\/profile\\/?$","segments":[[{"content":"profile","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/profile/index.astro","pathname":"/profile","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}\n"},{"type":"external","src":"/_astro/_route_.C4aCjt7Z.css"},{"type":"external","src":"/_astro/_route_.KcO0QJNT.css"}],"routeData":{"route":"/transactions/add","isIndex":false,"type":"page","pattern":"^\\/transactions\\/add\\/?$","segments":[[{"content":"transactions","dynamic":false,"spread":false}],[{"content":"add","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/transactions/add.astro","pathname":"/transactions/add","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}\n"},{"type":"external","src":"/_astro/_route_.C4aCjt7Z.css"},{"type":"external","src":"/_astro/_route_.KcO0QJNT.css"}],"routeData":{"route":"/transactions/budget/[...budget]","isIndex":false,"type":"page","pattern":"^\\/transactions\\/budget(?:\\/(.*?))?\\/?$","segments":[[{"content":"transactions","dynamic":false,"spread":false}],[{"content":"budget","dynamic":false,"spread":false}],[{"content":"...budget","dynamic":true,"spread":true}]],"params":["...budget"],"component":"src/pages/transactions/budget/[...budget].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}\n"},{"type":"external","src":"/_astro/_route_.C4aCjt7Z.css"},{"type":"external","src":"/_astro/_route_.KcO0QJNT.css"}],"routeData":{"route":"/transactions/deleted","isIndex":false,"type":"page","pattern":"^\\/transactions\\/deleted\\/?$","segments":[[{"content":"transactions","dynamic":false,"spread":false}],[{"content":"deleted","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/transactions/deleted.astro","pathname":"/transactions/deleted","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}\n"},{"type":"external","src":"/_astro/_route_.C4aCjt7Z.css"},{"type":"external","src":"/_astro/_route_.KcO0QJNT.css"}],"routeData":{"route":"/transactions/month/[...month]","isIndex":false,"type":"page","pattern":"^\\/transactions\\/month(?:\\/(.*?))?\\/?$","segments":[[{"content":"transactions","dynamic":false,"spread":false}],[{"content":"month","dynamic":false,"spread":false}],[{"content":"...month","dynamic":true,"spread":true}]],"params":["...month"],"component":"src/pages/transactions/month/[...month].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}\n"},{"type":"external","src":"/_astro/_route_.C4aCjt7Z.css"},{"type":"external","src":"/_astro/_route_.KcO0QJNT.css"}],"routeData":{"route":"/transactions/recent","isIndex":false,"type":"page","pattern":"^\\/transactions\\/recent\\/?$","segments":[[{"content":"transactions","dynamic":false,"spread":false}],[{"content":"recent","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/transactions/recent.astro","pathname":"/transactions/recent","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}\n"},{"type":"external","src":"/_astro/_route_.C4aCjt7Z.css"},{"type":"external","src":"/_astro/_route_.KcO0QJNT.css"}],"routeData":{"route":"/transactions/search","isIndex":false,"type":"page","pattern":"^\\/transactions\\/search\\/?$","segments":[[{"content":"transactions","dynamic":false,"spread":false}],[{"content":"search","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/transactions/search.astro","pathname":"/transactions/search","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}\n"},{"type":"external","src":"/_astro/_route_.C4aCjt7Z.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://skl-budget.netlify.app","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/web-projecs/budget-app/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["C:/web-projecs/budget-app/src/components/NavLink.astro",{"propagation":"in-tree","containsHead":false}],["C:/web-projecs/budget-app/src/components/Nav.astro",{"propagation":"in-tree","containsHead":false}],["C:/web-projecs/budget-app/src/layouts/Layout.astro",{"propagation":"in-tree","containsHead":false}],["C:/web-projecs/budget-app/src/pages/budgets/[...route].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/budgets/[...route]@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/web-projecs/budget-app/src/pages/dashboard.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/dashboard@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/web-projecs/budget-app/src/pages/profile/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/profile/index@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/web-projecs/budget-app/src/pages/transactions/add.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/transactions/add@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/web-projecs/budget-app/src/pages/transactions/budget/[...budget].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/transactions/budget/[...budget]@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/web-projecs/budget-app/src/pages/transactions/deleted.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/transactions/deleted@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/web-projecs/budget-app/src/pages/transactions/month/[...month].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/transactions/month/[...month]@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/web-projecs/budget-app/src/pages/transactions/recent.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/transactions/recent@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/web-projecs/budget-app/src/pages/transactions/search.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/transactions/search@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/api/budgets/[...route]@_@ts":"pages/api/budgets/_---route_.astro.mjs","\u0000@astro-page:src/pages/api/transactions/[...route]@_@ts":"pages/api/transactions/_---route_.astro.mjs","\u0000@astro-page:src/pages/auth/login@_@astro":"pages/auth/login.astro.mjs","\u0000@astro-page:src/pages/auth/logout@_@astro":"pages/auth/logout.astro.mjs","\u0000@astro-page:src/pages/budgets/[...route]@_@astro":"pages/budgets/_---route_.astro.mjs","\u0000@astro-page:src/pages/dashboard@_@astro":"pages/dashboard.astro.mjs","\u0000@astro-page:src/pages/profile/index@_@astro":"pages/profile.astro.mjs","\u0000@astro-page:src/pages/transactions/add@_@astro":"pages/transactions/add.astro.mjs","\u0000@astro-page:src/pages/transactions/budget/[...budget]@_@astro":"pages/transactions/budget/_---budget_.astro.mjs","\u0000@astro-page:src/pages/transactions/deleted@_@astro":"pages/transactions/deleted.astro.mjs","\u0000@astro-page:src/pages/transactions/month/[...month]@_@astro":"pages/transactions/month/_---month_.astro.mjs","\u0000@astro-page:src/pages/transactions/recent@_@astro":"pages/transactions/recent.astro.mjs","\u0000@astro-page:src/pages/transactions/search@_@astro":"pages/transactions/search.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_Dd9XGGGE.mjs","C:/web-projecs/budget-app/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","C:/web-projecs/budget-app/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CayHomuk.mjs","C:/web-projecs/budget-app/src/pages/budgets/[...route].astro?astro&type=script&index=0&lang.ts":"_astro/_...route_.astro_astro_type_script_index_0_lang.DRWcUH4k.js","C:/web-projecs/budget-app/src/pages/transactions/add.astro?astro&type=script&index=0&lang.ts":"_astro/add.astro_astro_type_script_index_0_lang.u16_u1Fo.js","C:/web-projecs/budget-app/src/pages/transactions/budget/[...budget].astro?astro&type=script&index=0&lang.ts":"_astro/_...budget_.astro_astro_type_script_index_0_lang.BWT2JwVa.js","C:/web-projecs/budget-app/src/pages/transactions/month/[...month].astro?astro&type=script&index=0&lang.ts":"_astro/_...month_.astro_astro_type_script_index_0_lang.DYcLT81C.js","C:/web-projecs/budget-app/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.BWGtpdCW.js","C:/web-projecs/budget-app/src/components/_transactions/Transaction.astro?astro&type=script&index=0&lang.ts":"_astro/Transaction.astro_astro_type_script_index_0_lang.BpgiRSwA.js","C:/web-projecs/budget-app/src/components/Button/LoadingButton.astro?astro&type=script&index=0&lang.ts":"_astro/LoadingButton.astro_astro_type_script_index_0_lang.ybUw-Z2i.js","C:/web-projecs/budget-app/src/components/_transactions/CreateTransaction.astro?astro&type=script&index=0&lang.ts":"_astro/CreateTransaction.astro_astro_type_script_index_0_lang.CglmvQGm.js","C:/web-projecs/budget-app/src/components/_transactions/CreateTransactionCount.astro?astro&type=script&index=0&lang.ts":"_astro/CreateTransactionCount.astro_astro_type_script_index_0_lang.CXh1K9qc.js","C:/web-projecs/budget-app/src/components/_transactions/MoreTransactionsButton.astro?astro&type=script&index=0&lang.ts":"_astro/MoreTransactionsButton.astro_astro_type_script_index_0_lang.Chrkqp14.js","C:/web-projecs/budget-app/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.CtSceO8m.js","C:/web-projecs/budget-app/src/components/_transactions/DeleteTransaction.astro?astro&type=script&index=0&lang.ts":"_astro/DeleteTransaction.astro_astro_type_script_index_0_lang.DFcsgzmp.js","C:/web-projecs/budget-app/src/components/_transactions/EditTransaction.astro?astro&type=script&index=0&lang.ts":"_astro/EditTransaction.astro_astro_type_script_index_0_lang.3xXDayEW.js","C:/web-projecs/budget-app/src/components/Modal.astro?astro&type=script&index=0&lang.ts":"_astro/Modal.astro_astro_type_script_index_0_lang.D7k4s3_e.js","C:/web-projecs/budget-app/src/components/NavLink.astro?astro&type=script&index=0&lang.ts":"_astro/NavLink.astro_astro_type_script_index_0_lang.MpukrCnP.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/sora-latin-ext-wght-normal.6euZAK3l.woff2","/_astro/sora-latin-wght-normal.RuqamW1C.woff2","/_astro/lato-latin-ext-400-normal.C8eBZ-j2.woff2","/_astro/lato-latin-400-normal.BEhtfm5r.woff2","/_astro/lato-latin-400-normal.B11PyLys.woff","/_astro/_route_.KcO0QJNT.css","/_astro/_route_.C4aCjt7Z.css","/_astro/add.astro_astro_type_script_index_0_lang.u16_u1Fo.js","/_astro/app.utils.Dct-ahAO.js","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.CtSceO8m.js","/_astro/CreateTransaction.astro_astro_type_script_index_0_lang.CglmvQGm.js","/_astro/CreateTransactionCount.astro_astro_type_script_index_0_lang.CXh1K9qc.js","/_astro/DeleteTransaction.astro_astro_type_script_index_0_lang.DFcsgzmp.js","/_astro/EditTransaction.astro_astro_type_script_index_0_lang.3xXDayEW.js","/_astro/el.CrHXDqGj.js","/_astro/fetch.BKkjhxkM.js","/_astro/index.astro_astro_type_script_index_0_lang.BWGtpdCW.js","/_astro/LoadingButton.astro_astro_type_script_index_0_lang.ybUw-Z2i.js","/_astro/Modal.astro_astro_type_script_index_0_lang.D7k4s3_e.js","/_astro/MoreTransactionsButton.astro_astro_type_script_index_0_lang.Chrkqp14.js","/_astro/NavLink.astro_astro_type_script_index_0_lang.MpukrCnP.js","/_astro/Transaction.astro_astro_type_script_index_0_lang.BpgiRSwA.js","/_astro/_...budget_.astro_astro_type_script_index_0_lang.BWT2JwVa.js","/_astro/_...month_.astro_astro_type_script_index_0_lang.DYcLT81C.js","/_astro/_...route_.astro_astro_type_script_index_0_lang.DRWcUH4k.js"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"qVx6+SCKgD/IeO3lQIu8nQAzkb2hDPigORzeGKQWAyM=","sessionConfig":{"driver":"fs-lite","options":{"base":"C:\\web-projecs\\budget-app\\node_modules\\.astro\\sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
