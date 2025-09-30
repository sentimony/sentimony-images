<script setup lang="ts">
useHead({
  title: 'Playlists · Digital Keeper',
  meta: [
    { name: 'description', content: 'Digital Keeper storing Playlist Images on this page. All this Playlist Images used on portfolio website of Sentimony Records, a psychedelic music label.' }
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

      <h1 class="text-5xl text-white mb-4 font-Julius tracking-widest uppercase">
        Playlists
      </h1>

      <div class="text-left text-white mt-4 mb-16 indent-5 max-w-xl mx-auto [&>p]:mb-4">
        <p>Digital Keeper storing Playlist Images on this page. All this Playlist Images used on portfolio website of Sentimony Records, a psychedelic music label.</p>
      </div>

      <div class="flex gap-4 justify-center flex-wrap mb-16 max-w-[96rem]">
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
