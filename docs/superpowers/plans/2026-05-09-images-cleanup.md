---
title: sentimony-images — `_th.jpg` cleanup + `_og.jpg` optimization + reverse sort order
date: 2026-05-09
scope: storage cleanup after task 03 (NuxtImg + Netlify Image CDN); plus reverse sort order on releases and artists pages (newest first)
out_of_scope: [migrating originals to a new pipeline, format conversion to WebP/AVIF for source]
---

# sentimony-images: cleanup `_th.jpg` + optimize `_og.jpg`

## Why this task is needed

Before task 03 (sentimony-nuxt → NuxtImg), the site loaded pre-generated `_th.jpg` thumbnails (≈ 24×24 to 64×64 px) for list views. After task 03, Netlify Image CDN resizes images on-the-fly via `/.netlify/images?url=...&w=64`. The 223 `_th.jpg` files are now dead weight.

`_og.jpg` files (Open Graph, social-share previews, target 1200×630) remain needed but several are oversized (max 329 KB observed; ideal ≤ 150 KB).

## Decisions (locked)

| Topic | Decision |
|---|---|
| `_th.jpg` files | Delete all 223. ~5.2 MB freed. |
| `_og.jpg` files | Optimize in place — re-encode JPEG at quality 80, target ≤ 150 KB per file. Preserve dimensions. |
| Source `.jpg` (254 files, ~880 MB) | **Untouched** — these are originals |
| Optimization tool | `sharp` (already common in Node ecosystem) — `pnpm dlx sharp-cli` or local `node` script |
| Audit step | Confirm sentimony-nuxt code (task 03 result) does NOT reference `_th.jpg` paths anywhere |
| Repo size target | Reduce by ≥ 15 MB total (5 MB `_th` + ~10 MB `_og` optimization) |

## Definition of Done (run is `pass` only if ALL true)

1. `find . -name "*_th.jpg" | wc -l` returns 0
2. `find . -name "*_og.jpg" -size +200k` returns 0 (no oversized OG images)
3. All `_og.jpg` files retain original dimensions (verified via sharp metadata: `sharp(file).metadata()`)
4. Pre-flight audit: `grep -rE "_th\\.jpg" sentimony-nuxt/app/` returns 0 (run from a sibling clone)
5. Total repo size on disk reduced by ≥ 15 MB vs pre-cleanup
6. README.md updated with new image strategy explanation
7. **In `releases.vue` and `artists.vue`: first array entry has the most recent date (year ≥ 2024 expected); last entry has earliest (≤ 2010)** — i.e., array reads newest → oldest
8. `pnpm build` exits 0 after sort reversal (no broken refs)
9. All commits pushed to variant branch (`task4/A` or `task4/B`)
10. Claude explicitly signals "task complete"

## Glossary

| Term | Meaning |
|---|---|
| **`_th.jpg`** | Pre-generated thumbnail (24×24 to 64×64). Replaced by Netlify Image CDN on-the-fly resize. |
| **`_og.jpg`** | Open Graph preview, 1200×630 typical, used in social-media share cards |
| **source `.jpg`** | Original full-resolution image — preserved as canonical |

## Tasks (TDD: failing test → impl → green → commit)

### Task 01 — Pre-flight audit: confirm `_th.jpg` not referenced elsewhere

**Goal:** verify no remaining external references to `_th.jpg` files (in sentimony-nuxt task3 result).

**Steps:**
1. `grep -rE "_th\\.jpg" /Users/ihororlovskyi/work/github/ihororlovskyi/sentimony-nuxt/app/ --include="*.{vue,ts,js}" 2>/dev/null` — must return 0 lines
2. `grep -rE "_th\\.jpg" public/ 2>/dev/null` (in this repo, in case .html or .json indexes still mention them) — record matches
3. Document any remaining references in commit message body

**Test:** `tests/audit-th.test.ts` — runs grep on sibling sentimony-nuxt repo, asserts 0 matches.

**Commit:** `chore: audit confirms no _th.jpg references remain`

---

### Task 02 — Inventory: count files and sizes baseline

**Goal:** record before-state for verification.

**Steps:**
1. `find . -name "*_th.jpg" | wc -l > /tmp/th-count-before` (expect 223)
2. `find . -name "*_th.jpg" -exec du -ck {} + | tail -1 > /tmp/th-size-before` (expect ~5200 KB)
3. `find . -name "*_og.jpg" | wc -l > /tmp/og-count-before` (expect 223)
4. `find . -name "*_og.jpg" -exec du -ck {} + | tail -1 > /tmp/og-size-before` (expect ~42264 KB)
5. `du -sh . > /tmp/repo-size-before`

**Test:** `tests/inventory.test.ts` — assert counts read from /tmp files match expected ranges.

**Commit:** `chore: record pre-cleanup inventory baseline`

---

### Task 03 — Delete all `_th.jpg` files

**Goal:** remove 223 dead thumbnail files.

**Steps:**
1. `find . -name "*_th.jpg" -delete` (or use `git rm` if files are tracked)
2. Verify 0 left: `find . -name "*_th.jpg" | wc -l` → 0

**Test:** `tests/no-th.test.ts` — find returns 0 `_th.jpg` files.

**Commit:** `chore: delete 223 pre-generated _th.jpg thumbnails (now generated on-the-fly via Netlify Image CDN)`

---

### Task 04 — Add sharp-based optimizer script

**Goal:** create a Node script that re-encodes a single `_og.jpg` to JPEG quality 80, target ≤ 150 KB.

**Steps:**
1. `pnpm add -D sharp`
2. Create `scripts/optimize-og.mjs`:
   ```js
   import sharp from 'sharp';
   import { readdir } from 'node:fs/promises';
   import { join } from 'node:path';
   // walk dir, find *_og.jpg, re-encode at quality 80, replace in place
   // log each file: name, size_before, size_after, % saved
   ```
3. Add npm script: `"optimize:og": "node scripts/optimize-og.mjs"`

**Test:** `tests/optimizer.test.ts` — feed the optimizer a fixture > 200 KB, assert output ≤ 150 KB and dimensions preserved.

**Commit:** `feat: add sharp-based _og.jpg optimizer script`

---

### Task 05 — Run optimizer on all `_og.jpg`

**Goal:** apply the optimizer across all 223 `_og.jpg` files.

**Steps:**
1. `pnpm optimize:og`
2. Capture log: total before-size, total after-size, % savings
3. Verify: `find . -name "*_og.jpg" -size +200k | wc -l` → 0

**Test:** `tests/og-sizes.test.ts` — find returns 0 OG files over 200 KB.

**Commit:** `chore: optimize 223 _og.jpg (target ≤150 KB each, quality 80)`

---

### Task 06 — Update README with new strategy

**Goal:** document the cleanup decision so future contributors don't recreate `_th.jpg` files.

**Steps:**
1. Add section "Image strategy" to README.md:
   - Source `.jpg` files are canonical originals; never deleted
   - Thumbnails (`_th.jpg`) are NOT pre-generated — Netlify Image CDN resizes on-the-fly
   - OG images (`_og.jpg`) are pre-generated at 1200×630, optimized to ≤150 KB
2. Reference `scripts/optimize-og.mjs` for re-running the optimizer when new OG images are added

**Test:** `tests/readme.test.ts` — readFile README.md, assert it contains the strings "Netlify Image CDN" and "_og.jpg" and "scripts/optimize-og.mjs".

**Commit:** `docs: image strategy section in README`

---

### Task 07 — Reverse sort order in `releases.vue` and `artists.vue`

**Goal:** flip the hardcoded image arrays so newest entries appear first (currently sorted oldest → newest).

**Context:** the arrays `releaseImages` (99 entries) in `app/pages/releases.vue` and `artistImages` (100 entries) in `app/pages/artists.vue` carry inline date comments like `// 2007-02-09`. Currently the first entry is from 2007; user wants the first entry to be from the most recent year.

**Steps:**
1. In `app/pages/releases.vue`: append `.reverse()` to the array literal:
   ```ts
   const releaseImages = [
     'va-fantazma_th.jpg', // 2007-02-09
     ...
     'most-recent_th.jpg', // 2024-XX-XX
   ].reverse()
   ```
   Single character change preserves date-comment ordering for future maintenance — humans still see chronological order in source, but UI renders reverse.
2. Same for `app/pages/artists.vue` `artistImages` array.
3. Other pages (`events.vue`, `videos.vue`, `playlists.vue`, `backgrounds.vue`, `svg-icons.vue`, `svg-images.vue`) — these have no date-based sort to reverse. Leave them.

**Test:** `tests/sort-order.test.ts`:
- import the arrays (or read the page files as text and parse)
- assert `releaseImages[0]` corresponds to a date comment with year ≥ 2020
- assert `releaseImages[releaseImages.length - 1]` corresponds to a date comment with year ≤ 2010
- same checks for `artistImages`

**Commit:** `feat(sort): reverse releases and artists order — newest first`

---

### Task 08 — Verify and final report

**Goal:** confirm the savings + sort change.

**Steps:**
1. `du -sh .` — record post-cleanup size
2. Compute delta vs `/tmp/repo-size-before`
3. `pnpm build` — must succeed (catches any broken refs from sort changes too)
4. Verify all DoD conditions one final time

**Test:** `tests/final-savings.test.ts` — read both /tmp files, assert delta ≥ 15 MB.

**Commit:** `chore: cleanup + sort verified — total savings recorded`

---

## Post-cleanup sanity (manual)

- [ ] Re-deploy on Netlify; verify site still shows correct OG previews when sharing on Twitter/LinkedIn
- [ ] Spot-check 10 random `_og.jpg` — visually compare optimized vs originals (should be visually indistinguishable at quality 80)
- [ ] Verify sentimony-nuxt list pages still render thumbnails (via Netlify Image CDN proxy)

## Out of scope

- Converting source `.jpg` to WebP/AVIF (would change canonical file format — separate decision)
- Migrating images to a CDN like Cloudinary (would require URL rewrite in sentimony-nuxt — bigger task)
- Generating multiple resolution variants in advance (defeats the point of on-the-fly resize)
