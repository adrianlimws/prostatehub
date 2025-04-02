<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <div class="relative rounded-sm border-1 p-2">
    <button @click="toggleMenu" class="font-bold">
      MENU
    </button>
    
    <div v-if="isMenuOpen" class="absolute right-0 mt-2 w-48 bg-blue border border-blue-200 rounded shadow-lg z-20">
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