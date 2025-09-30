<script lang="ts" setup>
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1">
      <NuxtPage />
    </main>
    <AppFooter />
  </div>
</template>

<style>
body {
  @apply
  min-w-[320px] font-Montserrat antialiased text-xs md:text-sm lg:text-base text-white text-center
  bg-[#052e16]
  /* bg-[url('https://content.sentimony.com/assets/img/backgrounds/trees-green_v5.jpg?01')] */
  bg-gradient-to-br from-[#052e16] via-[#064e2a] to-[#065f32]
  bg-center bg-no-repeat bg-cover bg-fixed
}
</style>
