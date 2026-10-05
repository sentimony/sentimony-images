#!/usr/bin/env sh
set -e

# echo the command in cyan, then run it
run() { printf '\033[0;36m%s\033[0m\n' "$*"; "$@"; }

run npx -y skills -v

# ANTHROPIC SKILLS
run npx skills add https://github.com/anthropics/skills -s \
  frontend-design \
  -a codex claude-code -y
  # algorithmic-art \
  # brand-guidelines \
  # canvas-design \
  # doc-coauthoring \
  # skill-creator \
  # webapp-testing \

# ANTHROPIC CLAUDE-PLUGINS-OFFICIAL
run npx skills add https://github.com/anthropics/claude-plugins-official -s \
  claude-md-improver \
  -a codex claude-code -y
  # agent-development \
  # claude-automation-recommender \
  # command-development \
  # hook-development \
  # session-report \
  # skill-development \

# OBRA SUPERPOWERS
run npx skills add https://github.com/obra/superpowers -s \
  executing-plans \
  finishing-a-development-branch \
  test-driven-development \
  systematic-debugging \
  verification-before-completion \
  using-git-worktrees \
  requesting-code-review \
  receiving-code-review \
  dispatching-parallel-agents \
  subagent-driven-development \
  -a codex claude-code -y
  # brainstorming \
  # writing-plans \
  # writing-skills \

# SENTIMONY SKILLS
run npx skills add https://github.com/sentimony/skills -s \
  scope-triage \
  plan-crafting \
  web-debug \
  vitest \
  typescript \
  echarts \
  dashfix \
  negafix \
  -a codex claude-code -y

# TASTE SKILL
run npx skills add https://github.com/Leonxlnx/taste-skill -s design-taste-frontend -a codex claude-code -y

# IMPECCABLE
run npx skills add https://github.com/pbakaus/impeccable -s impeccable -a codex claude-code -y

# skills.local.sh passes --no-list and prints its own listing after the local skills
if [ "$1" != --no-list ]; then
  run npx -y skillio -v
  run npx skillio ls -g
  run npx skillio list
  run npx skillio usage --period 2w
fi
