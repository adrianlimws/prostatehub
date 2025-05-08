<!-- src/components/vue/TextResizer.vue -->
<script setup>
import { ref, onMounted } from 'vue';

// Font size options with descriptive labels
const fontSizes = [
  { label: 'A', size: 'normal', description: 'Normal' },
  { label: 'A', size: 'large', description: 'Large' },
  { label: 'A', size: 'x-large', description: 'Extra Large' }
];

// Current font size state
const currentSize = ref('normal');

// Apply font size class to document
const applyFontSize = (size) => {
  // Remove all existing font size classes
  document.documentElement.classList.remove('font-size-normal', 'font-size-large', 'font-size-x-large');
  
  // Add selected font size class
  document.documentElement.classList.add(`font-size-${size}`);
  
  // Save preference to localStorage
  localStorage.setItem('preferredFontSize', size);
  
  // Update current size
  currentSize.value = size;
  
  // Announce change to screen readers
  const announcement = document.getElementById('text-size-announcement');
  if (announcement) {
    announcement.textContent = `Text size changed to ${
      fontSizes.find(option => option.size === size).description
    }`;
  }
};

// On component mount, check for saved preference
onMounted(() => {
  const savedSize = localStorage.getItem('preferredFontSize');
  if (savedSize) {
    applyFontSize(savedSize);
  } else {
    applyFontSize('normal');
  }
});
</script>

<template>
  <div class="text-resizer mr-16 md:mr-0">
    <div class="text-resizer-inner">
      <span class="text-resizer-label">Text Size:</span>
      <div class="text-resizer-controls">
        <button
          v-for="(option, index) in fontSizes"
          :key="option.size"
          @click="applyFontSize(option.size)"
          :class="[
            'text-resize-btn',
            { 'text-resize-btn-active': currentSize === option.size }
          ]"
          :aria-label="`Set text size to ${option.description}`"
          :title="`${option.description} text`"
        >
          <span :style="{
            fontSize: index === 0 ? '14px' : index === 1 ? '18px' : '22px',
            fontWeight: currentSize === option.size ? 'bold' : 'normal'
          }">{{ option.label }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-resizer {
  position: fixed;
  top: 80px;
  right: 16px;
  z-index: 40;
  transition: all 0.3s ease;
}

/* Mobile positioning for text resizer */
@media (max-width: 768px) {
  .text-resizer {
    top: auto;
    bottom: 16px;
    right: 16px;
  }
}

.text-resizer-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 0.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.text-resizer-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.text-resizer-controls {
  display: flex;
  gap: 0.25rem;
}

.text-resize-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 0.25rem;
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.2s ease;
}

.text-resize-btn:hover {
  background-color: #e5e7eb;
}

.text-resize-btn-active {
  background-color: #324ea2;
  color: white;
  border-color: #324ea2;
}

.text-resize-btn:focus-visible {
  outline: 2px solid #324ea2;
  outline-offset: 2px;
}
</style>