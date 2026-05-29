<script lang="ts" setup>
import { NavigationMenuRoot, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from 'reka-ui'
import { useRoute } from 'vue-router'

const route = useRoute()

const menuItems = [
  { path: '/', label: 'Home' },
  { path: '/releases', label: 'Releases' },
  { path: '/artists', label: 'Artists' },
  { path: '/playlists', label: 'Playlists' },
  { path: '/videos', label: 'Videos' },
  { path: '/events', label: 'Events' },
  { path: '/backgrounds', label: 'Backgrounds' },
  { path: '/svg-icons', label: 'SVG Icons' },
  { path: '/svg-images', label: 'SVG Images' },
]
</script>

<template>
  <NavigationMenuRoot
    class="sticky top-0 left-0 z-10 w-full py-2 border-b border-white/30 bg-white/5 backdrop-blur-xs flex justify-center"
  >
    <NavigationMenuList class="flex flex-wrap items-center justify-center px-2">
      <NavigationMenuItem v-for="item in menuItems" :key="item.path">
        <NavigationMenuLink :active="route.path === item.path" as-child>
          <RouterLink
            :to="item.path"
            class="transition-[background-color] ease-in-out duration-300 text-white text-[16px] hover:bg-white/30 px-2 sm:px-3 md:px-4 lg:px-5 h-[56px] flex items-center justify-center rounded-[2px] data-[active]:bg-white/10"
            v-wave
          >
            {{ item.label }}
          </RouterLink>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenuRoot>
</template>
