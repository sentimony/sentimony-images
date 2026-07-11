#!/usr/bin/env sh
# Skills used by this project. Add a line and re-run `npm run skills`.
set -e

npx skills add anthropics/claude-plugins-official -s claude-md-improver -a codex claude-code -y
npx skills add sentimony/skills -s web-debug vitest typescript -a codex claude-code -y
npx skills add obra/superpowers -s brainstorming writing-plans  executing-plans -a codex claude-code -y
