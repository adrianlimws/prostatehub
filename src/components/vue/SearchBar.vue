<script setup>
import { ref } from 'vue';

const searchQuery = ref('');
const searchResults = ref([]);

const searchData = [
  { title: 'Stage 1 Information', url: '/stage-1' },
  { title: 'Stage 2 Treatment Options', url: '/stage-2' },
  { title: 'Stage 3 Support', url: '/stage-3' },
  { title: 'Stage 4 Resources', url: '/stage-4' },
  { title: 'Family Support', url: '/family-member' },
  { title: 'Kegel Exercises', url: '/studies/kegel' },
  { title: 'Nutrition Guide', url: '/studies/food' }
];

const performSearch = () => {
  if (searchQuery.value.length < 2) {
    searchResults.value = [];
    return;
  }
  
  searchResults.value = searchData.filter(item => 
    item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
};
</script>

<template>
  <div class="relative w-full">
    <input 
      type="text" 
      v-model="searchQuery" 
      @input="performSearch"
      placeholder="search bar" 
      class="w-full p-2 border border-gray-300 rounded"
    />
    
    <div 
      v-if="searchResults.length > 0" 
      class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-10"
    >
      <ul>
        <li v-for="result in searchResults" :key="result.url">
          <a 
            :href="result.url" 
            class="block p-2 hover:bg-gray-100"
          >
            {{ result.title }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>