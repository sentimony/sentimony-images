<script setup lang="ts">
import { useHead } from '@unhead/vue'
import SvgImageItem from '~/components/SvgImageItem.vue'
import { PenTool } from 'lucide-vue-next'

useHead({
  title: 'SVG Images',
  meta: [
    { name: 'description', content: 'A collection of hand-drawn vector illustrations: playful characters, nature scenes and mandalas created for Sentimony Records.' }
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

      <h1 class="font-bold text-4xl text-white mb-4 font-Julius tracking-widest uppercase flex items-center justify-center gap-4">
        <PenTool class="size-10 shrink-0" :stroke-width="2" />
        SVG Images
      </h1>

      <div class="text-left text-white mt-4 mb-16 indent-5 max-w-xl mx-auto [&>p]:mb-4">
        <p>A collection of hand-drawn vector illustrations: playful characters, nature scenes and mandalas created for Sentimony Records.</p>
      </div>

      <div class="flex gap-4 justify-center flex-wrap mb-16 max-w-384">
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
