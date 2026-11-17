# ServiceNow CSA implementation checks

Checked 2026-11-17. Independent content review remains a separate gate at this checkpoint.

- V2 validator: 200 questions, zero problems. Two held-out 60-question tests plus 80 drill-only items.
- Single-answer schema/style bridge: 184 items PASS; pools 16/24/36/40/48/20. Keys 46 in each position, average option 26 characters, uniquely longest key 20%, key above 1.2 times distractor mean 9%. Canonical-order advisory remains; runtime shuffles choices.
- Strict answer-pattern check passed for all 184 single-answer items using a temporary `answer` normalization. Its single-answer-only checker does not assess the 16 multiple-select items. Those were separately schema-validated and runtime-checked: explicit select=2, full key earns credit, partial and over-selection do not. Maximum option length across all 200 items is 41 characters.
- Runtime assertions passed: 4/6/12/12/18/8 questions per test, drill pools 8/12/16/16/20/8, all 200 IDs unique and disjoint across tests and drills. Premium gates only the migration drill and Practice Test 2. The first assertion harness imported the raw config and therefore missed registry-applied Premium fields; rerunning through the actual registry passed. No product change was needed.
- TypeScript passed with a 4 GB heap cap. Targeted ESLint passed without warnings or errors.
- Sequential integration tests passed 333/333: search aliases, catalog grouping, free-to-start wording, no repeats, Basics minimum and route budget.
- Full repository integrity passed: 366 v1 files, 135 v2 exams, 68,671 v1 and 29,410 v2 questions. Freshness registry passed with 58 events. No speculative future event added.
- Source check passed: 46 primary URLs, zero secondary URLs; failed-access attempts are explicitly distinguished from readable evidence. Watch priorities are the readable owner blueprint and two current product pages. Source index, training parts/bank counts, landing dates and email palette regenerated. Uncommitted new landings use the shared 2026-11-17 fallback date until commit-aware regeneration.
- Existing CISSP laptop mascot inspected and its complete eight-expression set reused. Light/dark themes match that family.
- Anonymous review inputs contain all 200 items, including the 16 multiple-select questions with format and selection count. Options and row orders are randomized; private keys are separate.

Selected conceptual and applied administration, not a hands-on assessment, calibrated difficulty or exhaustive feature coverage. Fifty four-item option families provide plausible alternatives, but related items are not statistically independent. The official blueprint does not publish the mix of multiple-select questions or a numerical cut score. Practice uses an editorial 80% goal. Primary product pages resolving to Brazil do not establish an official exam release label.

No local production build/server, commit, push or merge. Remote screenshots and HTTP checks remain for batch integration.
