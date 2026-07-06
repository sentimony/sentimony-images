<script setup lang="ts">
import { useHead } from '@unhead/vue'
import Item from '~/components/Item.vue'
import SortSelect from '~/components/SortSelect.vue'
import ImageLightbox from '~/components/ImageLightbox.vue'
import ImagePageLayout from '~/components/ImagePageLayout.vue'
import { MonitorPlay } from 'lucide-vue-next'
import { videoImages } from '~/data/video-images'
import { useImageNavigation, useLightboxImage } from '~/composables/useImageNavigation'
import { LIST_SORT_OPTIONS, useListSort } from '~/composables/useListSort'

useHead({
  title: 'Videos',
  meta: [
    { name: 'description', content: 'Cover frames from Sentimony Records music videos and live sets, the moving side of the label\'s catalogue.' }
  ]
})

const { sortBy, sortedImages } = useListSort(
  videoImages,
  (img) => `/assets/img/videos/${img.replace('_th.jpg', '_xl.jpg')}`
)

const { lightboxOpen, activeKey, hasPrev, hasNext, open, prev, next } = useImageNavigation(sortedImages)
const { activeSrc, activeTitle } = useLightboxImage(activeKey, 'videos', true)
</script>

<template>
  <ImagePageLayout title="Videos" :icon="MonitorPlay">
    <template #description>
      <p>Cover frames from Sentimony Records music videos and live sets, the moving side of the label's catalogue.</p>
    </template>

    <template #sort>
      <SortSelect v-model="sortBy" :options="LIST_SORT_OPTIONS" />
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
        :has-prev="hasPrev"
        :has-next="hasNext"
        @prev="prev"
        @next="next"
      />
    </template>
  </ImagePageLayout>
</template>

<style></style>
