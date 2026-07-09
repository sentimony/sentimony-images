<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { fetchFileSize, formatFileSize } from '~/composables/useFileSize'

interface Props {
  image: string
  folder: string
}

const props = defineProps<Props>()
const emit = defineEmits<{ select: [payload: { src: string, title: string, key: string }] }>()

const fullName = computed(() => props.image.replace('_th.jpg', '_xl.jpg'))
const src = computed(() => `/assets/img/${props.folder}/${fullName.value}`)

const fileSizeLabel = ref<string | null>(null)

// Abort in-flight HEAD requests on unmount so navigation doesn't log ERR_ABORTED
const abortController = new AbortController()
onBeforeUnmount(() => abortController.abort())

async function onImgLoad() {
  const bytes = await fetchFileSize(src.value, abortController.signal)
  if (bytes) fileSizeLabel.value = formatFileSize(bytes)
}

function onClick(e: MouseEvent) {
  if (e.metaKey || e.ctrlKey || e.button !== 0) return
  e.preventDefault()
  emit('select', { src: src.value, title: fullName.value, key: props.image })
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
      class="w-32 h-32 mb-3 object-contain rounded-sm"
      loading="lazy"
      @load="onImgLoad"
    />
    <span class="text-white text-xs text-center break-all w-36">
      {{ fullName }}
    </span>
    <span class="text-white/40 text-xs mt-1 min-h-4">
      {{ fileSizeLabel }}
    </span>
  </a>
</template>

<style></style>
