<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { ArrowUpRight, Github } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'

useHead({
  title: 'Home',
  meta: [
    { name: 'description', content: 'Digital Keeper is a repository for storing content files of Sentimony Records, a psychedelic music label. Label keeps here artworks of releases, merch images, event fyers, artists photo, music video covers, logotypes versions, svg icons, website backgrounds.' }
  ]
})
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="text-center my-16 px-4">

      <img src="/assets/img/svg-icons/sentimony-records-logo-v3.3.svg?01" alt="Sentimony Records logo svg v3.3" width="80" height="80" class="mx-auto mb-4" />

      <h1 class="text-5xl text-white mb-4 font-Julius tracking-widest uppercase">
        Sentimony<br>Records
      </h1>

      <h2 class="text-lg text-green-200 mb-16 font-Julius tracking-widest uppercase">
        Psychedelic Music Label
      </h2>

      <Button
        as="a"
        href="https://sentimony.com"
        target="_blank"
        rel="noopener noreferrer"
        v-wave
        class="h-auto rounded-full px-8 py-3 text-lg text-white transition-colors duration-300 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500"
      >
        Visit Website
        <ArrowUpRight class="size-5" />
      </Button>

      <Card class="mt-16 mb-8 max-w-xl mx-auto text-left backdrop-blur-xs">
        <CardContent class="text-white text-base indent-5 [&>p]:mb-4 [&>p:last-child]:mb-0">
          <p>"Digital Keeper" is a repository for the content files of Sentimony Records, a psychedelic music label - release artworks, artist photos, event flyers, video covers, logos, SVG icons and website backgrounds.</p>
          <p>Built with Vue, Vite &amp; Tailwind. The code is open - feel free to explore it on <a href="https://github.com/sentimony/sentimony-images" class="text-green-500 underline hover:text-green-400" target="_blank" rel="noopener noreferrer" title="Opens in a new tab"><Github class="inline-block size-4 mr-0.5 align-[-0.2em]" />GitHub<ArrowUpRight class="inline-block size-4 ml-0.5 align-[-0.2em]" /></a>.</p>
        </CardContent>
      </Card>

    </div>
  </div>
</template>

<style></style>
