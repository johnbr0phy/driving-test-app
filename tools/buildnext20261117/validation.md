# Second-batch integration validation — 2026-11-17

Five additions: Licensed Residential Appraiser 200, South Africa firearm legal knowledge 200, SecurityX 240, SSCP 260 and ServiceNow CSA 200: 1,100 original questions. AZ-500 was skipped because Microsoft retired it on 31 August 2026; see skipped-az500.md. No replacement was silently substituted. Appraiser uses numeric base 33800 and ZA firearm 33900; NCCCO's 33700 reservation in the separate first PR is untouched.

## Independent review

All five banks passed full blind and options-only review. Corrected findings: Appraiser two testimony-scope clarifications; ZA firearm one lawful-authority wording fix; SecurityX one authorization-versus-segmentation clarification; SSCP one authenticated-and-encrypted access clarification; CSA zero mandatory findings. ZA initial blind agreement was 199/200 because the reviewer misread a statutory six-month rule; independent statutory reconciliation supported the original key. Full ledgers, initial predictions, source checks and limitations are retained under each exam's review-audit.md and review.md. The registry records findings resolved, not merely a zero unresolved count; PR numbers await creation.

These are selected conceptual/applied banks, not calibrated exam difficulty or comprehensive mastery evidence. Matched option families create correlated results and concept transfer across separately worded sets. Public scope limitations distinguish scaled/undisclosed passing standards, omitted practical tasks, CAT and platform administration from practice percentages.

## Checks

- TypeScript PASS with a 4 GB heap cap, including a final run after new palette/config changes.
- Full ESLint PASS with existing unrelated warnings; new-exam targeted lint has no warnings/errors.
- Full test suite run sequentially: 941/941 PASS, zero failures (64.3 seconds).
- Training parts and bank sizes current; state exam facts current; DMV translation review zero hard failures.
- Full bank integrity PASS: 366 v1 files and 135 v2 exams; 68,671 v1 and 29,410 v2 questions.
- Global answer patterns PASS: 392 banks, none worse than existing baseline; no baseline changes. Separate temporary `correct`-to-`answer` adapters checked every single-answer item in SecurityX, SSCP and CSA, avoiding the checker's native v2-field omission. Multiple-select CSA items were separately schema-, runtime- and independently reviewed.
- Positional option-reference scan: zero references.
- Freshness registry PASS, 58 events. Source index regenerated/current. Every new exam's primary-source check PASS.
- Both v1 house-style validators PASS; all three v2 structural validators zero problems. Individual single-answer style bridge results retained in their validation records.
- Runtime CSA assertions PASS: all 200 IDs disjoint across two tests and six drills, correct domain allocation, 16 exact-match choose-two items, proper selection counts, Premium migration drill and Test 2. Earlier per-exam runtime allocation checks remain in their records.
- Source index, training/bank counts, email palette, launch dates and landing dates updated. Historical landing/launch entries and even their original ordering were preserved; only five entries appended. No unrelated history recalculation retained.
- `git diff --check` PASS.

Equivalent commands from scripts/automerge-checks.sh ran individually with Python 3.12, the reduced TypeScript heap and `node --test --test-concurrency=1`. No concurrent heavy process or local production build/server was used. A metadata preparation helper initially expected generated new landing entries, but the generator omits uncommitted files; the helper was corrected to use the explicit current date. This was a preparation error, not a passed check. Final check sequence exited zero.

## Themes

Copied palettes initially clashed with existing themes. The final light palettes were checked against main, every new exam here and all five first-PR additions, including NCCCO. Hue distance below 8 degrees requires saturation difference at least 15 points or lightness difference at least 8. All five have zero clashes. Light button white-text contrast (also preserved for dark-mode brand buttons):

| Exam | HSL | Contrast |
|---|---|---:|
| Appraiser | 194 30% 42% | 4.60:1 |
| ZA firearm | 62 15% 26% | 8.74:1 |
| SecurityX | 8 15% 38% | 6.68:1 |
| SSCP | 214 15% 34% | 7.58:1 |
| ServiceNow CSA | 152 15% 38% | 5.48:1 |

Existing suitable mascots are reused. Dark surface/border tokens are explicit; v2 shells use the existing shared dark-theme mechanism. Remote screenshots remain necessary for visual inspection.

## Preview gate

Remote deployment of commit `9cee1a68` reached READY. All 16 HTTP checks and 20 light/dark desktop/mobile captures passed; all captures visually inspected. See preview-validation.md for routes, dimensions and the two transient Appraiser hydration warnings that did not recur across 12 fresh-context navigation checks. Parent still needs to commit screenshot assets and validate their delivery on the final preview. No merge authorized.
