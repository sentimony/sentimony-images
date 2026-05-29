<script setup lang="ts">
import { useHead } from '@unhead/vue'
import Item from '~/components/Item.vue'
import { ListMusic } from 'lucide-vue-next'

useHead({
  title: 'Playlists',
  meta: [
    { name: 'description', content: 'Cover art for the label\'s curated playlists, spanning goa, psychill, darkprog and the official Sentimony selection.' }
  ]
})

const playlistImages = [
  'darkprog_th.jpg',
  'goa_th.jpg',
  'official_th.jpg',
  'psychill_th.jpg'
]
</script>

<template>
  <div class="flex items-top justify-center">
    <div class="text-center my-16 px-4">

      <h1 class="font-bold text-4xl text-white mb-4 font-Julius tracking-widest uppercase flex items-center justify-center gap-4">
        <ListMusic class="size-10 shrink-0" :stroke-width="2" />
        Playlists
      </h1>

      <div class="text-left text-white mt-4 mb-16 indent-5 max-w-xl mx-auto [&>p]:mb-4">
        <p>Cover art for the label's curated playlists, spanning goa, psychill, darkprog and the official Sentimony selection.</p>
      </div>

      <div class="flex gap-4 justify-center flex-wrap mb-16 max-w-384">
        <Item
          v-for="image in playlistImages"
          :key="image"
          :image="image"
          folder="playlists"
        />
      </div>

    </div>
  </div>
</template>

<style></style>
