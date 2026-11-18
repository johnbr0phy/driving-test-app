# SSCP implementation checks

Checked 2026-11-17. Independent content review is a separate gate, pending at this implementation checkpoint.

- V2 validator: 260 questions, no stimuli, zero problems. Two 100-question modules plus 60 drill-only items.
- Single-answer schema/style bridge: PASS. Pools 40/40/40/36/24/40/40; answer positions 65 each; average option 28 characters; uniquely longest key 20%; key above 1.2 times distractor mean 10%. The validator's canonical-order advisory remains; the engine shuffles options for attempts.
- Answer-pattern strict check: PASS using a temporary copy with v2 `correct` normalized to the checker's `answer` field. No skipped-format claim.
- TypeScript passed with a 4 GB heap cap. Targeted ESLint passed with no warnings or errors.
- Sequential integration tests: 330/330 passed. Search aliases, catalog grouping, free-to-start wording, no repeats, Basics minimum and route budget included.
- Runtime assertions: each test has 100 questions and exact domain counts 16/15/15/14/9/16/15. Both tests are held out from drills. Drill sizes 8/10/10/8/6/8/10. All 260 IDs occur once across these sets. Premium locks only the final Systems and Application Security drill and Practice Test 2.
- Full repository integrity: 366 v1 bank files, 134 v2 exams, 68,671 v1 and 29,210 v2 questions; PASS.
- Source check: 27 primary URLs, zero secondary URLs, 27 dated reads; PASS. Source index regenerated. Freshness registry: 58 events, PASS. The known October 2025 transition is recorded in the specification and facts; no unsupported future change was invented.
- Regenerated bank sizes, source index, landing/launch dates and email palette. New uncommitted landings use the shared 2026-11-17 date until commit-aware regeneration.
- Inspected the existing CISSP security-laptop mascot and reused its eight-expression set; light and dark theme match that IT family.
- Anonymous review artifacts cover all 260 questions, with independently shuffled blind/options-only row orders, shuffled options, and private answer keys withheld from review input.

This is selected conceptual foundation practice, not calibrated SSCP difficulty or exhaustive technology coverage. Matched answer families reduce option-only cues but create dependence between four related items. The bank does not simulate CAT, unscored items, advanced interaction, or the official passing decision. The real exam's no-backtracking rule is clearly distinguished from practice navigation. No local production build/server, commit, push or merge. Remote screenshots and HTTP checks remain for batch integration.
