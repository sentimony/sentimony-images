# TypeScript hardening design

## Goal

Strengthen the shared TypeScript contract and ensure CI validates both compiler paths used by the project.

## Compiler configuration

Enable these options in `tsconfig.base.json`, one at a time:

- `noFallthroughCasesInSwitch: true`;
- `noImplicitOverride: true`;
- `exactOptionalPropertyTypes: true`.

Because both leaf configs extend the shared base, Vue/TypeScript 6 and Netlify/native TypeScript 7 receive the same strictness contract.

## Source adjustment

`exactOptionalPropertyTypes` exposes one current issue in `fetchFileSize`: `{ signal: undefined }` is not a valid `RequestInit`. Build the request initializer with `method: 'HEAD'`, then assign `signal` only when an `AbortSignal` exists. Do not use casts, `any`, non-null assertions, or suppressions.

## CI

Keep `npm run typecheck` as the Vue-aware check and add `npm run typecheck:ts7` immediately after it in `.github/workflows/ci.yml`. CI must validate both the TypeScript 6 compiler API used by `vue-tsc` and the native TypeScript 7 Netlify graph.

## Documentation

Update the TypeScript command notes in `AGENTS.md` to list all shared strictness flags and clarify that CI runs both compiler paths.

## Verification

Demonstrate the existing `exactOptionalPropertyTypes` failure before implementation. Enable flags sequentially, running the relevant checker after each change. Final verification includes:

- the TypeScript skill inspection helper;
- `npm run typecheck`;
- `npm run typecheck:ts7`;
- `npm run build`;
- `npm run test:pages` with all 9 routes passing;
- a hygiene scan confirming no `any`, assertions, or TypeScript suppressions were introduced.

## Scope

Do not change module resolution, target, dependency versions, tsconfig ownership, or the TypeScript 6/7 side-by-side layout. Preserve the project setup changes already committed on `typescript7`.
