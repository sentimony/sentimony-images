<script lang="ts" setup>
import {
  Rabbit,
  Disc3,
  KeyboardMusic,
  ListMusic,
  MonitorPlay,
  TentTree,
  Wallpaper,
  SplinePointer,
  PenTool,
} from 'lucide-vue-next'

const menuItems = [
  { path: '/', label: 'Home', icon: Rabbit },
  { path: '/releases', label: 'Releases', icon: Disc3 },
  { path: '/artists', label: 'Artists', icon: KeyboardMusic },
  { path: '/playlists', label: 'Playlists', icon: ListMusic },
  { path: '/videos', label: 'Videos', icon: MonitorPlay },
  { path: '/events', label: 'Events', icon: TentTree },
  { path: '/backgrounds', label: 'Backgrounds', icon: Wallpaper },
  { path: '/svg-icons', label: 'SVG Icons', icon: SplinePointer },
  { path: '/svg-images', label: 'SVG Images', icon: PenTool },
]
</script>

<template>
  <nav class="sticky top-0 left-0 z-10 w-full py-2 border-b border-white/30 bg-white/5 backdrop-blur-xs flex justify-center">
    <ul class="flex flex-wrap items-center justify-center px-2">
      <li v-for="item in menuItems" :key="item.path">
        <RouterLink
          :to="item.path"
          class="transition-[background-color] ease-in-out duration-300 text-white text-[16px] hover:bg-white/30 px-2 sm:px-3 md:px-4 lg:px-5 h-14 flex items-center justify-center gap-1.5 rounded-[2px] aria-[current=page]:bg-white/10"
          v-wave
        >
          <component :is="item.icon" class="size-4 shrink-0" :stroke-width="2" />
          <span>{{ item.label }}</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
