<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import Item from '~/components/Item.vue'
import SortToggle from '~/components/SortToggle.vue'
import ImageLightbox from '~/components/ImageLightbox.vue'
import ImagePageLayout from '~/components/ImagePageLayout.vue'
import { MonitorPlay } from 'lucide-vue-next'
import { videoImages, videoDates } from '~/data/video-images'
import { useImageNavigation, useLightboxImage } from '~/composables/useImageNavigation'
import { VIDEO_SORT_OPTIONS, useListSort } from '~/composables/useListSort'

const videoDateFor = (img: string) => {
  const slug = img.replace(/_th\.jpg$/, '')
  const date = videoDates[slug]
  return date ? Date.parse(date) : undefined
}

useHead({
  title: 'Videos',
  meta: [
    { name: 'description', content: 'Cover frames from Sentimony Records music videos and live sets, the moving side of the label\'s catalogue.' }
  ]
})

const { sortBy, sortedImages } = useListSort(
  videoImages,
  (img) => `/assets/img/videos/${img.replace('_th.jpg', '_xl.jpg')}`,
  { initialSort: 'date-desc', dateFor: videoDateFor },
)

const { lightboxOpen, activeKey, hasPrev, hasNext, open, prev, next } = useImageNavigation(sortedImages)
const { activeSrc, activeTitle } = useLightboxImage(activeKey, 'videos', true)

const activeDate = computed(() => {
  const key = activeKey.value
  if (!key) return undefined
  return videoDates[key.replace(/_th\.jpg$/, '')]
})
</script>

<template>
  <ImagePageLayout title="Videos" :icon="MonitorPlay">
    <template #description>
      <p>Cover frames from Sentimony Records music videos and live sets, the moving side of the label's catalogue.</p>
    </template>

    <template #sort>
      <SortToggle v-model="sortBy" :options="VIDEO_SORT_OPTIONS" />
    </template>

    <Item
      v-for="image in sortedImages"
      :key="image"
      :image="image"
      folder="videos"
      @select="open($event.key)"
    />

    <template #lightbox>
      <ImageLightbox
        v-model:open="lightboxOpen"
        :src="activeSrc"
        :title="activeTitle"
        date-label="Release Date"
        :date-value="activeDate"
        :has-prev="hasPrev"
        :has-next="hasNext"
        @prev="prev"
        @next="next"
      />
    </template>
  </ImagePageLayout>
</template>

<style></style>
