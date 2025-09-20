<script setup lang="ts">
useHead({
  title: 'Sentimony Records',
  meta: [
    { name: 'description', content: 'Psychedelic Music Label' }
  ]
})

// Auto-log page visit
onMounted(() => {
  if (import.meta.client) {
    fetch('/.netlify/functions/logger').catch(() => {
      // Silent fail if function not available
    })
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#052e16] via-[#064e2a] to-[#065f32] font-montserrat">
    <div class="text-center max-w-md mx-auto px-6">
      <!-- SVG Logo -->
      <div class="mb-8">
        <svg class="w-24 h-24 mx-auto text-white" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="45" stroke="currentColor" stroke-width="2" fill="none"/>
          <circle cx="50" cy="50" r="20" fill="currentColor"/>
          <path d="M30 30 L70 70 M70 30 L30 70" stroke="currentColor" stroke-width="2"/>
        </svg>
      </div>

      <!-- Label Name -->
      <h1 class="text-4xl font-bold text-white mb-4 font-julius-sans-one">
        SENTIMONY RECORDS
      </h1>

      <!-- Slogan -->
      <p class="text-green-200 mb-8 text-lg">
        Psychedelic Music Label
      </p>

      <!-- CTA Button -->
      <a
        href="https://sentimony.com"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white transition-all duration-300 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full hover:from-green-500 hover:to-emerald-500 hover:scale-105 hover:shadow-xl transform"
      >
        Visit Website
      </a>
    </div>
  </div>
</template>

<style>
body {
  font-family: 'Montserrat', sans-serif;
}

.font-julius-sans-one {
  font-family: 'Julius Sans One', cursive;
}

.font-montserrat {
  font-family: 'Montserrat', sans-serif;
}
</style>
