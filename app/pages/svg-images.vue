<script setup lang="ts">
useHead({
  title: 'SVG Images · Digital Keeper',
  meta: [
    { name: 'description', content: 'Digital Keeper storing SVG Images on this page. Collection of various SVG illustrations and graphics.' }
  ]
})

const svgImages = [
  'bicycle-girl.svg',
  'bunny-01.svg',
  'bunny-02.svg',
  'cat-01.svg',
  'farm-barley.svg',
  'forest.svg',
  'girl.svg',
  'mandala-01.svg',
  'tree.svg',
  'triangles.svg'
]
</script>

<template>
  <div class="flex items-top justify-center">
    <div class="text-center my-16 px-4">

      <h1 class="text-5xl text-white mb-4 font-Julius tracking-widest uppercase">
        SVG Images
      </h1>

      <div class="text-left text-white mt-4 mb-16 indent-5 max-w-xl mx-auto [&>p]:mb-4">
        <p>Digital Keeper storing SVG Images on this page. Collection of various SVG illustrations and graphics.</p>
      </div>

      <div class="flex gap-4 justify-center flex-wrap mb-16 max-w-[96rem]">
        <SvgImageItem
          v-for="image in svgImages"
          :key="image"
          :image="image"
        />
      </div>

    </div>
  </div>
</template>

<style></style>
