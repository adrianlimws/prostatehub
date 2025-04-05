<script setup>
import { ref, onMounted, watch } from 'vue';
import * as d3 from 'd3';

const props = defineProps({
  stage: {
    type: String,
    required: true
  }
});

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
</script>

<template>
  <div ref="chartRef" class="w-full h-32 flex items-center justify-center"></div>
</template>