<script setup lang="ts">
import { ref, computed } from 'vue'
import { useHead } from '@unhead/vue'
import SvgImageItem from '~/components/SvgImageItem.vue'
import ImageLightbox from '~/components/ImageLightbox.vue'
import { PenTool } from 'lucide-vue-next'
import { svgImages } from '~/data/svg-images'

useHead({
  title: 'SVG Images',
  meta: [
    { name: 'description', content: 'A collection of hand-drawn vector illustrations: playful characters, nature scenes and mandalas created for Sentimony Records.' }
  ]
})

const activeImage = ref<string | null>(null)
const lightboxOpen = computed({
  get: () => activeImage.value !== null,
  set: (v) => {
    if (!v) activeImage.value = null
  },
})
</script>

<template>
  <div class="flex items-top justify-center">
    <div class="text-center my-16 px-4">

      <h1 class="font-bold text-4xl text-white mb-4 font-Julius tracking-widest uppercase flex items-center justify-center gap-4">
        <PenTool class="size-10 shrink-0" :stroke-width="2" />
        SVG Images
      </h1>

      <div class="text-left text-white mt-4 mb-16 indent-5 max-w-xl mx-auto [&>p]:mb-4">
        <p>A collection of hand-drawn vector illustrations: playful characters, nature scenes and mandalas created for Sentimony Records.</p>
      </div>

      <div class="flex gap-4 justify-center flex-wrap mb-16 max-w-384">
        <SvgImageItem
          v-for="image in svgImages"
          :key="image"
          :image="image"
          @select="activeImage = $event"
        />
      </div>

    </div>

    <ImageLightbox
      v-model:open="lightboxOpen"
      :src="activeImage ? `/assets/img/svg-images/${activeImage}` : ''"
      :title="activeImage ?? ''"
    />
  </div>
</template>

<style></style>
