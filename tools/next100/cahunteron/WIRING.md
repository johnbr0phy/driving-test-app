# cahunteron wiring (Ontario Hunter Education Program exam, v1)

Machine-readable copies of every block below are in `wiring/` (catalog.json, claude.md,
config.ts.txt, facts.ts.txt, labels.json, theme.txt, types.txt), in the same shape as
`tools/next100/hspachl/wiring/`. Files this builder wrote (no shared file was edited):

- `data/ontario-hunter-education-questions.json` (built by `python3 -I tools/next100/cahunteron/build.py`)
- `lib/banks/cahunteron.ts`
- `app/ontario-hunter/{layout,page}.tsx`, `app/ontario-hunter/{dashboard,drill,stats}/page.tsx`
- `app/ontario-hunter-education-practice-test/page.tsx`
- `tools/next100/cahunteron/*` (spec.json, sources.md, q_*.py, build.py, WIRING.md, wiring/)

## lib/banks/all.ts
```ts
import "./cahunteron";
```

## lib/exams.ts
Paste `wiring/config.ts.txt`. Add `"cahunteron"` to the `ExamId` union and append `cahunteron`
to `EXAMS` right after `hunter`. Icon `target` already exists. IDs: tests 32901-32904, sets
32901-32904 (block 32900). Premium: the standard v1 locks apply (no extra line).

## types/index.ts
State code `CAHUNTERON` and category keys (from `wiring/types.txt`):
`cahunLicence`, `cahunTags`, `cahunRules`, `cahunEquip`, `cahunLand`, `cahunEthics`,
`cahunWildlife`, `cahunCare`.

## i18n/*.ts (English labels in every file, from `wiring/labels.json`)
```ts
  cahunLicence: "Licences, Outdoors Card & Apprentices",
  cahunTags: "Tags, Party Hunting & Reporting",
  cahunRules: "Hunting Hours, Hunter Orange & Methods",
  cahunEquip: "Firearms & Archery Rules",
  cahunLand: "Land Access & Conservation Officers",
  cahunEthics: "Hunter Ethics & Responsibilities",
  cahunWildlife: "Wildlife Identification & Management",
  cahunCare: "Field Care, Health & Outdoor Safety",
```

## app/globals.css
Hue from the run table, `21 85% 20%` (deep russet brown; checked by the run's clash checker):
```css
  [data-theme="cahunteron"] {
    --brand: 21 85% 20%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 90 40% 95%;
    --brand-hover: 90 95% 14%;
    --brand-dark: 90 95% 12%;
    --brand-darker: 90 80% 8%;
    --brand-muted: 90 25% 72%;
    --brand-border: 90 25% 78%;
    --brand-border-light: 90 20% 88%;
    --brand-gradient-to: 60 50% 95%;
  }
```
Dark block: run `tools/gen_dark_brand_css.py`.

## lib/testCatalog.ts
- `EXAM_BLURBS` and `EXAM_ORG`: from `wiring/catalog.json`.
- `GROUPS`: add `"cahunteron"` to "Outdoor & recreation licenses" right after `"hunter"`.
- `SEARCH_ALIASES`:
```ts
  cahunteron: "ontario hunter education ontario hunter ed ontario hunting exam ontario hunting test ontario hunters exam ohep ontario hunting licence test ontario hunting license test hunter education ontario ontario hunting course ontario outdoors card hunting mnr hunting exam",
```
- `TEST_REGIONS`: `cahunteron: "CA"`.
- Search test cases (`tests/test-search-aliases.test.cjs`): see `searchTests` in `wiring/catalog.json`.

## lib/tigerAssets.ts (`BORROWED_SETS`)
```ts
  cahunteron: "hunter",
```

## lib/examFacts.ts
Paste `wiring/facts.ts.txt`.

## components/exam/ExamClassFaq.tsx (`TEACHES`)
```ts
  cahunteron: "an Ontario hunter education course",
```

## components/TeachNudge.tsx (`TEACHER_LED`)
Add `"cahunteron"` (hunter education instructors teach it in class).

## lib/server/classQuestions.ts
Nothing to add beyond the `lib/banks/all.ts` line.

## lib/seoDates.ts / lib/landingDates.json
Bump `EXAM_LANDINGS_UPDATED_AT`; run `npx tsx scripts/build-landing-dates.ts` after committing.

## scripts/build-training-parts.ts
Run `npx tsx scripts/build-training-parts.ts` (no set is over 60, so no parts).

## Landing screenshots
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing cahunteron:ontario-hunter:32901`

## CLAUDE.md
Paste `wiring/claude.md` under Additional Exams, after the Canada teacher-led entries.

## Notes for the integrator
- Ontario publishes no exam question count, time or pass mark; the landing, facts and config
  say so and 80% is labelled Tigertest's target.
- The Ontario Parks blog page used for the getting-lost items is the provincial agency's own
  blog; `check_sources.py` flags `blog.` hosts as secondary (warning only).
- O. Reg. 121/26 changes tags (digital tags and labels) and apprentices on January 1, 2027; items
  avoid those rules. Re-read the regulation after that date.
