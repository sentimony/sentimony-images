# TypeScript Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enable three additional strictness flags and make CI validate both the Vue/TypeScript 6 and Netlify/native TypeScript 7 compiler paths.

**Architecture:** Shared strictness belongs in `tsconfig.base.json`, inherited by both leaf configs. The one exact-optional incompatibility is fixed at its source, while CI retains separate commands for Vue SFC coverage and the native Netlify graph.

**Tech Stack:** TypeScript 6.0.3, native TypeScript 7.0.2, Vue 3, vue-tsc, GitHub Actions

## Global Constraints

- Enable strictness flags one at a time and verify after each change.
- Keep `module: ESNext`, `moduleResolution: Bundler`, `target: ESNext`, and the tsconfig extends chain unchanged.
- Preserve ordinary `typescript@^6.0.3` for `vue-tsc` and `@typescript/native` for native TypeScript 7.
- Do not introduce `any`, casts, non-null assertions, `@ts-ignore`, or `@ts-expect-error`.
- Keep `npm run typecheck` Vue-aware; do not replace it with plain `tsc`.
- Code comments must be in English.

---

### Task 1: Cheap shared strictness flags

**Files:**
- Modify: `tsconfig.base.json`
- Test: `npm run typecheck`
- Test: `npm run typecheck:ts7`

**Interfaces:**
- Consumes: the shared compiler options inherited by `tsconfig.json` and `netlify/tsconfig.json`.
- Produces: `noFallthroughCasesInSwitch: true` and `noImplicitOverride: true` for both compiler paths.

- [x] **Step 1: Run the failing structural check**

Run:

```bash
node -e "const c=require('./tsconfig.base.json').compilerOptions; if (c.noFallthroughCasesInSwitch !== true || c.noImplicitOverride !== true) process.exit(1)"
```

Expected: FAIL with exit code `1` because both options are absent.

- [x] **Step 2: Enable `noFallthroughCasesInSwitch`**

Add this option after `noUncheckedIndexedAccess` in `tsconfig.base.json`:

```json
"noFallthroughCasesInSwitch": true
```

- [x] **Step 3: Verify both compiler paths**

Run:

```bash
npm run typecheck
npm run typecheck:ts7
```

Expected: both commands exit `0`.

- [x] **Step 4: Enable `noImplicitOverride`**

Add this option after `noFallthroughCasesInSwitch` in `tsconfig.base.json`:

```json
"noImplicitOverride": true
```

- [x] **Step 5: Verify both compiler paths**

Run:

```bash
npm run typecheck
npm run typecheck:ts7
```

Expected: both commands exit `0`.

- [x] **Step 6: Commit**

```bash
git add tsconfig.base.json
git commit -m "chore: enable low-cost TypeScript strictness"
```

### Task 2: Exact optional property types

**Files:**
- Modify: `tsconfig.base.json`
- Modify: `src/composables/useFileSize.ts`
- Test: `npm run typecheck`
- Test: `npm run typecheck:ts7`

**Interfaces:**
- Consumes: optional `AbortSignal` passed to `fetchFileSize(url, signal?)`.
- Produces: a `RequestInit` that omits `signal` when no signal exists; `exactOptionalPropertyTypes: true` for both compiler paths.

- [x] **Step 1: Verify the exact-optional failure**

Run:

```bash
npx vue-tsc --noEmit --exactOptionalPropertyTypes
```

Expected: FAIL with TS2769 at `src/composables/useFileSize.ts`, because `{ signal: undefined }` is not assignable to `RequestInit`.

- [x] **Step 2: Enable `exactOptionalPropertyTypes`**

Add this option after `noImplicitOverride` in `tsconfig.base.json`:

```json
"exactOptionalPropertyTypes": true
```

- [x] **Step 3: Run the project typecheck to confirm RED**

Run:

```bash
npm run typecheck
```

Expected: FAIL with the same TS2769 at `src/composables/useFileSize.ts:19`.

- [x] **Step 4: Fix the request initializer**

Replace the fetch call in `fetchFileSize` with:

```ts
const init: RequestInit = { method: 'HEAD' }
if (signal) init.signal = signal
const res = await fetch(url, init)
```

- [x] **Step 5: Verify both compiler paths**

Run:

```bash
npm run typecheck
npm run typecheck:ts7
```

Expected: both commands exit `0`.

- [x] **Step 6: Commit**

```bash
git add tsconfig.base.json src/composables/useFileSize.ts
git commit -m "chore: enable exact optional property types"
```

### Task 3: Native TypeScript 7 in CI

**Files:**
- Modify: `.github/workflows/ci.yml`
- Modify: `AGENTS.md`
- Modify: `docs/superpowers/plans/2026-07-13-typescript-hardening.md`
- Test: structural workflow check

**Interfaces:**
- Consumes: existing npm scripts `typecheck` and `typecheck:ts7`.
- Produces: CI execution of both compiler paths and matching project documentation.

- [x] **Step 1: Run the failing CI structural check**

Run:

```bash
rg -F -- '- run: npm run typecheck:ts7' .github/workflows/ci.yml
```

Expected: FAIL with exit code `1` because CI does not invoke the native checker.

- [x] **Step 2: Add the native checker to CI**

Add this step immediately after `npm run typecheck` in `.github/workflows/ci.yml`:

```yaml
      - run: npm run typecheck:ts7
```

- [x] **Step 3: Update TypeScript documentation**

Update the `npm run typecheck` and `npm run typecheck:ts7` notes in `AGENTS.md` to state that shared strictness includes `noUncheckedIndexedAccess`, `noFallthroughCasesInSwitch`, `noImplicitOverride`, and `exactOptionalPropertyTypes`, and that CI runs both commands.

- [x] **Step 4: Verify the workflow and effective config**

Run:

```bash
rg -F -- '- run: npm run typecheck:ts7' .github/workflows/ci.yml
python /Users/ihororlovskyi/work/github/ihororlovskyi/sentimony-images/.agents/skills/typescript/scripts/inspect_typescript.py --root .
node -e "const c=require('./tsconfig.base.json').compilerOptions; for (const k of ['noFallthroughCasesInSwitch','noImplicitOverride','exactOptionalPropertyTypes']) if (c[k] !== true) process.exit(1)"
```

Expected: workflow line prints; inspection shows both leaf configs inherit all strictness options; structural check exits `0`.

- [x] **Step 5: Run full verification**

Run:

```bash
npm run typecheck
npm run typecheck:ts7
npm run build
npm run test:pages
rg -n --glob '!node_modules/**' --glob '!dist/**' --glob '*.{ts,tsx,vue,mts}' '(:[[:space:]]*any\b|as[[:space:]]+any\b|@ts-ignore|@ts-expect-error|[[:alnum:]_\])}]![.;,?[:space:]\[])' src netlify vite.config.ts || true
git diff --check
```

Expected: both typechecks and build exit `0`; all 9 smoke routes pass; hygiene grep and diff check print nothing.

- [x] **Step 6: Commit**

```bash
git add .github/workflows/ci.yml AGENTS.md docs/superpowers/plans/2026-07-13-typescript-hardening.md
git commit -m "ci: check native TypeScript 7"
```
