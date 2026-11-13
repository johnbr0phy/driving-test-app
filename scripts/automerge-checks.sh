#!/usr/bin/env bash
# The checks a PR gets from checks.yml and question-banks.yml, in one place for
# the workflows that merge their own PRs (question-audit.yml, search-gaps.yml).
# A PR opened with the workflow token starts no other workflow, so those runs
# check the working tree themselves before they open and merge it.
set -euo pipefail
npm run typecheck
npm run lint
npm test
npx tsx scripts/build-training-parts.ts --check
python3 -I tools/build_state_exam_facts.py --check
python3 -I scripts/review-question-banks.py
python3 -I tools/check_banks.py
python3 -I tools/check_freshness.py
python3 -I tools/build_exam_sources.py --check
