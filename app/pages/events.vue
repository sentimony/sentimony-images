<script setup lang="ts">
useHead({
  title: 'Events · Digital Keeper',
  meta: [
    { name: 'description', content: 'Digital Keeper storing Event Images on this page. All this Event Images used on portfolio website of Sentimony Records, a psychedelic music label.' }
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

      <h1 class="text-5xl text-white mb-4 font-Julius tracking-widest uppercase">
        Events
      </h1>

      <div class="text-left text-white mt-4 mb-16 indent-5 max-w-xl mx-auto [&>p]:mb-4">
        <p>Digital Keeper storing Event Images on this page. All this Event Images used on portfolio website of Sentimony Records, a psychedelic music label.</p>
      </div>

      <div class="flex gap-4 justify-center flex-wrap mb-16 max-w-[96rem]">
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
