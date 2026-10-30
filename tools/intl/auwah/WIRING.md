# Wiring for `auwah` (Work safely at heights, Australia, v1)

Files already written by the builder: `data/working-at-heights-questions.json` (200, built by
`tools/intl/auwah/build.py` from `src/*.py`), `lib/banks/auwah.ts`, `app/working-at-heights/*`
(8 wrappers copied from `app/standard-first-aid/`, same shape as `app/uk-theory/`),
`app/working-at-heights-practice-test/page.tsx`, `tools/intl/auwah/{spec.json,sources.md,build.py,report.py,src/*.py}`.

Validator: `python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/working-at-heights-questions.json --pool auwahLaw=24 --pool auwahRisk=28 --pool auwahControl=28 --pool auwahPlatform=28 --pool auwahLadder=24 --pool auwahHarness=32 --pool auwahRoof=20 --pool auwahRescue=16` -> PASS (key-longest 0%, key>1.2x 0%, letters 50/50/50/50).

Unit code: RIIWHS204E was superseded on training.gov.au by **RIIWHS204 Work safely at heights**
(release 1, current from 2 Sept 2026, "supersedes and is equivalent"). Copy names both.

## lib/exams.ts
Add `| "auwah"` to the `ExamId` union. Icon `hardhat` already exists (no icon union change).
Add before `const htl` (with the other Australia exams):

```ts
const auwah: ExamConfig = {
  id: "auwah",
  stateCode: "AUWAH",
  idBase: 10000,
  slug: "/working-at-heights",
  landingPath: "/working-at-heights-practice-test",
  name: "Working at Heights Practice Test",
  shortName: "Working at Heights",
  examLabel: "Working at heights (RIIWHS204)",
  fullName: "RIIWHS204 Work safely at heights (formerly RIIWHS204E) knowledge assessment",
  questionIdPrefix: "AUWAH-",
  icon: "hardhat",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // RIIWHS204 Work safely at heights (RII Training Package, release 1, 2 Sept 2026; supersedes and
  // is equivalent to RIIWHS204E; training.gov.au checked 30 Oct 2026). Topics follow its knowledge
  // evidence (WHS legislation and documentation, heights safety systems, safe work methods, equipment,
  // manufacturer instructions, shifting tools and materials, hazards and emergencies) with detail from
  // the model WHS Regulations on falls (regs 78 to 80) and the Safe Work Australia model Codes of
  // Practice on managing the risk of falls at workplaces and in housing construction. RTOs write their
  // own knowledge assessment and the unit sets no question count or pass mark, so 80% is a readiness
  // line and the counts are ours. State and territory differences are "varies". All items original.
  blueprint: {
    auwahLaw: 6,
    auwahRisk: 7,
    auwahControl: 7,
    auwahPlatform: 7,
    auwahLadder: 6,
    auwahHarness: 8,
    auwahRoof: 5,
    auwahRescue: 4,
  },
  trainingSets: testSets(10000, 4),
  categoryLabels: {
    auwahLaw: "WHS Laws, Duties & Licences",
    auwahRisk: "Hazards & Risk Assessment",
    auwahControl: "Hierarchy of Control for Falls",
    auwahPlatform: "Edge Protection, Scaffolds & EWPs",
    auwahLadder: "Ladders",
    auwahHarness: "Harnesses, Lanyards & Anchors",
    auwahRoof: "Roof Work & Housing Construction",
    auwahRescue: "Rescue, Emergencies & Clean-up",
  },
  copy: {
    guestPrompt: "to save your working at heights progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test, each holding exactly that test's 50 questions across all eight topics. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions, 80% to be ready for the course assessment",
    heroSubs: [
      "Eight topics, four practice tests. Aim for 40 of 50 on each.",
      "Master each set, then take its test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Practise the hands-on checks and book your course.",
    ],
    sourceLine: "Based on RIIWHS204 Work safely at heights (formerly RIIWHS204E), the model WHS Regulations on falls and the Safe Work Australia falls codes of practice. Original questions; works for any RTO's course.",
    analyticsKey: "auwah",
  },
};
```

Append `auwah` to `EXAMS` before `htl` (after the other Australia exams). Sets are 50 questions,
so no `partNames`. Note this is the first five-digit idBase (tests 10001-10004, sets 10001-10004);
`getExamForTestId` / `getExamForSetId` are plain range checks, so it works, but confirm nothing
else in the integrator's checks assumes four-digit test ids.

## lib/banks/all.ts
```ts
import "./auwah";
```
(`lib/banks/auwah.ts` is already written.)

## types/index.ts
- Add `| "AUWAH"` to `QuestionType`.
- Add to `QuestionCategory`:
```ts
  // Work safely at heights (Australia, RIIWHS204)
  | "auwahLaw"
  | "auwahRisk"
  | "auwahControl"
  | "auwahPlatform"
  | "auwahLadder"
  | "auwahHarness"
  | "auwahRoof"
  | "auwahRescue"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (same English labels in all five)
```ts
    auwahLaw: "WHS Laws, Duties & Licences",
    auwahRisk: "Hazards & Risk Assessment",
    auwahControl: "Hierarchy of Control for Falls",
    auwahPlatform: "Edge Protection, Scaffolds & EWPs",
    auwahLadder: "Ladders",
    auwahHarness: "Harnesses, Lanyards & Anchors",
    auwahRoof: "Roof Work & Housing Construction",
    auwahRescue: "Rescue, Emergencies & Clean-up",
```

## app/globals.css
Light block only (hue 38, a hard-hat amber; not in globals.css and not taken by another wave-2
WIRING.md as of writing). Then run `tools/gen_dark_brand_css.py` once for everyone. If 38 clashes,
use 300 (unused).
```css
  /* Working at heights theme (Australia) */
  [data-theme="auwah"] {
    --brand: 38 92% 36%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 40 90% 94%;
    --brand-hover: 38 92% 31%;
    --brand-dark: 36 90% 26%;
    --brand-darker: 34 70% 15%;
    --brand-muted: 38 60% 70%;
    --brand-border: 38 60% 76%;
    --brand-border-light: 40 55% 87%;
    --brand-gradient-to: 48 85% 95%;
  }
```

## lib/testCatalog.ts
- `EXAM_BLURBS`:
```ts
  auwah: "Free practice tests for the knowledge assessment in RIIWHS204 Work safely at heights (formerly RIIWHS204E): the falls hierarchy, ladders, scaffolds and EWPs, harnesses and anchors, roof work and rescue.",
```
- `EXAM_ORG`: `auwah: "RIIWHS204 (formerly RIIWHS204E), nationally recognised unit"`
- Hub group: "Australia school and work certificates" (or an Australia work certificates group with
  aursa, aurcg, aufss, aufirstaid, auforklift). Also a good related test for `osha`.
- `SEARCH_ALIASES`:
```ts
  auwah: "working at heights work safely at heights wah riiwhs204e riiwhs204 riiwhs204d heights ticket height safety fall protection harness ladder scaffold ewp white card construction australia rto refresher quiz",
```
- `RELATED_OVERRIDES` if its group has fewer than three others: `auwah: ["auforklift", "aufirstaid", "osha"]`.

## lib/region.ts
Add `auwah: "AU"` to `TEST_REGIONS` and `"auwah"` to `NON_DRIVING_TESTS`.

## lib/examFacts.ts
```ts
  auwah: {
    answer:
      "Working at heights training in Australia is the nationally recognised unit RIIWHS204 Work safely at heights, which replaced RIIWHS204E in September 2026 as an equivalent unit. It is usually a one-day course with a registered training organisation, assessed by practical tasks plus a written knowledge assessment that each RTO sets, with no national pass mark. The unit has no expiry date, though some employers set their own refresher requirements, and site rules vary by state and territory.",
    rows: [
      { label: "Unit", value: "RIIWHS204 (formerly RIIWHS204E)" },
      { label: "Course length", value: "Usually 1 day" },
      { label: "Assessment", value: "Practical tasks plus a knowledge test" },
      { label: "Pass mark", value: "Set by each RTO (competency based)" },
      { label: "Delivered by", value: "Registered training organisations" },
      { label: "Expiry", value: "None set; some employers require refreshers" },
      { label: "Rules", value: "Model WHS Regulations and falls codes" },
      { label: "State differences", value: "Vary by state and territory" },
    ],
    basedOn: "the RIIWHS204 unit, the model WHS Regulations and the Safe Work Australia falls codes of practice",
    source: { name: "training.gov.au: RIIWHS204 Work safely at heights", url: "https://training.gov.au/Training/Details/RIIWHS204" },
  },
```
(Checked 30 Oct 2026.)

## components/TeachNudge.tsx
Add `"auwah"` to `TEACHER_LED` (the "Trade schools, pre-licensing courses and instructor-led
certifications" line, next to `osha`).

## components/exam/ExamClassFaq.tsx
Add to `TEACHES` (next to `osha`):
```ts
  auwah: "working at heights courses",
```

## lib/server/classQuestions.ts
Nothing to add: it imports `@/lib/banks/all`, which picks up auwah once `import "./auwah";` is in.

## lib/tigerAssets.ts (optional)
Leave out (falls back to the DMV tiger).

## lib/sitemaps.ts / lib/seoDates.ts
Landing `/working-at-heights-practice-test` comes from the catalog; bump `EXAM_LANDINGS_UPDATED_AT`
(batch comment covers auwah).

## scripts/build-training-parts.ts
Run `npx tsx scripts/build-training-parts.ts` after wiring.

## Screenshots
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing auwah:working-at-heights:10001`

## CLAUDE.md (bullet under "Additional Exams")
```md
- **Working at Heights** (Australia, RIIWHS204 Work safely at heights, formerly RIIWHS204E, `/working-at-heights/*`, landing `/working-at-heights-practice-test`): `data/working-at-heights-questions.json` (200 questions: WHS law/duties/licences 24, hazards and risk 28, falls hierarchy 28, edge protection/scaffolds/EWPs 28, ladders 24, harnesses/lanyards/anchors 32, roofs and housing construction 20, rescue/emergencies/clean-up 16), test IDs 10001-10004, sets 10001-10004 (one per test), state `AUWAH`, 80% readiness line (RTOs set their own mark). 6/7/7/7/6/8/5/4 per test. Model WHS Regulations (regs 78 to 80) and the Safe Work Australia falls codes (workplaces; housing construction); no RTO named; state rules "vary". Built by `tools/intl/auwah/build.py`. Hub group with the other Australia work certificates.
```
