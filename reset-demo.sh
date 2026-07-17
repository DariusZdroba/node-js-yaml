#!/usr/bin/env bash
#
# Reset the breakability demo repo to its clean committed state so the demo
# can be re-run from scratch. Safe to run repeatedly.
#
# A demo run dirties tracked files (package.json, src/config.js) and leaves
# installed artifacts behind (node_modules/, package-lock.json). This script
# restores the tracked files to HEAD and removes those artifacts.
#
# Note: it deliberately does NOT delete itself — it excludes reset-demo.sh
# from the clean so you can run it again next time.
set -euo pipefail

# Operate on this script's own directory (the demo repo root), regardless of
# where it's invoked from.
cd "$(dirname "$0")"

# Restore tracked files (package.json, src/config.js, ...) to the pristine
# committed state.
git reset --hard HEAD

# Remove untracked artifacts a demo run leaves behind, but keep this script
# (and any dotfiles) so the reset stays repeatable.
git clean -fd -e reset-demo.sh

echo "Demo reset to $(git rev-parse --short HEAD) — clean working tree."
