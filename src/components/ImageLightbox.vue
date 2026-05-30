<script setup lang="ts">
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogClose,
} from 'reka-ui'
import { X, ExternalLink } from 'lucide-vue-next'

interface Props {
  src: string
  title: string
}

defineProps<Props>()
const open = defineModel<boolean>('open', { required: true })
</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogPortal>
      <DialogOverlay
        class="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0"
      />
      <DialogContent
        class="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-6 w-[90vw] max-w-2xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 shadow-2xl focus:outline-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95"
      >
        <DialogTitle class="text-white text-sm break-all text-center">
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

        <DialogClose
          class="absolute right-4 top-4 inline-flex items-center justify-center rounded-md p-1 text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer focus:outline-hidden"
          aria-label="Close"
        >
          <X class="size-5" :stroke-width="2" />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
