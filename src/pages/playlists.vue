<script setup lang="ts">
import { useHead } from '@unhead/vue'
import Item from '~/components/Item.vue'
import SortSelect from '~/components/SortSelect.vue'
import ImageLightbox from '~/components/ImageLightbox.vue'
import ImagePageLayout from '~/components/ImagePageLayout.vue'
import { ListMusic } from 'lucide-vue-next'
import { playlistImages } from '~/data/playlist-images'
import { useImageNavigation, useLightboxImage } from '~/composables/useImageNavigation'
import { NAME_SORT_OPTIONS, useListSort } from '~/composables/useListSort'

useHead({
  title: 'Playlists',
  meta: [
    { name: 'description', content: 'Cover art for the label\'s curated playlists, spanning goa, psychill, darkprog and the official Sentimony selection.' }
  ]
})

const { sortBy, sortedImages } = useListSort(
  playlistImages,
  (img) => `/assets/img/playlists/${img.replace('_th.jpg', '_xl.jpg')}`,
  { initialSort: 'name-asc' },
)

const { lightboxOpen, activeKey, hasPrev, hasNext, open, prev, next } = useImageNavigation(sortedImages)
const { activeSrc, activeTitle } = useLightboxImage(activeKey, 'playlists', true)
</script>

<template>
  <ImagePageLayout title="Playlists" :icon="ListMusic">
    <template #description>
      <p>Cover art for the label's curated playlists, spanning goa, psychill, darkprog and the official Sentimony selection.</p>
    </template>

    <template #sort>
      <SortSelect v-model="sortBy" :options="NAME_SORT_OPTIONS" />
    </template>

    <Item
      v-for="image in sortedImages"
      :key="image"
      :image="image"
      folder="playlists"
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
