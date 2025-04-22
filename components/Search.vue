<script setup>
import { ref, watch, onMounted } from 'vue'
import { useDebounceFn } from '../composables/useDebounceFN'
import CardItem from './recommenderComponents/CardItem.vue'

const loading     = ref(false)
const searchTerm  = ref('')
const movies      = ref([])

const API_KEY     = '348088421ad3fb3a9d6e56bb6a9a8f80'
const MIN_LOADING_MS = 600;

async function withMinLoading(task) {
  loading.value = true
  const t0 = performance.now()

  await task()

  const elapsed = performance.now() - t0
  if (elapsed < MIN_LOADING_MS) {
    await new Promise(res => setTimeout(res, MIN_LOADING_MS - elapsed))
  }
  loading.value = false
}

async function fetchMoviesByQuery(query) {
  const url = `https://api.themoviedb.org/3/search/movie` +
              `?api_key=${API_KEY}` +
              `&query=${encodeURIComponent(query)}` +
              `&include_adult=false&language=en-US&page=1`
  const res  = await fetch(url)
  const json = await res.json()
  movies.value = json.results || []
}

async function fetchPopularMovies() {
  const url = `https://api.themoviedb.org/3/movie/popular` +
              `?api_key=${API_KEY}` +
              `&language=en-US&page=1`
  const res  = await fetch(url)
  const json = await res.json()
  movies.value = json.results || []
}

const doSearch = async term => {
  if (term.length >= 3) {
    await withMinLoading(() => fetchMoviesByQuery(term))
  } else if (term.length === 0) {
    await withMinLoading(fetchPopularMovies)
  }
}

const debouncedSearch = useDebounceFn(doSearch, 500)

watch(searchTerm, newTerm => debouncedSearch(newTerm))

onMounted(() => withMinLoading(fetchPopularMovies))
</script>

<template>
  <section class="h-[600px] w-full bg-cover">
    <div class="container flex flex-col justify-center h-full mx-auto text-white">
      <div class="flex flex-col">
        <h2 class="text-6xl font-semibold">Welcome.</h2>
        <h3 class="text-4xl font-semibold">
          Millions of movies, TV shows and people to discover. Explore now.
        </h3>
      </div>

      <div class="relative mt-16">
        <label class="w-full inner_search_wrapper">
          <input
            v-model="searchTerm"
            class="bg-white text-black w-full py-4 h-12 px-8 rounded-full placeholder:text-[#8997AB] placeholder:text-xl text-xl"
            type="text"
            placeholder="Search for a movie, tv show, person..."
            autocorrect="off"
            autocomplete="off"
            spellcheck="false"
          />
        </label>
        <input
          type="submit"
          value="Search"
          class="absolute right-0 h-full px-8 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-500"
        />
      </div>
    </div>
  </section>

  <div
    v-if="searchTerm.length >= 3 && loading"
    class="flex justify-center items-center py-8 h-[500px] w-full"
  >
    <svg class="animate-spin h-24 w-24 text-[#032540]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  </div>

  <div
  class="container py-8 m-auto"
    v-else-if="searchTerm.length >= 3 && !loading"
  >
    <div class="text-xl font-semibold border-b-2 w-max"> Search Results: </div>
    <div
        class="flex relative overflow-x-scroll h-[550px] w-full"
    >
        <div class="flex">
        <CardItem v-for="item in movies" :key="item.id" :item="item" />
        </div>
    </div>
</div>
</template>

<style scoped>
section {
  background-image: image-set(
    url(https://media.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter\(duotone,00192f,00baff\)/46FRuCeAn6TrS4F1P4F9zhyCpyo.jpg) 1x,
    url(https://media.themoviedb.org/t/p/w3840_and_h1200_multi_faces_filter\(duotone,00192f,00baff\)/46FRuCeAn6TrS4F1P4F9zhyCpyo.jpg) 2x
  );
}
</style>
