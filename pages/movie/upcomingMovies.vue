<script setup>
import MovieListPage from '../components/general/listPage.vue';

const genres = { action: '28', comedy: '35', drama: '18', crime: '80' };
</script>

<template>
  <MovieListPage
    media-type="movie"
    page-title="Upcoming"
    sort-field="popularity"
    :upcoming="true"
    :genres="genres"
  />
</template>
