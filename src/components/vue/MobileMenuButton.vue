<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

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
</script>

<template>
  <div class="relative">
    <button 
      id="mobile-menu-button"
      @click="toggleMenu"
      class="p-7 bg-blue hover:bg-green text-white font-bold transition-colors"
      aria-label="Toggle mobile menu"
      aria-expanded="isMenuOpen"
    >
      MENU
    </button>
    
    <!-- Dropdown menu with improved positioning -->
    <div 
      id="mobile-menu-content"
      v-show="isMenuOpen" 
      class="absolute top-full right-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-[80vh] overflow-y-auto"
    >
      <div class="py-1">
        <a 
          v-for="(item, index) in [
            { path: '/', label: 'Home' },
            { path: '/stage-0', label: 'Stage 0' },
            { path: '/stage-1', label: 'Stage 1' },
            { path: '/stage-2', label: 'Stage 2' },
            { path: '/stage-3', label: 'Stage 3' },
            { path: '/stage-4', label: 'Stage 4' },
            { path: '/family-support', label: 'Family Support' },
            { path: '/studies', label: 'Studies' },
            { path: '/support-groups', label: 'Support Groups' }
          ]" 
          :key="index"
          :href="item.path"
          class="block px-4 py-3 hover:bg-green hover:text-white transition-colors text-base"
          :class="{ 'bg-green text-white font-bold': currentPath === item.path }"
        >
          {{ item.label }}
        </a>
        <div class="border-t border-gray-200 my-1"></div>
        <a href="https://prostate.org.nz/online-forum" target="_blank" class="block px-4 py-3 hover:bg-green hover:text-white transition-colors text-base">PFNZ Forum</a>
        <a href="https://prostate.org.nz/donations" target="_blank" class="block px-4 py-3 hover:bg-green hover:text-white transition-colors text-base">PFNZ Donation</a>
      </div>
    </div>
  </div>
</template>