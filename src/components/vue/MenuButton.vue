<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <div class="relative rounded-sm p-2 text-white bg-blue-500 hover:bg-blue">
    <button @click="toggleMenu" class="font-bold">
      MENU
    </button>
    
    <!-- Fixed overlay when menu is open -->
    <div v-if="isMenuOpen" class="fixed inset-0 z-40" @click="toggleMenu"></div>

    <!-- Sliding menu panel -->
    <div 
      class="fixed top-0 right-0 h-full w-64 bg-blue border-l border-blue shadow-lg z-50 transform transition-transform duration-300 ease-in-out"
      :class="isMenuOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <div class="flex justify-between items-center p-4 border-b border-blue">
        <span class="text-white font-bold">Menu</span>
        <button @click="toggleMenu" class="font-bold text-3xl">&times;</button>
      </div>
      <ul>
        <li><a href="/"               class="block p-3 text-white hover:bg-blue-500">Home</a></li>
        <li><a href="/stage-0"        class="block p-3 text-white hover:bg-blue-500">Stage 0</a></li>
        <li><a href="/stage-1"        class="block p-3 text-white hover:bg-blue-500">Stage 1</a></li>
        <li><a href="/stage-2"        class="block p-3 text-white hover:bg-blue-500">Stage 2</a></li>
        <li><a href="/stage-3"        class="block p-3 text-white hover:bg-blue-500">Stage 3</a></li>
        <li><a href="/stage-4"        class="block p-3 text-white hover:bg-blue-500">Stage 4</a></li>
        <li><a href="/family-member"  class="block p-3 text-white hover:bg-blue-500">Family Support</a></li>
        <li><a href="/studies"        class="block p-3 text-white hover:bg-blue-500">Studies</a></li>
        <li><a href="/support-groups" class="block p-3 text-white hover:bg-blue-500">Support Groups</a></li>
        <li><a href="/forum"          class="block p-3 text-white hover:bg-blue-500">PFNZ Forum</a></li>
        <li><a href="/donation"       class="block p-3 text-white hover:bg-blue-500">PFNZ Donation</a></li>
      </ul>
    </div>
  </div>
</template>