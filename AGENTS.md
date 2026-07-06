# Claude Code Context for Sentimony Images

## Communication
- **Language**: Ukrainian (українська мова)
- **Update this file**: Always update CLAUDE.md when new context is discovered or tasks are completed. **Keep it ≤128 lines** — trim stale notes when adding new ones
- **Thinking process**: User appreciates detailed analysis and thinking process - share insights when working on complex tasks

## Project Overview
This is a **Digital Keeper** project for **Sentimony Records** - a Ukrainian psychedelic music label founded in 2007.

### Related Projects
- **sentimony-images** (this repo): Vue 3 + Vite SPA storing release/artist/event/playlist/video/background/SVG images
- **sentimony-nuxt**: Main website with database at `/data/sentimony-db-export.json`

## Commands
Node `24.15.0` (`nvm use`), npm ≥ 11.12.0 (`engines` у package.json).
```bash
npm install
npm run dev      # Vite dev server (http://localhost:5173, --host)
npm run build    # Production build -> dist/
npm run preview  # Preview the production build
npm run deploy:stage   # Deploy preview (Netlify alias: stage)
npm run deploy:prod    # Deploy to production
npm run check:images  # Звірка img-папок з конфігами, read-only (авто-запуск після банера dev-сервера — плагін checkImages у vite.config.ts)
npm run fix:configs   # Виправлення конфігів (вставки + переміщення за хронологією) з підтвердженням; --yes пропускає prompt
```
Deploy auth: токен у `.env/.env.local` (`NETLIFY_AUTH_TOKEN`); dotenv-cli + netlify-cli тягнуться через `npx -y` (без devDep) і підхоплюють токен автоматично — просто `npm run deploy:stage`.

## check-images / fix-configs (scripts/)
- Конфіги картинок живуть у `src/data/*.ts` (по одному на сторінку, `export const xxxImages = [...]`); сторінки їх імпортують. Коментарі-дати та групи-релізи в artist-images.ts — кураторські дані, зберігати
- `check-images.mjs` (read-only) звіряє `public/assets/img/<folder>/` з `src/data/*.ts`: файл без запису в конфігу, запис без файла, дублікати, `_th` без пари `_xl` і навпаки, застарілі коментарі-дати releases (дата/UNRELEASED проти API), порушення хронології (releases + artists). Завжди exit 0, мовчить коли все чисто
- `fix-configs.mjs` імпортує логіку з check-images.mjs, показує план і чекає підтвердження (`--yes`/`-y` пропускає; не-TTY без `--yes` нічого не змінює). Застосовує лише безпечні правки (insert/move, по одній з повторним аналізом), exit 1 при збої запису. Артисти вставляються в кінець групи свого першого релізу (`// дата slug`); якщо групи нема — лише рекомендація. Записи без файла та дублікати НЕ видаляє — лише рекомендує. Коментар-дата releases регенерується (`UNRELEASED` за coming_soon), інлайн-коментарі artists зберігаються
- Дані релізів: `https://sentimony.com/api/releases` -> fallback `../sentimony-nuxt/data/sentimony-db-export.json` -> без даних пропускає хронологію. Поле `releases[].artists` (рядок зі slug через кому) дає першу появу артиста без парсингу HTML. Дати в коментарях конфігів можуть бути застарілі — джерело істини API

## Tech Stack
Vue 3 (`<script setup>` + TypeScript) · Vite · vue-router 5 · Tailwind CSS v4 · lucide-vue-next · @unhead/vue · v-wave. No UI component library (shadcn-vue/Reka UI removed) — `ui/`-style components are hand-rolled.

## Architecture
- SPA, **not Nuxt**. Entry: `src/main.ts` -> `src/app.vue` -> `<RouterView>`.
- **Manual routing** in `src/router.ts` (one explicit route per page, no file-based routing). New page = create `src/pages/X.vue`, register it in the router, add a menu item in `src/components/AppHeader.vue`.
- `~/` and `@/` both alias `src/` (vite.config). **No component auto-import** — import every component explicitly.
- Code style: 2-space indent, single quotes, no semicolons; components PascalCase, composables `useXxx`, data/utility modules kebab-case.
- No `src/components/ui/` layer. `SortSelect` is a plain native `<select>`. `ImageLightbox` is hand-rolled (`Teleport` + `Transition`, dark overlay + glass surface), no Dialog/UI dependency.
- Image grids: item components (`Item`, `SvgItem`, `SvgImageItem`) call `preventDefault()` on plain left-click and emit `@select` — a page rendering them **must** listen to `@select` and render `<ImageLightbox>`, else the click is dead. All image pages (releases, artists, svg-icons, svg-images, backgrounds, events, playlists, videos) wire this up. Cmd/Ctrl+click still opens the original in a new tab.
- Titles: `app.vue` sets `titleTemplate: '%s · Digital Keeper'`; each page passes only its bare name (e.g. `'Releases'`); `NotFound.vue` overrides the template.
- Composables: `useImageSort` (`sortImages()`, releases/artists), `useListSort`, `useImageNavigation`, `useFileSize`.
- Images: `public/assets/img/<folder>/`, thumbs `_th.jpg`, full-size `_xl.jpg`.
- Image config arrays live in `src/data/*.ts`, not in pages — new page with images = data file in `src/data/` + entry in `PAGES` of `scripts/check-images.mjs`.
- SPA fallback: `/* /.netlify/functions/server 200` в `public/_redirects` → `netlify/functions/server.mts`: логує промахи `[404] [BOT|USER] ip => path` (Netlify → Logs → Functions, 24h), віддає shell — 200 для відомих маршрутів, справжній 404 інакше. Нова сторінка = додати шлях у `SPA_ROUTES` функції (sync із `src/router.ts`). Реальні файли йдуть з CDN, функцію не чіпають.
- `netlify/edge-functions/`: `blocking.ts`, `gone.ts`, `redirects.ts`, `remove-trailing-slash.ts` — спрацьовують до `_redirects`/fallback-функції.
- Легасі-301 в `_redirects` мають пріоритет над fallback (first match) — **на проді**. Локально `netlify serve` бреше (301 провалюються у функцію), а `netlify dev` не пускає промахи до функції (Vite сам віддає shell) — перевіряти роутинг лише на stage-деплої.

## Data Structure

### Database Location
```
/Users/ihororlovskyi/work/github/ihororlovskyi/sentimony-nuxt/data/sentimony-db-export.json
```

### Key Fields in Database
- `releases[].slug` - release identifier (e.g., "va-fantazma")
- `releases[].date` - release date in ISO format (e.g., "2007-02-09T12:00:00.000Z")
- `releases[].tracklistCompact` - tracklist with artists in `<b>Artist Name</b>` tags
- `releases[].creditsCompact` - credits with artists in `<a href='/artist/slug'>Artist Name</a>` tags

### File Naming Conventions
- **Releases**: `{slug}_th.jpg` (e.g., `va-fantazma_th.jpg`)
- **Artists**: `{slug}-{number}_th.jpg` (e.g., `harax-01_th.jpg`, `irukanji-02_th.jpg`)

## Sorting Logic
Both `releaseImages` and `artistImages` are sorted by **release date (oldest first)**:
- First release: va-fantazma (2007-02-09)
- Artists appear in order of their first release appearance
- Commented entries `// 'artist-slug'` = artists in releases but missing images

## Artist Numbering (category_id)
Inline `// NNN slug (role)` comments in `artist-images.ts` mirror sentimony-nuxt's `artists[].category_id` (3-digit badge on the site). Algorithm: `irukanji` forced `001` (label founder, pinned in a `// founder` block at the top, out of chronological order); everyone else numbered by first appearance walking `sentimony-nuxt` releases (date order, `releases[].artists` order) interleaved with events (`db.events`, by date); artists never appearing get the tail, alphabetical by slug. `// not in artist db` marks names with no artist record (feat. collaborators, or curator-added credits like artwork-only contributors) — never numbered.
- `check-images.mjs` has `CHRONOLOGY_EXEMPT` (currently `['irukanji']`) so the founder override doesn't trip the artist-chronology check.
- Gotcha: `releases[].artists` sometimes uses a different slug than the artist's real `artists[].slug` (dashes dropped, alias name) — e.g. `ers`→`e-r-s`, `alientime`→`alien-time`, `ka`→`ka-art`. Such artists silently fall to the alphabetical tail unless aliased by hand when recomputing.
- Manual overrides feed the recompute: `releases[].artists`/`db.events` lineups sometimes miss real credits (compiler DJs, co-organizers) the curator knows about but that never made it into sentimony-nuxt's data. These are injected as extra slugs on a specific release/event date before numbering runs (e.g. `va-true-story` compiled-by `iorlovskyi`+`zea`; `shift-space` co-organizer `hagen`), so the artist's number reflects their true first-appearance date, not a later DB-visible one.
- No script commits this numbering to the repo yet — it was computed by hand once (session-local scripts, not checked in). Recompute from `sentimony-nuxt/data/sentimony-db-export.json` (`releases` + `events` + `artists`) plus the manual-override list above if the catalog changes.

## Key Files
- `src/data/release-images.ts` - Release images sorted by date (~101 releases: 2007-2026)
- `src/data/artist-images.ts` - Artist images sorted by first appearance (~115 artists)

## Artists Without Release Connection
`astrocat`, `gribessa`, `tairam` — origin unknown (not found in tracklistCompact/creditsCompact). `makus` — mastering engineer, appears in credits as service role.

## Missing Artists
~124 artists appear in releases but lack images — kept as `// 'artist-slug' (date release-slug)` comments in `artist-images.ts` for future reference; not duplicated here.

## Future Tasks
- [ ] Add images for missing ~80 artists
- [ ] Verify astrocat, gribessa, tairam origin
- [ ] Consider separate arrays for artwork/mastering roles
- [ ] check-images: кешувати відповідь API у `.cache/` (gitignored) як офлайн-fallback замість читання export із сусіднього репо

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
