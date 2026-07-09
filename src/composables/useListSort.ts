import { ref, computed, onMounted } from 'vue'
import { fetchFileSize } from '~/composables/useFileSize'

export const LIST_SORT_OPTIONS = [
  { value: 'default',   label: 'Default' },
  { value: 'name-asc',  label: 'Name A→Z' },
  { value: 'name-desc', label: 'Name Z→A' },
  { value: 'size-desc', label: 'Size ↓' },
  { value: 'size-asc',  label: 'Size ↑' },
] as const

export function useImageSizes(images: readonly string[], buildSizeUrl: (img: string) => string) {
  const sizes = ref(new Map<string, number>())

  onMounted(() => {
    images.forEach(async (img) => {
      const bytes = await fetchFileSize(buildSizeUrl(img))
      if (bytes) sizes.value.set(img, bytes)
    })
  })

  return sizes
}

export type ListSortOption = typeof LIST_SORT_OPTIONS[number]['value']

export function useListSort(images: readonly string[], buildSizeUrl: (img: string) => string) {
  const sortBy = ref<ListSortOption>('default')
  const sizes = useImageSizes(images, buildSizeUrl)

  const sortedImages = computed(() => {
    const imgs = [...images]
    switch (sortBy.value) {
      case 'name-asc':  return imgs.sort((a, b) => a.localeCompare(b))
      case 'name-desc': return imgs.sort((a, b) => b.localeCompare(a))
      case 'size-desc': return imgs.sort((a, b) => (sizes.value.get(b) ?? 0) - (sizes.value.get(a) ?? 0))
      case 'size-asc':  return imgs.sort((a, b) => (sizes.value.get(a) ?? 0) - (sizes.value.get(b) ?? 0))
      default:          return imgs
    }
  })

  return { sortBy, sortedImages }
}
