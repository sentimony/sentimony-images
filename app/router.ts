import { createRouter, createWebHistory } from 'vue-router'

import Index from '~/pages/index.vue'
import Releases from '~/pages/releases.vue'
import Artists from '~/pages/artists.vue'
import Playlists from '~/pages/playlists.vue'
import Videos from '~/pages/videos.vue'
import Events from '~/pages/events.vue'
import Backgrounds from '~/pages/backgrounds.vue'
import SvgIcons from '~/pages/svg-icons.vue'
import SvgImages from '~/pages/svg-images.vue'
import NotFound from '~/pages/NotFound.vue'

export const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', component: Index },
    { path: '/releases', component: Releases },
    { path: '/artists', component: Artists },
    { path: '/playlists', component: Playlists },
    { path: '/videos', component: Videos },
    { path: '/events', component: Events },
    { path: '/backgrounds', component: Backgrounds },
    { path: '/svg-icons', component: SvgIcons },
    { path: '/svg-images', component: SvgImages },
    { path: '/:pathMatch(.*)*', component: NotFound },
  ],
})
