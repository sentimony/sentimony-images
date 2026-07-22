// Event dates come from sentimony-nuxt's db-export (db.events[].date), pinned
// here as data so the page can sort by event date. Keyed by event slug; the
// file name is `{slug}[_a|_b]_xl.jpg`, so its date is eventDates[slug].
export const eventDates: Record<string, string> = {
  'shift-space': '2008-11-01',
  'alt-space':   '2009-11-21',
  'water-marks': '2010-08-28',
  'home-space':  '2010-11-13',
  'five-years':  '2011-11-05',
}

export const eventImages = [
  'alt-space_a_og.jpg',
  'alt-space_a_th.jpg',
  // 2009-11-21 alt-space
  'alt-space_a_xl.jpg',
  'alt-space_b_th.jpg',
  'alt-space_b_xl.jpg',
  'alt-space_th.jpg',
  'alt-space_xl.jpg',
  'five-years_a_og.jpg',
  'five-years_a_th.jpg',

  // 2011-11-05 five-years
  'five-years_a_xl.jpg',
  'five-years_b_th.jpg',
  'five-years_b_xl.jpg',
  'five-years_th.jpg',
  'five-years_xl.jpg',
  'home-space_a_og.jpg',
  'home-space_a_th.jpg',

  // 2010-11-13 home-space
  'home-space_a_xl.jpg',
  'home-space_b_th.jpg',
  'home-space_b_xl.jpg',
  'home-space_th.jpg',
  'home-space_xl.jpg',
  'shift-space_a_og.jpg',
  'shift-space_a_th.jpg',

  // 2008-11-01 shift-space
  'shift-space_a_xl.jpg',
  'shift-space_b_th.jpg',
  'shift-space_b_xl.jpg',
  'shift-space_th.jpg',
  'shift-space_xl.jpg',
  'water-marks_a_og.jpg',
  'water-marks_a_th.jpg',

  // 2010-08-28 water-marks
  'water-marks_a_xl.jpg',
  'water-marks_b_th.jpg',
  'water-marks_b_xl.jpg',
  'water-marks_th.jpg',
  'water-marks_xl.jpg'
]
