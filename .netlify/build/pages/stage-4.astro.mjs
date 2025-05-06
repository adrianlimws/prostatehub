import { e as createComponent, i as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Chp6wBtO.mjs';
import 'kleur/colors';
import { _ as _export_sfc, $ as $$Layout, a as $$Header, b as $$Footer } from '../chunks/Footer_ALxlLuMb.mjs';
import { $ as $$Accordion } from '../chunks/Accordion_g0870-Yy.mjs';
import { useSSRContext, ref, onMounted, watch, mergeProps } from 'vue';
import * as d3 from 'd3';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { $ as $$Breadcrumbs } from '../chunks/Breadcrumbs_0aNZSiZH.mjs';
/* empty css                                          */
export { renderers } from '../renderers.mjs';

const _sfc_main = {
  __name: 'TreatmentResponseChart',
  props: {
  stage: {
    type: String,
    required: true
  }
},
  setup(__props, { expose: __expose }) {
  __expose();

const props = __props;

const chartRef = ref(null);

const renderChart = () => {
  if (!chartRef.value) return;
  
  // Clear any existing charts
  d3.select(chartRef.value).selectAll("*").remove();
  
  // Create SVG
  const width = 300;
  const height = 150;
  const margin = { top: 20, right: 30, bottom: 40, left: 40 };
  
  const svg = d3.select(chartRef.value)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);
  
  // Generate sample data based on stage (simulated response over 5 years)
  const generateData = (stage) => {
    const baseResponse = [100, 90, 85, 80, 75, 70]; // Default response curve
    let modifier = 1.0;
    
    switch(stage) {
      case '1': modifier = 0.99; break; // Minimal decrease
      case '2': modifier = 0.95; break; // Slight decrease
      case '3': modifier = 0.85; break; // Moderate decrease
      case '4': modifier = 0.65; break; // Significant decrease
      default: modifier = 0.9;
    }
    
    return baseResponse.map((value, i) => ({
      year: i,
      response: i === 0 ? value : value * Math.pow(modifier, i)
    }));
  };
  
  const data = generateData(props.stage);
  
  // X scale
  const x = d3.scaleLinear()
    .domain(d3.extent(data, d => d.year))
    .range([0, width - margin.left - margin.right]);
  
  // Y scale
  const y = d3.scaleLinear()
    .domain([0, 100])
    .range([height - margin.top - margin.bottom, 0]);
  
  // Add X axis
  svg.append('g')
    .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(5).tickFormat(d => `Yr ${d}`));
  
  // Add Y axis
  svg.append('g')
    .call(d3.axisLeft(y).ticks(5).tickFormat(d => d + '%'));
  
  // Add title
  svg.append('text')
    .attr('x', (width - margin.left - margin.right) / 2)
    .attr('y', -5)
    .attr('text-anchor', 'middle')
    .style('font-size', '14px')
    .style('font-weight', 'bold')
    .text('Treatment Response');
  
  // Add line
  const line = d3.line()
    .x(d => x(d.year))
    .y(d => y(d.response))
    .curve(d3.curveMonotoneX);
  
  svg.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', '#324Ea2')
    .attr('stroke-width', 2)
    .attr('d', line);
  
  // Add dots
  svg.selectAll('.dot')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'dot')
    .attr('cx', d => x(d.year))
    .attr('cy', d => y(d.response))
    .attr('r', 4)
    .attr('fill', '#324Ea2');
};

onMounted(renderChart);
watch(() => props.stage, renderChart);

const __returned__ = { props, chartRef, renderChart, ref, onMounted, watch, get d3() { return d3 } };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    ref: "chartRef",
    class: "w-full h-32 flex items-center justify-center"
  }, _attrs))}></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/vue/TreatmentResponseChart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const TreatmentResponseChart = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

const prerender = false;
const $$Stage4 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Layout, { "title": "Prostate Hub - Stage 4" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})}  ${maybeRenderHead()}<section class="text-center p-10 font-comfortaa bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg mb-10"> <h1 class="text-3xl font-bold mb-4">Stage 4: Metastatic Prostate Cancer</h1> <p class="text-lg max-w-3xl mx-auto">
Comprehensive information about Stage 4 prostate cancer, treatment approaches, and support resources for patients and families in New Zealand.
</p> </section> <main class="my-8 container mx-auto px-4"> <!-- Breadcrumbs --> <div class="mb-4 pb-2 border-b-2 border-gray-300"> ${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, { "separatorAriaHidden": false, "linkTextFormat": "capitalized" }, { "separator": ($$result3) => renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline> </svg>` })} </div> <!-- Main content with improved layout --> <div class="flex flex-col md:flex-row gap-8 mb-8"> <!-- Left column with statistics and chart --> <div class="md:w-1/3"> <div class="bg-blue-50 rounded-lg shadow-md p-6"> <div class="space-y-6 text-center"> <p class="text-xl md:text-2xl font-serif text-blue-800 leading-relaxed">
Approximately 8% of men in New Zealand are diagnosed with Stage 4 prostate cancer, called "de novo" metastatic disease.
</p> <p class="text-xl md:text-2xl font-serif text-blue-800 leading-relaxed">
The 5-year survival rate for metastatic prostate cancer is around 30%, though newer treatments are improving these outcomes.
</p> <div class="my-8"> ${renderComponent($$result2, "TreatmentResponseChart", TreatmentResponseChart, { "client:load": true, "stage": "4", "client:component-hydration": "load", "client:component-path": "C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/src/components/vue/TreatmentResponseChart.vue", "client:component-export": "default" })} </div> <p class="text-xl md:text-2xl font-serif text-blue-800 leading-relaxed">
In New Zealand, approximately 350 men are diagnosed with de novo Stage 4 prostate cancer annually.
</p> <p class="text-xl md:text-2xl font-serif text-blue-800 leading-relaxed mt-6">
About 63% of patients with metastatic prostate cancer in New Zealand receive hormone therapy (ADT) as their primary treatment.
</p> </div> </div> </div> <!-- Right column with accordion sections --> <div class="md:w-2/3"> ${renderComponent($$result2, "Accordion", $$Accordion, { "title": "What is Stage 4 Prostate Cancer?", "initiallyOpen": true }, { "default": ($$result3) => renderTemplate` <div class="space-y-4"> <p>Stage 4 prostate cancer means the cancer has spread beyond the prostate to distant parts of the body. At this stage:</p> <ul class="list-disc pl-6 space-y-2"> <li>The cancer has metastasized to other organs, lymph nodes, or bones</li> <li>PSA levels are typically very elevated</li> <li>The Gleason score is usually 8-10</li> </ul> <p>Stage 4 is further divided into:</p> <ul class="list-disc pl-6 space-y-2"> <li><strong>Stage 4A:</strong> Cancer has spread to nearby lymph nodes but not to distant organs</li> <li><strong>Stage 4B:</strong> Cancer has spread to distant lymph nodes, bones, or other organs</li> </ul> <p>In New Zealand, approximately 8% of prostate cancer diagnoses are metastatic (Stage 4) at the time of diagnosis. This equates to about 350 men annually diagnosed with what doctors call "de novo" metastatic disease, meaning they are diagnosed at Stage 4 without having gone through earlier stages.</p> <p>While Stage 4 prostate cancer is not typically curable, many men live for years with good quality of life with proper treatment and management.</p> </div> ` })} ${renderComponent($$result2, "Accordion", $$Accordion, { "title": "Treatment Approaches in New Zealand" }, { "default": ($$result3) => renderTemplate` <div class="space-y-4"> <p>Based on New Zealand patient data, the following treatments are commonly used for Stage 4 prostate cancer:</p> <h3 class="font-semibold text-lg">Hormone Therapy (ADT)</h3> <p>The foundation of treatment for metastatic prostate cancer, used in about 63% of metastatic cases in New Zealand. This includes:</p> <ul class="list-disc pl-6 space-y-2"> <li>LHRH agonists like Goserelin (Zoladex) - given as a 12-week implant in the abdomen</li> <li>Anti-androgens like Bicalutamide - typically taken as tablets</li> <li>Combined androgen blockade approaches</li> </ul> <p>Treatment is usually administered by oncology nurses at cancer centers throughout New Zealand, with implants typically given every three months.</p> <h3 class="font-semibold text-lg mt-6">Radiation Therapy with Hormone Therapy</h3> <p>About 31% of metastatic patients in New Zealand receive radiation combined with hormone therapy, which can help:</p> <ul class="list-disc pl-6 space-y-2"> <li>Control symptoms from the primary tumor</li> <li>Relieve pain from bone metastases</li> <li>Slow disease progression</li> </ul> <p>The Canterbury Regional Cancer and Haematology Service and other cancer centers in New Zealand provide radiation therapy services.</p> <h3 class="font-semibold text-lg mt-6">Chemotherapy</h3> <p>Often given alongside hormone therapy for metastatic disease:</p> <ul class="list-disc pl-6 space-y-2"> <li>Docetaxel (Taxotere) - usually the first chemotherapy option</li> <li>Given as intravenous infusions at cancer centers</li> <li>Typically administered in a six-cycle program over 18 weeks</li> </ul> <p>Before starting chemotherapy, patients often have dental checks and other preparations to reduce potential side effects.</p> <h3 class="font-semibold text-lg mt-6">Bone-Targeted Therapies</h3> <p>To strengthen bones and prevent complications:</p> <ul class="list-disc pl-6 space-y-2"> <li>Bisphosphonates like zoledronic acid - given as intravenous infusions</li> <li>Typically administered every 12 weeks</li> <li>Requires drinking plenty of water before treatment</li> </ul> <h3 class="font-semibold text-lg mt-6">Advanced Hormone Therapies</h3> <p>Second-generation hormone therapies:</p> <ul class="list-disc pl-6 space-y-2"> <li>Abiraterone acetate (Zytiga) - now available in New Zealand but may not be fully funded for all patients</li> <li>Often reserved for when standard hormone therapy is no longer effective</li> </ul> </div> ` })} ${renderComponent($$result2, "Accordion", $$Accordion, { "title": "Managing Side Effects" }, { "default": ($$result3) => renderTemplate` <div class="space-y-4"> <p>Based on data from New Zealand patients, people with Stage 4 prostate cancer reported these experiences one year after diagnosis:</p> <h3 class="font-semibold text-lg">Hormone Therapy Side Effects</h3> <ul class="list-disc pl-6 space-y-2"> <li>Lack of energy (36% of patients)</li> <li>Sexual function issues (34% reported as a problem)</li> <li>Very few patients (6%) reported having fair-to-good erections</li> <li>Emotional changes (14% reported feeling depressed)</li> <li>Urinary issues (13% reported urinary function as a problem)</li> <li>Hot flashes and night sweats (not quantified but commonly reported)</li> </ul> <h3 class="font-semibold text-lg mt-6">Chemotherapy Specific Side Effects</h3> <p>Docetaxel chemotherapy can cause additional side effects:</p> <ul class="list-disc pl-6 space-y-2"> <li>Lowered immune system - increasing risk of infection</li> <li>Taste changes - affecting many foods for up to 6 months</li> <li>Peripheral neuropathy - numbness or tingling in fingers and toes</li> <li>Nail changes - including possible loss of toenails</li> <li>Hair loss - affecting head and body hair</li> </ul> <h3 class="font-semibold text-lg mt-6">Managing Side Effects</h3> <p>New Zealand cancer centers provide comprehensive support including:</p> <ul class="list-disc pl-6 space-y-2"> <li>Anti-nausea medications for chemotherapy side effects</li> <li>Medications for managing hot flashes</li> <li>Regular monitoring of blood tests</li> <li>Emergency access to oncology services if side effects become severe</li> <li>Green cards for emergency access through hospital oncology departments</li> <li>24-hour phone access to nursing support</li> </ul> <p>Before starting treatment, take note of the side effect monitoring protocol provided by your medical team. Always check your temperature if you feel unwell and contact your oncology team immediately if your temperature is 38°C or above.</p> </div> ` })} ${renderComponent($$result2, "Accordion", $$Accordion, { "title": "New Zealand Support Resources" }, { "default": ($$result3) => renderTemplate` <div class="space-y-4"> <p>Support is crucial for Stage 4 patients and their families in New Zealand:</p> <h3 class="font-semibold text-lg">Medical Support Services</h3> <ul class="list-disc pl-6 space-y-2"> <li><strong>Cancer Society New Zealand:</strong> Located on many hospital campuses with information and support services</li> <li><strong>Prostate Cancer Foundation NZ:</strong> Provides support groups throughout New Zealand</li> <li><strong>District Health Board Services:</strong> Including:
<ul class="list-disc pl-6 mt-2"> <li>Dietitians - for nutrition advice during treatment</li> <li>Social Workers - for psychosocial support and financial assistance</li> <li>Occupational Therapists - to help maintain independence</li> <li>Physiotherapists - to assist with mobility and exercise programs</li> <li>Cancer Psychological and Social Support Service - specialist support</li> </ul> </li> <li><strong>Leukaemia & Blood Cancer NZ:</strong> Also provides resources and support for some prostate cancer patients</li> </ul> <h3 class="font-semibold text-lg mt-6">Practical Support</h3> <ul class="list-disc pl-6 space-y-2"> <li><strong>Financial Assistance:</strong> Work and Income New Zealand (0800 559 009) may provide financial assistance for those unable to work</li> <li><strong>Travel & Accommodation:</strong> The National Travel Assistance programme helps with travel and accommodation costs for treatment</li> <li><strong>Cancer Society Accommodation:</strong> May be able to assist with accommodation for those traveling to Christchurch for treatment</li> <li><strong>Home Support Services:</strong> Available through DHB referrals</li> </ul> <p>For immediate concerns during treatment, you can contact the oncology department at (03) 364 0020 to speak with a nurse 24 hours a day.</p> </div> ` })} ${renderComponent($$result2, "Accordion", $$Accordion, { "title": "Living with Stage 4 Prostate Cancer" }, { "default": ($$result3) => renderTemplate` <div class="space-y-4"> <h3 class="font-semibold text-lg">Day-to-Day Life</h3> <p>While Stage 4 prostate cancer requires ongoing management, many men maintain good quality of life:</p> <ul class="list-disc pl-6 space-y-2"> <li>Continue normal activities as much as you feel able</li> <li>Any amount of activity, no matter how small, can help maintain strength</li> <li>Maintain good nutrition and hydration</li> <li>Take medications as prescribed</li> <li>Report any unusual symptoms promptly</li> <li>Accept help from others when needed</li> </ul> <h3 class="font-semibold text-lg mt-6">Family Involvement</h3> <p>Communication with family is important:</p> <ul class="list-disc pl-6 space-y-2"> <li>Consider bringing a family member to appointments to help remember information</li> <li>Discuss your care preferences with those close to you</li> <li>If you have children, age-appropriate information can help them understand</li> <li>Family members can also access support services</li> </ul> <h3 class="font-semibold text-lg mt-6">Medical Care</h3> <p>Ongoing medical management includes:</p> <ul class="list-disc pl-6 space-y-2"> <li>Regular PSA testing to monitor treatment response</li> <li>Scheduled appointments with your oncology team</li> <li>Additional blood tests to monitor treatment effects</li> <li>Regular assessments for any new symptoms</li> <li>Possible adjustments to treatment as needed</li> </ul> </div> ` })} ${renderComponent($$result2, "Accordion", $$Accordion, { "title": "When to Contact Your Medical Team" }, { "default": ($$result3) => renderTemplate` <div class="space-y-4"> <p>Contact the Oncology Service immediately (24 hours) if:</p> <ul class="list-disc pl-6 space-y-2"> <li>You begin to feel unwell or are unexpectedly unwell</li> <li>You start to feel muddled or confused</li> <li>Your temperature is 38°C or more</li> <li>Your temperature is less than 35.5°C</li> <li>You have uncontrolled shaking or shivering</li> <li>You have large and/or frequent diarrhoea/loose bowel motions</li> <li>You have chest heaviness/tightness or chest pain</li> <li>You notice any bleeding or unusual bruising</li> <li>You have sensory changes (numbness, tingling) that are worsening</li> </ul> <p>If you experience chest discomfort of any sort and/or difficulty breathing, call an ambulance immediately as this is a medical emergency.</p> <p>You can reach the Canterbury Regional Cancer and Haematology Service at (03) 364 0020 to talk to a nurse 24 hours a day. Similar services are available at other regional cancer centers throughout New Zealand.</p> </div> ` })} ${renderComponent($$result2, "Accordion", $$Accordion, { "title": "New Zealand Medical Resources" }, { "default": ($$result3) => renderTemplate` <div class="space-y-4"> <p>Reliable New Zealand-specific resources for Stage 4 prostate cancer:</p> <ul class="list-disc pl-6 space-y-2"> <li><a href="https://www.health.govt.nz/" class="text-blue-600 hover:underline" target="_blank">Ministry of Health</a></li> <li><a href="https://www.cdhb.health.nz/hospitals-health-facilities/christchurch-hospital/canterbury-regional-cancer-and-haematology-service/" class="text-blue-600 hover:underline" target="_blank">Canterbury Regional Cancer and Haematology Service</a></li> <li><a href="https://www.cancernz.org.nz/" class="text-blue-600 hover:underline" target="_blank">Cancer Society of New Zealand</a></li> <li><a href="https://prostate.org.nz/" class="text-blue-600 hover:underline" target="_blank">Prostate Cancer Foundation NZ</a></li> <li><a href="https://www.healthinfo.org.nz/" class="text-blue-600 hover:underline" target="_blank">HealthInfo</a> - For Canterbury-specific health information</li> <li><a href="https://www.leukaemia.org.nz/" class="text-blue-600 hover:underline" target="_blank">Leukaemia & Blood Cancer NZ</a></li> <li><a href="https://www.workandincome.govt.nz/" class="text-blue-600 hover:underline" target="_blank">Work and Income New Zealand</a></li> </ul> <p>For concerns about treatment side effects, contact your oncology team at any time by telephoning (03) 364 0020 (Canterbury) or your local cancer center.</p> </div> ` })} </div> </div> <!-- Call to action section for other stages --> <section class="my-12"> <h2 class="text-2xl font-bold text-center mb-6">Explore Cancer Stages</h2> <div class="flex justify-center gap-4 mb-6 flex-wrap"> <a href="/stage-0" class="min-w-[150px] p-4 border text-white bg-blue rounded-lg text-center font-medium hover:bg-green transition-colors">Stage 0</a> <a href="/stage-1" class="min-w-[150px] p-4 border text-white bg-blue rounded-lg text-center font-medium hover:bg-green transition-colors">Stage 1</a> <a href="/stage-2" class="min-w-[150px] p-4 border text-white bg-blue rounded-lg text-center font-medium hover:bg-green transition-colors">Stage 2</a> <a href="/stage-3" class="min-w-[150px] p-4 border text-white bg-blue rounded-lg text-center font-medium hover:bg-green transition-colors">Stage 3</a> </div> <div class="flex justify-center mt-4"> <a href="/family-support" class="min-w-[200px] p-4 border text-white bg-blue rounded-lg text-center font-medium hover:bg-green transition-colors">Family Member Resources</a> </div> </section> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/src/pages/stage-4.astro", void 0);

const $$file = "C:/Users/Adrian/OneDrive - Ara Institute of Canterbury/Desktop/BCDE311_SoftwareDevProject/Ass2/prostate-hub/src/pages/stage-4.astro";
const $$url = "/stage-4.html";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Stage4,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
