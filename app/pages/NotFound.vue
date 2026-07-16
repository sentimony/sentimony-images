<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import { House } from 'lucide-vue-next'

const router = useRouter()

const handleError = () => router.push('/')

useHead({
  title: '404',
  // Ensure our title formatting persists and does not get cleared
  titleTemplate: (title?: string) => title ? `${title} · Digital Keeper` : 'Digital Keeper',
})
</script>

<template>
  <div class="max-w-sm flex-1 flex flex-col justify-center mx-auto px-2 text-center text-white ">
    <div class="md:font-bold text-4xl my-4 md:my-6">404</div>
    <div class="mb-6">Page Not Found</div>
    <div>
      <button
        @click="handleError"
        class="transition-background ease-in-out duration-300 inline-flex items-center h-9 md:h-10.5 text-[12px] md:text-[15px] tracking-tighter rounded-md border hover:bg-white/30 px-3 md:px-4 mb-2 mr-2 last:mr-0 shadow-[0_2px_10px_0_rgba(0,0,0,0.5)] backdrop-blur-xs"
        v-wave
      >
        <House class="size-4 mr-2 shrink-0" :stroke-width="2" />
        <span>Go Home</span>
      </button>
    </div>
  </div>
</template>
