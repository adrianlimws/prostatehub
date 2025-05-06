import { e as createComponent, f as createAstro, n as renderHead, j as renderSlot, r as renderTemplate, m as maybeRenderHead, h as addAttribute, k as renderScript, i as renderComponent } from './astro/server_Chp6wBtO.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                  */
import { useSSRContext, ref, onMounted, onUnmounted, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle, ssrRenderClass } from 'vue/server-renderer';

const $$Astro$2 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title>${renderHead()}</head> <body class="min-h-screen"> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/src/layouts/Layout.astro", void 0);

const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _sfc_main = {
  __name: 'MobileMenuButton',
  setup(__props, { expose: __expose }) {
  __expose();

const isMenuOpen = ref(false);
const currentPath = ref('');

onMounted(() => {
  currentPath.value = window.location.pathname;
  
  // Close menu when clicking outside
  document.addEventListener('click', handleClickOutside);
  
  // Close menu when window is resized to desktop size
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('resize', handleResize);
});

const toggleMenu = (event) => {
  event.stopPropagation();
  isMenuOpen.value = !isMenuOpen.value;
};

const handleClickOutside = (event) => {
  const menuButton = document.getElementById('mobile-menu-button');
  const menuContent = document.getElementById('mobile-menu-content');
  
  if (menuButton && menuContent && 
      !menuButton.contains(event.target) && 
      !menuContent.contains(event.target)) {
    isMenuOpen.value = false;
  }
};

const handleResize = () => {
  // Close mobile menu if screen becomes larger than md breakpoint
  if (window.innerWidth >= 768 && isMenuOpen.value) {
    isMenuOpen.value = false;
  }
};

const __returned__ = { isMenuOpen, currentPath, toggleMenu, handleClickOutside, handleResize, ref, onMounted, onUnmounted };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${
    ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))
  }><button id="mobile-menu-button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" aria-label="Main menu"${
    ssrRenderAttr("aria-expanded", $setup.isMenuOpen)
  }>`);
  if (!$setup.isMenuOpen) {
    _push(`<svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>`);
  } else {
    _push(`<svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`);
  }
  _push(`</button><div id="mobile-menu-content" style="${
    ssrRenderStyle(($setup.isMenuOpen) ? null : { display: "none" })
  }" class="absolute top-full right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-50 overflow-hidden transition-all duration-200 ease-in-out border border-gray-200"><div class="px-4 pt-4 pb-2"><h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Stages</h3><div class="mt-2 grid grid-cols-5 gap-1"><a href="/stage-0" class="${
    ssrRenderClass([$setup.currentPath === '/stage-0' ? 'bg-teal-50 text-teal-700' : 'text-gray-700 hover:bg-gray-50', "flex justify-center items-center px-2 py-2 text-sm font-medium rounded-md transition-colors"])
  }">0</a><a href="/stage-1" class="${
    ssrRenderClass([$setup.currentPath === '/stage-1' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50', "flex justify-center items-center px-2 py-2 text-sm font-medium rounded-md transition-colors"])
  }">1</a><a href="/stage-2" class="${
    ssrRenderClass([$setup.currentPath === '/stage-2' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50', "flex justify-center items-center px-2 py-2 text-sm font-medium rounded-md transition-colors"])
  }">2</a><a href="/stage-3" class="${
    ssrRenderClass([$setup.currentPath === '/stage-3' ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-50', "flex justify-center items-center px-2 py-2 text-sm font-medium rounded-md transition-colors"])
  }">3</a><a href="/stage-4" class="${
    ssrRenderClass([$setup.currentPath === '/stage-4' ? 'bg-red-50 text-red-700' : 'text-gray-700 hover:bg-gray-50', "flex justify-center items-center px-2 py-2 text-sm font-medium rounded-md transition-colors"])
  }">4</a></div></div><div class="border-t border-gray-200 my-1"></div><div class="py-1"><a href="/" class="${
    ssrRenderClass([{ 'bg-blue-50 text-blue-700 font-medium': $setup.currentPath === '/' }, "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"])
  }"> Home </a><a href="/family-support" class="${
    ssrRenderClass([{ 'bg-blue-50 text-blue-700 font-medium': $setup.currentPath === '/family-support' }, "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"])
  }"> Family Support </a><a href="/studies" class="${
    ssrRenderClass([{ 'bg-blue-50 text-blue-700 font-medium': $setup.currentPath === '/studies' }, "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"])
  }"> Studies </a><a href="/support-groups" class="${
    ssrRenderClass([{ 'bg-blue-50 text-blue-700 font-medium': $setup.currentPath === '/support-groups' }, "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"])
  }"> Support Groups </a></div><div class="border-t border-gray-200 my-1"></div><div class="bg-gray-50 py-2"><h3 class="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">External Resources</h3><a href="https://prostate.org.nz/online-forum" target="_blank" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"><div class="flex items-center"><span>PFNZ Forum</span><svg class="ml-1 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg></div></a><a href="https://prostate.org.nz/donations" target="_blank" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"><div class="flex items-center"><span>PFNZ Donation</span><svg class="ml-1 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg></div></a></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/vue/MobileMenuButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const MobileMenuButton = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

const $$Astro$1 = createAstro();
const $$Search = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Search;
  const { id, className, query, uiOptions = {} } = Astro2.props;
  const bundlePath = `${"/"}pagefind/`;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(id, "id")}${addAttribute([className, "pagefind-init"], "class:list")} data-pagefind-ui${addAttribute(bundlePath, "data-bundle-path")}${addAttribute(query, "data-query")}${addAttribute(JSON.stringify(uiOptions), "data-ui-options")}></div> ${renderScript($$result, "C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/node_modules/astro-pagefind/src/components/Search.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/node_modules/astro-pagefind/src/components/Search.astro", void 0);

const $$Astro = createAstro();
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Header;
  const q = Astro2.url.searchParams.get("q") ?? void 0;
  const currentPath = Astro2.url.pathname;
  return renderTemplate`${maybeRenderHead()}<header class="bg-white fixed top-0 left-0 right-0 z-50 font-sans shadow-md"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="flex justify-between h-16"> <!-- Logo and Brand --> <div class="flex items-center"> <a href="/" class="flex items-center" aria-label="Home"> <!-- Optional: Add logo image here --> <!-- <img src="/images/logo.svg" alt="Prostate Hub Logo" class="h-8 w-auto mr-2"> --> <span class="font-semibold text-xl text-blue-800 hover:text-blue-700 transition-colors">Prostate Hub</span> </a> </div> <!-- Desktop Navigation - Hidden on mobile --> <nav class="hidden md:flex items-center space-x-1"> <!-- Stage-based navigation --> <div class="flex items-center mr-4 border-r pr-4 border-gray-200"> <span class="text-gray-500 text-sm font-medium mr-2">Stages:</span> <div class="flex space-x-1"> <a href="/stage-0"${addAttribute(`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPath === "/stage-0" ? "bg-teal-50 text-teal-700 border-b-2 border-teal-600" : "text-gray-700 hover:bg-gray-100"}`, "class")}>0</a> <a href="/stage-1"${addAttribute(`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPath === "/stage-1" ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600" : "text-gray-700 hover:bg-gray-100"}`, "class")}>1</a> <a href="/stage-2"${addAttribute(`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPath === "/stage-2" ? "bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600" : "text-gray-700 hover:bg-gray-100"}`, "class")}>2</a> <a href="/stage-3"${addAttribute(`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPath === "/stage-3" ? "bg-purple-50 text-purple-700 border-b-2 border-purple-600" : "text-gray-700 hover:bg-gray-100"}`, "class")}>3</a> <a href="/stage-4"${addAttribute(`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPath === "/stage-4" ? "bg-red-50 text-red-700 border-b-2 border-red-600" : "text-gray-700 hover:bg-gray-100"}`, "class")}>4</a> </div> </div> <!-- Support links --> <a href="/family-support"${addAttribute(`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPath === "/family-support" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`, "class")}>Family Support</a> <a href="/studies"${addAttribute(`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPath === "/studies" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`, "class")}>Studies</a> <a href="/support-groups"${addAttribute(`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPath === "/support-groups" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`, "class")}>Support Groups</a> </nav> <!-- Search and Mobile Menu --> <div class="flex items-center"> <button id="search-toggle" class="p-2 rounded-full text-gray-600 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors mr-2" aria-label="Search"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path> </svg> </button> <!-- Mobile Menu Button - Only visible on mobile --> <div class="md:hidden"> ${renderComponent($$result, "MobileMenuButton", MobileMenuButton, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/src/components/vue/MobileMenuButton.vue", "client:component-export": "default" })} </div> </div> </div> <!-- Search Container - Hidden by default --> <div id="search-container" class="hidden w-full py-4"> <div class="relative w-full"> ${renderComponent($$result, "Search", $$Search, { "id": "search", "query": q, "className": "pagefind-ui pagefind-ui--medical", "uiOptions": { showImages: false } })} </div> </div> </div> </header> <!-- Spacer to prevent content from being hidden under fixed header --> <div class="h-16"></div> ${renderScript($$result, "C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/src/components/astro/Header.astro?astro&type=script&index=0&lang.ts")} `;
}, "C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/src/components/astro/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="mt-auto py-8"> <div class="p-8 text-center"> <p>Prostate Hub &copy 2025 - Built by <a href="https://adrianlim.netlify.app" target="_blank">Adrian Lim W.S</a></p> </div> </footer>`;
}, "C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/src/components/astro/Footer.astro", void 0);

export { $$Layout as $, _export_sfc as _, $$Header as a, $$Footer as b };
