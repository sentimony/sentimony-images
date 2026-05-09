# Claude Code Context for Sentimony Images

## Communication
- **Language**: Ukrainian (українська мова)
- **Update this file**: Always update CLAUDE.md when new context is discovered or tasks are completed
- **Thinking process**: User appreciates detailed analysis and thinking process - share insights when working on complex tasks

## Project Overview
This is a **Digital Keeper** project for **Sentimony Records** - a Ukrainian psychedelic music label founded in 2007.

### Related Projects
- **sentimony-images** (this repo): Nuxt app storing release and artist images
- **sentimony-nuxt**: Main website with database at `/public/data/sentimony-db-export.json`

## Data Structure

### Database Location
```
/Users/ihororlovskyi/work/github/sentimony-nuxt/public/data/sentimony-db-export.json
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

## Key Files
- `app/pages/releases.vue` - Release images sorted by date (99 releases: 2007-2026)
- `app/pages/artists.vue` - Artist images sorted by first appearance (~115 artists)

## Artists Without Release Connection
These artists exist in artistImages but weren't found in tracklistCompact/creditsCompact:
- `astrocat` - origin unknown
- `gribessa` - origin unknown
- `tairam` - origin unknown
- `makus` - mastering engineer (appears in credits but as service role)

## Missing Artists (Commented in Code)
~80 artists appear in releases but don't have images. Examples:
- `ader-project` (2007-02-09 va-fantazma)
- `synchronick` (2007-02-09 va-fantazma)
- `hvoya` (2008-04-25 va-true-story)
- `artech` (2019-06-28 artech-stringer-mode)
- `mojos-ears` (2020-01-17 gaz-mask-quetzalcoatl)

## Analysis Notes (Session 2024-12-22)

### Methodology Used
1. Extracted all artists from `tracklistCompact` using `<b>Artist Name</b>` pattern
2. Extracted all artists from `creditsCompact` using `<a href='/artist/slug'>` pattern
3. Mapped each artist to their first release date
4. Sorted artistImages by first appearance date
5. Added missing artists as commented lines for future reference

### Artist Categories Discovered
- **Music Artists**: Main performers in tracklists
- **Artwork**: trootootoo, artrama, matik, ka, jungle-symbol, salamandra, zhapa
- **Mastering**: dimitro, makus, spirit-architect
- **Compiled By**: injir (also appears as artist)

### VA Releases Pattern
VA (Various Artists) compilations are key for discovering new artists:
- va-futured-vol-1 through vol-7 (2018-2025)
- va-gatekey-vol-1 through vol-3 (2019-2025)
- va-fantazma, va-emptinesses, va-true-story (2007-2008)

## Future Tasks
- [ ] Add images for missing ~80 artists
- [ ] Verify astrocat, gribessa, tairam origin
- [ ] Consider separate arrays for artwork/mastering roles
