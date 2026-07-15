<script setup lang="ts" generic="T extends string">
import { computed } from 'vue'
import { CalendarDays, ArrowDownAZ, HardDrive, ArrowUp, ArrowDown } from 'lucide-vue-next'
import type { Component } from 'vue'

interface SortOption {
  value: T
  label: string
}

const props = defineProps<{ options: readonly SortOption[] }>()
const sortBy = defineModel<T>({ required: true })

type Dimension = 'date' | 'alpha' | 'size'

// Both composables share date-*/size-*; alphabetical is 'alpha-*' (releases/
// artists) or 'name-*' (list pages). Map each value to its dimension.
const dimensionOf = (value: string): Dimension => {
  if (value.startsWith('date-')) return 'date'
  if (value.startsWith('size-')) return 'size'
  return 'alpha'
}

const ICONS: Record<Dimension, Component> = {
  date: CalendarDays,
  alpha: ArrowDownAZ,
  size: HardDrive,
}

interface DimEntry {
  dim: Dimension
  label: string
  // The two directions, keyed by the arrow in each option's label — the arrow,
  // not asc/desc, is this project's direction indicator (date/size ↓ = desc,
  // alpha ↓ = asc).
  down?: T
  up?: T
}

// One button per dimension, in the options' order. `label` is the dimension
// name without the trailing arrow.
const dimensions = computed(() => {
  const map = new Map<Dimension, DimEntry>()
  for (const opt of props.options) {
    const dim = dimensionOf(opt.value)
    const entry = map.get(dim) ?? { dim, label: opt.label.replace(/\s*[↓↑]\s*$/, '') }
    if (opt.label.includes('↑')) entry.up = opt.value
    else entry.down = opt.value
    map.set(dim, entry)
  }
  return [...map.values()]
})

const activeDim = computed(() => dimensionOf(sortBy.value))
const activeUp = computed(() => {
  const opt = props.options.find((o) => o.value === sortBy.value)
  return opt ? opt.label.includes('↑') : false
})

function onClick(entry: DimEntry) {
  if (entry.dim === activeDim.value) {
    // Toggle direction within the active dimension.
    const next = activeUp.value ? entry.down : entry.up
    if (next) sortBy.value = next
  } else {
    // Activate this dimension at its default (the ↓ option, else ↑).
    const next = entry.down ?? entry.up
    if (next) sortBy.value = next
  }
}
</script>

<template>
  <div class="flex items-center gap-1" role="group" aria-label="Sort">
    <button
      v-for="entry in dimensions"
      :key="entry.dim"
      type="button"
      v-wave
      :aria-pressed="entry.dim === activeDim"
      :title="`${entry.label} ${entry.dim === activeDim ? (activeUp ? '↑' : '↓') : ''}`.trim()"
      class="inline-flex items-center gap-1 h-7 rounded-md border px-2 text-xs cursor-pointer transition-colors"
      :class="entry.dim === activeDim
        ? 'border-white/30 bg-white/20 text-white'
        : 'border-white/20 bg-white/10 text-white/70 hover:bg-white/15'"
      @click="onClick(entry)"
    >
      <component :is="ICONS[entry.dim]" class="size-4 shrink-0" />
      <span>{{ entry.label }}</span>
      <component
        :is="entry.dim === activeDim && activeUp ? ArrowUp : ArrowDown"
        class="size-3.5 shrink-0"
        :class="entry.dim === activeDim ? 'opacity-100' : 'opacity-0'"
      />
    </button>
  </div>
</template>
