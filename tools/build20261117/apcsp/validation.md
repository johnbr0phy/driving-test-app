# AP CSP authoring validation — 2026-11-17

- 200 unique original items: test 1 70, test 2 70 held out, drill-only 60.
- Both timed tests: big-idea counts 8/14/23/9/16; 62 single-answer (five passage-based) and eight choose-two; 120-minute timer.
- `validate_v2_bank.py apcsp` with both 70-item module blueprints: 0 problems.
- `check_sources.py apcsp`: six primary pages, six dated reads, no secondary sources.
- `check_answer_patterns.py --strict` using a temporary adapter copying v2 `correct` into the checker's currently expected `answer`: no patterns. The source checker currently reads the wrong v2 field; no shared checker changes made here.
- Among 184 single-answer items, correct option uniquely longest 23 (12.5%); more than 20% above distractor mean length 10 (5.4%).
- Targeted ESLint on all new AP TS/TSX files: pass.
- Full `tsc --noEmit --incremental`: pass with a 4096 MB heap ceiling.
- Search alias suite: 314/314; new cases AP Computer Science, AP CSP and full Principles title resolve to apcsp.
- No-repeats and landing-free-to-start suites: 5/5.
- Freshness metadata: 57 events, pass. Spring 2027 editorial reminder explicitly distinguished from an official effective date.
- Light brand white-text contrast: 8.03:1.
- Engine `multi` format requires both selected answers; grading uses exact set matching, consistent with copy.

Independent content/options-only review is still pending. Fresh anonymized artifacts were written under `/tmp/apcsp-review/`; regenerate using `prepare_review.py`. This file does not claim independent review approval.

Local production build and screenshots deferred to the coordinating task to keep builds sequential and memory use low. No commit, push or merge performed.

## Structural rewrite after first independent review

First independent review agreed with all 200 full-stem keys but rejected cue resistance: 135/200 options-only (Creative 12/24, Data 35/40, Algorithms 38/64, Networks 16/26, Impact 34/46). This was a failed gate, not an approval.

Reauthored conceptual items into neighboring-answer families in which every choice is correct for a different substantive scenario. Retained 34 verified original programming/numeric problems and rebuilt the remaining programming items around traversals, algorithm choices, abstractions and constraints. Data numerical families use matched units and different operations. Both former misplaced Impact networking items are replaced by genuine Impact objectives. Clarified minimum code length and the existence of an affordable item. Items are spread proportionately across both tests and drill-only pools, with passage sets and multi-select counts reserved explicitly.

After rewrite: structural validator 200/200 and no-repeats pass; meaningful answer-pattern adapter reports no patterns. Single-answer length statistics are now 33/184 uniquely longest (17.9%) and 27/184 more than 20% longer than distractor average (14.7%). Fresh review artifacts are in `/tmp/apcsp-review-v2/`. Independent second review pending. No application wiring changed during this rewrite.

Final fresh independent review passed: 200/200 full-content agreement including all 16 multi-select items; options-only 59/200 (29.5%), every domain below 40%. See `review.md` and the complete `review-v2-audit.md` ledger. No bank changes after that reviewed snapshot.
