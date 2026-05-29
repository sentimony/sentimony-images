import { ref, watch } from 'vue'

export const ARTIST_SORT_OPTIONS = [
  { value: 'date-desc', label: 'Date Joined ↓' },
  { value: 'date-asc',  label: 'Date Joined ↑' },
  { value: 'alpha',     label: 'Alphabetical' },
] as const

export const RELEASE_SORT_OPTIONS = [
  { value: 'date-desc', label: 'Release Date ↓' },
  { value: 'date-asc',  label: 'Release Date ↑' },
  { value: 'alpha',     label: 'Alphabetical' },
] as const

export type ImageSortOption = 'date-desc' | 'date-asc' | 'alpha'

const isValidSort = (v: unknown): v is ImageSortOption =>
  v === 'date-desc' || v === 'date-asc' || v === 'alpha'

function createSortComposable(storageKey: string) {
  const sortBy = ref<ImageSortOption>('date-desc')
  let hydrated = false

  return function useSort() {
    if (!hydrated && typeof window !== 'undefined') {
      hydrated = true
      try {
        const stored = localStorage.getItem(storageKey)
        if (isValidSort(stored)) sortBy.value = stored
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

export function sortImages(images: readonly string[], sort: ImageSortOption): string[] {
  switch (sort) {
    case 'alpha':    return [...images].sort((a, b) => a.localeCompare(b))
    case 'date-asc': return [...images]
    case 'date-desc':
    default:         return [...images].reverse()
  }
}
