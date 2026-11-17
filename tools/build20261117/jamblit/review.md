# JAMB Literature independent review

Reviewed 2026-11-17, 120 original questions in each round, no sampling.

## Results

| Round | Options-only accuracy | Full-answer agreement | Outcome |
| --- | --- | --- | --- |
| 1 | 113/120 (94.2%) | 120/120 | Failed: implausible distractors exposed keys |
| 2 | 98/120 (81.7%) | 120/120 | Failed: default interpretations and uneven choices remained |
| 3 | 32/120 (26.7%) | 120/120 | Passed the options-only gate in every category |

Round 3: Drama 8/30, Prose 8/30, Poetry 8/30, Literary Appreciation 8/30. All four are below the 40% threshold. The third reviewer read only anonymised, shuffled options first and saved guesses before reading stems, then saved full answers before opening the keys and ID map. The complete 120-item audit is in `review-v3-audit.md`.

After round 2 the entire bank was rewritten using matched option families. Each four-item family gives four legitimate literary concepts or competing interpretations, each keyed once in a different original scenario. Families are spread across practice tests and drill-only questions. No repeated stem or question is used.

## Final edits after round 3

- PROSE-015, DRAMA-017 and POETRY-027: repaired missing possessives.
- APPRECIATION-012: replaced the old clock and father/work reminiscence with a newly installed clock organising current daily activities, removing the competing memory interpretation. Key and all four options unchanged.
- Rebuilt bank and reran structural validation and the meaningful answer-pattern scan after these edits. No incorrect key was reported by the reviewer.

These are introductory literary recognition and interpretation exercises, not a validated predictor of an examination score. Prescribed-book knowledge is expressly outside scope. A passing options-only probe does not establish psychometric validity. The bank, directions, landing and facts consistently describe literary-skills practice rather than complete syllabus simulation.

## Rewrite, 2026-11-17

The bank was first built as option "families" (four questions sharing one option set, each option keyed once), and keys often repeated the stem's words. Both were rewritten: every question now has its own wrong options and no stem echo (`tools/check_option_reuse.py`: 0% shared option sets, echo gain under 0). Keys, ids and test slots are unchanged. The options-only figures above describe the old build.

## Second review, 2026-11-17

120 questions, all answered blind from stem and options only; 120/120 agreed with the key. No wrong facts, ambiguity or typos found. One change: keys sat in a fixed A, B, C, D cycle within each category (key = index mod 4), so build.py now places keys by a seeded balanced shuffle per category (same options, same meaning, only letter positions move). Rebuilt; option-reuse (0% shared sets, echo gain -0.7), answer-pattern, check_banks and validate_v2_bank all pass.
