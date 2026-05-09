#!/usr/bin/env node
import sharp from 'sharp'
import { readdir, stat, rename, unlink } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = process.argv[2]
  ? process.argv[2]
  : join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'assets', 'img')

const TARGET_BYTES = 150 * 1024
const QUALITY = 80

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = join(dir, e.name)
    if (e.isDirectory()) yield* walk(full)
    else if (e.isFile() && e.name.endsWith('_og.jpg')) yield full
  }
}

async function optimizeOne(file) {
  const before = (await stat(file)).size
  const meta = await sharp(file).metadata()
  const tmp = file + '.tmp'

  await sharp(file)
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(tmp)

  const tmpMeta = await sharp(tmp).metadata()
  if (tmpMeta.width !== meta.width || tmpMeta.height !== meta.height) {
    await unlink(tmp)
    throw new Error(`dimension drift on ${file}: ${meta.width}x${meta.height} -> ${tmpMeta.width}x${tmpMeta.height}`)
  }

  const after = (await stat(tmp)).size
  if (after >= before) {
    await unlink(tmp)
    return { file, before, after: before, skipped: true }
  }
  await rename(tmp, file)
  return { file, before, after, skipped: false }
}

async function main() {
  let totalBefore = 0
  let totalAfter = 0
  let count = 0
  let oversized = 0
  let skipped = 0

  for await (const f of walk(ROOT)) {
    const r = await optimizeOne(f)
    totalBefore += r.before
    totalAfter += r.after
    count++
    if (r.skipped) skipped++
    if (r.after > TARGET_BYTES) oversized++
    const pct = r.before > 0 ? ((1 - r.after / r.before) * 100).toFixed(1) : '0.0'
    const flag = r.after > TARGET_BYTES ? ' [over 150K]' : ''
    const tag = r.skipped ? ' [skipped — already optimal]' : ''
    console.log(`${r.file}  ${(r.before / 1024).toFixed(1)}K -> ${(r.after / 1024).toFixed(1)}K  (-${pct}%)${flag}${tag}`)
  }

  console.log('---')
  console.log(`files: ${count}  optimized: ${count - skipped}  skipped: ${skipped}`)
  console.log(`total: ${(totalBefore / 1024).toFixed(0)}K -> ${(totalAfter / 1024).toFixed(0)}K  saved ${((totalBefore - totalAfter) / 1024).toFixed(0)}K (${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%)`)
  console.log(`still over 150K target: ${oversized}`)
}

main().catch(err => { console.error(err); process.exit(1) })
