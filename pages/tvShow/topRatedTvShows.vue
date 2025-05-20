<script setup>
import MediaListPage from '../components/general/listPage.vue';

const genres = { action: '28', comedy: '35', drama: '18', crime: '80' };
</script>

<template>
  <MediaListPage
    media-type="tv"
    page-title="Top Rated TV Shows"
    sort-field="vote_average"
    :min-vote-count="200"
    :genres="genres"
  />
</template>