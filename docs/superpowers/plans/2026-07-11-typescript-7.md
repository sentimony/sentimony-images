# TypeScript 7 Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add TypeScript 7.0.2 alongside the TypeScript 6 compatibility API so native and Vue-aware checks both remain available and green.

**Architecture:** Install ordinary TypeScript 6 for `vue-tsc` and alias TypeScript 7 as `@typescript/native`. Native `typecheck:ts7` invokes the alias executable explicitly for the independent Netlify graph; Vue-aware `typecheck` owns the complete application graph because native TypeScript cannot resolve embedded `.vue` modules.

**Tech Stack:** TypeScript 7, Vue 3, vue-tsc, npm, Vite, Playwright

## Global Constraints

- Work only on the isolated `typescript7` branch and leave `master` at `origin/master`.
- Preserve the user's existing `package-lock.json` and `scripts/skills.sh` changes already amended into the branch commit.
- Install `@typescript/native` as `npm:typescript@^7.0.2` and ordinary `typescript@^6.0.3`; do not use `@typescript/native-preview`, `@typescript/typescript6`, or `tsgo`.
- Do not add peer overrides, custom module-resolution wrappers, suppressions, `any`, assertions, or `@ts-ignore` to force compatibility.
- Use `npm install --ignore-scripts` for dependency operations so the agent-skills `postinstall` does not run during migration verification.
- Keep the migration as one amended, unpushed commit.

---

### Task 1: Establish the TypeScript 6 baseline

**Files:**
- Inspect: `package.json`
- Inspect: `package-lock.json`
- Inspect: `tsconfig.base.json`
- Inspect: `tsconfig.json`
- Inspect: `netlify/tsconfig.json`

**Interfaces:**
- Consumes: installed TypeScript 6.0.3, `vue-tsc --noEmit`, and the existing tsconfig extends chain.
- Produces: baseline version and successful verification output for comparison with TypeScript 7.

- [x] **Step 1: Inspect the effective configuration**

Run:

```bash
python /Users/ihororlovskyi/work/github/ihororlovskyi/sentimony-images/.agents/skills/typescript/scripts/inspect_typescript.py --root .
node -p "require('./node_modules/typescript/package.json').version"
npm ls typescript vue-tsc --all
```

Expected: installed TypeScript is `6.0.3`; the helper recommends `npm run typecheck`; `vue-tsc` resolves the same compiler.

- [x] **Step 2: Check compiler API coupling**

Run:

```bash
rg "from ['\"]typescript['\"]|require\\(['\"]typescript['\"]\\)|tsserver|languageService" --glob '!node_modules/**' . || true
```

Expected: no project source imports the TypeScript compiler API.

- [x] **Step 3: Run the baseline checks**

Run:

```bash
python /Users/ihororlovskyi/work/github/ihororlovskyi/sentimony-images/.agents/skills/typescript/scripts/run_typecheck.py --root .
npx tsc -p netlify/tsconfig.json
npm run build
npm run test:pages
```

Expected: typecheck summary has zero errors; native Netlify check and build exit `0`; all 9 page smoke tests pass.

### Task 2: Install and validate side-by-side TypeScript 6 and 7

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `docs/superpowers/plans/2026-07-11-typescript-7.md`

**Interfaces:**
- Consumes: npm registry package `typescript@^7.0.2` and the baseline commands from Task 1.
- Produces: dependencies `@typescript/native: npm:typescript@^7.0.2` and `typescript: ^6.0.3`, `typecheck:ts7`, a matching lockfile, and verified Vue-aware compatibility.

- [x] **Step 1: Install the official side-by-side dependencies**

Run:

```bash
npm install --save-dev '@typescript/native@npm:typescript@^7.0.2' 'typescript@^6.0.3' --ignore-scripts
```

Expected: npm exits `0`; `package.json` and `package-lock.json` contain both aliases.

- [x] **Step 2: Verify the resolved compiler**

Run:

```bash
node -p "require('./node_modules/typescript/package.json').version"
node -p "require('./node_modules/@typescript/native/package.json').version"
node node_modules/@typescript/native/bin/tsc --version
npm ls typescript vue-tsc --all
```

Expected: `typescript` reports ordinary version `6.0.3`; `@typescript/native` reports `7.0.2`; dependency tree has no invalid or missing peer dependency. Do not rely on `npx tsc` because both packages declare that bin name.

- [x] **Step 3: Add the native typecheck command**

Add this entry to `package.json` under `scripts`:

```json
"typecheck:ts7": "node node_modules/@typescript/native/bin/tsc -p netlify/tsconfig.json"
```

- [x] **Step 4: Run narrow TypeScript checks**

Run:

```bash
npm run typecheck:ts7
python /Users/ihororlovskyi/work/github/ihororlovskyi/sentimony-images/.agents/skills/typescript/scripts/run_typecheck.py --root .
```

Expected: native TypeScript 7 checks the Netlify tsconfig; the helper runs `vue-tsc --noEmit` against the TypeScript 6 API and checks the complete Vue application graph with zero errors. If either compiler path is wrong or `vue-tsc` crashes, stop without further workarounds.

- [x] **Step 5: Run full project verification**

Run:

```bash
npm run build
npm run test:pages
git diff --check
```

Expected: build exits `0`; all 9 page smoke tests pass; diff check prints nothing.

- [x] **Step 6: Re-inspect the migrated project**

Run:

```bash
python /Users/ihororlovskyi/work/github/ihororlovskyi/sentimony-images/.agents/skills/typescript/scripts/inspect_typescript.py --root .
git diff -- package.json package-lock.json
```

Expected: helper reports ordinary TypeScript 6 used by the Vue-aware typecheck, the same effective compiler options, and `typecheck:ts7`; diff contains only the intended dependencies, script, and lockfile resolution changes.

- [x] **Step 7: Amend the branch's single commit**

```bash
git add package.json package-lock.json docs/superpowers/plans/2026-07-11-typescript-7.md
git commit --amend --no-edit
```

- [x] **Step 8: Verify the committed state**

Run:

```bash
git status --short
git log --oneline origin/master..HEAD
node -p "require('./node_modules/typescript/package.json').version"
node -p "require('./node_modules/@typescript/native/package.json').version"
node node_modules/@typescript/native/bin/tsc --version
npm run typecheck
npm run typecheck:ts7
npm run build
npm run test:pages
```

Expected: worktree is clean; exactly one commit is ahead of `origin/master`; the API package is ordinary TypeScript 6.0.3 while the explicit native executable is 7.0.2; every verification exits `0`; all 9 page smoke tests pass.
