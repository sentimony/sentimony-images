<script setup lang="ts">
import { useHead } from '@unhead/vue'
import SvgItem from '~/components/SvgItem.vue'
import SortSelect from '~/components/SortSelect.vue'
import ImageLightbox from '~/components/ImageLightbox.vue'
import ImagePageLayout from '~/components/ImagePageLayout.vue'
import { SplinePointer } from 'lucide-vue-next'
import { svgIcons } from '~/data/svg-icons'
import { useImageNavigation, useLightboxImage } from '~/composables/useImageNavigation'
import { NAME_SORT_OPTIONS, useListSort } from '~/composables/useListSort'

useHead({
  title: 'SVG Icons',
  meta: [
    { name: 'description', content: 'The complete set of vector icons that power the Sentimony Records website: social links, music platforms, navigation and the label\'s own marks.' }
  ]
})

const { sortBy, sortedImages } = useListSort(
  svgIcons,
  (img) => `/assets/img/svg-icons/${img}`,
  { initialSort: 'name-asc' },
)

const { lightboxOpen, activeKey, hasPrev, hasNext, open, prev, next } = useImageNavigation(sortedImages)
const { activeSrc, activeTitle } = useLightboxImage(activeKey, 'svg-icons')
</script>

<template>
  <ImagePageLayout title="SVG Icons" :icon="SplinePointer">
    <template #description>
      <p>The complete set of vector icons that power the Sentimony Records website: social links, music platforms, navigation and the label's own marks.</p>
    </template>

    <template #sort>
      <SortSelect v-model="sortBy" :options="NAME_SORT_OPTIONS" />
    </template>

    <SvgItem
      v-for="icon in sortedImages"
      :key="icon"
      :icon="icon"
      @select="open($event)"
    />

    <template #lightbox>
      <ImageLightbox
        v-model:open="lightboxOpen"
        :src="activeSrc"
        :title="activeTitle"
        :has-prev="hasPrev"
        :has-next="hasNext"
        img-class="brightness-0 invert"
        @prev="prev"
        @next="next"
      />
    </template>
  </ImagePageLayout>
</template>

<style></style>
