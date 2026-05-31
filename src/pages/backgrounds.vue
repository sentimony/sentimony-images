<script setup lang="ts">
import { ref, computed } from 'vue'
import { useHead } from '@unhead/vue'
import Item from '~/components/Item.vue'
import ImageLightbox from '~/components/ImageLightbox.vue'
import { Wallpaper } from 'lucide-vue-next'

useHead({
  title: 'Backgrounds',
  meta: [
    { name: 'description', content: 'Cosmic scenes and textures designed as backdrops for the Sentimony Records website, from spiral galaxies to deep-green forests.' }
  ]
})

const backgroundImages = [
  'earth-origin.jpg',
  'earth-origin_1x.jpg',
  'earth-origin_2x.jpg',
  'sombrero-green.jpg',
  'sombrero-green_1x.jpg',
  'sombrero-green_2x.jpg',
  'sombrero-origin.jpg',
  'sombrero-origin_1x.jpg',
  'sombrero-origin_2x.jpg',
  'sombrero-red.jpg',
  'sombrero-red_1x.jpg',
  'sombrero-red_2x.jpg',
  'trees-green_v5.jpg'
]

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
        <Wallpaper class="size-10 shrink-0" :stroke-width="2" />
        Backgrounds
      </h1>

      <div class="text-left text-white mt-4 mb-16 indent-5 max-w-xl mx-auto [&>p]:mb-4">
        <p>Cosmic scenes and textures designed as backdrops for the Sentimony Records website, from spiral galaxies to deep-green forests.</p>
      </div>

      <div class="flex gap-4 justify-center flex-wrap mb-16 max-w-384">
        <Item
          v-for="image in backgroundImages"
          :key="image"
          :image="image"
          folder="backgrounds"
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
