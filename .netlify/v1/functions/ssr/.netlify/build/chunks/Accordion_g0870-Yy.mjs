import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, j as renderSlot, k as renderScript, r as renderTemplate } from './astro/server_Chp6wBtO.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro();
const $$Accordion = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Accordion;
  const { title, initiallyOpen = false } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="shadow-md rounded-lg mb-4 overflow-hidden"> <button class="w-full p-4 text-white text-left font-medium flex justify-between items-center bg-blue hover:bg-green transition-colors"${addAttribute(initiallyOpen ? "true" : "false", "aria-expanded")} data-accordion-header> <span>${title}</span> <span class="transform transition-transform" data-accordion-icon> ${initiallyOpen ? "\u25BC" : "\u25B6"} </span> </button> <div class="shadow-md p-4 border-t border-gray-200"${addAttribute(initiallyOpen ? "" : "display: none;", "style")} data-accordion-content> ${renderSlot($$result, $$slots["default"])} </div> </div> ${renderScript($$result, "C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/src/components/astro/Accordion.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/src/components/astro/Accordion.astro", void 0);

export { $$Accordion as $ };
