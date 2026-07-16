// Release dates come from sentimony-nuxt's db-export (db.videos[].date), pinned
// here as data so the page can sort by release date. Keyed by video slug; the
// file name is `{slug}_th.jpg`, so its date is videoDates[slug].
export const videoDates: Record<string, string> = {
  'zymosis-serdenko':                '2018-06-20',
  'zymosis-live-kaleidoscopie-2019': '2019-06-16',
  'zymosis-last-call':               '2019-12-13',
  'boketto-scitalis':                '2020-04-10',
  'zymosis-live-chillary-2021':      '2021-08-27',
  'irukanji-live-eve8-2022':         '2022-11-04',
}

export const videoImages = [
  'boketto-scitalis_th.jpg',
  'irukanji-live-eve8-2022_th.jpg',
  'zymosis-last-call_th.jpg',
  'zymosis-live-chillary-2021_th.jpg',
  'zymosis-live-kaleidoscopie-2019_th.jpg',
  'zymosis-serdenko_th.jpg'
]
