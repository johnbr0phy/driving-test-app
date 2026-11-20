#!/usr/bin/env bash
# Vercel "Ignored Build Step" (vercel.json ignoreCommand).
# Exit 0 skips the build, exit 1 builds. Build minutes were most of the Vercel
# bill in Nov 2026 (about 19 builds a day), so builds run only when:
#   1. the deploy is Production. Previews never build. Production tracks the
#      `production` branch, which .github/workflows/release.yml moves to the
#      latest green main a few times a day (or on demand).
#   2. something the site uses changed since the last production deploy.
#      Docs, tests, tools, bots and the mobile shell do not change the site.

if [ "$VERCEL_ENV" != "production" ]; then
  echo "Skip: $VERCEL_ENV deploy of ${VERCEL_GIT_COMMIT_REF:-unknown} (only production builds)."
  exit 0
fi

PREV="$VERCEL_GIT_PREVIOUS_SHA"
CUR="${VERCEL_GIT_COMMIT_SHA:-HEAD}"
if [ -z "$PREV" ]; then
  echo "Build: no previous production deploy to compare with."
  exit 1
fi
if ! git cat-file -e "$PREV^{commit}" 2>/dev/null; then
  git fetch --quiet --deepen=500 origin 2>/dev/null || true
fi
if ! git cat-file -e "$PREV^{commit}" 2>/dev/null; then
  echo "Build: previous deploy $PREV is not in this clone."
  exit 1
fi

CHANGED=$(git diff --name-only "$PREV" "$CUR" -- . \
  ':(exclude)docs/**' ':(exclude)tests/**' ':(exclude)tools/**' \
  ':(exclude).github/**' ':(exclude).claude/**' ':(exclude)agentic-rewrite/**' \
  ':(exclude)mobile/**' ':(exclude)audits/**' ':(exclude)ralph-loop/**' \
  ':(exclude)functions/**' ':(exclude)*.md' ':(exclude)playwright.config.ts')

if [ -z "$CHANGED" ]; then
  echo "Skip: nothing the site uses changed since $PREV."
  exit 0
fi
echo "Build: $(echo "$CHANGED" | wc -l | tr -d ' ') site files changed since $PREV."
exit 1
