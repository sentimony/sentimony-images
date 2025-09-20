// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon', '@nuxtjs/google-fonts'],
  googleFonts: {
    families: {
      'Julius Sans One': true,
      'Montserrat': [400, 500, 600, 700]
    }
  },
  nitro: {
    preset: 'netlify'
  },
  vite: {
    server: {
      fs: {
        allow: [
          process.cwd(),
          process.cwd() + '/../..',  // Allow parent directories for shared node_modules
        ]
      }
    }
  }
})
