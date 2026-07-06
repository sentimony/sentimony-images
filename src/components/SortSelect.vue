<script setup lang="ts" generic="T extends string">
interface SortOption {
  value: T
  label: string
}

defineProps<{ options: readonly SortOption[] }>()
const sortBy = defineModel<T>({ required: true })
</script>

<template>
  <select
    v-model="sortBy"
    aria-label="Sort"
    class="h-7 rounded-md border border-white/20 bg-white/10 px-2 text-xs text-white cursor-pointer"
  >
    <option v-for="opt in options" :key="opt.value" :value="opt.value">
      {{ opt.label }}
    </option>
  </select>
</template>
