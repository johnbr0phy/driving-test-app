# Wiring for `r410a` (ESCO Institute R-410A Safety Certification, US, v1)

Files already written by the builder: `data/r410a-questions.json` (200, PASS, key-longest 11%),
`lib/banks/r410a.ts`, `app/r410a/*` (layout, redirect, dashboard, drill, stats, copied from
`app/epa-608/` and `app/nail-technician/`; no test or practice folders, the shared `app/[slug]`
routes serve them), `app/r410a-certification-practice-test/page.tsx` (structure copied from
`app/nail-technician-practice-test/`), `tools/build-run-2026-11-18/r410a/*` (sources.md,
`q_*.py`, `build.py`, this file). Everything below goes in shared files.

Rebuild: `python3 -I tools/build-run-2026-11-18/r410a/build.py`, then validate:
`python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/r410a-questions.json --pool r410Safety=36 --pool r410Cylinders=24 --pool r410Props=40 --pool r410Oil=20 --pool r410Retrofit=12 --pool r410Regs=40 --pool r410Service=28`

Format: 4 tests x 50 (the real exam is 50 questions), four topic sets (60/60/40/40), 8 dashboard
steps; pools exactly 4x per test. Pass line 70% is Tigertest's readiness line: ESCO publishes no
time limit, book rule or pass mark for this exam.

Note `tools/check_sources.py` needs Python 3.10+ (uses `X | None`); on this Mac (3.9) it was run
from a copy with `from __future__ import annotations`: 26 primary pages, 19 dated reads.

## lib/exams.ts

Add `"r410a"` to the `ExamId` union. Icon `thermometer` already exists (used by `epa608`).

```ts
const r410a: ExamConfig = {
  id: "r410a",
  stateCode: "R410A",
  idBase: 40900,
  slug: "/r410a",
  landingPath: "/r410a-certification-practice-test",
  name: "R-410A Certification Practice Test",
  shortName: "R-410A",
  examLabel: "R-410A Safety Certification",
  fullName: "ESCO Institute R-410A Safety Certification exam",
  questionIdPrefix: "R410A-",
  icon: "thermometer",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // ESCO Institute R-410A Safety Training Program (AC&R Safety Coalition exam), escogroup.org
  // Training/R410A.aspx and Certifications/Specialty.aspx, read 2026-11-18: a 50-question exam
  // covering proper safety, handling and application of R-410A; the manual covers R-410A and
  // R-407C service, the R-22 phase-out, refrigerant and oil applications, service techniques
  // and safe handling. ESCO publishes no weights, time or pass mark, so this split and the 70%
  // line are Tigertest's. Facts from ESCO's 2026 PT chart, 40 CFR 82 Subpart F, 40 CFR 84
  // (Technology Transitions as revised May 2026; Emissions Reduction and Reclamation), DOT
  // 49 CFR 173/178, OSHA 29 CFR 1910, the R-410A SDS and Carrier's R-410A quick reference guide.
  blueprint: {
    r410Safety: 9,
    r410Cylinders: 6,
    r410Props: 10,
    r410Oil: 5,
    r410Retrofit: 3,
    r410Regs: 10,
    r410Service: 7,
  },
  trainingSets: [
    { setNumber: 1, id: 40901, name: "Safety & Cylinder Handling", categories: ["r410Safety", "r410Cylinders"], size: 60, weightLabel: "15 of 50 test questions" },
    { setNumber: 2, id: 40902, name: "Pressures, Oil & Evacuation", categories: ["r410Props", "r410Oil"], size: 60, weightLabel: "15 of 50 test questions" },
    { setNumber: 3, id: 40903, name: "Retrofits, Installation & Charging", categories: ["r410Retrofit", "r410Service"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 4, id: 40904, name: "EPA Rules & the HFC Transition", categories: ["r410Regs"], size: 40, weightLabel: "10 of 50 test questions" },
  ],
  categoryLabels: {
    r410Safety: "Personal Safety & First Aid",
    r410Cylinders: "Cylinders, Tools & Storage",
    r410Props: "Properties & Pressures",
    r410Oil: "Oil, Moisture & Evacuation",
    r410Retrofit: "R-22 Phase-Out & Retrofits",
    r410Regs: "EPA Rules & the HFC Transition",
    r410Service: "Installation & Charging",
  },
  copy: {
    guestPrompt: "to save your R-410A certification progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Four sets on safe handling, pressures and POE oil, installation and charging, and the EPA rules for HFCs. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions like the real exam, 70% readiness line",
    heroSubs: [
      "Four training sets, four practice tests. Start with Safety & Cylinder Handling.",
      "Master each set, then test.",
      "Keep going. Every topic you master shows up on the tests.",
      "Fix the misses, then retake.",
      "All done. Go earn your R-410A card.",
    ],
    sourceLine: "Based on ESCO's R-410A safety program (a 50-question exam on safety, handling and application), EPA, DOT and OSHA rules, the R-410A SDS and a manufacturer's R-410A guide. Original questions. Not affiliated with the ESCO Institute or the AC&R Safety Coalition.",
    analyticsKey: "r410a",
  },
};
```

Append `r410a` to the `EXAMS` array right after `epa608` (or after `epa609`).

Check: 40901-40904 (tests and sets) must be free; the run assigned idBase 40900 (grep found no
409xx ids in `lib/exams.ts` or the other WIRING files on 2026-11-18).

## lib/banks/all.ts

```ts
import "./r410a";
```

## types/index.ts

- `QuestionType`: add `| "R410A"`.
- `QuestionCategory`, under a `// R-410A Safety Certification (ESCO)` comment:

```ts
  | "r410Safety"
  | "r410Cylinders"
  | "r410Props"
  | "r410Oil"
  | "r410Retrofit"
  | "r410Regs"
  | "r410Service"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    r410Safety: "Personal Safety & First Aid",
    r410Cylinders: "Cylinders, Tools & Storage",
    r410Props: "Properties & Pressures",
    r410Oil: "Oil, Moisture & Evacuation",
    r410Retrofit: "R-22 Phase-Out & Retrofits",
    r410Regs: "EPA Rules & the HFC Transition",
    r410Service: "Installation & Charging",
```

## app/globals.css

Suggested hue 287 75% 40%, refrigerant-gauge violet (white text passes 4.5:1). Checked against
every `--brand` in `app/globals.css` and every WIRING.md in this run on 2026-11-18: the wheel is
nearly full, and the free slots at lightness 30 to 48 with real saturation were only 284 to 289
and 307 to 331 at high saturation; 287 75% 40% is one of them. Re-check against the other
builders' final hues. Then run `tools/gen_dark_brand_css.py`.

```css
  /* R-410A safety certification theme: gauge violet */
  [data-theme="r410a"] {
    --brand: 287 75% 40%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 287 70% 96%;
    --brand-hover: 287 75% 34%;
    --brand-dark: 287 75% 27%;
    --brand-darker: 287 70% 17%;
    --brand-muted: 287 35% 70%;
    --brand-border: 287 35% 80%;
    --brand-border-light: 287 30% 89%;
    --brand-gradient-to: 300 60% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `r410a: "R-410A Safety Certification practice for the ESCO Institute (AC&R Safety Coalition) exam: personal safety and first aid, cylinders and tools, R-410A pressures, POE oil and evacuation, the R-22 phase-out, installation and charging, and the EPA rules for HFCs.",`
- `EXAM_ORG`: `r410a: "ESCO Institute · R-410A Safety Certification (AC&R Safety Coalition)",`
- Hub group "Aviation, radio & trade licenses": insert `"r410a"` right after `"epa609"`.
- `SEARCH_ALIASES`:
  `r410a: "r410a r-410a r 410a 410a puron r410a certification r-410a certification r410a card r410a safety esco r410a ac&r safety coalition hvac refrigerant safety hfc refrigerant high pressure refrigerant",`
- `RELATED_OVERRIDES`: optional `r410a: ["epa608", "epa609", "jelec"],` (the hub group already has
  more than three members).

## lib/region.ts

Nothing: US is the default region (epa608 has no `TEST_REGIONS` line).

## lib/examFacts.ts

```ts
  r410a: {
    answer:
      "The R-410A Safety Certification is a specialty certification offered by the ESCO Institute, from the AC&R Safety Coalition program. ESCO describes it as a 50-question exam covering proper safety, handling and application of R-410A refrigerant systems, and persons who pass receive a certificate and an AC&R Safety Coalition R-410A patch. ESCO's training manual covers servicing R-410A and R-407C systems, the R-22 phase-out, refrigerant and oil applications, service techniques and safe handling. ESCO does not publish a time limit or passing score for this exam on its program pages. It does not replace EPA Section 608 certification, which federal law requires to buy and handle R-410A for stationary equipment.",
    rows: [
      { label: "Questions", value: "50" },
      { label: "Covers", value: "Proper safety, handling and application of R-410A" },
      { label: "Passing score", value: "Not published by ESCO; Tigertest uses 70% as a readiness line" },
      { label: "On passing", value: "Certificate and AC&R Safety Coalition R-410A patch" },
      { label: "Prerequisite", value: "None listed" },
      { label: "Offered by", value: "ESCO Institute (HVAC Excellence)" },
    ],
    basedOn: "ESCO Institute's R-410A Safety & Training and Specialty Certifications pages, checked November 2026",
    source: { name: "ESCO Institute R-410A program", url: "https://www.escogroup.org/Training/R410A.aspx" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date, comment naming `r410a`.

## TEACHER_LED / TEACHES

Taught in HVAC programs alongside EPA 608:
- `components/TeachNudge.tsx` `TEACHER_LED`: add `"r410a"`.
- `components/exam/ExamClassFaq.tsx` `TEACHES`: `r410a: "an HVAC program or refrigerant safety class",`

## lib/tigerAssets.ts

`BORROWED_SETS`: `r410a: "epa608",` (borrow the EPA 608 tiger, if epa608 has a set; otherwise
the DMV fallback applies).

## lib/examFreshness.json

Two dated items an integrator may add (both already reflected in the bank):
- 2027-01-01 (notice): VRF systems above GWP 700 built from pre-2026 components may no longer
  be installed (40 CFR 84.54(c)(2)); 2028-01-01 for permitted projects. Action: none for the
  bank (REG items already state these dates); re-read EPA's Technology Transitions page.
- 2028-01-01 (law): disposable cylinder heel rule takes effect (40 CFR 84.116). Action: check
  the rule is still in force before that date (ER&R is under reconsideration; the May 2026
  proposal covers refrigerated transport only). Source:
  https://www.ecfr.gov/current/title-40/section-84.116

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts`. No set exceeds 60 (largest 60), so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing r410a:r410a:40901`

## Sibling bank issue found (please check)

`data/epa608-questions.json` EPA-T2-021 keys 10 inches Hg for recovering R-410A from a 12 lb
split system with post-1993 equipment. Current 40 CFR 82.156 Table 1 lists R-410A as a
high-pressure appliance (82.152) and requires 0 inches Hg for a high-pressure appliance under
200 lb with equipment made before or after November 15, 1993. `r410a` REG-012 keys 0 inches Hg.
EPA-T2-001 and T2-002 also define high-pressure and very-high-pressure by boiling point, the
pre-2016 wording; 82.152 now uses liquid saturation pressure at 104 F (170 to 355 psia).

## CLAUDE.md (under Additional Exams, after the EPA 608 bullet)

```md
- **R-410A Certification** (`r410a`, ESCO Institute R-410A Safety Certification, the AC&R Safety Coalition exam for HVAC technicians who work on R-410A systems, `/r410a/*`, landing `/r410a-certification-practice-test`): `data/r410a-questions.json` (200 original questions on ESCO's program outline (proper safety, handling and application; manual on R-410A and R-407C service, the R-22 phase-out, refrigerant and oil applications, service techniques): personal safety and first aid (SDS: asphyxiation, frostbite, arrhythmia and adrenaline, hydrogen fluoride and carbonyl fluoride, SCBA for rescue; OSHA 19.5% oxygen, HazCom, torch brazing shade 3 or 4, fire watch, lockout) 36, cylinders, tools and storage (dip tube, DOT 4BA400 recovery cylinders, 550 psig low-side retard, 600 psig driers, DOT 39 non-refillable, not liquid full at 130 F, warm only in water below 40 C) 24, properties and pressures (R-32/R-125 50/50, A1, GWP 2,088, ESCO PT chart values, EPA high-pressure appliance 170 to 355 psia, glide) 40, oil, moisture and evacuation (POE, driers, nitrogen, deep vacuum and triple evacuation) 20, R-22 phase-out and retrofits (SNAP: R-410A new only, R-407C and R-422D retrofit) 12, EPA rules and the HFC transition (venting, sales, apprentices, 0 in Hg for high-pressure under 200 lb, Technology Transitions with the May 2026 rule for pre-2025 inventory, VRF dates, ER&R leak repair from 15 lb with home AC exempt, ALD, 15% virgin reclaim, 2028 disposable cylinder heels) 40, installation and charging (Carrier's R-410A guide: liquid through a metering device, weigh-in sums, subcooling, brazing) 28), test IDs 40901-40904, sets 40901-40904 (Safety & Cylinder Handling 60, Pressures, Oil & Evacuation 60, Retrofits, Installation & Charging 40, EPA Rules & the HFC Transition 40), state `R410A`, prefix `R410A-`, 70% readiness line (ESCO: a 50-question exam; no time, book rule or pass mark published). 9/6/10/5/3/10/7 per test, Tigertest's split. Checked against `epa608`, `jelec` and `caplumb` for repeated fact-and-answer pairs. Built by `tools/build-run-2026-11-18/r410a/build.py`; sources in `tools/build-run-2026-11-18/r410a/sources.md`. Region US, hub group "Aviation, radio & trade licenses" (after epa609), `[data-theme="r410a"]` gauge violet (287 75% 40%), borrows the EPA 608 tiger, teacher-led (HVAC programs).
```
