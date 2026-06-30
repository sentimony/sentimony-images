import { ref, computed, onMounted } from 'vue'

export const LIST_SORT_OPTIONS = [
  { value: 'default',   label: 'Default' },
  { value: 'name-asc',  label: 'Name A→Z' },
  { value: 'name-desc', label: 'Name Z→A' },
  { value: 'size-desc', label: 'Size ↓' },
  { value: 'size-asc',  label: 'Size ↑' },
] as const

export function useListSort(images: readonly string[], buildSizeUrl: (img: string) => string) {
  const sortBy = ref('default')
  const sizes = ref(new Map<string, number>())
  let loaded = false

  async function loadSizes() {
    if (loaded) return
    loaded = true
    await Promise.all(images.map(async (img) => {
      try {
        const res = await fetch(buildSizeUrl(img), { method: 'HEAD' })
        const bytes = Number(res.headers.get('content-length'))
        if (bytes > 0) sizes.value.set(img, bytes)
      } catch {}
    }))
  }

  onMounted(loadSizes)

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
