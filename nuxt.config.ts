export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vesp/nuxt-fontawesome',
  ],
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  compatibilityDate: '2025-01-15',
});