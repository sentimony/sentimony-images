<script setup lang="ts">
import { ref, computed } from 'vue'
import { useHead } from '@unhead/vue'
import { RELEASE_SORT_OPTIONS, sortImages, useReleaseSort } from '~/composables/useImageSort'
import Item from '~/components/Item.vue'
import SortSelect from '~/components/SortSelect.vue'
import ImageLightbox from '~/components/ImageLightbox.vue'
import { Disc3 } from 'lucide-vue-next'
import { releaseImages } from '~/data/release-images'

useHead({
  title: 'Releases',
  meta: [
    { name: 'description', content: 'Cover artworks for every Sentimony Records release, from the 2007 debut to the newest drop, lined up in chronological order so the label\'s visual story unfolds as you scroll.' }
  ]
})

const { sortBy } = useReleaseSort()

const sortedReleaseImages = computed(() => sortImages(releaseImages, sortBy.value))

const active = ref<{ src: string, title: string } | null>(null)
const lightboxOpen = computed({
  get: () => active.value !== null,
  set: (v) => {
    if (!v) active.value = null
  },
})
</script>

<template>
  <div class="flex items-top justify-center">
    <div class="text-center my-16 px-4 w-full max-w-384">

      <h1 class="font-bold text-4xl text-white mb-4 font-Julius tracking-widest uppercase flex items-center justify-center gap-4">
        <Disc3 class="size-10 shrink-0" :stroke-width="2" />
        Releases
      </h1>

      <div class="text-left text-white mt-4 mb-16 indent-5 max-w-xl mx-auto [&>p]:mb-4">
        <p>Cover artworks for every Sentimony Records release, from the 2007 debut to the newest drop, lined up in chronological order so the label's visual story unfolds as you scroll.</p>
      </div>

      <div class="flex justify-end mb-4">
        <SortSelect v-model="sortBy" :options="RELEASE_SORT_OPTIONS" />
      </div>

      <div class="flex gap-4 justify-center flex-wrap mb-16">
        <Item
          v-for="image in sortedReleaseImages"
          :key="image"
          :image="image"
          folder="releases"
          @select="active = $event"
        />
      </div>

    </div>

    <ImageLightbox
      v-model:open="lightboxOpen"
      :src="active?.src ?? ''"
      :title="active?.title ?? ''"
    />
  </div>
</template>

<style></style>
