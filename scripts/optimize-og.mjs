#!/usr/bin/env node
/**
 * optimize-og.mjs
 *
 * Walks public/assets/img/ recursively, finds *_og.jpg files, and re-encodes
 * each as JPEG quality 80 (mozjpeg=true), targeting <= 150 KB. Falls back to
 * progressively lower qualities (75, 70, 65, 60) when needed.
 *
 * Preserves original dimensions. Writes atomically (temp file + rename).
 *
 * Usage:
 *   node scripts/optimize-og.mjs           # write changes in place
 *   node scripts/optimize-og.mjs --dry-run # report only, do not write
 */

import { readdir, readFile, writeFile, rename, unlink, stat } from 'node:fs/promises';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const TARGET_BYTES = 150 * 1024; // 150 KB
const QUALITY_LADDER = [80, 75, 70, 65, 60];
const ROOT_DIR = 'public/assets/img';

/**
 * Recursively collect all *_og.jpg files under a directory.
 * @param {string} dir
 * @returns {Promise<string[]>}
 */
export async function findOgFiles(dir) {
  const out = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await findOgFiles(full)));
    } else if (entry.isFile() && entry.name.endsWith('_og.jpg')) {
      out.push(full);
    }
  }
  return out;
}

/**
 * Optimize a single _og.jpg file.
 * Reads the file, captures original dimensions and size, attempts re-encode
 * at progressively lower quality until <= 150 KB or quality bottoms out.
 *
 * When dryRun is true, no files are written.
 *
 * @param {string} path Absolute or relative path to the file.
 * @param {{ dryRun?: boolean }} [opts]
 * @returns {Promise<{
 *   before: number,
 *   after: number,
 *   width: number,
 *   height: number,
 *   quality: number,
 *   reachedTarget: boolean,
 * }>}
 */
export async function optimizeFile(path, opts = {}) {
  const { dryRun = false } = opts;
  const inputBuffer = await readFile(path);
  const before = inputBuffer.length;

  // Capture metadata once so we can verify dimensions are preserved.
  const meta = await sharp(inputBuffer).metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;

  let bestBuffer = null;
  let bestQuality = QUALITY_LADDER[0];
  let reachedTarget = false;

  for (const quality of QUALITY_LADDER) {
    // Re-create sharp instance per attempt; mozjpeg gives better compression
    // at the same visual quality.
    const buffer = await sharp(inputBuffer)
      .jpeg({ quality, mozjpeg: true })
      .toBuffer();

    bestBuffer = buffer;
    bestQuality = quality;

    if (buffer.length <= TARGET_BYTES) {
      reachedTarget = true;
      break;
    }
  }

  const after = bestBuffer.length;

  if (!dryRun) {
    // Atomic write: temp file then rename. The temp file lives in the same
    // directory so rename stays atomic on the same filesystem.
    const tempPath = `${path}.tmp-${process.pid}-${Date.now()}`;
    try {
      await writeFile(tempPath, bestBuffer);
      await rename(tempPath, path);
    } catch (err) {
      // Best-effort cleanup of the temp file if rename failed.
      try {
        await unlink(tempPath);
      } catch {
        /* ignore */
      }
      throw err;
    }
  }

  return { before, after, width, height, quality: bestQuality, reachedTarget };
}

function formatKB(bytes) {
  return (bytes / 1024).toFixed(1) + ' KB';
}

function formatPct(saved, before) {
  if (before === 0) return '0.0%';
  return ((saved / before) * 100).toFixed(1) + '%';
}

/**
 * CLI entry point. Walks ROOT_DIR, optimizes each file, prints a summary.
 *
 * @param {{ dryRun?: boolean, rootDir?: string }} [opts]
 */
export async function main(opts = {}) {
  const dryRun = opts.dryRun ?? process.argv.includes('--dry-run');
  const rootDir = opts.rootDir ?? ROOT_DIR;

  // Sanity check the root exists.
  try {
    const s = await stat(rootDir);
    if (!s.isDirectory()) {
      console.error(`error: ${rootDir} is not a directory`);
      process.exit(1);
    }
  } catch {
    console.error(`error: cannot stat ${rootDir}`);
    process.exit(1);
  }

  const files = await findOgFiles(rootDir);
  if (files.length === 0) {
    console.log(`no *_og.jpg files found under ${rootDir}`);
    return;
  }

  console.log(`${dryRun ? '[dry-run] ' : ''}found ${files.length} *_og.jpg files under ${rootDir}`);

  let totalBefore = 0;
  let totalAfter = 0;
  let unreachableCount = 0;

  for (const file of files) {
    const rel = relative(process.cwd(), file);
    try {
      const result = await optimizeFile(file, { dryRun });
      totalBefore += result.before;
      totalAfter += result.after;
      if (!result.reachedTarget) unreachableCount++;

      const saved = result.before - result.after;
      const tag = result.reachedTarget ? '' : ' [WARN: > 150 KB]';
      console.log(
        `${rel}  ${result.width}x${result.height}  ${formatKB(result.before)} -> ${formatKB(result.after)}  saved ${formatPct(saved, result.before)}  q=${result.quality}${tag}`
      );
    } catch (err) {
      console.error(`failed: ${rel}: ${err.message}`);
    }
  }

  const totalSaved = totalBefore - totalAfter;
  console.log('');
  console.log(`total before: ${formatKB(totalBefore)}`);
  console.log(`total after:  ${formatKB(totalAfter)}`);
  console.log(`overall saved: ${formatPct(totalSaved, totalBefore)}`);
  console.log(`files still > 150 KB: ${unreachableCount}`);
  if (dryRun) console.log('(dry-run: no files were modified)');
}

// Only run the CLI when invoked directly, not when imported.
const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
