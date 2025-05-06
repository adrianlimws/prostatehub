import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_BNyMHBhp.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/family-support.astro.mjs');
const _page2 = () => import('./pages/stage-0.astro.mjs');
const _page3 = () => import('./pages/stage-1.astro.mjs');
const _page4 = () => import('./pages/stage-2.astro.mjs');
const _page5 = () => import('./pages/stage-3.astro.mjs');
const _page6 = () => import('./pages/stage-4.astro.mjs');
const _page7 = () => import('./pages/studies.astro.mjs');
const _page8 = () => import('./pages/support-groups.astro.mjs');
const _page9 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/family-support.astro", _page1],
    ["src/pages/stage-0.astro", _page2],
    ["src/pages/stage-1.astro", _page3],
    ["src/pages/stage-2.astro", _page4],
    ["src/pages/stage-3.astro", _page5],
    ["src/pages/stage-4.astro", _page6],
    ["src/pages/studies.astro", _page7],
    ["src/pages/support-groups.astro", _page8],
    ["src/pages/index.astro", _page9]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "5d1538fb-000d-479a-bf1e-85bf1f9616d9"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
