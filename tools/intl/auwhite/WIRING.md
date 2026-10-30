# auwhite wiring (White Card, CPCWHS1001 Prepare to work safely in the construction industry, Australia, v1)

Files already written by this exam (no action needed): `data/white-card-questions.json`
(built by `python3 -I tools/intl/auwhite/build.py`), `lib/banks/auwhite.ts` (bank module, same shape as
`lib/banks/ukcar.ts`), `app/white-card/*` (8 wrappers copied from `app/uk-theory/`),
`app/white-card-practice-test/page.tsx`.

Validator: `python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/white-card-questions.json --pool auwhiteLaw=32 --pool auwhiteRisk=24 --pool auwhiteHeights=24 --pool auwhitePlant=24 --pool auwhiteHealth=28 --pool auwhiteEnv=20 --pool auwhiteSigns=24 --pool auwhiteEmerg=24` prints PASS (key longest 14%, key > 1.2x 14%, letters 50/50/50/50).

## lib/banks/all.ts
Append:
```ts
import "./auwhite";
```

## lib/exams.ts
1. `ExamId` union: add `| "auwhite"` (after `"ausa"` is fine).
2. Icon: reuse the existing `"hardhat"` key (OSHA 10's); no icon union change.
3. Add before `const htl`:
```ts
const auwhite: ExamConfig = {
  id: "auwhite",
  stateCode: "AUWHITE",
  idBase: 8100,
  slug: "/white-card",
  landingPath: "/white-card-practice-test",
  name: "White Card Practice Test",
  shortName: "White Card",
  examLabel: "White Card",
  fullName: "White Card course, CPCWHS1001 Prepare to work safely in the construction industry",
  questionIdPrefix: "AUWHITE-",
  icon: "hardhat",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // CPCWHS1001 Prepare to work safely in the construction industry, Release 2 (training.gov.au,
  // CPC Training Package 8.0, checked Oct 2026): general construction induction training under
  // Part 6.5 of the model WHS Regulations, delivered and assessed by an RTO through practical
  // demonstration, oral and written reporting. Competency-based, so there is no pass percentage;
  // 80% is a readiness line. Categories follow the unit's elements and knowledge evidence; the
  // unit publishes no weights, so the counts are ours. Model WHS laws; Victoria's OHS Act 2004
  // differs in wording only. All items original.
  blueprint: {
    auwhiteLaw: 8,
    auwhiteRisk: 6,
    auwhiteHeights: 6,
    auwhitePlant: 6,
    auwhiteHealth: 7,
    auwhiteEnv: 5,
    auwhiteSigns: 6,
    auwhiteEmerg: 6,
  },
  trainingSets: testSets(8100, 4),
  categoryLabels: {
    auwhiteLaw: "WHS Laws, Duties & Rights",
    auwhiteRisk: "Risk Management & SWMS",
    auwhiteHeights: "Heights, Collapse & Excavations",
    auwhitePlant: "Electrical, Plant & Traffic",
    auwhiteHealth: "Asbestos, Dust, Chemicals & Confined Spaces",
    auwhiteEnv: "Manual Handling, Noise, Sun & Fitness",
    auwhiteSigns: "Safety Signs & PPE",
    auwhiteEmerg: "Incidents, Emergencies & First Aid",
  },
  copy: {
    guestPrompt: "to save your White Card progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test, each holding exactly that test's 50 questions across all eight White Card topic areas. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions, 80% readiness line (the real course has no set pass mark)",
    heroSubs: [
      "Eight topic areas, four practice tests. Aim for 40 of 50 or better.",
      "Master each set, then take its test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Practise fitting your PPE and book your course.",
    ],
    sourceLine: "Based on the CPCWHS1001 unit of competency and the model WHS laws, checked October 2026. Original questions; your RTO trainer assesses the real course, including the practical tasks.",
    analyticsKey: "auwhite",
  },
};
```
4. `EXAMS` array: add `auwhite` before `htl` (after `ausa`, or after the other new AU exams).

## types/index.ts
- `QuestionType`: add `| "AUWHITE"`.
- `QuestionCategory`: add under a comment:
```ts
  // White Card, CPCWHS1001 (auwhite)
  | "auwhiteLaw"
  | "auwhiteRisk"
  | "auwhiteHeights"
  | "auwhitePlant"
  | "auwhiteHealth"
  | "auwhiteEnv"
  | "auwhiteSigns"
  | "auwhiteEmerg"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (same English labels in all, next to the auwa keys)
```ts
    auwhiteLaw: "WHS Laws, Duties & Rights",
    auwhiteRisk: "Risk Management & SWMS",
    auwhiteHeights: "Heights, Collapse & Excavations",
    auwhitePlant: "Electrical, Plant & Traffic",
    auwhiteHealth: "Asbestos, Dust, Chemicals & Confined Spaces",
    auwhiteEnv: "Manual Handling, Noise, Sun & Fitness",
    auwhiteSigns: "Safety Signs & PPE",
    auwhiteEmerg: "Incidents, Emergencies & First Aid",
```

## app/globals.css
Safety orange, hue 28 (unused as of this build; check the other agents' picks). Light block after the last exam theme:
```css
  /* White Card theme (Australia) */
  [data-theme="auwhite"] {
    --brand: 28 85% 40%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 28 90% 95%;
    --brand-hover: 28 85% 34%;
    --brand-dark: 28 85% 28%;
    --brand-darker: 28 70% 19%;
    --brand-muted: 28 50% 72%;
    --brand-border: 28 50% 78%;
    --brand-border-light: 28 45% 88%;
    --brand-gradient-to: 45 85% 94%;
  }
```
Dark block: run `tools/gen_dark_brand_css.py`, or by hand (brand under 50% lifts to 50%):
```css
  .dark [data-theme="auwhite"] {
    --brand: 28 85% 50%;
    --brand-hover: 28 85% 42%;
    --brand-light: 28 45% 13%;
    --brand-gradient-to: 45 40% 11%;
    --brand-border-light: 28 45% 24%;
    --brand-border: 28 50% 34%;
    --brand-muted: 28 50% 45%;
    --brand-dark: 28 85% 65%;
    --brand-darker: 28 70% 78%;
  }
```

## lib/testCatalog.ts
- `EXAM_BLURBS`:
```ts
  auwhite: "Free White Card practice for CPCWHS1001, the general construction induction course: WHS duties and rights, the hierarchy of controls, SWMS, heights, asbestos and silica, electrical, plant, signs, PPE and emergencies.",
```
- `EXAM_ORG`: `auwhite: "CPCWHS1001 · general construction induction (RTO course)"`
- `GROUPS`: new group (shared with the NAPLAN and NSW Selective exams built by the other AU agents; use their real ids):
```ts
  { title: "Australia school and work certificates", ids: ["<naplan id>", "<nsw selective id>", "auwhite"] },
```
- `SEARCH_ALIASES`:
```ts
  auwhite: "white card whitecard construction induction card general construction induction training gcit cpcwhs1001 cpccwhs1001 ohs card green card construction safety australia building site worksafe safework",
```
- `RELATED_OVERRIDES` (if the new group ends up with fewer than three other members):
```ts
  auwhite: ["osha", "forklift", "cpr"],
```

## lib/region.ts
- `TEST_REGIONS`: add `auwhite: "AU",` to the AU line.
- `NON_DRIVING_TESTS`: add `"auwhite"` (it is not a driving test, so it belongs beside the worldwide tests, not in the AU driving grid).

## lib/tigerAssets.ts
- `BORROWED_SETS`: add `auwhite: "osha",` (wears the OSHA 10 hard-hat tiger until it has its own eight).

## lib/examFacts.ts
```ts
  auwhite: {
    answer:
      "The White Card is the general construction induction card everyone needs before doing construction work in Australia. You get it by completing the nationally recognised unit CPCWHS1001 Prepare to work safely in the construction industry with a registered training organisation (RTO), usually face to face in one day. There is no exam with a set pass mark: the trainer assesses you as competent through written and oral questions and practical tasks such as fitting PPE and reporting hazards. The card is recognised in every state and territory, but in most states it lapses if you do no construction work for 2 years.",
    rows: [
      { label: "Unit", value: "CPCWHS1001 Prepare to work safely in the construction industry" },
      { label: "Delivered by", value: "Registered training organisations (RTOs)" },
      { label: "Assessment", value: "Trainer observes you; written, oral and practical tasks" },
      { label: "Pass mark", value: "None; competency-based (80% here is a readiness line)" },
      { label: "Practical tasks", value: "Fit hard hat, eye and hearing protection, hi-vis; report two hazards" },
      { label: "Card", value: "Recognised in every state and territory" },
      { label: "Lapses", value: "In most states after 2 years without construction work" },
      { label: "Issued by", value: "The state or territory regulator, or the RTO on its behalf" },
    ],
    basedOn: "the CPCWHS1001 unit of competency (Release 2) and the model WHS Regulations, checked October 2026",
    source: { name: "training.gov.au: CPCWHS1001", url: "https://training.gov.au/training/details/CPCWHS1001/unitdetails" },
  },
```

## components/exam/ExamClassFaq.tsx (`TEACHES`)
Under "Trade schools, pre-licensing courses and instructor-led certifications":
```ts
  auwhite: "White Card courses",
```

## components/TeachNudge.tsx (`TEACHER_LED`)
Add `"auwhite"` to the "Trade schools, pre-licensing courses and instructor-led certifications" line.

## lib/server/classQuestions.ts
Nothing to add: it imports `@/lib/banks/all`, which picks up auwhite once `import "./auwhite";` is added there.

## lib/seoDates.ts
Bump `EXAM_LANDINGS_UPDATED_AT` (comment: add the White Card landing with the other teacher-led international exams).

## lib/sitemaps.ts / next.config.ts
Nothing exam-specific needed for a v1 exam (the exams sitemap reads the catalog); no redirects.

## scripts/build-training-parts.ts
Run `npx tsx scripts/build-training-parts.ts` after wiring so `lib/trainingParts.json` has auwhite.

## Landing screenshots
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing auwhite:white-card:8101`
(writes `auwhite-desktop.png`, `auwhite-mobile.png` and the `-dark` twins used by the landing).

## CLAUDE.md (bullet under Additional Exams)
```md
- **White Card** (Australian general construction induction, unit CPCWHS1001, `/white-card/*`, landing `/white-card-practice-test`): `data/white-card-questions.json` (200 questions: WHS laws/duties 32, risk management/SWMS 24, heights/collapse/excavations 24, electrical/plant/traffic 24, asbestos/dust/chemicals/confined spaces 28, manual handling/noise/sun/fitness 20, signs/PPE 24, incidents/emergencies/first aid 24), test IDs 8101-8104, sets 8101-8104 (one per test), state `AUWHITE`, 80% readiness line (the real unit is competency-based, assessed by the RTO trainer, no pass mark). 8/6/6/6/7/5/6/6 per test, following the unit's elements and knowledge evidence (no official weights). Model WHS laws; Victoria's OHS Act and state card rules are "varies" or "most states". Built by `tools/intl/auwhite/build.py`. Hub group "Australia school and work certificates".
```

## Note
The brief asks for `<ExamLandingBreadcrumbs>`, but no such component exists in this worktree
(no landing uses it), so the landing omits it, like `app/uk-driving-theory-test/page.tsx`.
