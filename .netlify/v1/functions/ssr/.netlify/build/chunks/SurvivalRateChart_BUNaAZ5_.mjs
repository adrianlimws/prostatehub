import { useSSRContext, ref, onMounted, watch, mergeProps } from 'vue';
import * as d3 from 'd3';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _export_sfc } from './Footer_ALxlLuMb.mjs';

const _sfc_main = {
  __name: 'SurvivalRateChart',
  props: {
  stage: {
    type: String,
    required: true
  },
  survivalRate: {
    type: Number,
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
  const width = 350;
  const height = 220;
  const margin = { top: 50, right: 30, bottom: 40, left: 40 };
  
  const svg = d3.select(chartRef.value)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);
  
  // Data preparation
  const data = [
    { stage: 'Stage ' + props.stage, rate: props.survivalRate },
    { stage: 'Reference', rate: 100 }
  ];
  
  // X scale
  const x = d3.scaleBand()
    .domain(data.map(d => d.stage))
    .range([0, width - margin.left - margin.right])
    .padding(0.2);
  
  // Y scale
  const y = d3.scaleLinear()
    .domain([0, 100])
    .range([height - margin.top - margin.bottom, 0]);
  
  // Add X axis
  svg.append('g')
    .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
    .call(d3.axisBottom(x))
    .selectAll('text')
    .style('text-anchor', 'middle');
  
  // Add Y axis
  svg.append('g')
    .call(d3.axisLeft(y).ticks(5).tickFormat(d => d + '%'));
  
  // Add title
  svg.append('text')
    .attr('x', (width - margin.left - margin.right) / 2)
    .attr('y', -20)
    .attr('text-anchor', 'middle')
    .style('font-size', '14px')
    .style('font-weight', 'bold')
    .text('5-Year Survival Rate');
  
  // Add bars
  svg.selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', d => x(d.stage))
    .attr('width', x.bandwidth())
    .attr('y', d => y(d.rate))
    .attr('height', d => height - margin.top - margin.bottom - y(d.rate))
    .attr('fill', (d, i) => i === 0 ? '#324Ea2' : '#d3d3d3');
  
  // Add labels on top of bars
  svg.selectAll('.label')
    .data(data)
    .enter()
    .append('text')
    .attr('class', 'label')
    .attr('x', d => x(d.stage) + x.bandwidth() / 2)
    .attr('y', d => y(d.rate) - 2)
    .attr('text-anchor', 'middle')
    .text(d => `${d.rate}%`)
    .style('font-size', '12px')
    .style('font-weight', 'bold');
};

onMounted(renderChart);
watch(() => [props.stage, props.survivalRate], renderChart);

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
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/vue/SurvivalRateChart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const SurvivalRateChart = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

export { SurvivalRateChart as S };
