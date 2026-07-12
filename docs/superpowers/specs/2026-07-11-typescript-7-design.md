# TypeScript 7 migration design

## Goal

Adopt stable TypeScript 7 alongside the TypeScript 6 compatibility API in the isolated `typescript7` branch, preserving Vue-aware type-checking while enabling the native compiler for ordinary TypeScript files.

## Existing changes

Preserve and fold the user's current working-tree changes into the branch's single unpushed commit:

- remove `echarts` from the skills installed by `scripts/skills.sh`;
- retain the existing `package-lock.json` updates for the npm install lifecycle and `ignore@7.0.6`.

## Dependency strategy

Use a Vue-compatible side-by-side layout based on the official native alias:

- `@typescript/native`: `npm:typescript@^7.0.2`, which supplies the native `tsc` binary;
- `typescript`: `^6.0.3`, which supplies the compiler API and physical `lib/tsc.js` layout required by `vue-tsc`.

The official `@typescript/typescript6` compatibility shim is not used because `vue-tsc@3.3.7` cannot patch its non-relative `@typescript/old/lib/tsc.js` forwarding path. Do not add the preview-era native package, peer-dependency overrides, custom module-resolution wrappers, or a broad `*.vue` shim. Invoke the native executable explicitly from `typecheck:ts7` to avoid ambiguous npm bin links.

## Compatibility checks

Verify both resolved packages and binaries, not only their declared ranges. Run:

- native `tsc` against `netlify/tsconfig.json` through `npm run typecheck:ts7`;
- the existing `vue-tsc --noEmit` command so `.vue` templates remain covered;
- the production build;
- all page smoke tests;
- the TypeScript skill's inspection and typecheck helpers.

Also compare the installed dependency tree and confirm that no project source directly consumes the TypeScript compiler API.

## Acceptance rule

The migration is acceptable only if the explicit native executable reports TypeScript 7, importing `typescript` resolves the ordinary TypeScript 6 package, `vue-tsc` executes normally, and all existing verification commands pass. A green native `tsc` run alone is insufficient because it does not check Vue SFC templates.

If the official alias layout does not satisfy those conditions, stop without adding suppressions, casts, peer overrides, or custom wrappers. Report the incompatibility and keep the experiment isolated from `master` for a later decision.

## Git outcome

Keep all task changes in one amended, unpushed commit on `typescript7`. Return `master` to `origin/master` and use an isolated worktree for implementation. Do not merge or push without a later explicit request.
