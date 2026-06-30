<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  icon: string
}

const props = defineProps<Props>()
const emit = defineEmits<{ select: [icon: string] }>()

const fileSizeLabel = ref<string | null>(null)

async function onImgLoad() {
  try {
    const res = await fetch(`/assets/img/svg-icons/${props.icon}`, { method: 'HEAD' })
    const bytes = Number(res.headers.get('content-length'))
    if (bytes > 0) fileSizeLabel.value = `${bytes} B`
  } catch {}
}

function onClick(e: MouseEvent) {
  if (e.metaKey || e.ctrlKey || e.button !== 0) return
  e.preventDefault()
  emit('select', props.icon)
}
</script>

<template>
  <a
    :href="`/assets/img/svg-icons/${icon}`"
    target="_blank"
    class="flex flex-col items-center px-4 py-8 bg-white/5 backdrop-blur-xs rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-300 cursor-pointer"
    v-wave
    @click="onClick"
  >
    <img
      :src="`/assets/img/svg-icons/${icon}`"
      :alt="icon.replace('.svg', '')"
      class="w-12 h-12 mb-6"
      loading="lazy"
      @load="onImgLoad"
    />
    <span class="text-white text-xs text-center break-all w-36">
      {{ icon }}
    </span>
    <span v-if="fileSizeLabel" class="text-white/40 text-xs mt-1">
      {{ fileSizeLabel }}
    </span>
  </a>
</template>

<style></style>
