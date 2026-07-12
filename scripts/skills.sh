#!/usr/bin/env sh
# Skills used by this project.
# Add a line and re-run `npm run skills`.
set -e

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
sh "$SCRIPT_DIR/setup.sh"

# ANTHROPIC
npx skills add https://github.com/anthropics/skills -s \
  frontend-design \
  -a codex claude-code -y
  # algorithmic-art
  # brand-guidelines
  # canvas-design
  # doc-coauthoring
  # skill-creator
  # webapp-testing
npx skills add https://github.com/anthropics/claude-plugins-official -s \
  claude-md-improver \
  -a codex claude-code -y
  # agent-development
  # claude-automation-recommender
  # command-development
  # hook-development
  # session-report
  # skill-development

# SENTIMONY
npx skills add https://github.com/sentimony/skills -s \
  web-debug \
  vitest \
  typescript \
  -a codex claude-code -y
  # echarts \

# SUPERPOWERS
npx skills add https://github.com/obra/superpowers -s \
  brainstorming \
  writing-plans \
  executing-plans \
  test-driven-development \
  systematic-debugging \
  verification-before-completion \
  finishing-a-development-branch \
  -a codex claude-code -y
  # using-superpowers
  # receiving-code-review \
  # requesting-code-review \
  # dispatching-parallel-agents \
  # subagent-driven-development \
  # using-git-worktrees \
  # writing-skills
