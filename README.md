# sentimony-images

[![Netlify Status](https://api.netlify.com/api/v1/badges/da7dbd66-5133-4f4f-9d03-8a7acca90aaf/deploy-status)](https://app.netlify.com/projects/sentimony-content/deploys)

JAMstack development of sentimony-images (Digital Keeper) - a repo for storing content files of Sentimony Records, a psychedelic music label. It keeps here artworks of releases, merch images, event fyers, artists photo, music video covers, logotypes versions, svg icons, website backgrounds.

### Used:
* <img src="https://cdn.simpleicons.org/nodedotjs" width="16" height="16"> [Node.js](https://nodejs.org)
* <img src="https://cdn.simpleicons.org/vuedotjs" width="16" height="16"> [Vue](https://vuejs.org)
* <img src="https://cdn.simpleicons.org/vuedotjs" width="16" height="16"> [Vue Router](https://router.vuejs.org)
* <img src="https://cdn.simpleicons.org/vite" width="16" height="16"> [Vite](https://vite.dev)
* <img src="https://cdn.simpleicons.org/typescript" width="16" height="16"> [TypeScript](https://www.typescriptlang.org)
* <img src="https://cdn.simpleicons.org/tailwindcss" width="16" height="16"> [Tailwind](https://tailwindcss.com)
* <img src="https://cdn.simpleicons.org/lucide" width="16" height="16"> [Lucide Icons](https://lucide.dev)
* <img src="https://cdn.simpleicons.org/simpleicons" width="16" height="16"> [Simple Icons](https://simpleicons.org)
* <img src="https://api.iconify.design/tabler/wave-square.svg" width="16" height="16"> [v-wave](https://v-wave.graphican.com)
* <img src="https://api.iconify.design/logos/playwright.svg" width="16" height="16"> [Playwright](https://playwright.dev)
* <img src="https://cdn.simpleicons.org/netlify" width="16" height="16"> [Netlify](https://netlify.com)

### Run
```bash
npm i
npm run dev --open
```

### Deploy
```bash
npm run deploy:stage
npm run deploy:prod
```

### Images
Generate `_th.jpg` thumbnails (longest side 240px, aspect ratio preserved) next to one or more `_xl.jpg` (macOS `sips`):
```bash
sh scripts/create-th.sh public/assets/img/artists/hagen-01_xl.jpg -q 69 -f
sh scripts/create-th.sh public/assets/img/events/*_xl.jpg -q 69 -f   # batch
```
Generate 1200×630 `_og.jpg` (Open Graph) next to one or more `_xl.jpg` (requires `brew install imagemagick`):
```bash
sh scripts/create-og.sh public/assets/img/artists/hagen-01_xl.jpg -t -10 -q 69 -f
```
Both scripts accept multiple sources (non-`_xl.jpg` args from a `dir/*` glob are skipped). `-q` sets JPEG quality (default 69), `-f` overwrites existing files. `create-og.sh` crop: `-c` center (default), `-t` top, `-b` bottom, each accepting an optional vertical offset in % (`-N` moves the crop down, `+N` up — e.g. `-t -10` starts 10% below the top edge).

Both scripts hand the results to [ImageOptim](https://imageoptim.com) (`open -a ImageOptim …`) for a further ~5% lossless saving — it optimizes in place; quit the app manually when done. To re-run ImageOptim over every stored JPEG at once:
```bash
open -a ImageOptim public/assets/img/*/*.jpg
```

### Skills
* [scripts/skills.sh](scripts/skills.sh)

### Links:
* [content.sentimony.com](https://content.sentimony.com)
* [sentimony-content.netlify.app](https://sentimony-content.netlify.app)

### Monitoring
* [Edge Functions Logs](https://app.netlify.com/projects/sentimony-content/logs/edge-functions)

Have fun! ;)
