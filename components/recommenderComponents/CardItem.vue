<script>
import { useStore } from '/stores/store.js';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const isFavorite = computed(() => store.isFavorite(props.item));

    const toggleFavorite = () => {
      store.toggleFavorite(props.item);
    };

    const getImageUrl = () => {
      return `https://image.tmdb.org/t/p/w220_and_h330_face/${props.item.poster_path}`;
    };

    return { isFavorite, toggleFavorite, getImageUrl };
  },
});
</script>

<template>
  <div class="relative w-64 p-2 mt-4" >
    <div class="relative">
        <img class="object-cover w-full h-[360px] mb-4 rounded-xl" :src="getImageUrl()" :alt="`Poster of ${item.title}`" />
        <div class="flex justify-center items-center-safe w-12 h-12 -bottom-5 left-0 absolute p-2 rounded-full border-4 border-[#00ff80] z-10 text-center text-s font-bold text-white bg-[#092d36]">
            {{ item.vote_average.toFixed(1) * 10 }} <span class="text-[10px] font-bold">%</span>
        </div>
    </div>
    <div class="text-lg font-semibold text-left text-gray-800">
      {{ item.title || item.name}}
    </div>
    <div class="text-left text-gray-500 text-m">
      {{ item.release_date || item.first_air_date }}
    </div>
    <button @click.stop="toggleFavorite" class="absolute top-0 left-4 cursor-pointer flex items-center justify-center mt-4 mx-auto w-10 h-10 rounded-full bg-[#f0f0f080]">
      <font-awesome-icon 
        :icon="[isFavorite ? 'fas' : 'far', 'heart']"
        class="text-xl text-pink-700"
      />
    </button>
  </div>
</template>