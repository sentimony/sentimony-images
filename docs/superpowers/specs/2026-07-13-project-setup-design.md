# Project setup script design

## Goal

Prepare directories and environment files required by local agent tooling before the project installs its controlled skills.

## Interface

Add `scripts/setup.sh` and expose it as `npm run setup`. `scripts/skills.sh` invokes the setup script before its first `npx skills add` command, so the existing npm `postinstall` chain prepares the filesystem before installing skills.

## Paths

The setup script ensures these directories exist:

- `.agents/skills`;
- `.claude/skills`;
- `.env`.

It also ensures these files exist:

- `.env/.env`;
- `.env/.env.local`.

Directories are created with `mkdir -p`; files are created with `touch`. Existing directories, skills, environment files, and environment-file contents must remain unchanged.

## Path resolution

The script derives the project root from its own location instead of the caller's current working directory. Running `sh /path/to/project/scripts/setup.sh` therefore always prepares that project.

## Error handling

Both shell scripts use `set -e`. A setup failure stops skill installation immediately, before any `npx skills add` command runs.

## Verification

Run the setup script against an isolated temporary project fixture. Verify that all required paths are created, an existing environment-file sentinel remains intact, and the script succeeds when run repeatedly. Validate both scripts with `sh -n` and do not invoke real skill installation during tests.

## Existing work

Preserve all current user changes in `README.md`, `package.json`, `package-lock.json`, and `scripts/skills.sh`. The implementation adds the setup call to the user's expanded skill list without rewriting that list.
