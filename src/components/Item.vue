<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  image: string
  folder: string
}

const props = defineProps<Props>()
const emit = defineEmits<{ select: [payload: { src: string, title: string }] }>()

const fullName = computed(() => props.image.replace('_th.jpg', '_xl.jpg'))
const src = computed(() => `/assets/img/${props.folder}/${fullName.value}`)

function onClick(e: MouseEvent) {
  if (e.metaKey || e.ctrlKey || e.button !== 0) return
  e.preventDefault()
  emit('select', { src: src.value, title: fullName.value })
}
</script>

<template>
  <a
    :href="src"
    target="_blank"
    class="flex flex-col items-center p-4 bg-white/5 backdrop-blur-xs rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-300 cursor-pointer"
    v-wave
    @click="onClick"
  >
    <img
      :src="`/assets/img/${folder}/${image}`"
      :alt="image.replace('_th.jpg', '')"
      class="w-32 h-32 mb-3 object-cover rounded-sm"
      loading="lazy"
    />
    <span class="text-white text-xs text-center break-all w-36">
      {{ fullName }}
    </span>
  </a>
</template>

<style></style>
