<script lang="ts" setup>
const menuItems = [
  { path: '/', label: 'Home' },
  { path: '/releases', label: 'Releases' },
  { path: '/artists', label: 'Artists' },
  { path: '/playlists', label: 'Playlists' },
  { path: '/videos', label: 'Videos' },
  { path: '/svg-icons', label: 'SVG Icons' },
  { path: '/svg-images', label: 'SVG Images' },
]
</script>

<template>
  <div class="sticky top-0 left-0 py-2 w-full z-10 border-b border-white/30 bg-white/5 backdrop-blur-sm flex justify-center flex-wrap items-center px-2">
    <NuxtLink
      v-for="item in menuItems"
      :key="item.path"
      :to="item.path"
      class="transition-[background-color] ease-in-out duration-300 text-white text-[16px] hover:bg-white/30 px-2 sm:px-3 md:px-4 lg:px-5 h-[56px] flex items-center justify-center rounded-[2px]"
      :class="{ 'bg-white/10': $route.path === item.path }"
      v-wave
    >
      {{ item.label }}
    </NuxtLink>
  </div>
</template>

<style></style>
