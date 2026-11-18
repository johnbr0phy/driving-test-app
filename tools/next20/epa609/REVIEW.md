# EPA Section 609 bank review, Nov 18 2026

Codex left this exam uncommitted: a 100-item bank its own review rejected (systemic strawman
distractors in about 60 rows) and a revised 40-item pilot outside the worktree. Claude finished
it under the cue-based options-only rule (PR #889).

## Design

100 original questions in four 25-question tests (7 Rules, 6 Equipment, 8 Service, 4 R-1234yf
per test), following the MACS online and home test length; registered in `KNOWN_BANKS` in the
bank validator. A 609 credential is an open-book, untimed program test; this is study practice,
not a simulation of any one program's form.

## What changed

- The 40-item pilot (`pilot_v5.json`, rows and evidence from Codex's v5) is overlaid on the bank
  by `build.py` by question ID.
- 13 items replaced: five that tested one maker's or one machine model's procedure (Tesla HV
  disablement, DENSO oil line, a Robinair filter screen, a detector model, one pump's oil
  level), three that a reviewer could not verify against the saved sources, one strawman, and
  items answerable from the stem. 16 items rewritten so the wrong options are plausible, and
  EQP-014 reframed from one Robinair model to the general MACS precaution.
- New facts come from the current 40 CFR part 82 subpart B with Appendix C (SAE J2788), read
  through the eCFR API on 2026-11-18, the MACS 2025 training manual, and EPA's MVAC pages.
- Codex's one-off wiring scripts and stale sample and review files were removed; the theme
  needed `scripts/build-email-brand.cjs` and a launch date, both added.

## Reviews (fresh agents that never saw the keys; files in `review/`)

1. Merged 100 before repair: blind keys 100/100; options-only 71% (the untouched 60 rows 85%,
   the pilot 40 50%), 20 surface-cue hits; 10 scope, verification and strawman flags.
2. After repair: blind keys 100/100, two flags (EQP-014 scope, SRV-007 mild), both fixed.
   Options-only 67%, 11 surface-cue hits; three rewritten (REG-006, SRV-007, SRV-019), the rest
   read as knowledge (desiccant after an open system, J2670, detector residue).
3. Options-only on the four items changed last: REG-006 and SRV-007 still tagged; REG-006 then
   made a two-by-two grid. Not re-reviewed after that edit.

By the raw tags the bank is about 8 surface-cue hits, above the 3% limit (3 for 100 items);
reading each, EQP-005 (filter-life lockout) is the clearest remaining cue. All reviews are
model reviews, not human expert review.

## Checks

`scripts/automerge-checks.sh` passes; validator, option reuse and stem echo, stem length
(median 14) and answer patterns pass. Landing previewed (status 200, no page errors);
screenshots `public/landing/epa609-*.png`, light and dark.
