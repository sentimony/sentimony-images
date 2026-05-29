<script setup lang="ts">
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectPortal,
  SelectContent,
  SelectViewport,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
} from 'reka-ui'
import { ChevronDown, Check } from 'lucide-vue-next'
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
  <SelectRoot v-model="sortBy">
    <SelectTrigger
      class="inline-flex items-center justify-between gap-2 text-sm rounded-lg px-2 py-1 border bg-white/5 text-white border-white/20 hover:border-white/40 cursor-pointer transition-colors backdrop-blur-xs focus:outline-hidden focus:border-white/60 data-[state=open]:border-white/60"
      aria-label="Sort"
    >
      <SelectValue />
      <SelectIcon class="text-white/70">
        <ChevronDown class="size-3" :stroke-width="2" />
      </SelectIcon>
    </SelectTrigger>

    <SelectPortal>
      <SelectContent
        position="popper"
        :side-offset="4"
        class="z-50 min-w-[var(--reka-select-trigger-width)] bg-gray-900 text-white rounded-lg border border-white/20 shadow-lg overflow-hidden"
      >
        <SelectViewport class="p-1">
          <SelectItem
            v-for="opt in options"
            :key="opt.value"
            :value="opt.value"
            class="relative flex items-center justify-between text-sm rounded-md px-2 py-1.5 pr-7 cursor-pointer select-none outline-hidden transition-colors data-[highlighted]:bg-white/10 data-[state=checked]:bg-white/5"
          >
            <SelectItemText>{{ opt.label }}</SelectItemText>
            <SelectItemIndicator class="absolute right-2 inline-flex items-center">
              <Check class="size-3.5" :stroke-width="2" />
            </SelectItemIndicator>
          </SelectItem>
        </SelectViewport>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>
