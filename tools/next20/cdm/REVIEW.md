# CDM bank review, Nov 18 2026

Repaired and reviewed under the cue-based options-only rule (PR #889), which replaces the flat
40% ceiling that Codex's drafts could not meet without writing logic puzzles.

## What changed from Codex's draft

- Every stem shortened: median 16 words (was 26, which failed CI's 20-word limit).
- About 75 items rewritten or replaced: the 24 surface-cue items from the first calibration
  pass, every logic-puzzle item (answerable from the stem's own logic, such as an action log
  reading "Pilot complete; revision assigned; approval pending"), and three concepts the
  rewrite had duplicated across domains.
- Replacements are written from the saved official sources only: CBDM 2025 practice standards
  and outline, FDA Food Code 2022 (sections listed in `sources.md`), DOL FMLA and USERRA, EEOC,
  CMS RAI Section K, 42 CFR 483.10 and the ICN Culinary Keystones manual.
- Source files are edited through `edit_items.py`; `build.py` rebuilds the bank.

## Reviews (fresh agents that never saw the keys; files in `review/`)

1. Blind key review of all 200 with the sources: 198/200 agreed with the key. The two
   disagreements (FOO-029 medium dice size, SAF-036 thawing wording) and five other flags
   (PER-033, NUT-040, SAF-042 duplicating SAF-045, and two borderline) were fixed or replaced.
2. Options-only pass (`tools/options_only.py`): 126/200 (63%), inside the 64 to 82% range of
   live banks. Knowledge picks 41/46 right. All 15 surface-cue picks hit; those 15 items were
   rewritten.
3. Options-only recheck of the 15 rewritten items by a different reviewer: 6 still tagged as
   surface-cue hits, so the bank is at the 3% limit (6 of 200). Two with strawman distractors
   (PER-007, PER-040) were rewritten again. The remaining four (FOO-013, FOO-017, NUT-014,
   PER-024) are the correct method or concept (blind coded tasting, a rate rather than a count,
   SMART goals, cross-training), not a form cue.
4. Not re-reviewed: the seven items edited after reviews 1 and 3 (SAF-036, SAF-042, PER-007,
   PER-033, PER-040, NUT-040, FOO-029). Each was checked against its source text by hand.

These are model reviews, not human expert review.

## Checks

`scripts/automerge-checks.sh` passed (typecheck, lint, tests, bank checks) on the branch
merged with main; the bank validator, option reuse and stem echo, stem length and answer
pattern checks pass on the final bank. Landing previewed on the dev server (status 200, no page
errors); screenshots in `public/landing/cdm-*.png`, light and dark.
