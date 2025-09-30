<script setup lang="ts">
interface Props {
  image: string
  folder: string
}

defineProps<Props>()
</script>

<template>
  <a
    :href="`/assets/img/${folder}/${image.replace('_th.jpg', '_xl.jpg')}`"
    target="_blank"
    class="flex flex-col items-center p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-300 cursor-pointer"
    v-wave
  >
    <img
      :src="`/assets/img/${folder}/${image}`"
      :alt="image.replace('_th.jpg', '')"
      class="w-32 h-32 mb-3 object-cover rounded"
      loading="lazy"
    />
    <span class="text-white text-xs text-center break-all w-36">
      {{ image.replace('_th.jpg', '_xl.jpg') }}
    </span>
  </a>
</template>

<style></style>
