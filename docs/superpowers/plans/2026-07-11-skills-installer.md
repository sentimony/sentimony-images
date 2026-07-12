# Skills Installer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an explicitly controlled skills installer that runs after `npm install` and remains manually callable with `npm run skills`.

**Architecture:** `package.json` exposes the public command and delegates `postinstall` to it. `scripts/skills.sh` remains the single declarative list of skill sources, names, and target agents; it invokes the CLI through `npx` without global installation.

**Tech Stack:** POSIX `sh`, npm lifecycle scripts, `npx skills`

## Global Constraints

- Match `/Users/ihororlovskyi/work/github/io-upstars/scrum-master-vacancy/scripts/skills.sh` for installed sources, skill names, target agents, and non-interactive behavior.
- Do not install `skillio` globally or add it to project dependencies.
- Do not execute the installer as part of verification because it writes globally and into agent environments.
- Code comments must be in English.
- Keep `CLAUDE.md` at no more than 128 lines; it delegates to `AGENTS.md`, so update only `AGENTS.md`.

---

### Task 1: Controlled skills installer

**Files:**
- Create: `scripts/skills.sh`
- Modify: `package.json`
- Modify: `AGENTS.md`

**Interfaces:**
- Consumes: npm's script runner, `npx`, and the public skill repositories.
- Produces: `npm run skills`, which invokes `sh scripts/skills.sh` and installs the declared skills for Codex and Claude Code.

- [x] **Step 1: Run a failing structural check**

Run:

```bash
test -f scripts/skills.sh \
  && node -e "const p=require('./package.json'); if (p.scripts.skills !== 'sh scripts/skills.sh') process.exit(1)"
```

Expected: FAIL because `scripts/skills.sh` does not exist and `package.json` has no `skills` script.

- [x] **Step 2: Create the installer**

Create `scripts/skills.sh`:

```sh
#!/usr/bin/env sh
# Skills used by this project. Add a line and re-run `npm run skills`.
set -e

npx skills add anthropics/claude-plugins-official -s claude-md-improver -a codex claude-code -y
npx skills add sentimony/skills -s web-debug vitest typescript echarts -a codex claude-code -y
```

- [x] **Step 3: Expose the npm command**

Add this entry to `package.json` under `scripts`:

```json
"skills": "sh scripts/skills.sh"
```

- [x] **Step 4: Document the command**

Add this line to the command block in `AGENTS.md`:

```bash
npm run skills   # Install/update the project's controlled agent skill set
```

- [x] **Step 5: Verify the implementation**

Run:

```bash
sh -n scripts/skills.sh
node -e "const p=require('./package.json'); if (p.scripts.skills !== 'sh scripts/skills.sh') process.exit(1)"
rg -F "npx skills add anthropics/claude-plugins-official -s claude-md-improver -a codex claude-code -y" scripts/skills.sh
rg -F "npx skills add sentimony/skills -s web-debug vitest typescript echarts -a codex claude-code -y" scripts/skills.sh
git diff --check
```

Expected: every command exits `0`; both `rg` commands print the matching installer line; `git diff --check` prints nothing.

- [x] **Step 6: Commit**

```bash
git add scripts/skills.sh package.json AGENTS.md
git commit -m "chore: add skills installer"
```

### Task 2: Automatic postinstall execution

**Files:**
- Modify: `package.json`
- Modify: `AGENTS.md`
- Modify: `docs/superpowers/specs/2026-07-11-skills-installer-design.md`
- Modify: `docs/superpowers/plans/2026-07-11-skills-installer.md`

**Interfaces:**
- Consumes: the existing npm script `skills`, whose exact value is `sh scripts/skills.sh`.
- Produces: npm lifecycle script `postinstall`, whose exact value is `npm run skills`.

- [x] **Step 1: Run the failing lifecycle check**

Run:

```bash
node -e "const p=require('./package.json'); if (p.scripts.postinstall !== 'npm run skills') process.exit(1)"
```

Expected: FAIL with exit code `1` because `postinstall` is absent.

- [x] **Step 2: Add the lifecycle script**

Add this entry to `package.json` under `scripts`, immediately after `skills`:

```json
"postinstall": "npm run skills"
```

- [x] **Step 3: Document automatic execution**

Replace the skills command comment in `AGENTS.md` with:

```bash
npm run skills   # Install/update the controlled agent skill set (also runs automatically after npm install)
```

- [x] **Step 4: Verify without executing the installer**

Run:

```bash
sh -n scripts/skills.sh
node -e "const p=require('./package.json'); if (p.scripts.skills !== 'sh scripts/skills.sh' || p.scripts.postinstall !== 'npm run skills') process.exit(1)"
! rg -F "npm i -g skillio" scripts/skills.sh
rg -F "npx skills add anthropics/claude-plugins-official -s claude-md-improver -a codex claude-code -y" scripts/skills.sh
rg -F "npx skills add sentimony/skills -s web-debug vitest typescript echarts -a codex claude-code -y" scripts/skills.sh
npm run typecheck
npm run build
npm run test:pages
git diff --check
```

Expected: every command exits `0`; all 9 page smoke tests pass; no command runs `npm install` or the skills installer.

- [x] **Step 5: Amend the unpushed commit**

```bash
git add scripts/skills.sh package.json AGENTS.md docs/superpowers/specs/2026-07-11-skills-installer-design.md docs/superpowers/plans/2026-07-11-skills-installer.md
git commit --amend --no-edit
```
