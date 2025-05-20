<script setup>
import MediaListPage from '../components/general/listPage.vue';

const genres = { action: '28', comedy: '35', drama: '18', crime: '80' };
</script>

<template>
  <MediaListPage
    media-type="tv"
    page-title="Upcoming TV Shows"
    sort-field="popularity"
    upcoming
    :genres="genres"
  />
</template>