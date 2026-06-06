<script setup lang="ts">
import { ref, computed } from 'vue'
import { useHead } from '@unhead/vue'
import Item from '~/components/Item.vue'
import ImageLightbox from '~/components/ImageLightbox.vue'
import { TentTree } from 'lucide-vue-next'
import { eventImages } from '~/data/event-images'

useHead({
  title: 'Events',
  meta: [
    { name: 'description', content: 'Flyers and posters from Sentimony Records nights, the parties, showcases and gatherings of the psychedelic community, preserved in print.' }
  ]
})

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
    <div class="text-center my-16 px-4">

      <h1 class="font-bold text-4xl text-white mb-4 font-Julius tracking-widest uppercase flex items-center justify-center gap-4">
        <TentTree class="size-10 shrink-0" :stroke-width="2" />
        Events
      </h1>

      <div class="text-left text-white mt-4 mb-16 indent-5 max-w-xl mx-auto [&>p]:mb-4">
        <p>Flyers and posters from Sentimony Records nights, the parties, showcases and gatherings of the psychedelic community, preserved in print.</p>
      </div>

      <div class="flex gap-4 justify-center flex-wrap mb-16 max-w-384">
        <Item
          v-for="image in eventImages"
          :key="image"
          :image="image"
          folder="events"
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
