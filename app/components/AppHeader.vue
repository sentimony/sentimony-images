<script lang="ts" setup></script>

<template>
  <div class="sticky top-0 left-0 h-[75px] w-full z-10 border-b border-white/30 bg-white/5 backdrop-blur-sm flex justify-center items-center h-[75px] px-2">
    <NuxtLink
      to="/"
      class="transition-[background-color] ease-in-out duration-300 text-white text-[16px] hover:bg-white/30 sm:px-2 md:px-3 lg:px-4 h-[56px] flex items-center justify-center rounded-[2px]"
      :class="{ 'bg-white/10': $route.path === '/' }"
      v-wave
    >
      Home
    </NuxtLink>
    <NuxtLink
      to="/svg-icons"
      class="transition-[background-color] ease-in-out duration-300 text-white text-[16px] hover:bg-white/30 sm:px-2 md:px-3 lg:px-4 h-[56px] flex items-center justify-center rounded-[2px]"
      :class="{ 'bg-white/10': $route.path === '/svg-icons' }"
      v-wave
    >
      SVG Icons
    </NuxtLink>
  </div>
</template>

<style></style>
