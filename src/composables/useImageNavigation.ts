import { computed, type ComputedRef, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// The ?img= query param holds the file name without extension; old links
// with an extension still resolve because both sides are stripped.
const stripExt = (name: string) => name.replace(/\.\w+$/, '')

export function useImageNavigation(
  items: Ref<readonly string[]> | ComputedRef<readonly string[]>
) {
  const route = useRoute()
  const router = useRouter()

  const activeKey = computed(() => {
    const q = route.query.img
    if (typeof q !== 'string') return undefined
    const slug = stripExt(q)
    return items.value.find(item => stripExt(item) === slug)
  })

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
    router.replace({ query: { ...route.query, img: stripExt(key) } })
  }

  function goTo(idx: number) {
    const target = items.value[idx]
    if (target) router.replace({ query: { ...route.query, img: stripExt(target) } })
  }

  function prev() {
    if (activeIndex.value > 0) goTo(activeIndex.value - 1)
  }

  function next() {
    goTo(activeIndex.value + 1)
  }

  return { activeKey, activeIndex, lightboxOpen, hasPrev, hasNext, open, prev, next }
}

export function useLightboxImage(
  activeKey: ComputedRef<string | undefined>,
  folder: string,
  thumbToXl = false
) {
  const activeTitle = computed(() => {
    const key = activeKey.value
    if (!key) return ''
    return thumbToXl ? key.replace('_th.jpg', '_xl.jpg') : key
  })
  const activeSrc = computed(() => activeTitle.value ? `/assets/img/${folder}/${activeTitle.value}` : '')
  return { activeSrc, activeTitle }
}
