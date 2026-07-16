#!/usr/bin/env node
// Applies the safe fixes that check-images.mjs finds in the image configs
// (app/data/*.ts): inserting new files and moving entries into chronological
// order. Shows the plan and asks for confirmation (--yes / -y skips the prompt).
// Never deletes entries whose files are missing on disk (the file may have
// been renamed) — those stay recommendations. Exits 1 if applying a fix fails.

import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { createInterface } from 'node:readline/promises'
import {
  PAGES, DATA_DIR, loadReleaseData, buildIndexes, analyzePage, printReport,
  green, red, dim, bold,
} from './check-images.mjs'

const ASSUME_YES = process.argv.includes('--yes') || process.argv.includes('-y')
const MAX_FIXES = 100

// --- Applying a fix (one at a time, then re-analyze) --------------------------

function applyFix(filePath, fix) {
  const lines = readFileSync(filePath, 'utf8').split('\n')
  // the anchor entry may lack a trailing comma (last item in the array)
  const ensureComma = (i) => {
    const m = lines[i]?.match(/^(\s*'[^']*')(?!,)/)
    if (m) lines[i] = m[1] + ',' + lines[i].slice(m[1].length)
  }
  if (fix.kind === 'insert') {
    ensureComma(fix.afterLine - 1)
    lines.splice(fix.afterLine, 0, fix.text)
  } else if (fix.kind === 'update') { // regenerate the line in place (derived comment)
    lines[fix.line - 1] = fix.text
  } else { // move
    const after = fix.afterLine > fix.fromLine ? fix.afterLine - 1 : fix.afterLine
    lines.splice(fix.fromLine - 1, 1)
    ensureComma(after - 1)
    lines.splice(after, 0, fix.text)
  }
  writeFileSync(filePath, lines.join('\n'))
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
  const data = await loadReleaseData()
  const idx = data ? buildIndexes(data.releases) : null

  // preview the plan from a single analysis pass before touching anything
  const planned = PAGES.flatMap((def) =>
    analyzePage(def, idx).findings.filter((f) => f.fix).map((f) => `  ${def.file}: ${f.done}`))

  console.log(`\n${bold('fix-configs')} ${dim(data ? `(дані: ${data.source})` : '')}\n`)
  if (!planned.length) {
    console.log('  нічого виправляти\n')
    printReport(idx, data, { hint: false })
    return
  }

  console.log('Буде застосовано:')
  console.log(planned.join('\n') + '\n')

  if (!(await confirm(`Застосувати ${planned.length} ${planned.length === 1 ? 'правку' : 'правок'}?`))) {
    console.log(dim('Скасовано — нічого не змінено.\n'))
    return
  }

  const actions = []
  // one fix per pass: line numbers stay fresh and the loop converges on its own
  for (let i = 0; i < MAX_FIXES; i++) {
    const next = PAGES
      .flatMap((def) => analyzePage(def, idx).findings.filter((f) => f.fix).map((f) => ({ def, f })))
      .at(0)
    if (!next) break
    try {
      applyFix(join(DATA_DIR, next.def.file), next.f.fix)
    } catch (err) {
      // partial progress must be visible: report what landed before the failure
      if (actions.length) console.log(actions.join('\n'))
      console.error(`  ${red('✘')} ${next.def.file}: ${next.f.done} — ${err.message}`)
      process.exitCode = 1
      return
    }
    actions.push(`  ${green('✔')} ${next.def.file}: ${next.f.done}`)
  }
  console.log(actions.join('\n') + '\n')
  // leftover fixable findings mean the cap was hit (huge batch) or a fix is not
  // converging — either way automation must see a failure; a clean run leaves 0
  const left = PAGES.flatMap((def) => analyzePage(def, idx).findings.filter((f) => f.fix)).length
  if (left > 0) {
    console.error(`  ${red('✘')} лишилося правок: ${left} — запустіть повторно або перевірте конфіги`)
    process.exitCode = 1
  }
  printReport(idx, data, { hint: false }) // whatever remains is manual work
}

main().catch((err) => {
  console.error(dim(`fix-configs: ${err.message}`))
  process.exitCode = 1
})
