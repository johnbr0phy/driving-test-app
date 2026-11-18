# CDM build validation

Revised author draft, 2026-11-17. Fresh independent review and preview verification remain pending.

The initial independent review rejected the bank: options-only guesses were correct on 161/200 despite full-context factual answers being correct on 200/200. The original validator metrics below did not establish pedagogical quality. The bank was substantially rewritten across all five domains: 162 initial replacements plus subsequent plausibility and content passes. Current checks: 200 rows with unchanged pool weights and stable IDs; 50 keys per letter; average option length 22 characters; key-longest 6%; key over 1.2× distractor average 2%; zero shared option sets; stem-echo gain 1.9 marks/50 (19/46); source checker 24 primary pages, 0 secondary, 25 dated reads. Four final safety replacements add actual Food Code knowledge rather than arbitrary record matching. The author read revised stems/options and checked explanations, source tags and repeated concepts. Some operational record-interpretation questions remain straightforward; fresh independent review must assess challenge and cue resistance. No new heavy checks have run since this rewrite.

## Earlier implementation checks (before rejected bank rewrite)

Local checks: `bash scripts/automerge-checks.sh` passed after adding the missing CDM launch date. TypeScript, lint, all 956 tests, generated manifests, bank review, answer-pattern baseline, option-reuse baseline and freshness checks passed. Python 3.12 was put first on PATH because the system Python 3.9 cannot parse the source-checker annotations. The external log is `/Users/johnbrophy/tigertest-next20-progress/cdm-checks.log`.

The landing-date generator rewrote unrelated historical dates, so only its new CDM launch entry was retained. After the first content commit, regenerate and retain the new CDM landing date; do not ship unrelated historical-date changes.

- 200 original rows, five pools 40/44/40/48/28; official domain ratios 20/22/20/24/14%.
- Incremental bank validation after each category; final validate_bank.py PASS.
- Average option length 28 characters, correct option uniquely longest 10%, correct option over 1.2× distractor average 0%; 50 keys per letter.
- check_option_reuse.py --list: 0 shared option sets, echo gain 0.1 marks per 50 (14 keyed matches among 55 echo opportunities). These measurements are not proof of pedagogical quality.
- check_option_refs.py --list: 0 positional references.
- check_sources.py cdm: 24 primary pages, 0 secondary, 25 dated reads.
- Sources and bank-size manifests regenerated; no split training sets required.
- Theme HSL 240/75/48: no clash against light themes on main under the 8-degree/15-saturation/8-lightness rule; white button contrast 9.45: 1. Uses existing rdexam mascot.

Author self-review replaced unrelated distractors with competing foodservice decisions and distinguished screening from prescribing. Reviewer attention is still needed for safest/most-complete-option cues in management scenarios, conceptual redundancy and whether the challenge level matches the intended study scope. Pattern checker warnings remain for words more often in distractors (without, number, menu); they are warnings, not dismissed evidence. Do not label this bank independently reviewed until the separate review is complete.

Official source limitations: handbook viewer 403 and old direct PDF 404; current outline and owner FAQ provide format facts. Paywalled textbooks were not accessed. Landing explicitly presents focused study, not exhaustive textbook coverage or a 160-question simulation.70% is a practice target only.

Screenshots, final-head Vercel preview and CI are required before the PR can be considered ready. No local production build was run.

## Substantive depth rebuild after third review

The randomized third review found intended-answer agreement on all 200 but rejected inadequate depth and one Food Code exception. It was not an approval. The current rebuild replaces 41 low-information items with sourced subject knowledge, retains useful application/calculation items, corrects SAF-046 to meat/poultry (not fish), and clarifies NUT-005 carbohydrate units. Additional primary sources include CDC, FDA, NIDDK, current CMS RAI Section K, DOL, EEOC, OSHA, ICN and Washington Agriculture. See learning-objectives.md and item-source-map.json.

Final current bank validator PASS: 200 rows, 40/44/40/48/28 pools, 50 keys each; average option 22 characters, key-longest 7%, key >1.2× 3%. Reuse check: zero shared option sets; echo 19/45, gain 1.9 marks/50. Source checker: 39 primary pages, zero secondary, 41 dated reads. Author reviewed all changed stems/options/explanations and whole-bank topic repetition; retained questions were previously fully read and their complete stem inventory was rechecked for displacement opportunities. This does not establish independent pedagogical quality.

Fresh blind review artifacts are outside the worktree at cdm-review-v4. No review approval, final-head preview, screenshots or post-rebuild heavy check is claimed. The bank offers representative selected competencies, not exhaustive textbook coverage; remaining advanced topics and source limits are enumerated in the learning-objective map.

## Fourth-review selective follow-up

Options-only result 129/200 did not pass; factual agreement was 200/200. All 24 explicit pedagogical notes and three precision notes addressed. Eleven knowledge items revised; the legitimate 12-versus-26-week FMLA distinction retained with rationale. See selective-review.md for mapped dispositions. Final current metrics: average option 23 characters, key-longest 11%, key >1.2× 6%, zero shared option sets, echo gain 1.9/50. Validator passes; 40 primary source pages and 42 dated reads. Fresh v5 independent review remains pending; no heavy check or publication performed.

## Draft checkpoint after fifth review

Latest independent options-only score: 140/200 (70%); gate unresolved. Fifteen surface-suspect items revised; SAF-038 retained with rationale in REVIEW_STATUS.md. Bank validator PASS: average option 22 characters, key-longest 8%, key >1.2× 5%; zero shared option sets; echo 18/47, gain 1.6/50. Sources remain 40 primary pages, 42 dated reads. Full sequential app checks are recorded separately in the external draft check log. No final preview/screenshots or independent approval claimed.

Draft application verification: one sequential `bash scripts/automerge-checks.sh` run passed (Python 3.12 first on PATH): TypeScript, lint, 956/956 tests, generated training/facts checks, question-bank/schema review, answer-pattern and option-reuse baselines, freshness and source-manifest freshness. Log: `/Users/johnbrophy/tigertest-next20-progress/cdm-draft-full-checks.log`. Final bank validator and per-bank reuse check also pass. This technical result does not resolve the content gate.

## Final draft factual checkpoint
An independent model reviewer answered all 200 questions blind and checked all 200 explanations. All intended keys matched. Applied the two requested wording corrections to NUT-005 (order-independent explanation) and NUT-022 (explicit revised ingredients). Validator PASS, zero reused option sets, echo gain 1.8/50. Full technical checks had passed immediately before these prose-only corrections. Options-only quality gate remains unresolved; no final preview or screenshots yet.
