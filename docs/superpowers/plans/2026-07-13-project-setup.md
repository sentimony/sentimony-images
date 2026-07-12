# Project Setup Script Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an idempotent setup script that prepares agent skill directories and empty environment files before controlled skill installation.

**Architecture:** `scripts/setup.sh` owns filesystem preparation and resolves the repository root from its own location. `scripts/skills.sh` calls it before any installer command, while `package.json` exposes the setup operation for direct manual use.

**Tech Stack:** POSIX `sh`, npm scripts

## Global Constraints

- Preserve existing directories, installed skills, environment files, and environment-file contents.
- Create `.agents/skills`, `.claude/skills`, `.env/.env`, and `.env/.env.local` when absent.
- Resolve the project root from `scripts/setup.sh`, not from the caller's working directory.
- Stop skill installation immediately if setup fails.
- Do not execute real `npx skills add` commands during verification.
- Code comments must be in English.
- Preserve the side-by-side compiler layout: ordinary `typescript@^6.0.3` for `vue-tsc` and `@typescript/native` for TypeScript 7.

---

### Task 1: Idempotent project setup

**Files:**
- Create: `scripts/setup.sh`
- Modify: `scripts/skills.sh`
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `AGENTS.md`
- Modify: `docs/superpowers/plans/2026-07-13-project-setup.md`

**Interfaces:**
- Consumes: the filesystem path of `scripts/setup.sh` and standard POSIX utilities `dirname`, `mkdir`, and `touch`.
- Produces: `npm run setup`; required project paths; a setup call before the first `npx skills add` in `scripts/skills.sh`.

- [x] **Step 1: Run the failing structural check**

Run:

```bash
test -f scripts/setup.sh \
  && node -e "const p=require('./package.json'); if (p.scripts.setup !== 'sh scripts/setup.sh') process.exit(1)" \
  && rg -F 'sh "$SCRIPT_DIR/setup.sh"' scripts/skills.sh
```

Expected: FAIL because `scripts/setup.sh` and the npm setup script do not exist.

- [x] **Step 2: Create the setup script**

Create `scripts/setup.sh`:

```sh
#!/usr/bin/env sh
set -e

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
PROJECT_ROOT=$(dirname "$SCRIPT_DIR")

mkdir -p \
  "$PROJECT_ROOT/.agents/skills" \
  "$PROJECT_ROOT/.claude/skills" \
  "$PROJECT_ROOT/.env"

touch \
  "$PROJECT_ROOT/.env/.env" \
  "$PROJECT_ROOT/.env/.env.local"
```

- [x] **Step 3: Call setup before skill installation**

Add this block immediately after `set -e` in `scripts/skills.sh`:

```sh
SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
sh "$SCRIPT_DIR/setup.sh"
```

- [x] **Step 4: Expose the manual npm command**

Add this entry to `package.json` under `scripts`, immediately before `skills`:

```json
"setup": "sh scripts/setup.sh"
```

Add this line to the command block in `AGENTS.md`:

```bash
npm run setup    # Create required agent skill directories and empty env files when absent
```

- [x] **Step 5: Verify setup behavior in an isolated fixture**

Run:

```bash
fixture=$(mktemp -d)
mkdir -p "$fixture/project/scripts" "$fixture/project/.env"
cp scripts/setup.sh "$fixture/project/scripts/setup.sh"
printf 'sentinel\n' > "$fixture/project/.env/.env"
(cd / && sh "$fixture/project/scripts/setup.sh")
test -d "$fixture/project/.agents/skills"
test -d "$fixture/project/.claude/skills"
test -f "$fixture/project/.env/.env"
test -f "$fixture/project/.env/.env.local"
test "$(cat "$fixture/project/.env/.env")" = sentinel
sh "$fixture/project/scripts/setup.sh"
test "$(cat "$fixture/project/.env/.env")" = sentinel
rm -rf "$fixture"
```

Expected: every command exits `0`; paths are created relative to the fixture project; the sentinel survives both runs.

- [x] **Step 6: Verify syntax and call ordering**

Run:

```bash
sh -n scripts/setup.sh
sh -n scripts/skills.sh
node -e "const p=require('./package.json'); if (p.scripts.setup !== 'sh scripts/setup.sh') process.exit(1)"
setup_line=$(rg -n -F 'sh "$SCRIPT_DIR/setup.sh"' scripts/skills.sh | cut -d: -f1)
install_line=$(rg -n -m1 '^[[:space:]]*npx skills add' scripts/skills.sh | cut -d: -f1)
test "$setup_line" -lt "$install_line"
git diff --check
```

Expected: every command exits `0`; setup appears before the first skill installation; diff check prints nothing.

- [x] **Step 7: Run project verification**

Run:

```bash
npm run typecheck
npm run typecheck:ts7
npm run build
npm run test:pages
```

Expected: both typechecks and build exit `0`; all 9 page smoke tests pass. Do not run `npm install`, because `postinstall` would invoke real skill installation.

- [x] **Step 8: Commit**

```bash
git add scripts/setup.sh scripts/skills.sh package.json package-lock.json AGENTS.md docs/superpowers/plans/2026-07-13-project-setup.md
git commit -m "chore: prepare project before skill installation"
```
