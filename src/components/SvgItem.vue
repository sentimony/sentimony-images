<script setup lang="ts">
interface Props {
  icon: string
}

defineProps<Props>()
</script>

<template>
  <a
    :href="`/assets/img/svg-icons/${icon}`"
    target="_blank"
    class="flex flex-col items-center px-4 py-8 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-300 cursor-pointer"
    v-wave
  >
    <img
      :src="`/assets/img/svg-icons/${icon}`"
      :alt="icon.replace('.svg', '')"
      class="w-12 h-12 mb-6"
      loading="lazy"
    />
    <span class="text-white text-xs text-center break-all w-36">
      {{ icon }}
    </span>
  </a>
</template>

<style></style>
