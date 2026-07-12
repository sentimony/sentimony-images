<script setup lang="ts">
import { useHead } from '@unhead/vue'
import Item from '~/components/Item.vue'
import SortSelect from '~/components/SortSelect.vue'
import ImageLightbox from '~/components/ImageLightbox.vue'
import ImagePageLayout from '~/components/ImagePageLayout.vue'
import { TentTree } from 'lucide-vue-next'
import { eventImages, eventDates } from '~/data/event-images'
import { useImageNavigation, useLightboxImage } from '~/composables/useImageNavigation'
import { EVENT_SORT_OPTIONS, useListSort } from '~/composables/useListSort'

const eventDateFor = (img: string) => {
  const slug = img.replace(/(_[ab])?_xl\.jpg$/, '')
  const date = eventDates[slug]
  return date ? Date.parse(date) : undefined
}

useHead({
  title: 'Events',
  meta: [
    { name: 'description', content: 'Flyers and posters from Sentimony Records nights, the parties, showcases and gatherings of the psychedelic community, preserved in print.' }
  ]
})

const { sortBy, sortedImages } = useListSort(
  eventImages,
  (img) => `/assets/img/events/${img}`,
  { initialSort: 'date-desc', dateFor: eventDateFor },
)

const { lightboxOpen, activeKey, hasPrev, hasNext, open, prev, next } = useImageNavigation(sortedImages)
const { activeSrc, activeTitle } = useLightboxImage(activeKey, 'events')
</script>

<template>
  <ImagePageLayout title="Events" :icon="TentTree">
    <template #description>
      <p>Flyers and posters from Sentimony Records nights, the parties, showcases and gatherings of the psychedelic community, preserved in print.</p>
    </template>

    <template #sort>
      <SortSelect v-model="sortBy" :options="EVENT_SORT_OPTIONS" />
    </template>

    <Item
      v-for="image in sortedImages"
      :key="image"
      :image="image"
      folder="events"
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
