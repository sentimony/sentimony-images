<script setup lang="ts">
import { ref, computed } from 'vue'
import { useHead } from '@unhead/vue'
import SvgItem from '~/components/SvgItem.vue'
import ImageLightbox from '~/components/ImageLightbox.vue'
import { SplinePointer } from 'lucide-vue-next'
import { svgIcons } from '~/data/svg-icons'

useHead({
  title: 'SVG Icons',
  meta: [
    { name: 'description', content: 'The complete set of vector icons that power the Sentimony Records website: social links, music platforms, navigation and the label\'s own marks.' }
  ]
})

// Auto-log page visit
// onMounted(() => {
//   if (import.meta.client) {
//     fetch('/.netlify/functions/logger').catch(() => {
//     })
//   }
// })

const activeIcon = ref<string | null>(null)
const lightboxOpen = computed({
  get: () => activeIcon.value !== null,
  set: (v) => {
    if (!v) activeIcon.value = null
  },
})
</script>

<template>
  <div class="flex items-top justify-center">
    <div class="text-center my-16 px-4">

      <h1 class="font-bold text-4xl text-white mb-4 font-Julius tracking-widest uppercase flex items-center justify-center gap-4">
        <SplinePointer class="size-10 shrink-0" :stroke-width="2" />
        SVG Icons
      </h1>

      <div class="text-left text-white mt-4 mb-16 indent-5 max-w-xl mx-auto [&>p]:mb-4">
        <p>The complete set of vector icons that power the Sentimony Records website: social links, music platforms, navigation and the label's own marks.</p>
      </div>

      <div class="flex gap-4 justify-center flex-wrap mb-16 max-w-384">
        <SvgItem
          v-for="icon in svgIcons"
          :key="icon"
          :icon="icon"
          @select="activeIcon = $event"
        />
      </div>

    </div>

    <ImageLightbox
      v-model:open="lightboxOpen"
      :src="activeIcon ? `/assets/img/svg-icons/${activeIcon}` : ''"
      :title="activeIcon ?? ''"
    />
  </div>
</template>

<style></style>
