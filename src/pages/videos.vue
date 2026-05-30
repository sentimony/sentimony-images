<script setup lang="ts">
import { useHead } from '@unhead/vue'
import Item from '~/components/Item.vue'
import { MonitorPlay } from 'lucide-vue-next'

useHead({
  title: 'Videos',
  meta: [
    { name: 'description', content: 'Cover frames from Sentimony Records music videos and live sets, the moving side of the label\'s catalogue.' }
  ]
})

const videoImages = [
  'boketto-scitalis_th.jpg',
  'irukanji-live-eve8-2022_th.jpg',
  'zymosis-last-call_th.jpg',
  'zymosis-live-chillary-2021_th.jpg',
  'zymosis-live-kaleidoscopie-2019_th.jpg',
  'zymosis-serdenko_th.jpg'
]
</script>

<template>
  <div class="flex items-top justify-center">
    <div class="text-center my-16 px-4">

      <h1 class="font-bold text-4xl text-white mb-4 font-Julius tracking-widest uppercase flex items-center justify-center gap-4">
        <MonitorPlay class="size-10 shrink-0" :stroke-width="2" />
        Videos
      </h1>

      <div class="text-left text-white mt-4 mb-16 indent-5 max-w-xl mx-auto [&>p]:mb-4">
        <p>Cover frames from Sentimony Records music videos and live sets, the moving side of the label's catalogue.</p>
      </div>

      <div class="flex gap-4 justify-center flex-wrap mb-16 max-w-384">
        <Item
          v-for="image in videoImages"
          :key="image"
          :image="image"
          folder="videos"
        />
      </div>

    </div>
  </div>
</template>

<style></style>
