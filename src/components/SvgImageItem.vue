<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  image: string
}

const props = defineProps<Props>()
const emit = defineEmits<{ select: [image: string] }>()

const fileSizeLabel = ref<string | null>(null)

async function onImgLoad() {
  try {
    const res = await fetch(`/assets/img/svg-images/${props.image}`, { method: 'HEAD' })
    const bytes = Number(res.headers.get('content-length'))
    if (bytes > 0) fileSizeLabel.value = `${bytes} B`
  } catch {}
}

function onClick(e: MouseEvent) {
  if (e.metaKey || e.ctrlKey || e.button !== 0) return
  e.preventDefault()
  emit('select', props.image)
}
</script>

<template>
  <a
    :href="`/assets/img/svg-images/${image}`"
    target="_blank"
    class="flex flex-col items-center p-4 bg-white/5 backdrop-blur-xs rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-300 cursor-pointer"
    v-wave
    @click="onClick"
  >
    <img
      :src="`/assets/img/svg-images/${image}`"
      :alt="image.replace('.svg', '')"
      class="w-32 h-32 mb-3"
      loading="lazy"
      @load="onImgLoad"
    />
    <span class="text-white text-xs text-center break-all w-36">
      {{ image }}
    </span>
    <span v-if="fileSizeLabel" class="text-white/40 text-xs mt-1">
      {{ fileSizeLabel }}
    </span>
  </a>
</template>

<style></style>
