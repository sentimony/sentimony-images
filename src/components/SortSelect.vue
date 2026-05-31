<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
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
  <Select v-model="sortBy">
    <SelectTrigger size="sm" aria-label="Sort">
      <SelectValue />
    </SelectTrigger>

    <SelectContent position="popper" :side-offset="4">
      <SelectGroup>
        <SelectItem v-for="opt in options" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
