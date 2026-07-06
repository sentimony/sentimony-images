<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import SvgItem from '~/components/SvgItem.vue'
import ImageLightbox from '~/components/ImageLightbox.vue'
import { SplinePointer } from 'lucide-vue-next'
import { svgIcons } from '~/data/svg-icons'
import { useImageNavigation } from '~/composables/useImageNavigation'
import { LIST_SORT_OPTIONS, useListSort } from '~/composables/useListSort'

useHead({
  title: 'SVG Icons',
  meta: [
    { name: 'description', content: 'The complete set of vector icons that power the Sentimony Records website: social links, music platforms, navigation and the label\'s own marks.' }
  ]
})

const { sortBy, sortedImages } = useListSort(
  svgIcons,
  (img) => `/assets/img/svg-icons/${img}`
)

const { lightboxOpen, activeKey, hasPrev, hasNext, open, prev, next } = useImageNavigation(sortedImages)

const activeSrc   = computed(() => activeKey.value ? `/assets/img/svg-icons/${activeKey.value}` : '')
const activeTitle = computed(() => activeKey.value ?? '')
</script>

<template>
  <div class="flex items-top justify-center">
    <div class="text-center my-16 px-4">

      <h1 class="font-bold text-4xl text-white mb-4 font-Julius tracking-widest uppercase flex items-center justify-center gap-4">
        <SplinePointer class="size-10 shrink-0" :stroke-width="2" />
        SVG Icons
      </h1>

      <div class="text-left text-white mt-4 mb-16 indent-5 max-w-xl mx-auto [&>p]:mb-4">
        <p>The complete set of vector icons that power the Sentimony Records website: social links, music platforms, navigation and the label's own marks.</p>
      </div>

      <div class="flex justify-end mb-4">
        <select v-model="sortBy" aria-label="Sort" class="h-7 rounded-md border border-white/20 bg-white/10 px-2 text-xs text-white cursor-pointer">
          <option v-for="opt in LIST_SORT_OPTIONS" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
        </select>
      </div>

      <div class="flex gap-4 justify-center flex-wrap mb-16 max-w-384">
        <SvgItem
          v-for="icon in sortedImages"
          :key="icon"
          :icon="icon"
          @select="open($event)"
        />
      </div>

    </div>

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
  </div>
</template>

<style></style>
