<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { RELEASE_SORT_OPTIONS, sortImages, useReleaseSort } from '~/composables/useImageSort'
import Item from '~/components/Item.vue'
import SortSelect from '~/components/SortSelect.vue'
import ImageLightbox from '~/components/ImageLightbox.vue'
import ImagePageLayout from '~/components/ImagePageLayout.vue'
import { Disc3 } from 'lucide-vue-next'
import { releaseImages } from '~/data/release-images'
import { useImageNavigation, useLightboxImage } from '~/composables/useImageNavigation'
import { useImageSizes } from '~/composables/useListSort'

useHead({
  title: 'Releases',
  meta: [
    { name: 'description', content: 'Cover artworks for every Sentimony Records release, from the 2007 debut to the newest drop, lined up in chronological order so the label\'s visual story unfolds as you scroll.' }
  ]
})

const { sortBy } = useReleaseSort()
const sizes = useImageSizes(releaseImages, (img) => `/assets/img/releases/${img.replace('_th.jpg', '_xl.jpg')}`)
const sortedReleaseImages = computed(() => sortImages(releaseImages, sortBy.value, sizes.value))

const { lightboxOpen, activeKey, hasPrev, hasNext, open, prev, next } = useImageNavigation(sortedReleaseImages)
const { activeSrc, activeTitle } = useLightboxImage(activeKey, 'releases', true)
</script>

<template>
  <ImagePageLayout title="Releases" :icon="Disc3">
    <template #description>
      <p>Cover artworks for every Sentimony Records release, from the 2007 debut to the newest drop, lined up in chronological order so the label's visual story unfolds as you scroll.</p>
    </template>

    <template #sort>
      <SortSelect v-model="sortBy" :options="RELEASE_SORT_OPTIONS" />
    </template>

    <Item
      v-for="image in sortedReleaseImages"
      :key="image"
      :image="image"
      folder="releases"
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
