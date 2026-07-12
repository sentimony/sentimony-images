import { ref, computed, onMounted } from 'vue'
import { fetchFileSize } from '~/composables/useFileSize'

export const NAME_SORT_OPTIONS = [
  { value: 'name-asc',  label: 'Alphabetical ↓' },
  { value: 'name-desc', label: 'Alphabetical ↑' },
  { value: 'size-desc', label: 'Size ↓' },
  { value: 'size-asc',  label: 'Size ↑' },
] as const

// Events carry a real date (eventDates), so they sort by it instead of "Default".
export const EVENT_SORT_OPTIONS = [
  { value: 'date-desc', label: 'Event Date ↓' },
  { value: 'date-asc',  label: 'Event Date ↑' },
  { value: 'name-asc',  label: 'Alphabetical ↓' },
  { value: 'name-desc', label: 'Alphabetical ↑' },
  { value: 'size-desc', label: 'Size ↓' },
  { value: 'size-asc',  label: 'Size ↑' },
] as const

// Videos carry a release date (videoDates), same shape as events.
export const VIDEO_SORT_OPTIONS = [
  { value: 'date-desc', label: 'Release Date ↓' },
  { value: 'date-asc',  label: 'Release Date ↑' },
  { value: 'name-asc',  label: 'Alphabetical ↓' },
  { value: 'name-desc', label: 'Alphabetical ↑' },
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

export type ListSortOption =
  | typeof NAME_SORT_OPTIONS[number]['value']
  | typeof EVENT_SORT_OPTIONS[number]['value']
  | typeof VIDEO_SORT_OPTIONS[number]['value']

interface UseListSortOptions {
  initialSort?: ListSortOption
  // Maps a file name to a sortable timestamp; enables the date-asc/date-desc
  // options. Files without a date sort to the end (desc) / start (asc).
  dateFor?: (img: string) => number | undefined
}

export function useListSort(
  images: readonly string[],
  buildSizeUrl: (img: string) => string,
  { initialSort = 'name-asc', dateFor }: UseListSortOptions = {},
) {
  const sortBy = ref<ListSortOption>(initialSort)
  const sizes = useImageSizes(images, buildSizeUrl)

  const sortedImages = computed(() => {
    const imgs = [...images]
    switch (sortBy.value) {
      case 'name-asc':  return imgs.sort((a, b) => a.localeCompare(b))
      case 'name-desc': return imgs.sort((a, b) => b.localeCompare(a))
      case 'size-desc': return imgs.sort((a, b) => (sizes.value.get(b) ?? 0) - (sizes.value.get(a) ?? 0))
      case 'size-asc':  return imgs.sort((a, b) => (sizes.value.get(a) ?? 0) - (sizes.value.get(b) ?? 0))
      // Same-date files (one event's flyers) keep a stable name order.
      case 'date-asc':  return imgs.sort((a, b) => ((dateFor?.(a) ?? Infinity) - (dateFor?.(b) ?? Infinity)) || a.localeCompare(b))
      case 'date-desc': return imgs.sort((a, b) => ((dateFor?.(b) ?? -Infinity) - (dateFor?.(a) ?? -Infinity)) || a.localeCompare(b))
      default:          return imgs
    }
  })

  return { sortBy, sortedImages }
}
