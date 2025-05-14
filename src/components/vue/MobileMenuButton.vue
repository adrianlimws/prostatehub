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
    <!-- More professional menu button with icon -->
    <button 
      id="mobile-menu-button"
      @click="toggleMenu"
      class="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      aria-label="Main menu"
      :aria-expanded="isMenuOpen"
    >
      <!-- Hamburger icon when closed -->
      <svg 
        v-if="!isMenuOpen" 
        class="h-6 w-6" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
      
      <!-- X icon when open -->
      <svg 
        v-else 
        class="h-6 w-6" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    
    <!-- Enhanced mobile menu with improved styling -->
    <div 
      id="mobile-menu-content"
      v-show="isMenuOpen" 
      class="absolute top-full right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-50 overflow-hidden transition-all duration-200 ease-in-out border border-gray-200"
    >
      <!-- Stages section with color coding -->
      <div class="px-4 pt-4 pb-2">
        <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Stages</h3>
        <div class="mt-2 grid grid-cols-5 gap-1">
          <a 
            href="/stage-0" 
            class="flex justify-center items-center px-2 py-2 text-sm font-medium rounded-md transition-colors"
            :class="currentPath === '/stage-0' ? 'bg-teal-50 text-teal-700' : 'text-gray-700 hover:bg-gray-50'"
          >0</a>
          <a 
            href="/stage-1" 
            class="flex justify-center items-center px-2 py-2 text-sm font-medium rounded-md transition-colors"
            :class="currentPath === '/stage-1' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'"
          >1</a>
          <a 
            href="/stage-2" 
            class="flex justify-center items-center px-2 py-2 text-sm font-medium rounded-md transition-colors"
            :class="currentPath === '/stage-2' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'"
          >2</a>
          <a 
            href="/stage-3" 
            class="flex justify-center items-center px-2 py-2 text-sm font-medium rounded-md transition-colors"
            :class="currentPath === '/stage-3' ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-50'"
          >3</a>
          <a 
            href="/stage-4" 
            class="flex justify-center items-center px-2 py-2 text-sm font-medium rounded-md transition-colors"
            :class="currentPath === '/stage-4' ? 'bg-red-50 text-red-700' : 'text-gray-700 hover:bg-gray-50'"
          >4</a>
        </div>
      </div>
      
      <div class="border-t border-gray-200 my-1"></div>
      
      <!-- Main navigation -->
      <div class="py-1">
        <a 
          href="/" 
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          :class="{ 'bg-blue-50 text-blue-700 font-medium': currentPath === '/' }"
        >
          Home
        </a>
        <a 
          href="/family-support" 
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          :class="{ 'bg-blue-50 text-blue-700 font-medium': currentPath === '/family-support' }"
        >
          Family Support
        </a>
        <a 
          href="/studies" 
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          :class="{ 'bg-blue-50 text-blue-700 font-medium': currentPath === '/studies' }"
        >
          Studies
        </a>
        <a 
          href="/support-groups" 
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          :class="{ 'bg-blue-50 text-blue-700 font-medium': currentPath === '/support-groups' }"
        >
          Support Groups
        </a>
      </div>
      
      <div class="border-t border-gray-200 my-1"></div>
      
      <!-- External links -->
      <div class="bg-gray-50 py-2">
        <h3 class="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">External Resources</h3>
        <a 
          href="https://prostatecancernz.ning.com/" 
          target="_blank" 
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <div class="flex items-center">
            <span>PCNZ Forum</span>
            <svg class="ml-1 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          </div>
        </a>
        <a 
          href="https://prostate.org.nz/donations" 
          target="_blank" 
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <div class="flex items-center">
            <span>PFNZ Donation</span>
            <svg class="ml-1 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>