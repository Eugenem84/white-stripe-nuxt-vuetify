// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['vuetify/styles',
        '@mdi/font/css/materialdesignicons.css'],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    }
  },
  vuetify: {
    icons: {
      defaultSet: 'mdi',
      sets: {
        mdi: {
          component: 'mdi'
        }
      }
    }
  }
})
