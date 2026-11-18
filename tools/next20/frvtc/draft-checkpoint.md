# Unfinished draft checkpoint

This is an explicitly authorized DRAFT checkpoint, not a completed exam or a waived quality gate. Substantive quality work remains pending revisit. Preview and screenshots are deferred until quality is final. No human or native-speaker review is claimed.

## Independent review history

The first options-only review scored **174/200**: knowledge 112/113, surface 15/15, none 47/72 (no separate prior classification in that review). All 200 stem-based answers matched intended keys, and all explanations were checked; the pedagogical review required a rebuild.

After the corrective rebuild and shortening, the second options-only review scored **163/200**: knowledge 107/113, prior 53/84, surface 2/2, none 1/1. These classifications describe the reviewer's reasoning; they do not excuse the raw score or waive the gate. The latest independent model review checked all 200 answers and explanations and found them aligned; French and A2 English were competent. The review still identified concrete wording and distractor improvements. A final blind check of all 11 changed items matched every intended key and requested three remaining precision repairs. Those were applied: platform scope in T3P018, reservation date/time instead of a client-name distractor in REG025, and business-travel scope in COM023. The reviewer confirmed the reported wording against previously checked sources; this was not a new file inspection or a fresh options-only pass.

## Selective fixes

- COM021: explicit email channel in stem and explanation.
- T3P018: express statutory refusal protection; ordinary departure replaced by departure without the accepted client, and a vague incident by failure to respect the agreed destination.
- COM007: comparison of identical services and fees, removing dangling references.
- REG024: explicit reserving-client contact details.
- SEC009: explicit signal of intention to turn left, with safe overtaking qualification in the option.
- REG025: competing missing document fields, replacing the sole option promising all information. Bag count is distinguished from mandatory reservation fields.
- SEC028: removed irrelevant alcohol aside.
- SEC026 and SEC016: replaced unrelated actors with competing actions.
- COM023: replaced unrelated professions with adjacent transport responsibilities.
- COM006: evaluates overlap of a substitute service with the business's routes and times, instead of repeating COM001's identification of indirect competition.

T3P021 and T3P022 were inspected and retained: the former identifies a protected criterion against genuine material limits; the latter tests whether an incorrectly attributed religion is still protected. They remain close and are recorded for the unresolved broader quality revisit. R168's correct explanation was left unchanged.

Changed IDs:

- FRVTC-COM-006
- FRVTC-COM-007
- FRVTC-COM-021
- FRVTC-COM-023
- FRVTC-REG-024
- FRVTC-REG-025
- FRVTC-SEC-009
- FRVTC-SEC-016
- FRVTC-SEC-026
- FRVTC-SEC-028
- FRVTC-T3P-018

## Validation and handoff

All category and full-bank validators pass. Stem median remains 17 words (target 12–18). No shared option sets; full-bank echo gain +0.8/50, every category below +2 (English unchanged at +1.04). Source checker: 55 primary pages, 0 secondary, 55 dated reads. Counts, IDs and keyed positions remain stable. The updated full sequential `scripts/automerge-checks.sh` exited 0: typecheck, lint (existing warnings), 963/963 tests, bank checks, option/stem baselines, freshness and generated source manifest all pass. Bank and source map reproduce exactly; repeated option text consists only of legitimate numeric answers. This technical result does not resolve the quality gate. Log: `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/automerge-draft-final.log`.

Blind changed-item questions, separately keyed mapping, before records and explanations are in `/Users/johnbrophy/tigertest-next20-progress/frvtc-review-final-changes`. The blind question file contains no answer keys or source IDs. No new commit or PR was made by the builder; the parent handles the authorized draft checkpoint.

After those three final repairs, the canonical bank was rebuilt and passed its validator, stem check (median17) and option-reuse check (zero shared sets; echo gain0.8/50). The full963-test run preceded only those three prose corrections.
