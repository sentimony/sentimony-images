<script setup lang="ts">
import { computed, ref, watch, onUnmounted } from 'vue'
import { Check, ChevronLeft, ChevronRight, Copy, ExternalLink, ImageDown, X } from 'lucide-vue-next'
import { fetchFileSize, formatFileSize, formatSvgFileSize } from '~/composables/useFileSize'

interface Props {
  src: string
  title: string
  hasPrev?: boolean
  hasNext?: boolean
  imgClass?: string
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

// Abort in-flight HEAD requests on unmount so navigation doesn't log ERR_ABORTED.
// Declared before the immediate watcher below, which may call loadFileSize right away.
const abortController = new AbortController()

// immediate: the lightbox can mount already open (deep link with ?img=),
// and Esc/size loading must work then too
watch(open, (isOpen) => {
  if (isOpen) {
    document.addEventListener('keydown', onKeydown)
    if (props.src) loadFileSize(props.src)
  } else {
    document.removeEventListener('keydown', onKeydown)
    fileSize.value = null
    dimensions.value = null
  }
}, { immediate: true })

watch(() => props.src, (src) => {
  fileSize.value = null
  dimensions.value = null
  if (open.value && src) loadFileSize(src)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  abortController.abort()
  clearTimeout(copiedTimer)
})

async function loadFileSize(src: string) {
  const bytes = await fetchFileSize(src, abortController.signal)
  fileSize.value = bytes
    ? src.endsWith('.svg') ? formatSvgFileSize(bytes) : formatFileSize(bytes)
    : null
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

const copied = ref(false)
let copiedTimer: ReturnType<typeof setTimeout> | undefined

async function copyPath() {
  await navigator.clipboard.writeText(new URL(props.src, location.href).href)
  copied.value = true
  clearTimeout(copiedTimer)
  copiedTimer = setTimeout(() => (copied.value = false), 1500)
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
          v-wave
          class="absolute left-4 top-1/2 -translate-y-1/2 overflow-hidden rounded-full p-1 text-white/50 hover:text-white transition-colors z-10"
          aria-label="Previous"
          @click.stop="emit('prev')"
        >
          <ChevronLeft class="size-10" :stroke-width="1.5" />
        </button>

        <div class="relative flex flex-col items-center gap-6 w-[90vw] max-w-2xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 shadow-2xl">
          <button
            v-wave
            class="absolute top-4 right-4 overflow-hidden rounded-full p-1 text-white/60 hover:text-white transition-colors"
            aria-label="Close"
            @click="open = false"
          >
            <X class="size-5" :stroke-width="2" />
          </button>

          <!-- Fixed-height area so the dialog doesn't resize when navigating between images with different aspect ratios -->
          <div class="flex h-[60vh] w-full items-center justify-center">
            <img
              v-if="src"
              :src="src"
              :alt="title"
              class="max-h-full max-w-full object-contain"
              :class="imgClass"
              @load="onImgLoad"
            />
          </div>

          <p class="text-sm font-normal break-all text-center">
            <span class="text-white/50">File:</span> {{ title }}
          </p>

          <!-- Always rendered to keep dialog height stable while metadata loads -->
          <p class="text-xs text-white/50 -mt-4 min-h-4">{{ infoLabel ? `Size: ${infoLabel}` : '' }}</p>

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
            <button
              type="button"
              class="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors"
              @click="copyPath"
            >
              <component :is="copied ? Check : Copy" class="size-3.5" :stroke-width="2" />
              {{ copied ? 'Copied' : 'Copy image path' }}
            </button>
          </div>
        </div>

        <button
          v-if="hasNext"
          v-wave
          class="absolute right-4 top-1/2 -translate-y-1/2 overflow-hidden rounded-full p-1 text-white/50 hover:text-white transition-colors z-10"
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
