<script setup lang="ts">
import { defineProps } from 'vue'
import CardItem from '../recommenderComponents/CardItem.vue'

interface Movie {
  id: number | string
  poster_path: string
  vote_average: number
  title?: string
  name?: string
  release_date?: string
  first_air_date?: string
}

const { movies } = defineProps<{ movies: Movie[] }>()
</script>

<template>
  <div class="flex flex-wrap justify-between p-5 content-wrapper">
    <CardItem
      v-for="movie in movies"
      :key="movie.id"
      :item="movie"
    />
  </div>
</template>