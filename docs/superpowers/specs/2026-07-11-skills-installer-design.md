# Skills installer design

## Goal

Add a small, explicitly controlled installer for the project's shared agent skills, matching the approach used in `scrum-master-vacancy`.

## Interface

`npm install` invokes the installer automatically through the npm `postinstall` lifecycle. Developers can also run `npm run skills` manually. Both paths delegate to `scripts/skills.sh`, which is the single declarative place to review and change the installed skill set.

## Behavior

The shell script:

- exits immediately when a command fails;
- installs `claude-md-improver` from `anthropics/claude-plugins-official`;
- installs `web-debug`, `vitest`, `typescript`, and `echarts` from `sentimony/skills`;
- targets both Codex and Claude Code;
- runs non-interactively.

The script uses `npx skills` without installing `skillio` globally or adding it to project dependencies. The implementation intentionally mirrors the reference skill declarations instead of adding a separate config format or version-management layer.

## Verification

- Validate the script with `sh -n scripts/skills.sh`.
- Confirm `package.json` remains valid, exposes `npm run skills`, and delegates `postinstall` to that npm script.
- Do not execute the installer during verification, because it performs global and agent-environment writes.

## Documentation

Add the new npm command to the command list in `AGENTS.md`. `CLAUDE.md` already delegates to that file through `@AGENTS.md`, so no duplicate entry is needed.
