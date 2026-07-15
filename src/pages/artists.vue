<script setup lang="ts">
import { computed, ref } from 'vue'
import { useHead } from '@unhead/vue'
import { ARTIST_SORT_OPTIONS, useArtistSort } from '~/composables/useImageSort'
import Item from '~/components/Item.vue'
import ArtistPlaceholderItem from '~/components/ArtistPlaceholderItem.vue'
import SortToggle from '~/components/SortToggle.vue'
import ImageLightbox from '~/components/ImageLightbox.vue'
import ImagePageLayout from '~/components/ImagePageLayout.vue'
import { KeyboardMusic, Eye, EyeOff } from 'lucide-vue-next'
import { artistImages, artistsWithoutImages, artistDates, artistIds } from '~/data/artist-images'
import { useImageNavigation, useLightboxImage } from '~/composables/useImageNavigation'
import { useImageSizes } from '~/composables/useListSort'

useHead({
  title: 'Artists',
  meta: [
    { name: 'description', content: 'Portraits of the producers, live acts and collaborators behind the music, the people who have shaped the Sentimony Records sound since 2007.' }
  ]
})

const { sortBy } = useArtistSort()
const sizes = useImageSizes(artistImages, (img) => `/assets/img/artists/${img.replace('_th.jpg', '_xl.jpg')}`)

const slugOf = (image: string) => image.replace(/-\d+_(th|xl)\.jpg$/, '')

// A grid entry is either an artist with a portrait (image set) or a
// placeholder for one that appears in releases/events but has no photo yet.
interface ArtistEntry {
  slug: string
  image?: string
}

// "All" reveals artists without a portrait; they are woven into the same list.
const showAll = ref(false)

const entries = computed<ArtistEntry[]>(() => {
  const withImages = artistImages.map((image) => ({ slug: slugOf(image), image }))
  if (!showAll.value) return withImages
  return [...withImages, ...artistsWithoutImages.map((slug) => ({ slug }))]
})

const sortedEntries = computed<ArtistEntry[]>(() => {
  const list = [...entries.value]
  const sort = sortBy.value
  const bySlug = (a: ArtistEntry, b: ArtistEntry) => a.slug.localeCompare(b.slug)
  const dateOf = (e: ArtistEntry) => artistDates[e.slug] ?? ''
  const sizeOf = (e: ArtistEntry) => (e.image ? sizes.value.get(e.image) ?? 0 : 0)
  // Artist ID (category_id) is assigned by first-appearance date, so the "Date
  // Joined" toggle sorts by it. The few artists with no db record (no id) fall
  // back to their date so they don't clump together.
  const idOf = (e: ArtistEntry) => Number(artistIds[e.slug] ?? Number.NaN)
  const byId = (a: ArtistEntry, b: ArtistEntry) => {
    const ia = idOf(a), ib = idOf(b)
    if (Number.isNaN(ia) && Number.isNaN(ib)) return dateOf(a).localeCompare(dateOf(b)) || bySlug(a, b)
    if (Number.isNaN(ia)) return 1
    if (Number.isNaN(ib)) return -1
    return ia - ib
  }

  switch (sort) {
    case 'alpha-asc':  return list.sort(bySlug)
    case 'alpha-desc': return list.sort((a, b) => bySlug(b, a))
    case 'date-asc':   return list.sort(byId)
    case 'date-desc':  return list.sort((a, b) => byId(b, a))
    // Placeholders have no file size, so keep them together at the tail (alphabetical).
    case 'size-desc':
    case 'size-asc': {
      const withImg = list.filter((e) => e.image)
      const withoutImg = list.filter((e) => !e.image).sort(bySlug)
      withImg.sort((a, b) => sort === 'size-desc' ? sizeOf(b) - sizeOf(a) : sizeOf(a) - sizeOf(b))
      return [...withImg, ...withoutImg]
    }
    default: return list
  }
})

// Lightbox navigation walks only the artists that have a portrait, in the
// current sort order; placeholders are not openable.
const sortedArtistImages = computed(() =>
  sortedEntries.value.filter((e) => e.image).map((e) => e.image as string)
)

const { lightboxOpen, activeKey, hasPrev, hasNext, open, prev, next } = useImageNavigation(sortedArtistImages)
const { activeSrc, activeTitle } = useLightboxImage(activeKey, 'artists', true)

const activeDate = computed(() => {
  const key = activeKey.value
  if (!key) return undefined
  return artistDates[slugOf(key)]
})

const activeId = computed(() => {
  const key = activeKey.value
  if (!key) return undefined
  return artistIds[slugOf(key)]
})
</script>

<template>
  <ImagePageLayout title="Artists" :icon="KeyboardMusic">
    <template #description>
      <p>Portraits of the producers, live acts and collaborators behind the music, the people who have shaped the Sentimony Records sound since 2007.</p>
    </template>

    <template #filter>
      <button
        type="button"
        v-wave
        :aria-pressed="showAll"
        :title="showAll ? 'Showing all artists' : 'Show all artists'"
        class="inline-flex items-center gap-1 h-7 rounded-md border px-2 text-xs cursor-pointer transition-colors"
        :class="showAll
          ? 'border-white/30 bg-white/20 text-white'
          : 'border-white/20 bg-white/10 text-white/70 hover:bg-white/15'"
        @click="showAll = !showAll"
      >
        <component :is="showAll ? Eye : EyeOff" class="size-4 shrink-0" />
        <span>All</span>
      </button>
    </template>

    <template #sort>
      <SortToggle v-model="sortBy" :options="ARTIST_SORT_OPTIONS" />
    </template>

    <template v-for="entry in sortedEntries" :key="entry.image ?? entry.slug">
      <Item
        v-if="entry.image"
        :image="entry.image"
        folder="artists"
        @select="open($event.key)"
      />
      <ArtistPlaceholderItem v-else :slug="entry.slug" />
    </template>

    <template #lightbox>
      <ImageLightbox
        v-model:open="lightboxOpen"
        :src="activeSrc"
        :title="activeTitle"
        date-label="Date Joined"
        :date-value="activeDate"
        id-label="Artist ID"
        :id-value="activeId"
        :has-prev="hasPrev"
        :has-next="hasNext"
        @prev="prev"
        @next="next"
      />
    </template>
  </ImagePageLayout>
</template>

<style></style>
