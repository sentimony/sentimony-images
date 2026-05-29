<script setup lang="ts">
import { useHead } from '@unhead/vue'
import Item from '~/components/Item.vue'
import { TentTree } from 'lucide-vue-next'

useHead({
  title: 'Events',
  meta: [
    { name: 'description', content: 'Flyers and posters from Sentimony Records nights, the parties, showcases and gatherings of the psychedelic community, preserved in print.' }
  ]
})

const eventImages = [
  'alt-space_a_xl.jpg',
  'alt-space_b_xl.jpg',
  'alt-space_xl.jpg',
  'five-years_a_xl.jpg',
  'five-years_b_xl.jpg',
  'five-years_xl.jpg',
  'home-space_a_xl.jpg',
  'home-space_b_xl.jpg',
  'home-space_xl.jpg',
  'shift-space_a_xl.jpg',
  'shift-space_b_xl.jpg',
  'shift-space_xl.jpg',
  'water-marks_a_xl.jpg',
  'water-marks_b_xl.jpg',
  'water-marks_xl.jpg'
]
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
        />
      </div>

    </div>
  </div>
</template>

<style></style>
