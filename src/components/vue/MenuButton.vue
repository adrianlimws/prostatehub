<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <div class="relative rounded-sm p-2 bg-blue hover:bg-green">
    <button @click="toggleMenu" class="text-white font-bold">
      MENU
    </button>
    
    <!-- Fixed overlay when menu is open -->
    <div v-if="isMenuOpen" class="fixed inset-0 z-40" @click="toggleMenu"></div>

    <!-- Sliding menu panel -->
    <div 
      class="fixed top-0 right-0 h-full w-64 bg-fuchsia border-l border-black z-50 transform transition-transform duration-300 ease-in-out font-mono text-lg"
      :class="isMenuOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <div class="flex justify-between items-center p-4 border-b-2 border-black">
        <span class="font-bold">Menu</span>
        <button @click="toggleMenu" class="font-bold text-3xl hover:animate-spin">&times;</button>
      </div>
      <ul>
        <li><a href="/"               class="block p-3 hover:bg-green hover:text-white transition">Home</a></li>
        <li><a href="/stage-0"        class="block p-3 hover:bg-green hover:text-white transition">Stage 0</a></li>
        <li><a href="/stage-1"        class="block p-3 hover:bg-green hover:text-white transition">Stage 1</a></li>
        <li><a href="/stage-2"        class="block p-3 hover:bg-green hover:text-white transition">Stage 2</a></li>
        <li><a href="/stage-3"        class="block p-3 hover:bg-green hover:text-white transition">Stage 3</a></li>
        <li><a href="/stage-4"        class="block p-3 hover:bg-green hover:text-white transition">Stage 4</a></li>
        <li><a href="/family-support" class="block p-3 hover:bg-green hover:text-white transition">Family Support</a></li>
        <li><a href="/studies"        class="block p-3 hover:bg-green hover:text-white transition">Studies</a></li>
        <li><a href="/support-groups" class="block p-3 hover:bg-green hover:text-white transition">Support Groups</a></li> 
        <li><a href="https://prostate.org.nz/online-forum" target="_blank" class="block p-3 hover:bg-green hover:text-white transition">PFNZ Forum</a></li> 
        <li><a href="https://prostate.org.nz/donations" target="_blank" class="block p-3 hover:bg-green hover:text-white transition">PFNZ Donation</a></li>
      </ul>
    </div>
  </div>
</template>