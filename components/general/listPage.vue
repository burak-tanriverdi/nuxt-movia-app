<script setup>
import { ref, watch, computed } from 'vue';
import Header from '../components/Header.vue';
import SideBarView from '../components/general/sidebar.vue';
import CategoryPageLayout from '../components/general/categoryPageLayout.vue';
import { useFetch } from '../helpers/fetch';

const props = defineProps({
  mediaType:     { type: String,   required: true, validator: v => ['movie','tv'].includes(v) },
  pageTitle:     { type: String,   required: true },
  sortField:     { type: String,   default: 'popularity' },
  upcoming:      { type: Boolean,  default: false },
  minVoteCount:  { type: Number,   default: 0 },
  genres:        { type: Object,   required: true },
});

const movies = ref([]);
const selectedSort   = ref('desc');
const selectedFilter = ref(Object.values(props.genres)[0]);

const endpoint = computed(() => {
  const base = `https://api.themoviedb.org/3/discover/${props.mediaType}`;
  const params = new URLSearchParams({
    api_key:        '348088421ad3fb3a9d6e56bb6a9a8f80',
    language:       'en-US',
    page:           '1',
    sort_by:        `${props.sortField}.${selectedSort.value}`,
    with_genres:    selectedFilter.value,
  });

  if (props.upcoming) {
    const now = new Date();
    now.setDate(now.getDate() + 10);
    params.append('release_date.gte', now.toISOString().split('T')[0]);
  }

  if (props.minVoteCount > 0) {
    params.append('vote_count.gte', String(props.minVoteCount));
  }

  return `${base}?${params.toString()}`;
});

const fetchItems = async () => {
  movies.value = await useFetch(endpoint.value);
};

watch([selectedSort, selectedFilter], fetchItems, { immediate: true });
</script>

<template>
  <Header />

  <div class="flex flex-row p-5">
    <SideBarView
      :genres="genres"
      :page-title="pageTitle"
      :selected-sort="selectedSort"
      :selected-filter="selectedFilter"
      @update-sort="val => selectedSort.value = val"
      @update-filter="val => selectedFilter.value = val"
    />

    <CategoryPageLayout :movies="movies" />
  </div>
</template>