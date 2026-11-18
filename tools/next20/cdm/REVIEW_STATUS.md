# CDM draft review status

**Draft only: the options-only quality gate is unresolved. Do not mark this exam ready, merge it, or describe the bank as independently approved.**

The bank contains 200 original questions, preserves the official five-domain proportions, and has 40 fetched primary source pages with 42 dated reads. These are independent model reviews, not human clinical, psychometric or native-language professional validation. Source coverage is selective and does not establish equivalence to the official exam or exhaustive textbook coverage.

## Raw options-only results

| Review artifact | Correct / 200 | Raw percentage |
|---|---:|---:|
| cdm-review | 161/200 | 80.5% |
| cdm-review-v2 (invalid; discarded) | 140/200 | 70.0% |
| cdm-review-v3 | 71/200 | 35.5% |
| cdm-review-v4 | 129/200 | 64.5% |
| cdm-review-v5 | 140/200 | 70.0% |

The second review was discarded because its reviewer admitted using the source file's repeating answer-position pattern. Later reviews independently shuffled both item and option order and used anonymous IDs.

Review protocols and content changed between rounds; these figures are not a controlled improvement trend. The third round’s aggregate 35.5% did not resolve the gate: nutrition was 19/40 (47.5%), and substantive depth was rejected. After primary-source expansion, the fourth review accepted selected substantive coverage and matched all 200 intended answers, but its options-only result remained 129/200. The fifth result was 140/200: knowledge cues 78/100, no identified cue 47/84, and surface cues 15/16. These classifications do not waive the required 40% ceiling.

The final draft pass revised 15 of the 16 identified surface suspects to use comparable measurement intervals, data pairs, task responsibilities, status terms or reference concepts. CDM-SAF-038 was retained: its four options are genuine distinct control steps and the surface-only guess selected the wrong one. A subsequent independent reviewer answered all 200 current questions blind and checked all 200 explanations. All intended keys matched. Two requested corrections were applied: NUT-005 now maps quantities explicitly rather than using order-dependent “respectively”; NUT-022 explicitly lists remaining sauce ingredients. The final edits have not received a fresh options-only review. No quality pass is inferred from factual agreement or validators.

Changed stable IDs:

CDM-NUT-014, CDM-NUT-019, CDM-NUT-023, CDM-NUT-025, CDM-PER-010, CDM-PER-011, CDM-PER-014, CDM-PER-018, CDM-PER-024, CDM-PER-030, CDM-PER-031, CDM-PER-035, CDM-PER-038, CDM-SAF-031, CDM-BUS-013.

## Remaining release work

- A fresh randomized options-only review and resolution of the quality gate, rather than reinterpretation of a failing raw score. Independent factual verification of the current draft is complete, including reviewer-requested wording corrections.
- Final-head CI and preview review, including required screenshots, once content quality is final. Preview/screenshots are deferred for this draft.
- Retain the documented scope limits: selected therapeutic-diet and CMS assessment concepts, limited advanced procurement/system design, capital finance and marketing coverage.

The full review artifacts are preserved outside the checkout under `/Users/johnbrophy/tigertest-next20-progress/cdm-review*`. A complete current bank checkpoint and the exact 15 changed items for factual review are under `cdm-draft-checkpoint`. See `sources.md`, `learning-objectives.md`, `item-source-map.json` and `validation.md` for source and check details.

Technical draft checks passed: TypeScript, lint, 956 tests and the full automerge-check script, including bank/baseline/freshness/generated-source checks. These results do not constitute quality approval or preview verification.

After the two final factual-review corrections, the validator passes, there are zero reused option sets, and stem-echo gain is 1.8 marks per 50.
