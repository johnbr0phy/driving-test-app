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

## Third review (blind, Opus), 2026-11-17

Blind agreement 120/120. Two questions were listed for adjudication (agreed, medium confidence):

- PROSE-006 (autobiography): reviewer saw memoir as a possible alternative. Verdict: tighten wording. Stem now says "a complete, chronological account of her whole life ... rather than a few chosen episodes", and the explanation says a memoir would focus on selected episodes or one period. Key unchanged.
- POETRY-008 (final consonance, "blank, think, trunk"): verdict no problem. The vowels differ, so it is not full rhyme or assonance, and the shared final nk consonants are the pattern named; no change.

Rebuilt; option reuse (0% shared, echo gain -0.7), answer patterns (strict), check_banks and validate_v2_bank all pass.

## Stem trim, 2026-11-18

Median stem length cut from 26 to 17 words (118 of 120 stems changed). Scenario wrapping, stacked qualifiers and long asks were shortened; quoted extracts and passages kept intact. Keys and options unchanged. Rebuilt and passed check_stem_length, check_option_reuse, check_answer_patterns, check_banks and validate_v2_bank.

## Review after stem trim (blind, Opus), 2026-11-18

A blind reviewer answered every changed question (118 of 118 agreed with the key). Four were listed for adjudication (all agreed):

- DRAMA-004 (tragicomedy: comic journey, near execution, rescue with an irreversible loss): verdict no problem. Comic action plus serious danger and a mixed ending is tragicomedy; tragedy needs ruin, melodrama a sensational clear-cut resolution. No change.
- DRAMA-014 (loose railing, later breaks): verdict wording fix. The ask "What does the remark do?" did not fit noun options; stem now ends "Which technique is the remark?". Key (Foreshadowing) and options unchanged.
- PROSE-009 (generous yet jealous, explored in depth): verdict no problem. The stem shows complexity, not change, so round character is right and dynamic character is a fair distractor. No change.
- POETRY-028 ("a slight inconvenience" after a flood): verdict tighten to rule out euphemism. Stem now says the traveller "jokes it was" a slight inconvenience, and the explanation says understatement shrinks the size of the loss while euphemism only swaps in a gentler name. Key and options unchanged.

Rebuilt; stem length median 17 words, option reuse (0% shared, echo gain -0.4), answer patterns (strict), check_banks and validate_v2_bank all pass.
