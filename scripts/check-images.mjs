#!/usr/bin/env node
// Compares files in public/assets/img against the image config arrays in
// src/data/*.ts and reports what to add and where. Read-only: recommendations
// only, always exits 0. Fixes are applied by scripts/fix-configs.mjs
// (npm run fix:configs), which imports the shared logic from here.
// Release data: site API -> fallback to the export in the sibling sentimony-nuxt repo.

import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const IMG_DIR = join(root, 'public/assets/img')
export const DATA_DIR = join(root, 'src/data')

const API_URL = 'https://sentimony.com/api/releases'
const DB_FALLBACK = resolve(root, '../sentimony-nuxt/public/data/sentimony-db-export.json')

// thumbs: config lists only *_th.jpg; _xl/_og siblings live next to them on disk
export const PAGES = [
  { file: 'release-images.ts', array: 'releaseImages', folder: 'releases', thumbs: true, chronology: 'releases' },
  { file: 'artist-images.ts', array: 'artistImages', folder: 'artists', thumbs: true, chronology: 'artists', xlOnly: ['hagen-01_xl.jpg'] },
  { file: 'playlist-images.ts', array: 'playlistImages', folder: 'playlists', thumbs: true },
  { file: 'video-images.ts', array: 'videoImages', folder: 'videos', thumbs: true },
  { file: 'event-images.ts', array: 'eventImages', folder: 'events' },
  { file: 'background-images.ts', array: 'backgroundImages', folder: 'backgrounds' },
  { file: 'svg-icons.ts', array: 'svgIcons', folder: 'svg-icons' },
  { file: 'svg-images.ts', array: 'svgImages', folder: 'svg-images' },
]

const useColor = process.stdout.isTTY && !process.env.NO_COLOR
const c = (code, s) => useColor ? `\x1b[${code}m${s}\x1b[0m` : s
export const yellow = (s) => c(33, s)
export const green = (s) => c(32, s)
export const red = (s) => c(31, s)
export const dim = (s) => c(2, s)
export const bold = (s) => c(1, s)

// --- Config array parsing ----------------------------------------------------

// Group headers in artist-images.ts look like `// 2019-12-13 va-gatekey-vol-1`.
const HEADER_RE = /^\s*\/\/\s*(\d{4}-\d{2}-\d{2})\s+(\S+)\s*$/

function parseConfigArray(filePath, arrayName) {
  const lines = readFileSync(filePath, 'utf8').split('\n')
  const start = lines.findIndex((l) => l.includes(`const ${arrayName} = [`))
  if (start === -1) return null
  const entries = []
  const headers = [] // release groups: { date, slug, line, lastContentLine }
  let groupOpen = false
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i]
    if (/^\s*\]/.test(line)) break
    const h = line.match(HEADER_RE)
    if (h) {
      headers.push({ date: h[1], slug: h[2], line: i + 1, lastContentLine: i + 1 })
      groupOpen = true
      continue
    }
    const trimmed = line.trim()
    // a free-form comment (not a commented-out entry like `// 'slug'`) starts a
    // curator section and closes the current group, e.g. `// artists without release date`
    if (trimmed.startsWith('//') && !trimmed.startsWith("// '")) {
      groupOpen = false
      continue
    }
    if (trimmed !== '' && groupOpen) headers.at(-1).lastContentLine = i + 1
    const m = line.match(/^\s*'([^']+)',?\s*(\/\/.*)?$/)
    if (m) entries.push({ value: m[1], line: i + 1, comment: m[2] ?? '' })
  }
  return { startLine: start + 1, entries, headers }
}

// --- Release data: API -> local export -> nothing -----------------------------

// Both the API (firebase mode) and the export may return an object instead of an array
const asList = (v) => Array.isArray(v) ? v : Object.values(v ?? {})

export async function loadReleaseData() {
  try {
    // short timeout: this runs on dev server startup and the fallback is local and fast
    const res = await fetch(API_URL, { signal: AbortSignal.timeout(3_000) })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return { source: 'API', releases: asList(await res.json()) }
  } catch { /* offline or API down — try the local export */ }
  try {
    const db = JSON.parse(readFileSync(DB_FALLBACK, 'utf8'))
    return { source: 'локальний export (sentimony-nuxt)', releases: asList(db.releases) }
  } catch {
    return null
  }
}

export function buildIndexes(releases) {
  const releaseInfo = new Map() // slug -> { date, comingSoon }
  const artistFirst = new Map() // artist slug -> { date, release }
  for (const r of releases) {
    if (!r.slug || !r.date) continue
    releaseInfo.set(r.slug, { date: r.date, comingSoon: !!r.coming_soon })
    const artists = typeof r.artists === 'string'
      ? r.artists.split(',').map((s) => s.trim()).filter(Boolean)
      : []
    for (const a of artists) {
      const prev = artistFirst.get(a)
      if (!prev || r.date < prev.date) artistFirst.set(a, { date: r.date, release: r.slug })
    }
  }
  return { releaseInfo, artistFirst }
}

const day = (iso) => iso.slice(0, 10)
const artistSlugOf = (file) => file.replace(/-\d+_th\.jpg$/, '')

// Insertion anchor: the last config entry dated <= the new date (self excluded for moves)
function suggestPosition(entries, dateOf, newDate, exclude = null) {
  let best = null
  for (const e of entries) {
    if (e === exclude) continue
    const d = dateOf(e.value)
    if (d && d <= newDate) best = e
  }
  return best
}

// Artist entries belong at the end of their first release's group; without a
// matching header the placement is curation work, so it stays manual.
function artistGroupAnchor(headers, release) {
  const h = headers.find((x) => x.slug === release)
  return h ? h.lastContentLine : null
}

// Release entry line: the date comment is always regenerated from the data
function releaseLine(file, info) {
  return `  '${file}', // ${day(info.date)}${info.comingSoon ? ' UNRELEASED' : ''}`
}

// --- Config analysis: findings with an optional auto-fix ----------------------
// finding: { msg, fix?: {kind:'insert'|'move', ...}, done?: action label for the fixer }

export function analyzePage({ file, array, folder, thumbs, chronology, xlOnly = [] }, idx) {
  const parsed = parseConfigArray(join(DATA_DIR, file), array)
  if (!parsed) {
    return { file, findings: [{ msg: `${red('не знайдено масив')} ${array} — перевірте scripts/check-images.mjs` }] }
  }
  const { startLine, entries, headers } = parsed

  const allFiles = readdirSync(join(IMG_DIR, folder)).filter((f) => !f.startsWith('.'))
  const fileSet = new Set(allFiles)
  const onDisk = thumbs ? allFiles.filter((f) => f.endsWith('_th.jpg')) : allFiles
  const configSet = new Set(entries.map((e) => e.value))
  const findings = []

  const dateOf = chronology === 'releases'
    ? (v) => idx?.releaseInfo.get(v.replace('_th.jpg', ''))?.date
    : chronology === 'artists'
      ? (v) => idx?.artistFirst.get(artistSlugOf(v))?.date
      : () => undefined

  // 1. File on disk but missing from the config -> insert
  for (const f of onDisk.filter((f) => !configSet.has(f))) {
    if (chronology === 'artists') {
      const first = idx?.artistFirst.get(artistSlugOf(f))
      if (first) {
        const ctx = `перша поява ${day(first.date)} (${first.release})`
        const anchor = artistGroupAnchor(headers, first.release)
        if (anchor) {
          findings.push({
            msg: `${yellow('відсутній у конфігу:')} '${f}' — ${ctx}, вставте у групу '${first.release}' (рядок ${anchor})`,
            fix: { kind: 'insert', afterLine: anchor, text: `  '${f}',` },
            done: `додано '${f}' у групу '${first.release}'`,
          })
        } else {
          // the release has no group header yet — creating one is curation work
          findings.push({ msg: `${yellow('відсутній у конфігу:')} '${f}' — ${ctx}, групи '// ${day(first.date)} ${first.release}' ще немає, додайте її вручну` })
        }
      } else {
        findings.push({ msg: `${yellow('відсутній у конфігу:')} '${f}' — немає в даних релізів, позицію визначте вручну` })
      }
    } else if (chronology === 'releases') {
      const info = idx?.releaseInfo.get(f.replace('_th.jpg', ''))
      if (info) {
        const pos = suggestPosition(entries, dateOf, info.date)
        const where = pos ? `після '${pos.value}' (рядок ${pos.line})` : 'на початок масиву'
        findings.push({
          msg: `${yellow('відсутній у конфігу:')} '${f}' — ${day(info.date)}, вставте ${where}`,
          fix: { kind: 'insert', afterLine: pos ? pos.line : startLine, text: releaseLine(f, info) },
          done: `додано '${f}' ${where}`,
        })
      } else {
        findings.push({ msg: `${yellow('відсутній у конфігу:')} '${f}' — немає в даних релізів, позицію визначте вручну` })
      }
    } else {
      // non-chronological configs keep alphabetical order
      let pos = null
      for (const e of entries) if (e.value < f) pos = e
      findings.push({
        msg: `${yellow('відсутній у конфігу:')} '${f}'`,
        fix: { kind: 'insert', afterLine: pos ? pos.line : startLine, text: `  '${f}',` },
        done: `додано '${f}'${pos ? ` після '${pos.value}'` : ''}`,
      })
    }
  }

  // 2. Config entry without a file on disk — recommendation only (no auto-fix:
  //    the file may have been renamed, deleting a curated entry is irreversible)
  for (const e of entries.filter((e) => !fileSet.has(e.value))) {
    findings.push({ msg: `${red('файла немає на диску:')} '${e.value}' (рядок ${e.line}) — видаліть запис або поверніть файл` })
  }

  // 3. Duplicate config entries — recommendation only (the copies may carry
  //    different inline comments, picking the survivor is a manual call)
  const seen = new Map()
  for (const e of entries) {
    const first = seen.get(e.value)
    if (first) {
      findings.push({ msg: `${yellow('дубль у конфігу:')} '${e.value}' (рядок ${e.line}, перший запис на рядку ${first.line}) — приберіть зайвий` })
    } else {
      seen.set(e.value, e)
    }
  }

  if (thumbs) {
    // 4. _th in config without an _xl pair (the lightbox would open a broken image)
    for (const e of entries) {
      const xl = e.value.replace('_th.jpg', '_xl.jpg')
      if (fileSet.has(e.value) && !fileSet.has(xl)) {
        findings.push({ msg: `${red('немає пари _xl:')} '${xl}' для '${e.value}' (рядок ${e.line})` })
      }
    }
    // 5. Orphan _xl on disk without a _th pair — invisible to the page entirely
    for (const f of allFiles.filter((f) => f.endsWith('_xl.jpg'))) {
      if (!fileSet.has(f.replace('_xl.jpg', '_th.jpg')) && !xlOnly.includes(f)) {
        findings.push({ msg: `${yellow('є _xl без _th:')} '${f}' — додайте '${f.replace('_xl.jpg', '_th.jpg')}' або приберіть файл` })
      }
    }
  }

  // 6. Releases: the date comment is derived data — flag entries whose comment
  //    drifted from the API (wrong date or a missing/stale UNRELEASED label)
  if (chronology === 'releases' && idx) {
    for (const e of entries) {
      const info = idx.releaseInfo.get(e.value.replace('_th.jpg', ''))
      if (!info) continue
      const expected = releaseLine(e.value, info)
      const expectedComment = expected.slice(expected.indexOf('//'))
      if (e.comment !== expectedComment) {
        findings.push({
          msg: `${yellow('застарілий коментар:')} '${e.value}' (рядок ${e.line}) — '${e.comment || 'без коментаря'}' має бути '${expectedComment}'`,
          fix: { kind: 'update', line: e.line, text: expected },
          done: `оновлено коментар '${e.value}' -> '${expectedComment}'`,
        })
      }
    }
  }

  // 7. Chronology: an entry's date may not precede the maximum seen above -> move
  if (chronology && idx) {
    let max = null
    for (const e of entries) {
      const d = dateOf(e.value)
      if (!d) {
        if (chronology === 'releases') {
          findings.push({ msg: `${yellow('немає в даних релізів:')} '${e.value}' (рядок ${e.line}) — одрук у назві?` })
        }
        continue // artists without releases (astrocat etc.) are skipped
      }
      if (max && d < max.date) {
        const msg = `${yellow('порушує хронологію:')} '${e.value}' (${day(d)}, рядок ${e.line}) стоїть після '${max.value}' (${day(max.date)})`
        let fix = null
        let done = null
        if (chronology === 'artists') {
          const first = idx.artistFirst.get(artistSlugOf(e.value))
          const anchor = artistGroupAnchor(headers, first.release)
          // anchor === e.line would loop forever (mis-ordered headers) — keep it manual
          if (anchor && anchor !== e.line) {
            // keep the inline comment (role labels etc.)
            fix = { kind: 'move', fromLine: e.line, afterLine: anchor, text: `  '${e.value}',${e.comment ? ` ${e.comment}` : ''}` }
            done = `переміщено '${e.value}' (${day(d)}) у групу '${first.release}'`
          }
        } else {
          const pos = suggestPosition(entries, dateOf, d, e)
          fix = { kind: 'move', fromLine: e.line, afterLine: pos ? pos.line : startLine, text: releaseLine(e.value, idx.releaseInfo.get(e.value.replace('_th.jpg', ''))) }
          done = `переміщено '${e.value}' (${day(d)}) ${pos ? `після '${pos.value}' (рядок ${pos.line})` : 'на початок масиву'}`
        }
        findings.push(fix ? { msg, fix, done } : { msg })
      } else {
        max = { value: e.value, date: d }
      }
    }
  }

  return { file, findings }
}

// --- Report --------------------------------------------------------------------

export function printReport(idx, data, { hint }) {
  const report = []
  let fixable = false
  for (const def of PAGES) {
    const { file, findings } = analyzePage(def, idx)
    if (findings.some((f) => f.fix)) fixable = true
    if (findings.length) {
      report.push(`${bold(file)}\n${findings.map((f) => `  ${f.msg}`).join('\n')}`)
    }
  }
  if (!data) {
    report.push(dim('Дані релізів недоступні (нема інтернету і локального export) — перевірки хронології пропущено.'))
  }
  if (report.length) {
    console.log(`\n${bold('check-images')} ${dim(data ? `(дані: ${data.source})` : '')}\n`)
    console.log(report.join('\n\n') + '\n')
    if (hint && fixable) console.log(`Або запустіть ${bold('npm run fix:configs')} для авто-виправлення\n`)
  }
}

// Run only as an entry point — fix-configs.mjs imports from here without side effects
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  loadReleaseData()
    .then((data) => printReport(data ? buildIndexes(data.releases) : null, data, { hint: true }))
    .catch((err) => console.error(dim(`check-images: ${err.message}`)))
}
