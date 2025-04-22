import { defineStore } from 'pinia';

export const useStore = defineStore('main', {
    state: () => ({
        favoriteItems: JSON.parse(localStorage.getItem('favoriteItems')) ?? [],
    }),
    actions: {
        toggleFavorite(movie) {
            const index = this.favoriteItems.findIndex(item => item.id === movie.id);

            if (index === -1) {
                this.favoriteItems.push(movie);
            } else {
                this.favoriteItems.splice(index, 1);
            }

            localStorage.setItem('favoriteItems', JSON.stringify(this.favoriteItems));
        }
    },
    getters: {
        isFavorite(state) {
            return (movie) => state.favoriteItems.some(item => item.id === movie.id);
        }
    },
    persist: true
});