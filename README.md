# Digital Keeper

[![Netlify Status](https://api.netlify.com/api/v1/badges/da7dbd66-5133-4f4f-9d03-8a7acca90aaf/deploy-status)](https://app.netlify.com/projects/sentimony-content/deploys)

JAMstack development of Digital Keeper - a repo for storing content files of Sentimony Records, a psychedelic music label. It keeps here artworks of releases, merch images, event fyers, artists photo, music video covers, logotypes versions, svg icons, website backgrounds.

### Used:
* [Nuxt](https://nuxt.com)
* [Netlify](https://netlify.com)
* [Tailwind](https://tailwindcss.com)
* [Iconify](https://icon-sets.iconify.design)

### Links:

* [content.sentimony.com](https://content.sentimony.com)
* [sentimony-content.netlify.app](https://sentimony-content.netlify.app)

### Monitoring

* [Functions Logs](https://app.netlify.com/projects/sentimony-content/logs/functions/server)
* [Edge Functions Logs](https://app.netlify.com/projects/sentimony-content/logs/edge-functions)
* [Requests Left](https://app.netlify.com/projects/sentimony-content/configuration/functions#overview)

### Run

```bash
npm i

npm run dev
```

### Deploy

```bash
npm run netlify:deploy:stage

npm run netlify:deploy:prod
```

### Image strategy

Images live under `public/assets/img/` and follow a small set of conventions. Read this before adding or regenerating any image variant.

#### Variants

* `*_xl.jpg` — canonical large originals (e.g. `va-fantazma_xl.jpg`, typically 1800×1800 for releases). These are the source of truth and must **never be deleted or downscaled in place**. Every other variant is derived from them.
* `*_og.jpg` — pre-generated Open Graph / social card images at **1200×630**, optimized to **≤150 KB** (target). A handful end up in the 150–185 KB range at the lowest quality step but stay under ~200 KB. These are committed because OG scrapers (Facebook, Twitter, Telegram, etc.) fetch them directly and don't go through any image transform.
* `*_th.jpg` — **no longer stored in the repo.** Thumbnails are not pre-generated. The Netlify Image CDN resizes `_xl.jpg` originals on-the-fly via `@nuxt/image`, so committing thumbnails would only duplicate bytes.

#### Why no `_th.jpg`

We rely on the **Netlify Image CDN** for all small/responsive variants. Requesting an image through `<NuxtImg>` with `width`/`height` props produces a URL like `/.netlify/images?url=…&w=…&h=…`, which Netlify resizes and caches at the edge. Committing `_th.jpg` files duplicates that work and bloats the repo. If you need a thumbnail, request it from the CDN — do **not** add a `_th.jpg` back to git.

#### Regenerating OG images

When new `_og.jpg` files are added (or existing ones replaced), run the optimizer so they fit the size budget:

```bash
npm run optimize:og:dry   # report only, no writes
npm run optimize:og       # re-encode in place (atomic temp+rename)
```

The optimizer is implemented in `scripts/optimize-og.mjs`. It walks `public/assets/img/` recursively, finds every `*_og.jpg`, and re-encodes with mozjpeg at quality 80 → 75 → 70 → 65 → 60 until the file is ≤150 KB or the ladder bottoms out. Original dimensions (1200×630) are preserved.

### Have fun! ;)
