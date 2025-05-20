<script setup>
import MovieListPage from '../components/general/listPage.vue';

const genres = { action: '28', comedy: '35', drama: '18', crime: '80' };
</script>

<template>
  <MovieListPage
    page-title="Top Rated"
    sort-field="vote_average"
    :genres="genres"
  />
</template>
