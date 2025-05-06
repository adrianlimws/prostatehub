import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { o as NOOP_MIDDLEWARE_HEADER, p as decodeKey } from './chunks/astro/server_Chp6wBtO.mjs';
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
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
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

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/Adrian/OneDrive%20-%20Ara%20Institute%20of%20Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/","cacheDir":"file:///C:/Users/Adrian/OneDrive%20-%20Ara%20Institute%20of%20Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/node_modules/.astro/","outDir":"file:///C:/Users/Adrian/OneDrive%20-%20Ara%20Institute%20of%20Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/dist/","srcDir":"file:///C:/Users/Adrian/OneDrive%20-%20Ara%20Institute%20of%20Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/src/","publicDir":"file:///C:/Users/Adrian/OneDrive%20-%20Ara%20Institute%20of%20Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/public/","buildClientDir":"file:///C:/Users/Adrian/OneDrive%20-%20Ara%20Institute%20of%20Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/dist/","buildServerDir":"file:///C:/Users/Adrian/OneDrive%20-%20Ara%20Institute%20of%20Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"family-support.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/family-support","isIndex":false,"type":"page","pattern":"^\\/family-support\\/?$","segments":[[{"content":"family-support","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/family-support.astro","pathname":"/family-support","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"stage-0.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/stage-0","isIndex":false,"type":"page","pattern":"^\\/stage-0\\/?$","segments":[[{"content":"stage-0","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/stage-0.astro","pathname":"/stage-0","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"stage-1.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/stage-1","isIndex":false,"type":"page","pattern":"^\\/stage-1\\/?$","segments":[[{"content":"stage-1","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/stage-1.astro","pathname":"/stage-1","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"stage-2.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/stage-2","isIndex":false,"type":"page","pattern":"^\\/stage-2\\/?$","segments":[[{"content":"stage-2","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/stage-2.astro","pathname":"/stage-2","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"stage-3.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/stage-3","isIndex":false,"type":"page","pattern":"^\\/stage-3\\/?$","segments":[[{"content":"stage-3","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/stage-3.astro","pathname":"/stage-3","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"stage-4.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/stage-4","isIndex":false,"type":"page","pattern":"^\\/stage-4\\/?$","segments":[[{"content":"stage-4","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/stage-4.astro","pathname":"/stage-4","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"studies.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/studies","isIndex":false,"type":"page","pattern":"^\\/studies\\/?$","segments":[[{"content":"studies","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/studies.astro","pathname":"/studies","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/family-support.BhaMpH83.css"},{"type":"inline","content":".c-breadcrumbs{--color-link-breadcrumbs: inherit;--size-font-breadcrumbs: 1rem;--spacing-vertical-separator-breadcrumbs: 6px}.c-breadcrumbs .has-ellipsis{display:var(--display-ellipsis-breadcrumbs, none)}.c-breadcrumbs.is-truncated .has-ellipsis{--display-ellipsis-breadcrumbs: flex}.c-breadcrumbs.is-truncated .c-breadcrumbs__crumb{visibility:var(--visibility-truncated-breadcrumbs, hidden);position:var(--position-truncated-breadcrumbs, absolute)}.c-breadcrumbs.is-truncated .c-breadcrumbs__crumb:first-of-type,.c-breadcrumbs.is-truncated .c-breadcrumbs__crumb:last-of-type,.c-breadcrumbs.is-truncated .c-breadcrumbs__crumb.has-ellipsis{--visibility-truncated-breadcrumbs: visible;--position-truncated-breadcrumbs: relative}.c-breadcrumbs__truncated-button{background-color:transparent;border:none;padding:0;margin:0;cursor:pointer;color:var(--color-truncated-button, var(--color-link-breadcrumbs))}.c-breadcrumbs__crumbs{list-style-type:none;margin:0;padding:0;display:flex;flex-wrap:wrap}.c-breadcrumbs__crumbs:where(.has-no-separators){row-gap:var(--spacing-vertical-separator-breadcrumbs);column-gap:1rem}.c-breadcrumbs__crumb{display:flex;align-items:center}.c-breadcrumbs__crumb:has(.c-breadcrumbs__separator) .c-breadcrumbs__separator{display:flex;align-items:center;justify-content:center;margin-inline:var(--spacing-vertical-separator-breadcrumbs)}.c-breadcrumbs__crumb:has(svg,image) :where(svg,image){max-width:var(--size-font-breadcrumbs);max-height:var(--size-font-breadcrumbs)}.c-breadcrumbs__link,.c-breadcrumbs__truncated-button{font-size:var(--size-font-breadcrumbs);text-decoration:none;color:var(--color-link-breadcrumbs);line-height:1}\n"}],"routeData":{"route":"/support-groups","isIndex":false,"type":"page","pattern":"^\\/support-groups\\/?$","segments":[[{"content":"support-groups","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/support-groups.astro","pathname":"/support-groups","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/src/pages/family-support.astro",{"propagation":"none","containsHead":true}],["C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/src/pages/stage-0.astro",{"propagation":"none","containsHead":true}],["C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/src/pages/stage-1.astro",{"propagation":"none","containsHead":true}],["C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/src/pages/stage-2.astro",{"propagation":"none","containsHead":true}],["C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/src/pages/stage-3.astro",{"propagation":"none","containsHead":true}],["C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/src/pages/stage-4.astro",{"propagation":"none","containsHead":true}],["C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/src/pages/studies.astro",{"propagation":"none","containsHead":true}],["C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/src/pages/support-groups.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/family-support@_@astro":"pages/family-support.astro.mjs","\u0000@astro-page:src/pages/stage-0@_@astro":"pages/stage-0.astro.mjs","\u0000@astro-page:src/pages/stage-1@_@astro":"pages/stage-1.astro.mjs","\u0000@astro-page:src/pages/stage-2@_@astro":"pages/stage-2.astro.mjs","\u0000@astro-page:src/pages/stage-3@_@astro":"pages/stage-3.astro.mjs","\u0000@astro-page:src/pages/stage-4@_@astro":"pages/stage-4.astro.mjs","\u0000@astro-page:src/pages/studies@_@astro":"pages/studies.astro.mjs","\u0000@astro-page:src/pages/support-groups@_@astro":"pages/support-groups.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_BNyMHBhp.mjs","C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_k5fXpqbr.mjs","C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/src/components/vue/PatientDistributionChart.vue":"_astro/PatientDistributionChart.Db-tDmRP.js","C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/src/components/vue/SurvivalRateChart.vue":"_astro/SurvivalRateChart.DY6scql5.js","C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/src/components/vue/TreatmentResponseChart.vue":"_astro/TreatmentResponseChart.BnTXzlxm.js","C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/src/components/vue/MobileMenuButton.vue":"_astro/MobileMenuButton.CpTPVCmQ.js","@astrojs/vue/client.js":"_astro/client.CbHoRHSr.js","C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/src/components/astro/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.DhMDNvzp.js","C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/src/components/astro/Accordion.astro?astro&type=script&index=0&lang.ts":"_astro/Accordion.astro_astro_type_script_index_0_lang.B_7SeMbp.js","C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/node_modules/astro-breadcrumbs/src/Breadcrumbs.astro?astro&type=script&index=0&lang.ts":"_astro/Breadcrumbs.astro_astro_type_script_index_0_lang.CeyVNKL7.js","C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/node_modules/astro-pagefind/src/components/Search.astro?astro&type=script&index=0&lang.ts":"_astro/Search.astro_astro_type_script_index_0_lang.C4tRTXsn.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/src/components/astro/Header.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const n=document.getElementById(\"search-toggle\"),t=document.getElementById(\"search-container\");n?.addEventListener(\"click\",()=>{t?.classList.contains(\"hidden\")?(t.classList.remove(\"hidden\"),setTimeout(()=>{const s=document.querySelector(\".pagefind-ui__search-input\");s&&s.focus()},100)):t?.classList.add(\"hidden\")}),document.addEventListener(\"click\",s=>{const e=s.target,c=e.closest(\"#search-container\")||e.closest(\"#search-toggle\"),i=e.closest(\".pagefind-ui__button\")||e.closest(\".pagefind-ui__result-link\")||e.closest(\".pagefind-ui__result-title\")||e.closest(\".pagefind-ui__result-excerpt\")||e.closest(\".pagefind-ui__results-pagination\")||e.closest(\".pagefind-ui__message\");!c&&!i&&!t?.classList.contains(\"hidden\")&&t?.classList.add(\"hidden\")},{capture:!0})});"],["C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/src/components/astro/Accordion.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{document.querySelectorAll(\"[data-accordion-header]\").forEach(t=>{t.addEventListener(\"click\",()=>{const n=t.nextElementSibling,o=t.querySelector(\"[data-accordion-icon]\"),e=t.getAttribute(\"aria-expanded\")===\"true\";t.setAttribute(\"aria-expanded\",!e),n.style.display=e?\"none\":\"block\",o.textContent=e?\"▶\":\"▼\"})})});"],["C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/node_modules/astro-breadcrumbs/src/Breadcrumbs.astro?astro&type=script&index=0&lang.ts","class t extends HTMLElement{constructor(){super(),this.isManualToggle=!1,this.breadcrumbs=null,this.mainBemClass=null,this.totalWidth=0,this.resizeObserver=null,this.handleTruncatedButtonClick=()=>{this.breadcrumbs?.classList.remove(\"is-truncated\"),this.isManualToggle=!0},this.mainBemClass=this.dataset.mainBemClass||null;const e=this.dataset.id;!(\"truncated\"in this.dataset)||!e||(this.breadcrumbs=document.getElementById(e),this.initializeCrumbs(),this.setupResizeObserver())}initializeCrumbs(){this.breadcrumbs?.querySelectorAll(`.${this.mainBemClass}__crumb`)?.forEach(s=>{this.totalWidth+=s.offsetWidth})}setupResizeObserver(){this.resizeObserver=new ResizeObserver(e=>{e.forEach(s=>{this.checkOverflow(s.target.clientWidth)})}),this.breadcrumbs&&this.resizeObserver.observe(this.breadcrumbs)}connectedCallback(){this.showHiddenCrumbs()}disconnectedCallback(){this.resizeObserver&&this.breadcrumbs&&(this.resizeObserver.unobserve(this.breadcrumbs),this.resizeObserver.disconnect())}toggleTruncated(e){this.breadcrumbs?.classList.toggle(\"is-truncated\",e)}showHiddenCrumbs(){const e=this.breadcrumbs?.querySelector(`.${this.mainBemClass}__truncated-button`);e?.removeEventListener(\"click\",this.handleTruncatedButtonClick),e?.addEventListener(\"click\",this.handleTruncatedButtonClick.bind(this))}checkOverflow(e){const s=this.totalWidth>e&&!this.isManualToggle;this.toggleTruncated(s),s||(this.isManualToggle=!1)}}customElements.get(\"astro-breadcrumbs\")||customElements.define(\"astro-breadcrumbs\",t);"]],"assets":["/_astro/family-support.BhaMpH83.css","/favicon.svg","/_astro/client.CbHoRHSr.js","/_astro/index.CLMAWF77.js","/_astro/MobileMenuButton.CpTPVCmQ.js","/_astro/PatientDistributionChart.Db-tDmRP.js","/_astro/runtime-core.esm-bundler.BfB4GOPs.js","/_astro/runtime-dom.esm-bundler.B_v2V0L8.js","/_astro/Search.astro_astro_type_script_index_0_lang.C4tRTXsn.js","/_astro/SurvivalRateChart.DY6scql5.js","/_astro/TreatmentResponseChart.BnTXzlxm.js","/_astro/_plugin-vue_export-helper.DlAUqK2U.js","/family-support.html","/stage-0.html","/stage-1.html","/stage-2.html","/stage-3.html","/stage-4.html","/studies.html","/index.html"],"buildFormat":"file","checkOrigin":true,"serverIslandNameMap":[],"key":"t8XGv9LpuKW4IpRIp0eZNGiPomGDx9eF8glFOSQnFSo="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
