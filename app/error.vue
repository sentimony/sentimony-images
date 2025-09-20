<script setup lang="ts">
const { error } = defineProps<{
  error?: any
}>()

useHead({
  title: '404 - Page Not Found | Sentimony Records',
  meta: [
    { name: 'description', content: 'The page you are looking for could not be found.' }
  ]
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="min-h-screen relative font-montserrat bg-gradient-to-br from-[#052e16] via-[#064e2a] to-[#065f32]">
    <!-- Background overlay -->
    <div class="fixed inset-0 bg-gradient-to-br from-[#052e16]/80 via-[#064e2a]/70 to-[#065f32]/80"></div>

    <!-- Main content -->
    <div class="relative z-10 flex items-center justify-center min-h-screen px-6">
      <div class="text-center max-w-2xl mx-auto">
        <!-- 404 Number -->
        <h1 class="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-green-300 to-emerald-200 bg-clip-text text-transparent mb-8 font-julius-sans-one leading-none">
          404
        </h1>

        <!-- Error message -->
        <div class="mb-8">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Lost in the Psychedelic Space
          </h2>
          <p class="text-xl text-green-100 leading-relaxed">
            The page you're looking for has transcended to another dimension.
            Let's guide you back to reality.
          </p>
        </div>

        <!-- Error details -->
        <div v-if="error" class="bg-black/30 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-green-500/20">
          <p class="text-green-300 font-semibold mb-2">Error Details:</p>
          <p class="text-gray-300 font-mono text-sm">{{ error.statusMessage || 'Page not found' }}</p>
        </div>

        <!-- Action buttons -->
        <div class="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <button
            @click="handleError"
            class="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white transition-all duration-300 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full hover:from-green-500 hover:to-emerald-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25 transform w-full sm:w-auto"
          >
            <Icon name="heroicons:home" class="mr-2 text-xl" />
            Back to Home
          </button>

          <NuxtLink
            to="/"
            class="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-green-300 transition-all duration-300 border-2 border-green-500 rounded-full hover:bg-green-500 hover:text-white transform w-full sm:w-auto"
          >
            <Icon name="heroicons:arrow-left" class="mr-2 text-xl" />
            Navigate Home
          </NuxtLink>
        </div>

        <!-- API status -->
        <div class="mt-12 bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/20">
          <h3 class="text-lg font-bold text-green-300 mb-3">Images API Still Working</h3>
          <p class="text-gray-300 text-sm mb-3">Try accessing an image:</p>
          <div class="bg-gray-900/50 rounded p-2 font-mono text-xs text-emerald-400 break-all">
            /.netlify/functions/image?f=your-image.jpg&w=300&h=200&q=80
          </div>
        </div>
      </div>
    </div>
  </div>
</template>