<script setup lang="ts">
useHead({
  title: 'Backgrounds · Digital Keeper',
  meta: [
    { name: 'description', content: 'Digital Keeper storing Background Images on this page. All this Background Images used on portfolio website of Sentimony Records, a psychedelic music label.' }
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
</script>

<template>
  <div class="flex items-top justify-center">
    <div class="text-center my-16 px-4">

      <h1 class="text-5xl text-white mb-4 font-Julius tracking-widest uppercase">
        Backgrounds
      </h1>

      <div class="text-left text-white mt-4 mb-16 indent-5 max-w-xl mx-auto [&>p]:mb-4">
        <p>Digital Keeper storing Background Images on this page. All this Background Images used on portfolio website of Sentimony Records, a psychedelic music label.</p>
      </div>

      <div class="flex gap-4 justify-center flex-wrap mb-16 max-w-[96rem]">
        <Item
          v-for="image in backgroundImages"
          :key="image"
          :image="image"
          folder="backgrounds"
        />
      </div>

    </div>
  </div>
</template>

<style></style>
