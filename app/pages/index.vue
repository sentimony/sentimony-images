<script setup lang="ts">
useHead({
  title: 'Digital Keeper · Sentimony Records',
  meta: [
    { name: 'description', content: 'Digital Keeper is a repository for storing content files of Sentimony Records, a psychedelic music label. Label keeps here artworks of releases, merch images, event fyers, artists photo, music video covers, logotypes versions, svg icons, website backgrounds.' }
  ]
})

// Auto-log page visit
// onMounted(() => {
//   if (import.meta.client) {
//     fetch('/.netlify/functions/logger').catch(() => {
//       // Silent fail if function not available
//     })
//   }
// })
</script>


<template>
  <div class="flex items-center justify-center">
    <div class="text-center my-16 px-4">

      <img src="/assets/img/svg-icons/sentimony-records-logo-v3.3.svg?01" alt="Sentimony Records logo svg v3.3" width="80" height="80" class="mx-auto mb-4"/>

      <!-- <div class="mb-8">
        <svg class="w-24 h-24 mx-auto text-white" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="45" stroke="currentColor" stroke-width="2" fill="none"/>
          <circle cx="50" cy="50" r="20" fill="currentColor"/>
          <path d="M30 30 L70 70 M70 30 L30 70" stroke="currentColor" stroke-width="2"/>
        </svg>
      </div> -->

      <h1 class="text-5xl text-white mb-4 font-Julius tracking-widest uppercase">
        Sentimony<br>Records
      </h1>

      <h2 class="text-lg text-green-200 mb-16 font-Julius tracking-widest uppercase">
        Psychedelic Music Label
      </h2>

      <a
        href="https://sentimony.com"
        class="inline-flex items-center justify-center px-8 py-3 text-lg text-white transition-all ease-in-out duration-300 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full hover:from-green-500 hover:to-emerald-500 hover:scale-105 hover:shadow-xl"
        target="_blank"
        rel="noopener noreferrer"
        v-wave
      >
        Visit Website
      </a>

      <div class="text-left text-white mt-16 mb-8 indent-5 max-w-xl [&>p]:mb-4 [&>p>a]:text-green-500 hover:[&>p>a]:text-green-700">
        <p>Hi, you are at the home page of "Digital Keeper" - a repository for storing content files of Sentimony Records, a psychedelic music label.</p>
        <p>Label keeps here artworks of releases, merch images, event fyers, artists photo, music video covers, logotypes versions, svg icons, website backgrounds.</p>
        <p>Developed on JAMstack architecture using Nuxt, Netlify, Tailwind. The code is open, you can check the code on <a href="https://github.com/sentimony/digital-keeper" class="text-blue-500 underline">GitHub</a>.</p>
        <p>And if you are interested in web development, like me, feel free to leave your feedback, or ask a question, or create an issue. I will definitely pay attention to it.</p>
        <p>Have fun ;)</p>
      </div>

    </div>
  </div>
</template>

<style></style>
