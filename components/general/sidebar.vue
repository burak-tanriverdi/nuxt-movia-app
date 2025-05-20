<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  pageTitle: String,
  selectedSort: String,
  selectedFilter: String,
  genres: Object
});

const emit = defineEmits(['update-sort', 'update-filter']);
const sortValue = ref(props.selectedSort);
const filterValue = ref(props.selectedFilter);

watch(sortValue, (newVal) => {
  emit('update-sort', newVal);
});

watch(filterValue, (newVal) => {
  emit('update-filter', newVal);
});

const { pageTitle, genres } = props;
</script>

<template>
  <div class="flex flex-col flex-1 w-full gap-5 p-5 max-w-96">
    <div class="text-2xl whitespace-nowrap">{{ pageTitle }}</div>

    <div class="flex flex-col gap-2 p-5 border-2 border-gray-400 rounded-lg shadow-lg">
      <div class="text-2xl whitespace-nowrap">Sort</div>
      <hr />
      <span>Sort Results By</span>
      <select v-model="sortValue" class="p-2 bg-gray-300 rounded-md cursor-pointer" name="sorting">
        <option value="desc">Popularity Descending</option>
        <option value="asc">Popularity Ascending</option>
      </select>
    </div>

    <div class="flex flex-col gap-2 p-5 border-2 border-gray-400 rounded-lg shadow-lg">
      <div class="text-2xl whitespace-nowrap">Filter</div>
      <hr />
      <span>Filter Results By</span>
      <select v-model="filterValue" class="p-2 bg-gray-300 rounded-md cursor-pointer" name="genre">
        <option :value="genres.drama">Drama Genre</option>
        <option :value="genres.action">Action Genre</option>
        <option :value="genres.comedy">Comedy Genre</option>
        <option :value="genres.crime">Crime Genre</option>
      </select>
    </div>
  </div>
</template>
