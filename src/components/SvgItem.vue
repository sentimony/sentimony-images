<script setup lang="ts">
interface Props {
  icon: string
}

const props = defineProps<Props>()
const emit = defineEmits<{ select: [icon: string] }>()

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
    />
    <span class="text-white text-xs text-center break-all w-36">
      {{ icon }}
    </span>
  </a>
</template>

<style></style>
