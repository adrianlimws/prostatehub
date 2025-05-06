<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isMenuOpen = ref(false);
const currentPath = ref('');

onMounted(() => {
  currentPath.value = window.location.pathname;
  
  // Close menu when clicking outside
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
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
</script>

<template>
  <div class="relative">
    <button 
      id="mobile-menu-button"
      @click="toggleMenu"
      class="p-7 bg-blue hover:bg-green text-white font-bold"
    >
      MENU
    </button>
    
    <!-- Dropdown menu -->
    <div 
      id="mobile-menu-content"
      v-show="isMenuOpen" 
      class="absolute top-full right-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50"
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
          class="block px-4 py-2 hover:bg-green hover:text-white transition"
          :class="{ 'bg-green-100 text-green-800 font-bold': currentPath === item.path }"
        >
          {{ item.label }}
        </a>
        <div class="border-t border-gray-200 my-1"></div>
        <a href="https://prostate.org.nz/online-forum" target="_blank" class="block px-4 py-2 hover:bg-green hover:text-white transition">PFNZ Forum</a>
        <a href="https://prostate.org.nz/donations" target="_blank" class="block px-4 py-2 hover:bg-green hover:text-white transition">PFNZ Donation</a>
      </div>
    </div>
  </div>
</template>