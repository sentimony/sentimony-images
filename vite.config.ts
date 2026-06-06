import { spawn } from 'node:child_process'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// Runs scripts/check-images.mjs right after the dev server banner, so the
// recommendations land below the Local/Network URLs instead of before them
function checkImages(): Plugin {
  return {
    name: 'check-images',
    apply: 'serve',
    configureServer(server) {
      const printUrls = server.printUrls.bind(server)
      server.printUrls = () => {
        printUrls()
        spawn('node', ['scripts/check-images.mjs'], { stdio: 'inherit' })
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss(), checkImages()],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
