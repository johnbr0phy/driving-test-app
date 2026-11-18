# First-batch integration validation — 2026-11-17

Five additions: JAMB Literature120, AP CSP200, VidyaGyan160, OSSSC200, NCCCO200; 880 original questions. The four v2 exams have two fixed tests plus drill-only material; NCCCO has four50-question tests. Product scope limitations and independent review history are retained per exam.

## Checks

- TypeScript PASS with Node heap capped at4096MB. The initial default2048MB attempt ran out of memory; it was not counted as a pass.
- Full ESLint PASS (exit0), with existing warnings in unrelated components; new-exam targeted lint has no warnings/errors.
- Full test suite first run:941 tests,939pass,2fail. Both failures identified missing generated integration metadata: new-exam launch dates and email theme colors. Fixed both; affected12tests pass. Full final rerun PASS: 941/941 tests, 0 failures (62.6 seconds).
- Training-part and bank-size generator/check PASS.
- State exam facts check PASS.
- DMV translation review PASS.
- Global bank integrity PASS:365v1 bank files and136v2 exams;68,471v1 and29,390v2 questions.
- Global answer-pattern check against existing baseline PASS; no baseline additions.
- Freshness registry PASS:57events.
- Source index regeneration/check PASS.
- Per-exam source checks and structural validators PASS for all five.
- `git diff --check` PASS.

All checks ran sequentially. The automerge-checks script was executed as equivalent individual commands so TypeScript could use the smaller4GB cap and the test runner could use `--test-concurrency=1`. Python checks used3.12 because the machine default is3.9. No local production build was run.

The landing-date generator also wanted to change hundreds of unrelated existing dates from repository history. Existing values were retained, with only these five new entries added. Email-brand metadata gained only the five new colors. Review registry entries preserve initial finding-group counts and link the full correction history; PR number pending.

## Preview gate

Remote production preview READY; all 16 landing/dashboard/OG/directory HTTP checks PASS and all 20 light/dark desktop/mobile screenshots captured and visually inspected. See preview-validation.md, including the single non-reproducing hydration warning and pending asset deployment. No merge authorized.
