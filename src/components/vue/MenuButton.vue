<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <div class="relative">
    <button @click="toggleMenu" class="font-bold">
      MENU
    </button>
    
    <div v-if="isMenuOpen" class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-20">
      <ul>
        <li><a href="/"               class="block p-3 hover:bg-gray-100">Home</a></li>
        <li><a href="/stage-0"        class="block p-3 hover:bg-gray-100">Stage 0</a></li>
        <li><a href="/stage-1"        class="block p-3 hover:bg-gray-100">Stage 1</a></li>
        <li><a href="/stage-2"        class="block p-3 hover:bg-gray-100">Stage 2</a></li>
        <li><a href="/stage-3"        class="block p-3 hover:bg-gray-100">Stage 3</a></li>
        <li><a href="/stage-4"        class="block p-3 hover:bg-gray-100">Stage 4</a></li>
        <li><a href="/family-member"  class="block p-3 hover:bg-gray-100">Family Support</a></li>
        <li><a href="/studies"        class="block p-3 hover:bg-gray-100">Studies</a></li>
        <li><a href="/support-groups" class="block p-3 hover:bg-gray-100">Support Groups</a></li>
        <li><a href="/forum"          class="block p-3 hover:bg-gray-100">PFNZ Forum</a></li>
        <li><a href="/donation"       class="block p-3 hover:bg-gray-100">PFNZ Donation</a></li>
      </ul>
    </div>
  </div>
</template>