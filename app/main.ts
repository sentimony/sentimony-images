import { createApp } from 'vue'
import { createHead } from '@unhead/vue/client'
import VWave from 'v-wave'
import App from './app.vue'
import { router } from './router'
import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(createHead())
app.use(VWave, {
  easing: 'cubic-bezier(0,.57,.89,0)',
})

app.mount('#app')

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  })
}
