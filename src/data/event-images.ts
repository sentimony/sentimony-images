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
  // 2009-11-21 alt-space
  'alt-space_a_xl.jpg',
  'alt-space_b_xl.jpg',
  'alt-space_xl.jpg',

  // 2011-11-05 five-years
  'five-years_a_xl.jpg',
  'five-years_b_xl.jpg',
  'five-years_xl.jpg',

  // 2010-11-13 home-space
  'home-space_a_xl.jpg',
  'home-space_b_xl.jpg',
  'home-space_xl.jpg',

  // 2008-11-01 shift-space
  'shift-space_a_xl.jpg',
  'shift-space_b_xl.jpg',
  'shift-space_xl.jpg',

  // 2010-08-28 water-marks
  'water-marks_a_xl.jpg',
  'water-marks_b_xl.jpg',
  'water-marks_xl.jpg'
]
