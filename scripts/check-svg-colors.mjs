// Checks that monochrome SVGs use fill="currentColor" so they can inherit the
// page text color. Scans public/assets/img/svg-icons and svg-images, flags
// files painted with a single concrete color (or none at all, i.e. implicit
// black) and offers to fix them (--yes / -y skips the prompt). Multicolor
// files are left alone. Silent when everything is clean.

import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createInterface } from 'node:readline/promises'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const FOLDERS = ['svg-icons', 'svg-images']
const ASSUME_YES = process.argv.includes('--yes') || process.argv.includes('-y')

const bold = (s) => `\x1b[1m${s}\x1b[0m`
const dim = (s) => `\x1b[2m${s}\x1b[0m`

const NEUTRAL = new Set(['none', 'currentcolor', 'transparent', 'inherit'])

// fill/stroke as attributes and inside style="" declarations
const PAINT_RE = /(?:\b(?:fill|stroke)="([^"]*)")|(?:\b(?:fill|stroke)\s*:\s*([^;"']+))/g

function analyzeSvg(content) {
  const colors = new Set()
  for (const m of content.matchAll(PAINT_RE)) {
    const value = (m[1] ?? m[2]).trim().toLowerCase()
    if (value.startsWith('url(')) return null // gradient/pattern paint - not a flat color
    if (!NEUTRAL.has(value)) colors.add(value)
  }
  if (colors.size === 0) {
    // no explicit paint at all -> browser default black
    const implicitBlack = !/\bfill=|\bfill\s*:/.test(content)
    return implicitBlack ? { kind: 'implicit' } : null
  }
  if (colors.size === 1) return { kind: 'color', color: [...colors][0] }
  return null // multicolor
}

function fixSvg(content, finding) {
  if (finding.kind === 'implicit') {
    return content.replace(/<svg\b/, '<svg fill="currentColor"')
  }
  const color = finding.color.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return content
    .replace(new RegExp(`(\\b(?:fill|stroke)=")${color}(")`, 'gi'), '$1currentColor$2')
    .replace(new RegExp(`(\\b(?:fill|stroke)\\s*:\\s*)${color}`, 'gi'), '$1currentColor')
}

async function confirm(question) {
  if (ASSUME_YES) return true
  if (!process.stdin.isTTY) {
    console.log(dim('Не інтерактивний термінал — пропущено. Запустіть з --yes для застосування.'))
    return false
  }
  const rl = createInterface({ input: process.stdin, output: process.stdout })
  const answer = (await rl.question(`${question} [y/N] `)).trim().toLowerCase()
  rl.close()
  return answer === 'y' || answer === 'yes'
}

async function main() {
  const offenders = []
  for (const folder of FOLDERS) {
    const dir = join(ROOT, 'public/assets/img', folder)
    const files = (await readdir(dir)).filter((f) => f.endsWith('.svg')).sort()
    for (const file of files) {
      const path = join(dir, file)
      const content = await readFile(path, 'utf8')
      const finding = analyzeSvg(content)
      if (finding) offenders.push({ folder, file, path, content, finding })
    }
  }

  if (!offenders.length) return

  console.log(`\n${bold('check-svg-colors')}\n`)
  console.log('Монохромні SVG без fill="currentColor":')
  for (const o of offenders) {
    const reason = o.finding.kind === 'implicit'
      ? 'без fill (імпліцитний чорний) → додати fill="currentColor" у <svg>'
      : `колір ${o.finding.color} → замінити на currentColor`
    console.log(`  ${o.folder}/${o.file}: ${reason}`)
  }
  console.log()

  if (!(await confirm(`Виправити ${offenders.length} ${offenders.length === 1 ? 'файл' : 'файлів'}?`))) {
    console.log(dim('Скасовано — нічого не змінено.\n'))
    return
  }

  for (const o of offenders) {
    try {
      await writeFile(o.path, fixSvg(o.content, o.finding))
      console.log(`  виправлено ${o.folder}/${o.file}`)
    } catch (err) {
      console.error(`  не вдалося записати ${o.folder}/${o.file}: ${err.message}`)
      process.exitCode = 1
    }
  }
  console.log()
}

main()
