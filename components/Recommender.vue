<template>
  <div class="container flex flex-col flex-wrap content-around h-full mx-auto mt-4">
    <div class="flex">
      <h2 class="mr-5 text-xl font-semibold">What's Popular</h2>
      <div class="flex items-center">
        <div class="relative flex w-64 h-10 border border-[#032540] rounded-full overflow-hidden cursor-pointer">
          <div
            class="absolute top-0 left-0 h-full w-1/2 bg-[#032540] rounded-full transition-transform duration-300"
            :class="currentSelection === 'movie-recommendation' ? 'translate-x-0' : 'translate-x-full'"
          ></div>
          <div
            class="relative flex-1 px-4 py-2 text-sm font-medium text-center transition-colors duration-300"
            :class="currentSelection === 'movie-recommendation' ? 'text-white' : 'text-[#2c4f6a]'"
            @click="fetchPopularMovies"
          >
            Movies
          </div>
          <div
            class="relative flex-1 px-4 py-2 text-sm font-medium text-center transition-colors duration-300"
            :class="currentSelection === 'tv-shows-recommendation' ? 'text-white' : 'text-[#2c4f6a]'"
            @click="fetchTopRatedTvShows"
          >
            TV Shows
          </div>
        </div>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-8 h-[500px] w-full">
      <svg class="animate-spin h-24 w-24 text-[#032540]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
      </svg>
    </div>

    <div v-else class="flex relative overflow-x-scroll h-[550px] w-full">
      <div class="flex">
        <CardItem v-for="item in items" :key="item.id" :item="item" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CardItem from './recommenderComponents/CardItem.vue'
import { useFetch } from '../helpers/fetch'

const loading = ref(false)
const items = ref([])
const currentSelection = ref('popular')

const movieRecommendationsEndpoint = `https://api.themoviedb.org/4/account/680118a3ef5ae687cbd9eed4/movie/recommendations?page=1&language=en-US`
const tvRecommendationsEndpoint = `https://api.themoviedb.org/4/account/680118a3ef5ae687cbd9eed4/tv/recommendations?page=1&language=en-US`

const MIN_LOADING_MS = 600;

async function fetchWithMinLoading(endpoint, selectionKey) {
  currentSelection.value = selectionKey
  loading.value = true

  const start = performance.now()
  items.value = await useFetch(endpoint)
  const elapsed = performance.now() - start

  if (elapsed < MIN_LOADING_MS) {
    await new Promise(resolve => setTimeout(resolve, MIN_LOADING_MS - elapsed))
  }

  loading.value = false
}

const fetchPopularMovies = () =>
  fetchWithMinLoading(movieRecommendationsEndpoint, 'movie-recommendation')

const fetchTopRatedTvShows = () =>
  fetchWithMinLoading(tvRecommendationsEndpoint, 'tv-shows-recommendation')

onMounted(fetchPopularMovies)
</script>