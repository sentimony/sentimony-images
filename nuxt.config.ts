// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  site: {
    url: 'https://content.sentimony.com',
    name: 'Sentimony Keeper',
  },
  app: {
    head: {
      titleTemplate: '%s · Sentimony Keeper',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ]
    }
  },
  nitro: {
    preset: 'netlify'
  },
  ssr: true,
  routeRules: {
    '/': { isr: 86400 },
    '/svg-icons': { isr: 86400 },
    '/releases': { isr: 86400 },
    '/artists': { isr: 86400 },
    '/playlists': { isr: 86400 },
    '/videos': { isr: 86400 },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxt/icon',
    '@nuxt/image',
    'v-wave/nuxt',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    'nuxt-og-image',
  ],
  googleFonts: {
    families: {
      'Montserrat': {
        wght: [400],
      },
      'Julius Sans One': {
        wght: [400],
      },
    },
    display: 'swap',
    subsets: 'latin',
    prefetch: true,
    preconnect: true,
    preload: true,
    useStylesheet: true,
  },
  vWave: {
    // duration: 3,
    // color: 'radial-gradient(closest-side, #fff, #1cb884)',
    // initialOpacity: 0.7,
    // finalOpacity: 0.3,
    easing: 'cubic-bezier(0,.57,.89,0)'
  },
  sitemap: {
    enabled: !process.env.URL?.includes('stage') && process.env.CONTEXT !== 'deploy-preview',
    autoLastmod: true,
    discoverImages: false,
    discoverVideos: false,
  },
  ogImage: {
    enabled: true,
    fonts: [
      'Inter:400',
      'Inter:700'
    ]
  },
})
