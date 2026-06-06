<script setup lang="ts">
import { ref, computed } from 'vue'
import { useHead } from '@unhead/vue'
import { ARTIST_SORT_OPTIONS, sortImages, useArtistSort } from '~/composables/useImageSort'
import Item from '~/components/Item.vue'
import SortSelect from '~/components/SortSelect.vue'
import ImageLightbox from '~/components/ImageLightbox.vue'
import { KeyboardMusic } from 'lucide-vue-next'
import { artistImages } from '~/data/artist-images'

useHead({
  title: 'Artists',
  meta: [
    { name: 'description', content: 'Portraits of the producers, live acts and collaborators behind the music, the people who have shaped the Sentimony Records sound since 2007.' }
  ]
})

const { sortBy } = useArtistSort()

const sortedArtistImages = computed(() => sortImages(artistImages, sortBy.value))

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
        <KeyboardMusic class="size-10 shrink-0" :stroke-width="2" />
        Artists
      </h1>

      <div class="text-left text-white mt-4 mb-16 indent-5 max-w-xl mx-auto [&>p]:mb-4">
        <p>Portraits of the producers, live acts and collaborators behind the music, the people who have shaped the Sentimony Records sound since 2007.</p>
      </div>

      <div class="flex justify-end mb-4">
        <SortSelect v-model="sortBy" :options="ARTIST_SORT_OPTIONS" />
      </div>

      <div class="flex gap-4 justify-center flex-wrap mb-16">
        <Item
          v-for="image in sortedArtistImages"
          :key="image"
          :image="image"
          folder="artists"
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
