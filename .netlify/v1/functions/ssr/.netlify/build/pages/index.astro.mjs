import { e as createComponent, m as maybeRenderHead, r as renderTemplate, f as createAstro, j as renderSlot, i as renderComponent } from '../chunks/astro/server_Chp6wBtO.mjs';
import 'kleur/colors';
import { $ as $$Layout, a as $$Header, b as $$Footer } from '../chunks/Footer_ALxlLuMb.mjs';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$WelcomeSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="text-center py-16 px-4 md:py-20 font-comfortaa bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg"> <div class="container mx-auto"> <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Welcome to Prostate Hub</h1> <p class="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
A trusted resource to guide you through your prostate cancer journey
</p> <p class="text-base md:text-lg max-w-2xl mx-auto mt-4 opacity-85">
Evidence-based information organized by cancer stage to support patients and families in New Zealand
</p> </div> </section>`;
}, "C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/src/components/astro/WelcomeSection.astro", void 0);

const $$CallToActionMenu = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="text-center py-8 font-mono"> <div class="max-w-4xl mx-auto"> <!-- Stages 1-4 row --> <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"> <a href="/stage-1" class="p-6 border-2 text-white bg-blue rounded-lg text-center font-medium hover:bg-green transition-colors shadow-md flex flex-col items-center justify-center min-h-[100px]"> <span class="text-2xl font-bold">Stage 1</span> <span class="text-sm mt-2 opacity-90">Early Stage</span> </a> <a href="/stage-2" class="p-6 border-2 text-white bg-blue rounded-lg text-center font-medium hover:bg-green transition-colors shadow-md flex flex-col items-center justify-center min-h-[100px]"> <span class="text-2xl font-bold">Stage 2</span> <span class="text-sm mt-2 opacity-90">Localised</span> </a> <a href="/stage-3" class="p-6 border-2 text-white bg-blue rounded-lg text-center font-medium hover:bg-green transition-colors shadow-md flex flex-col items-center justify-center min-h-[100px]"> <span class="text-2xl font-bold">Stage 3</span> <span class="text-sm mt-2 opacity-90">Locally Advanced</span> </a> <a href="/stage-4" class="p-6 border-2 text-white bg-blue rounded-lg text-center font-medium hover:bg-green transition-colors shadow-md flex flex-col items-center justify-center min-h-[100px]"> <span class="text-2xl font-bold">Stage 4</span> <span class="text-sm mt-2 opacity-90">Metastatic</span> </a> </div> <!-- Stage 0 and Family Support row --> <div class="grid grid-cols-1 md:grid-cols-2 gap-6 font-quicksand"> <a href="/stage-0" class="p-6 border-2 text-white bg-teal-600 rounded-lg text-center font-medium hover:bg-teal-700 transition-colors shadow-md flex flex-col items-center justify-center min-h-[100px]"> <span class="text-2xl font-bold">Stage 0</span> <span class="text-sm mt-2 opacity-90">Educational Information</span> </a> <a href="/family-support" class="p-6 border-2 text-white bg-indigo-600 rounded-lg text-center font-medium hover:bg-indigo-700 transition-colors shadow-md flex flex-col items-center justify-center min-h-[100px]"> <span class="text-2xl font-bold">Family Support</span> <span class="text-sm mt-2 opacity-90">For Caregivers & Loved Ones</span> </a> </div> </div> </section>`;
}, "C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/src/components/astro/CallToActionMenu.astro", void 0);

const $$Astro = createAstro();
const $$StudySection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$StudySection;
  const { title } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a href="/studies" class="block p-8 shadow-md rounded-lg bg-fuchsia hover:bg-green hover:text-white transition-all duration-300 font-comfortaa h-full"> <div class="flex flex-col h-full"> <h2 class="text-xl font-bold mb-4 pb-3 border-b border-gray-200">${title}</h2> <div class="flex-grow"> ${renderSlot($$result, $$slots["default"])} </div> <div class="mt-6 text-sm font-medium flex items-center justify-end"> <span>Read more</span> <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path> </svg> </div> </div> </a>`;
}, "C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/src/components/astro/StudySection.astro", void 0);

const $$LinkButtons = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 my-8 font-mono"> <a href="https://prostate.org.nz/online-forum" target="_blank" class="p-8 bg-blue rounded-lg text-center text-white font-medium hover:bg-green transition-colors shadow-md flex flex-col items-center justify-center min-h-[120px]"> <span class="text-2xl mb-2">Forum</span> <span class="text-sm opacity-90">Connect with others on their prostate cancer journey</span> </a> <a href="https://prostate.org.nz/donations" target="_blank" class="p-8 bg-blue rounded-lg text-center text-white font-medium hover:bg-green transition-colors shadow-md flex flex-col items-center justify-center min-h-[120px]"> <span class="text-2xl mb-2">Donation</span> <span class="text-sm opacity-90">Support prostate cancer research and resources</span> </a> </div>`;
}, "C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/src/components/astro/LinkButtons.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Layout, { "title": "Prostate Hub" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main class="min-h-screen"> ${renderComponent($$result2, "WelcomeSection", $$WelcomeSection, {})} <div class="container mx-auto px-4 md:px-8 mb-16"> <div class="my-12"> <h2 class="text-2xl font-serif text-center mb-2">Navigate Your Prostate Cancer Journey</h2> <p class="text-center text-gray-600 max-w-3xl mx-auto mb-8">
Find information specific to your stage or situation
</p> ${renderComponent($$result2, "CallToActionMenu", $$CallToActionMenu, {})} </div> <div class="my-20"> <h2 class="text-2xl font-serif text-center mb-2">Latest Studies</h2> <p class="text-center text-gray-600 max-w-3xl mx-auto mb-10">
Explore recent research and medical advances
</p> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"> ${renderComponent($$result2, "StudySection", $$StudySection, { "title": "Kegel Exercises" }, { "default": ($$result3) => renderTemplate`
Kegel exercises strengthen pelvic floor muscles that support bladder control and sexual function. Research shows these exercises significantly improve urinary continence following prostate surgery and may enhance erectile function. Regular practice can speed recovery after prostatectomy and provide long-term benefits for prostate health.
` })} ${renderComponent($$result2, "StudySection", $$StudySection, { "title": "Kawakawa Tree" }, { "default": ($$result3) => renderTemplate`
The New Zealand Kawakawa tree has been used in traditional Māori medicine for generations. Recent scientific studies validate its anti-inflammatory, antimicrobial, and analgesic properties. Ongoing research explores its potential benefits for metabolic health and possible anticancer effects, making it an interesting area of study for prostate health management.
` })} ${renderComponent($$result2, "StudySection", $$StudySection, { "title": "K9 Medical Detection" }, { "default": ($$result3) => renderTemplate`
K9MD trains dogs to detect prostate cancer through scent in urine samples. Clinical trials in New Zealand show detection rates comparable to conventional tests, and sometimes higher. This non-invasive approach could complement traditional diagnostic methods, potentially reducing the need for invasive procedures while improving early detection.
` })} </div> </div> <div class="my-20"> <h2 class="text-2xl font-serif text-center mb-2">Additional Resources</h2> <p class="text-center text-gray-600 max-w-3xl mx-auto mb-10">
Connect with the community and support organizations
</p> ${renderComponent($$result2, "LinkButtons", $$LinkButtons, {})} </div> </div> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/src/pages/index.astro", void 0);

const $$file = "C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
