<script setup lang="ts">
useHead({
  title: 'Videos · Digital Keeper',
  meta: [
    { name: 'description', content: 'Digital Keeper storing Video Images on this page. All this Video Images used on portfolio website of Sentimony Records, a psychedelic music label.' }
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

      <h1 class="text-5xl text-white mb-4 font-Julius tracking-widest uppercase">
        Videos
      </h1>

      <div class="text-left text-white mt-4 mb-16 indent-5 max-w-xl mx-auto [&>p]:mb-4">
        <p>Digital Keeper storing Video Images on this page. All this Video Images used on portfolio website of Sentimony Records, a psychedelic music label.</p>
      </div>

      <div class="flex gap-4 justify-center flex-wrap mb-16 max-w-[96rem]">
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
