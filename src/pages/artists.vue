<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { ARTIST_SORT_OPTIONS, sortImages, useArtistSort } from '~/composables/useImageSort'
import Item from '~/components/Item.vue'
import SortSelect from '~/components/SortSelect.vue'
import ImageLightbox from '~/components/ImageLightbox.vue'
import ImagePageLayout from '~/components/ImagePageLayout.vue'
import { KeyboardMusic } from 'lucide-vue-next'
import { artistImages } from '~/data/artist-images'
import { useImageNavigation, useLightboxImage } from '~/composables/useImageNavigation'
import { useImageSizes } from '~/composables/useListSort'

useHead({
  title: 'Artists',
  meta: [
    { name: 'description', content: 'Portraits of the producers, live acts and collaborators behind the music, the people who have shaped the Sentimony Records sound since 2007.' }
  ]
})

const { sortBy } = useArtistSort()
const sizes = useImageSizes(artistImages, (img) => `/assets/img/artists/${img.replace('_th.jpg', '_xl.jpg')}`)
const sortedArtistImages = computed(() => sortImages(artistImages, sortBy.value, sizes.value))

const { lightboxOpen, activeKey, hasPrev, hasNext, open, prev, next } = useImageNavigation(sortedArtistImages)
const { activeSrc, activeTitle } = useLightboxImage(activeKey, 'artists', true)
</script>

<template>
  <ImagePageLayout title="Artists" :icon="KeyboardMusic">
    <template #description>
      <p>Portraits of the producers, live acts and collaborators behind the music, the people who have shaped the Sentimony Records sound since 2007.</p>
    </template>

    <template #sort>
      <SortSelect v-model="sortBy" :options="ARTIST_SORT_OPTIONS" />
    </template>

    <Item
      v-for="image in sortedArtistImages"
      :key="image"
      :image="image"
      folder="artists"
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
