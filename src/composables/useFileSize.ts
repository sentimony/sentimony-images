// Shared HEAD-request queue: caps concurrent network requests so a route
// change aborts at most MAX_CONCURRENT in-flight fetches instead of flooding
// the console with ERR_ABORTED for every queued image.
const MAX_CONCURRENT = 4
let active = 0
const waiting: (() => void)[] = []

function release() {
  const next = waiting.shift()
  if (next) next()
  else active--
}

export async function fetchFileSize(url: string, signal?: AbortSignal): Promise<number | null> {
  if (active < MAX_CONCURRENT) active++
  else await new Promise<void>((resolve) => waiting.push(resolve))
  try {
    if (signal?.aborted) return null
    const init: RequestInit = { method: 'HEAD' }
    if (signal) init.signal = signal
    const res = await fetch(url, init)
    const bytes = Number(res.headers.get('content-length'))
    return bytes > 0 ? bytes : null
  } catch {
    return null
  } finally {
    release()
  }
}

export function formatFileSize(bytes: number): string {
  return bytes < 1024 * 1024
    ? `${Math.round(bytes / 1024)} KB`
    : `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

// SVGs are small enough that exact bytes matter; the KB hint helps once the number gets long
export function formatSvgFileSize(bytes: number): string {
  return bytes < 10000
    ? `${bytes} B`
    : `${bytes} B (${Math.round(bytes / 1024)} KB)`
}
