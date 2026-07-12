<script setup lang="ts">
import { useHead } from '@unhead/vue'
import Item from '~/components/Item.vue'
import SortSelect from '~/components/SortSelect.vue'
import ImageLightbox from '~/components/ImageLightbox.vue'
import ImagePageLayout from '~/components/ImagePageLayout.vue'
import { Wallpaper } from 'lucide-vue-next'
import { backgroundImages } from '~/data/background-images'
import { useImageNavigation, useLightboxImage } from '~/composables/useImageNavigation'
import { NAME_SORT_OPTIONS, useListSort } from '~/composables/useListSort'

useHead({
  title: 'Backgrounds',
  meta: [
    { name: 'description', content: 'Cosmic scenes and textures designed as backdrops for the Sentimony Records website, from spiral galaxies to deep-green forests.' }
  ]
})

const { sortBy, sortedImages } = useListSort(
  backgroundImages,
  (img) => `/assets/img/backgrounds/${img}`,
  { initialSort: 'name-asc' },
)

const { lightboxOpen, activeKey, hasPrev, hasNext, open, prev, next } = useImageNavigation(sortedImages)
const { activeSrc, activeTitle } = useLightboxImage(activeKey, 'backgrounds')
</script>

<template>
  <ImagePageLayout title="Backgrounds" :icon="Wallpaper">
    <template #description>
      <p>Cosmic scenes and textures designed as backdrops for the Sentimony Records website, from spiral galaxies to deep-green forests.</p>
    </template>

    <template #sort>
      <SortSelect v-model="sortBy" :options="NAME_SORT_OPTIONS" />
    </template>

    <Item
      v-for="image in sortedImages"
      :key="image"
      :image="image"
      folder="backgrounds"
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
