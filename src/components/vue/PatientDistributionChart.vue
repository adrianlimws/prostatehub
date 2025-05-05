<script setup>
import { ref, onMounted, watch } from 'vue';
import * as d3 from 'd3';

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  }
});

const chartRef = ref(null);

const renderChart = () => {
  if (!chartRef.value) return;
  
  // Clear any existing charts
  d3.select(chartRef.value).selectAll("*").remove();
  
  // Create SVG
  const width = 280;
  const height = 350;
  const radius = Math.min(width, height) / 2 * 1;
  
  const svg = d3.select(chartRef.value)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`);
  
  // Data
  const data = [
    { category: props.label, value: props.percentage },
    { category: 'Other', value: 100 - props.percentage }
  ];
  
  // Color scale
  const color = d3.scaleOrdinal()
    .domain(data.map(d => d.category))
    .range(['#324Ea2', '#d3d3d3']);
  
  // Pie generator
  const pie = d3.pie()
    .value(d => d.value)
    .sort(null);
  
  // Arc generator
  const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);
  
  // Smaller arc for labels
  const labelArc = d3.arc()
    .innerRadius(radius * 0.6)
    .outerRadius(radius * 0.6);
  
  // Add pie chart
  const arcs = svg.selectAll('.arc')
    .data(pie(data))
    .enter()
    .append('g')
    .attr('class', 'arc');
  
  arcs.append('path')
    .attr('d', arc)
    .attr('fill', d => color(d.data.category));
  
  // Add title
  svg.append('text')
    .attr('y', -height/2 + 12)
    .attr('text-anchor', 'middle')
    .style('font-size', '14px')
    .style('font-weight', 'bold')
    .text('Patient Distribution');
  
  // Add labels only for the first segment (our focus segment)
  arcs.filter((d, i) => i === 0)
    .append('text')
    .attr('transform', d => `translate(${labelArc.centroid(d)})`)
    .attr('text-anchor', 'middle')
    .style('font-size', '12px')
    .style('font-weight', 'bold')
    .style('fill', '#fff')
    .text(d => `${d.data.value}%`);
};

onMounted(renderChart);
watch(() => [props.label, props.percentage], renderChart);
</script>

<template> 
  <div ref="chartRef" class="w-full flex items-center justify-center"></div>
</template>