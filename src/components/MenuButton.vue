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
        <li><a href="/stage1" class="block p-3 hover:bg-gray-100">Stage 1</a></li>
        <li><a href="/stage2" class="block p-3 hover:bg-gray-100">Stage 2</a></li>
        <li><a href="/stage3" class="block p-3 hover:bg-gray-100">Stage 3</a></li>
        <li><a href="/stage4" class="block p-3 hover:bg-gray-100">Stage 4</a></li>
        <li><a href="/support-groups" class="block p-3 hover:bg-gray-100">Support Groups</a></li>
        <li><a href="/resources" class="block p-3 hover:bg-gray-100">Resources</a></li>
        <li><a href="/contact" class="block p-3 hover:bg-gray-100">Contact</a></li>
      </ul>
    </div>
  </div>
</template>