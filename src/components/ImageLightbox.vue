<script setup lang="ts">
import { Dialog, DialogContent, DialogTitle } from '~/components/ui/dialog'
import { ExternalLink } from 'lucide-vue-next'

interface Props {
  src: string
  title: string
}

defineProps<Props>()
const open = defineModel<boolean>('open', { required: true })
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent
      :aria-describedby="undefined"
      overlay-class="bg-black/80"
      class="flex flex-col items-center gap-6 w-[90vw] max-w-2xl sm:max-w-2xl rounded-2xl ring-0 border border-white/10 bg-white/5 backdrop-blur-md p-8 shadow-2xl"
    >
      <DialogTitle class="text-sm font-normal break-all text-center">
        {{ title }}
      </DialogTitle>

      <img
        v-if="src"
        :src="src"
        :alt="title"
        class="max-h-[60vh] max-w-full object-contain"
      />

      <a
        :href="src"
        target="_blank"
        class="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors"
      >
        <ExternalLink class="size-3.5" :stroke-width="2" />
        Open original
      </a>
    </DialogContent>
  </Dialog>
</template>
