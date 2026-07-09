<script setup lang="ts">
import { useHead } from '@unhead/vue'
import SvgImageItem from '~/components/SvgImageItem.vue'
import SortSelect from '~/components/SortSelect.vue'
import ImageLightbox from '~/components/ImageLightbox.vue'
import ImagePageLayout from '~/components/ImagePageLayout.vue'
import { PenTool } from 'lucide-vue-next'
import { svgImages } from '~/data/svg-images'
import { useImageNavigation, useLightboxImage } from '~/composables/useImageNavigation'
import { LIST_SORT_OPTIONS, useListSort } from '~/composables/useListSort'

useHead({
  title: 'SVG Images',
  meta: [
    { name: 'description', content: 'A collection of hand-drawn vector illustrations: playful characters, nature scenes and mandalas created for Sentimony Records.' }
  ]
})

const { sortBy, sortedImages } = useListSort(
  svgImages,
  (img) => `/assets/img/svg-images/${img}`
)

const { lightboxOpen, activeKey, hasPrev, hasNext, open, prev, next } = useImageNavigation(sortedImages)
const { activeSrc, activeTitle } = useLightboxImage(activeKey, 'svg-images')
</script>

<template>
  <ImagePageLayout title="SVG Images" :icon="PenTool">
    <template #description>
      <p>A collection of hand-drawn vector illustrations: playful characters, nature scenes and mandalas created for Sentimony Records.</p>
    </template>

    <template #sort>
      <SortSelect v-model="sortBy" :options="LIST_SORT_OPTIONS" />
    </template>

    <SvgImageItem
      v-for="image in sortedImages"
      :key="image"
      :image="image"
      @select="open($event)"
    />

    <template #lightbox>
      <ImageLightbox
        v-model:open="lightboxOpen"
        :src="activeSrc"
        :title="activeTitle"
        :has-prev="hasPrev"
        :has-next="hasNext"
        @prev="prev"
        @next="next"
      />
    </template>
  </ImagePageLayout>
</template>

<style></style>
