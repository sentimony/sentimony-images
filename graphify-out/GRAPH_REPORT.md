# Graph Report - sentimony-images  (2026-07-05)

## Corpus Check
- 32 files · ~6,389 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 145 nodes · 231 edges · 9 communities
- Extraction: 98% EXTRACTED · 1% INFERRED · 1% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d03fc57e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Image Data Configs & Composables|Image Data Configs & Composables]]
- [[_COMMUNITY_check-images Script|check-images Script]]
- [[_COMMUNITY_Sorting System|Sorting System]]
- [[_COMMUNITY_Package Dependencies|Package Dependencies]]
- [[_COMMUNITY_Project Concepts & Deployment|Project Concepts & Deployment]]
- [[_COMMUNITY_App Shell & Routing|App Shell & Routing]]
- [[_COMMUNITY_Image Lightbox|Image Lightbox]]
- [[_COMMUNITY_Grid Item Component|Grid Item Component]]
- [[_COMMUNITY_SVG Image Item|SVG Image Item]]

## God Nodes (most connected - your core abstractions)
1. `Digital Keeper` - 14 edges
2. `fetchFileSize()` - 10 edges
3. `useImageNavigation()` - 9 edges
4. `LIST_SORT_OPTIONS` - 7 edges
5. `useListSort()` - 7 edges
6. `formatFileSize()` - 5 edges
7. `loadFileSize()` - 3 edges
8. `onImgLoad()` - 3 edges
9. `ImageSortOption` - 3 edges
10. `sortImages()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `SPA HTML Shell (index.html)` --implements--> `Digital Keeper`  [INFERRED]
  index.html → README.md
- `src/main.ts Entry Point` --conceptually_related_to--> `Vue`  [INFERRED]
  index.html → README.md
- `onImgLoad()` --calls--> `fetchFileSize()`  [EXTRACTED]
  src/components/SvgImageItem.vue → src/composables/useFileSize.ts
- `onImgLoad()` --calls--> `fetchFileSize()`  [EXTRACTED]
  src/components/SvgItem.vue → src/composables/useFileSize.ts
- `loadFileSize()` --calls--> `fetchFileSize()`  [EXTRACTED]
  src/components/ImageLightbox.vue → src/composables/useFileSize.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Frontend tech stack of Digital Keeper** — readme_vue, readme_vue_router, readme_vite, readme_typescript, readme_tailwind, readme_lucide [EXTRACTED 1.00]

## Communities (9 total, 0 thin omitted)

### Community 0 - "Image Data Configs & Composables"
Cohesion: 0.12
Nodes (18): useImageNavigation(), LIST_SORT_OPTIONS, useListSort(), eventImages, svgIcons, videoImages, activeSrc, activeTitle (+10 more)

### Community 1 - "check-images Script"
Cohesion: 0.33
Nodes (5): backgroundImages, activeSrc, activeTitle, { lightboxOpen, activeKey, hasPrev, hasNext, open, prev, next }, { sortBy, sortedImages }

### Community 2 - "Sorting System"
Cohesion: 0.11
Nodes (22): sortBy, SortOption, ARTIST_SORT_OPTIONS, createSortComposable(), ImageSortOption, isValidSort(), RELEASE_SORT_OPTIONS, sortImages() (+14 more)

### Community 3 - "Package Dependencies"
Cohesion: 0.33
Nodes (5): playlistImages, activeSrc, activeTitle, { lightboxOpen, activeKey, hasPrev, hasNext, open, prev, next }, { sortBy, sortedImages }

### Community 4 - "Project Concepts & Deployment"
Cohesion: 0.14
Nodes (17): SPA HTML Shell (index.html), Font Preload (Montserrat, Julius Sans One), content.sentimony.com Deployment, Digital Keeper, JAMstack Architecture, Lucide, Netlify, Reka UI (+9 more)

### Community 6 - "App Shell & Routing"
Cohesion: 0.17
Nodes (5): currentYear, menuItems, app, router, router

### Community 8 - "Image Lightbox"
Cohesion: 0.20
Nodes (8): abortController, dimensions, emit, fileSize, infoLabel, onKeydown(), open, Props

### Community 9 - "Grid Item Component"
Cohesion: 0.13
Nodes (19): loadFileSize(), abortController, emit, fileSizeLabel, fullName, onClick(), onImgLoad(), Props (+11 more)

### Community 10 - "SVG Image Item"
Cohesion: 0.16
Nodes (11): abortController, emit, fileSizeLabel, onClick(), onImgLoad(), Props, svgImages, activeSrc (+3 more)

## Ambiguous Edges - Review These
- `Digital Keeper` → `Reka UI`  [AMBIGUOUS]
  README.md · relation: references
- `Digital Keeper` → `shadcn-vue`  [AMBIGUOUS]
  README.md · relation: references

## Knowledge Gaps
- **65 isolated node(s):** `currentYear`, `menuItems`, `Props`, `open`, `fileSize` (+60 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Digital Keeper` and `Reka UI`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **What is the exact relationship between `Digital Keeper` and `shadcn-vue`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **Why does `fetchFileSize()` connect `Grid Item Component` to `Image Lightbox`, `SVG Image Item`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **Why does `useImageNavigation()` connect `Image Data Configs & Composables` to `SVG Image Item`, `check-images Script`, `Sorting System`, `Package Dependencies`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Why does `LIST_SORT_OPTIONS` connect `Image Data Configs & Composables` to `check-images Script`, `SVG Image Item`, `Package Dependencies`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **What connects `currentYear`, `menuItems`, `Props` to the rest of the system?**
  _66 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Image Data Configs & Composables` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._