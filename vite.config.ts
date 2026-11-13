import { spawn } from 'node:child_process'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// Runs scripts/check-images.mjs right after the dev server banner, so the
// recommendations land below the Local/Network URLs instead of before them.
// The report is read-only here: vite owns stdin (its own readline for r/u/q),
// so the script gets --no-prompt and the fix is offered as an `f` shortcut.
function checkImages(): Plugin {
  return {
    name: 'check-images',
    apply: 'serve',
    configureServer(server) {
      const printUrls = server.printUrls.bind(server)
      server.printUrls = () => {
        printUrls()
        spawn('node', ['scripts/check-images.mjs', '--no-prompt'], { stdio: 'inherit' })
      }

      const bindCLIShortcuts = server.bindCLIShortcuts.bind(server)
      server.bindCLIShortcuts = (options) => bindCLIShortcuts({
        ...options,
        customShortcuts: [
          ...(options?.customShortcuts ?? []),
          {
            key: 'f',
            description: 'fix image configs',
            action: () => { spawn('node', ['scripts/fix-configs.mjs', '--yes'], { stdio: 'inherit' }) },
          },
        ],
      })
    },
  }
}

const srcDir = fileURLToPath(new URL('./app', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss(), checkImages()],
  resolve: {
    alias: {
      '~': srcDir,
      '@': srcDir,
    },
  },
})
