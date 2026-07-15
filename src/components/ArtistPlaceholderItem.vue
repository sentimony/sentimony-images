<script setup lang="ts">
import { UserRound } from 'lucide-vue-next'

defineProps<{ slug: string }>()
</script>

<template>
  <div
    class="flex flex-col items-center p-4 bg-white/5 backdrop-blur-xs rounded-lg border border-dashed border-white/10"
  >
    <div class="w-32 h-32 mb-3 flex items-center justify-center rounded-sm text-white/20">
      <UserRound class="size-16" :stroke-width="1" />
    </div>
    <span class="text-white/50 text-xs text-center break-all w-36">
      {{ slug }}
    </span>
    <span class="text-white/40 text-xs mt-1 min-h-4"></span>
  </div>
</template>

<style></style>
