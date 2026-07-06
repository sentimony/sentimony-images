# Graph Report - sentimony-images  (2026-07-06)

## Corpus Check
- 33 files · ~6,242 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 144 nodes · 255 edges · 12 communities
- Extraction: 98% EXTRACTED · 1% INFERRED · 1% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a1fa523c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Image Data Configs & Composables|Image Data Configs & Composables]]
- [[_COMMUNITY_check-images Script|check-images Script]]
- [[_COMMUNITY_Sorting System|Sorting System]]
- [[_COMMUNITY_Package Dependencies|Package Dependencies]]
- [[_COMMUNITY_Project Concepts & Deployment|Project Concepts & Deployment]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_App Shell & Routing|App Shell & Routing]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Image Lightbox|Image Lightbox]]
- [[_COMMUNITY_Grid Item Component|Grid Item Component]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]

## God Nodes (most connected - your core abstractions)
1. `Digital Keeper` - 14 edges
2. `fetchFileSize()` - 11 edges
3. `useImageNavigation()` - 9 edges
4. `useLightboxImage()` - 9 edges
5. `useListSort()` - 8 edges
6. `LIST_SORT_OPTIONS` - 7 edges
7. `formatFileSize()` - 5 edges
8. `useImageSizes()` - 4 edges
9. `loadFileSize()` - 3 edges
10. `onImgLoad()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `SPA HTML Shell (index.html)` --implements--> `Digital Keeper`  [INFERRED]
  index.html → README.md
- `src/main.ts Entry Point` --conceptually_related_to--> `Vue`  [INFERRED]
  index.html → README.md
- `onImgLoad()` --calls--> `fetchFileSize()`  [EXTRACTED]
  src/components/SvgItem.vue → src/composables/useFileSize.ts
- `onImgLoad()` --calls--> `fetchFileSize()`  [EXTRACTED]
  src/components/SvgImageItem.vue → src/composables/useFileSize.ts
- `loadFileSize()` --calls--> `fetchFileSize()`  [EXTRACTED]
  src/components/ImageLightbox.vue → src/composables/useFileSize.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Frontend tech stack of Digital Keeper** — readme_vue, readme_vue_router, readme_vite, readme_typescript, readme_tailwind, readme_lucide [EXTRACTED 1.00]

## Communities (12 total, 0 thin omitted)

### Community 0 - "Image Data Configs & Composables"
Cohesion: 0.33
Nodes (4): playlistImages, { activeSrc, activeTitle }, { lightboxOpen, activeKey, hasPrev, hasNext, open, prev, next }, { sortBy, sortedImages }

### Community 1 - "check-images Script"
Cohesion: 0.25
Nodes (8): LIST_SORT_OPTIONS, ListSortOption, useImageSizes(), useListSort(), backgroundImages, { activeSrc, activeTitle }, { lightboxOpen, activeKey, hasPrev, hasNext, open, prev, next }, { sortBy, sortedImages }

### Community 2 - "Sorting System"
Cohesion: 0.11
Nodes (20): ARTIST_SORT_OPTIONS, createSortComposable(), ImageSortOption, isValidSort(), RELEASE_SORT_OPTIONS, sortImages(), useArtistSort, useReleaseSort (+12 more)

### Community 3 - "Package Dependencies"
Cohesion: 0.40
Nodes (4): svgIcons, { activeSrc, activeTitle }, { lightboxOpen, activeKey, hasPrev, hasNext, open, prev, next }, { sortBy, sortedImages }

### Community 4 - "Project Concepts & Deployment"
Cohesion: 0.14
Nodes (17): SPA HTML Shell (index.html), Font Preload (Montserrat, Julius Sans One), content.sentimony.com Deployment, Digital Keeper, JAMstack Architecture, Lucide, Netlify, Reka UI (+9 more)

### Community 5 - "Community 5"
Cohesion: 0.27
Nodes (6): useImageNavigation(), useLightboxImage(), svgImages, { activeSrc, activeTitle }, { lightboxOpen, activeKey, hasPrev, hasNext, open, prev, next }, { sortBy, sortedImages }

### Community 6 - "App Shell & Routing"
Cohesion: 0.17
Nodes (5): currentYear, menuItems, app, router, router

### Community 7 - "Community 7"
Cohesion: 0.25
Nodes (6): sortBy, SortOption, eventImages, { activeSrc, activeTitle }, { lightboxOpen, activeKey, hasPrev, hasNext, open, prev, next }, { sortBy, sortedImages }

### Community 8 - "Image Lightbox"
Cohesion: 0.29
Nodes (7): abortController, emit, fileSizeLabel, fullName, onClick(), Props, src

### Community 9 - "Grid Item Component"
Cohesion: 0.11
Nodes (20): abortController, dimensions, emit, fileSize, infoLabel, loadFileSize(), onKeydown(), open (+12 more)

### Community 10 - "Community 10"
Cohesion: 0.33
Nodes (6): abortController, emit, fileSizeLabel, onClick(), onImgLoad(), Props

### Community 11 - "Community 11"
Cohesion: 0.40
Nodes (4): videoImages, { activeSrc, activeTitle }, { lightboxOpen, activeKey, hasPrev, hasNext, open, prev, next }, { sortBy, sortedImages }

## Ambiguous Edges - Review These
- `Digital Keeper` → `Reka UI`  [AMBIGUOUS]
  README.md · relation: references
- `Digital Keeper` → `shadcn-vue`  [AMBIGUOUS]
  README.md · relation: references

## Knowledge Gaps
- **62 isolated node(s):** `currentYear`, `menuItems`, `Props`, `open`, `fileSize` (+57 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Digital Keeper` and `Reka UI`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **What is the exact relationship between `Digital Keeper` and `shadcn-vue`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **Why does `fetchFileSize()` connect `Grid Item Component` to `Image Lightbox`, `check-images Script`, `Community 10`?**
  _High betweenness centrality (0.055) - this node is a cross-community bridge._
- **Why does `useImageNavigation()` connect `Community 5` to `Image Data Configs & Composables`, `check-images Script`, `Sorting System`, `Package Dependencies`, `Community 7`, `Community 11`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `useLightboxImage()` connect `Community 5` to `Image Data Configs & Composables`, `check-images Script`, `Sorting System`, `Package Dependencies`, `Community 7`, `Community 11`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **What connects `currentYear`, `menuItems`, `Props` to the rest of the system?**
  _63 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Sorting System` be split into smaller, more focused modules?**
  _Cohesion score 0.11 - nodes in this community are weakly interconnected._