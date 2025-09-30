<script setup lang="ts">
useHead({
  title: 'SVG Icons · Digital Keeper',
  meta: [
    { name: 'description', content: 'Digital Keeper storing SVG Icons on this page. All this SVG Icons used on portfolio website of Sentimony Records, a psychedelic music label.' }
  ]
})

// Auto-log page visit
// onMounted(() => {
//   if (import.meta.client) {
//     fetch('/.netlify/functions/logger').catch(() => {
//     })
//   }
// })

const svgIcons = [
  'amazon-music.svg',
  'apple-music-2.svg',
  'apple-music.svg',
  'arrow-left.svg',
  'arrow-right.svg',
  'bandcamp.svg',
  'beatport-2.svg',
  'beatport.svg',
  'close.svg',
  'deezer-2.svg',
  'deezer.svg',
  'diggers-factory.svg',
  'discogs.svg',
  'facebook.svg',
  'google-play.svg',
  'googleplus.svg',
  'instagram.svg',
  'junodownload.svg',
  'linkedin.svg',
  'menu.svg',
  'mixcloud.svg',
  'napster-2.svg',
  'napster.svg',
  'patreon.svg',
  'public.svg',
  'qobuz.svg',
  'sentimony-records-logo-v3.1.svg',
  'sentimony-records-logo-v3.2.svg',
  'sentimony-records-logo-v3.3.svg',
  'sentimony-records-logo.svg',
  'soundcloud-2.svg',
  'soundcloud-3.svg',
  'soundcloud.svg',
  'spotify-2.svg',
  'spotify.svg',
  'tidal-2.svg',
  'tidal.svg',
  'tiktok.svg',
  'twitter.svg',
  'vkontakte.svg',
  'youtube-2.svg',
  'youtube-music-2.svg',
  'youtube-music.svg',
  'youtube.svg'
]
</script>

<template>
  <div class="flex items-top justify-center">
    <div class="text-center my-16 px-4">

      <h1 class="text-5xl text-white mb-4 font-Julius tracking-widest uppercase">
        SVG Icons
      </h1>

      <div class="text-left text-white mt-4 mb-16 indent-5 max-w-xl mx-auto [&>p]:mb-4">
        <p>Digital Keeper storing SVG Icons on this page. All this SVG Icons used on portfolio website of Sentimony Records, a psychedelic music label.</p>
      </div>

      <div class="flex gap-4 justify-center flex-wrap mb-16 max-w-[96rem]">
        <SvgItem
          v-for="icon in svgIcons"
          :key="icon"
          :icon="icon"
        />
      </div>

    </div>
  </div>
</template>

<style></style>
