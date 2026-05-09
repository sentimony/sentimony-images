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

- **Source `.jpg`** — canonical full-resolution originals under `public/assets/img/`. Never deleted, never re-encoded.
- **`_th.jpg` thumbnails** — **not stored**. The consuming site (sentimony-nuxt) requests sizes on-the-fly via the **Netlify Image CDN** (`/.netlify/images?url=...&w=...`), which resizes from the source on demand. Do **not** re-introduce pre-generated `_th.jpg` files.
- **`_og.jpg` Open Graph previews** — pre-generated at 1200×630 for social-share cards. Optimized to ≤200 KB (target ≤150 KB) with JPEG quality 80 (mozjpeg). When adding new OG images, run the optimizer:

  ```bash
  npm run optimize:og
  ```

  See [`scripts/optimize-og.mjs`](scripts/optimize-og.mjs). The script preserves dimensions and steps quality down (80→72→65→60) only if the result still exceeds the 200 KB hard cap.

### Have fun! ;)
