<script setup lang="ts">
import type { ImageSortOption } from '~/composables/useImageSort'

interface SortOption {
  value: ImageSortOption
  label: string
}

interface Props {
  options: readonly SortOption[]
}

defineProps<Props>()
const sortBy = defineModel<ImageSortOption>({ required: true })
</script>

<template>
  <select
    v-model="sortBy"
    class="text-sm rounded-lg px-2 py-1 border bg-white/5 text-white border-white/20 hover:border-white/40 cursor-pointer transition-colors backdrop-blur-xs focus:outline-hidden focus:border-white/60"
  >
    <option
      v-for="opt in options"
      :key="opt.value"
      :value="opt.value"
      class="bg-gray-900 text-white"
    >
      {{ opt.label }}
    </option>
  </select>
</template>

<style></style>
