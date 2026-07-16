import { ref, watch } from 'vue'

export const ARTIST_SORT_OPTIONS = [
  { value: 'date-desc',  label: 'Date Joined ↓' },
  { value: 'date-asc',   label: 'Date Joined ↑' },
  { value: 'alpha-asc',  label: 'Alphabetical ↓' },
  { value: 'alpha-desc', label: 'Alphabetical ↑' },
  { value: 'size-desc',  label: 'Size ↓' },
  { value: 'size-asc',   label: 'Size ↑' },
] as const

export const RELEASE_SORT_OPTIONS = [
  { value: 'date-desc',  label: 'Release Date ↓' },
  { value: 'date-asc',   label: 'Release Date ↑' },
  { value: 'alpha-asc',  label: 'Alphabetical ↓' },
  { value: 'alpha-desc', label: 'Alphabetical ↑' },
  { value: 'size-desc',  label: 'Size ↓' },
  { value: 'size-asc',   label: 'Size ↑' },
] as const

export type ImageSortOption = 'date-desc' | 'date-asc' | 'alpha-asc' | 'alpha-desc' | 'size-desc' | 'size-asc'

const isValidSort = (v: unknown): v is ImageSortOption =>
  v === 'date-desc' || v === 'date-asc' || v === 'alpha-asc' || v === 'alpha-desc' || v === 'size-desc' || v === 'size-asc'

function createSortComposable(storageKey: string) {
  const sortBy = ref<ImageSortOption>('date-desc')
  let hydrated = false

  return function useSort() {
    if (!hydrated && typeof window !== 'undefined') {
      hydrated = true
      try {
        const stored = localStorage.getItem(storageKey)
        // Legacy: 'alpha' was the single A→Z option before the asc/desc split.
        const migrated = stored === 'alpha' ? 'alpha-asc' : stored
        if (isValidSort(migrated)) sortBy.value = migrated
      } catch {}
      watch(sortBy, v => {
        try { localStorage.setItem(storageKey, v) } catch {}
      })
    }
    return { sortBy }
  }
}

export const useArtistSort  = createSortComposable('sentimony.artists.sort')
export const useReleaseSort = createSortComposable('sentimony.releases.sort')

export function sortImages(images: readonly string[], sort: ImageSortOption, sizes?: ReadonlyMap<string, number>): string[] {
  switch (sort) {
    case 'alpha-asc':  return [...images].sort((a, b) => a.localeCompare(b))
    case 'alpha-desc': return [...images].sort((a, b) => b.localeCompare(a))
    case 'size-desc': return [...images].sort((a, b) => (sizes?.get(b) ?? 0) - (sizes?.get(a) ?? 0))
    case 'size-asc':  return [...images].sort((a, b) => (sizes?.get(a) ?? 0) - (sizes?.get(b) ?? 0))
    case 'date-asc':  return [...images]
    case 'date-desc':
    default:          return [...images].reverse()
  }
}
