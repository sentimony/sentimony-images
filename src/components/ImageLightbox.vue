<script setup lang="ts">
import { computed, ref, watch, onUnmounted } from 'vue'
import { ChevronLeft, ChevronRight, ExternalLink, ImageDown, X } from 'lucide-vue-next'

interface Props {
  src: string
  title: string
  hasPrev?: boolean
  hasNext?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  prev: []
  next: []
}>()

const open = defineModel<boolean>('open', { required: true })
const fileSize = ref<string | null>(null)
const dimensions = ref<string | null>(null)

const infoLabel = computed(() =>
  [dimensions.value, fileSize.value].filter(Boolean).join(' · ')
)

watch(open, (isOpen) => {
  if (isOpen) {
    document.addEventListener('keydown', onKeydown)
    if (props.src) loadFileSize(props.src)
  } else {
    document.removeEventListener('keydown', onKeydown)
    fileSize.value = null
    dimensions.value = null
  }
})

watch(() => props.src, (src) => {
  fileSize.value = null
  dimensions.value = null
  if (open.value && src) loadFileSize(src)
})

onUnmounted(() => document.removeEventListener('keydown', onKeydown))

async function loadFileSize(src: string) {
  try {
    const res = await fetch(src, { method: 'HEAD' })
    const bytes = Number(res.headers.get('content-length'))
    if (bytes > 0) {
      fileSize.value = src.endsWith('.svg')
        ? `${bytes} B`
        : bytes < 1024 * 1024
          ? `${Math.round(bytes / 1024)} KB`
          : `${(bytes / 1024 / 1024).toFixed(1)} MB`
    }
  } catch {
    fileSize.value = null
  }
}

function onImgLoad(e: Event) {
  const img = e.target as HTMLImageElement
  if (img.naturalWidth) dimensions.value = `${img.naturalWidth}×${img.naturalHeight}`
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    open.value = false
  } else if (e.key === 'ArrowLeft' && props.hasPrev) {
    e.preventDefault()
    emit('prev')
  } else if (e.key === 'ArrowRight' && props.hasNext) {
    e.preventDefault()
    emit('next')
  }
}

function onOverlayClick(e: MouseEvent) {
  if (e.target === e.currentTarget) open.value = false
}
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
        @click="onOverlayClick"
      >
        <button
          v-if="hasPrev"
          class="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-10"
          aria-label="Previous"
          @click.stop="emit('prev')"
        >
          <ChevronLeft class="size-10" :stroke-width="1.5" />
        </button>

        <div class="relative flex flex-col items-center gap-6 w-[90vw] max-w-2xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 shadow-2xl">
          <button
            class="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            aria-label="Close"
            @click="open = false"
          >
            <X class="size-5" :stroke-width="2" />
          </button>

          <img
            v-if="src"
            :src="src"
            :alt="title"
            class="max-h-[60vh] max-w-full object-contain"
            @load="onImgLoad"
          />

          <p class="text-sm font-normal break-all text-center">{{ title }}</p>

          <p v-if="infoLabel" class="text-xs text-white/50 -mt-4">{{ infoLabel }}</p>

          <div class="flex items-center gap-6">
            <a
              :href="src"
              :download="title"
              class="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors"
            >
              <ImageDown class="size-3.5" :stroke-width="2" />
              Download
            </a>
            <a
              :href="src"
              target="_blank"
              class="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors"
            >
              Open original
              <ExternalLink class="size-3.5" :stroke-width="2" />
            </a>
          </div>
        </div>

        <button
          v-if="hasNext"
          class="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-10"
          aria-label="Next"
          @click.stop="emit('next')"
        >
          <ChevronRight class="size-10" :stroke-width="1.5" />
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.15s ease;
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
