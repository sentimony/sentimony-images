import { computed, type ComputedRef, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function useImageNavigation(
  items: Ref<readonly string[]> | ComputedRef<readonly string[]>
) {
  const route = useRoute()
  const router = useRouter()

  const activeKey = computed(() => route.query.img as string | undefined)

  const activeIndex = computed(() => {
    const key = activeKey.value
    if (!key) return -1
    return items.value.indexOf(key)
  })

  const hasPrev = computed(() => activeIndex.value > 0)
  const hasNext = computed(() => activeIndex.value < items.value.length - 1)

  const lightboxOpen = computed({
    get: () => activeIndex.value !== -1,
    set: (v) => {
      if (!v) router.replace({ query: { ...route.query, img: undefined } })
    },
  })

  function open(key: string) {
    router.replace({ query: { ...route.query, img: key } })
  }

  function prev() {
    const idx = activeIndex.value
    if (idx > 0) router.replace({ query: { ...route.query, img: items.value[idx - 1] } })
  }

  function next() {
    const idx = activeIndex.value
    if (idx < items.value.length - 1) router.replace({ query: { ...route.query, img: items.value[idx + 1] } })
  }

  return { activeKey, activeIndex, lightboxOpen, hasPrev, hasNext, open, prev, next }
}
