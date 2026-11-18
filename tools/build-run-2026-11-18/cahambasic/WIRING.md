# Wiring for `cahambasic` (Canada Amateur Radio Operator Certificate, Basic Qualification, v1, region CA)

Files already written by the builder: `data/canada-amateur-radio-basic-questions.json` (200, PASS,
key-longest 6%), `lib/banks/cahambasic.ts`, `app/canada-amateur-radio-basic/*` (layout, redirect,
dashboard, drill, stats, copied from `app/nz-amateur-radio/`; no test or practice folders, the
shared `app/[slug]` routes serve them), `app/canada-amateur-radio-basic-practice-test/page.tsx`
(copied from the nzham landing, with `ExamClassFaq` and `classFaqJsonLd`),
`tools/build-run-2026-11-18/cahambasic/*` (sources, `q_*.py`, `build.py`, this file). Everything
below goes in shared files.

Format note: ISED's Basic exam is 100 questions, one from each of 100 syllabus topics in eight
sections (RIC-3 Issue 5, s 5.1: 25/9/21/6/13/13/8/5), 70% to pass, 80% for Honours, no time limit.
Here: four 50-question tests at the RIC-3 weights halved (sections 1 and 3 each split in two
categories), 70% pass line, four topic sets, so 4 sets + 4 tests = 8 dashboard steps. Pools are
exactly 4x per-test counts. Checked: 34801-34804 are free (`grep -n "348[0-9][0-9]" lib/exams.ts`
found nothing on 2026-11-18); `CAHAM`, `CAHAM-`, the slug and the landing path are unused.

## lib/exams.ts

Add `"cahambasic"` to the `ExamId` union. Icon `radio` already exists (used by `ham`, `nzham`).

```ts
const cahambasic: ExamConfig = {
  id: "cahambasic",
  stateCode: "CAHAM",
  idBase: 34800,
  slug: "/canada-amateur-radio-basic",
  landingPath: "/canada-amateur-radio-basic-practice-test",
  name: "Canadian Amateur Radio Basic Practice Test",
  shortName: "Canada Amateur Radio Basic",
  examLabel: "amateur radio Basic exam",
  fullName: "Amateur Radio Operator Certificate with Basic Qualification (ISED)",
  questionIdPrefix: "CAHAM-",
  icon: "radio",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // ISED RIC-3 Issue 5 (March 2022, current in November 2026), section 5.1: 100 questions, one from
  // each of 100 topics in eight sections: Regulations and Policies 25, Operating and Procedures 9,
  // Station Assembly, Practice and Safety 21, Circuit Components 6, Basic Electronics and Theory 13,
  // Feedlines and Antenna Systems 13, Radio Wave Propagation 8, Interference and Suppression 5.
  // Halved to 50 per test: section 1 split into licensing (7) and bands/technical rules (6),
  // section 3 into station layout (7) and power/safety (4). Pass 70%, Honours 80% (RIC-1 Issue 8).
  // Rules from RBR-4 Issue 3, the Radiocommunication Regulations and Act; formulas and block diagrams
  // from ISED's May 2025 reference material. All items original; ISED's question bank is never used.
  blueprint: {
    cahamRegs: 7,
    cahamBands: 6,
    cahamOperating: 4,
    cahamStation: 7,
    cahamPowerSafety: 4,
    cahamComponents: 3,
    cahamElectronics: 6,
    cahamAntennas: 6,
    cahamPropagation: 4,
    cahamInterference: 3,
  },
  trainingSets: [
    { setNumber: 1, id: 34801, name: "Regulations & Bands", categories: ["cahamRegs", "cahamBands"], size: 52, weightLabel: "13 of 50 test questions" },
    { setNumber: 2, id: 34802, name: "Operating & Station Layout", categories: ["cahamOperating", "cahamStation"], size: 44, weightLabel: "11 of 50 test questions" },
    { setNumber: 3, id: 34803, name: "Electronics, Components & Safety", categories: ["cahamPowerSafety", "cahamComponents", "cahamElectronics"], size: 52, weightLabel: "13 of 50 test questions" },
    { setNumber: 4, id: 34804, name: "Antennas, Propagation & Interference", categories: ["cahamAntennas", "cahamPropagation", "cahamInterference"], size: 52, weightLabel: "13 of 50 test questions" },
  ],
  categoryLabels: {
    cahamRegs: "Regulations & Licensing",
    cahamBands: "Bands, Power & Technical Rules",
    cahamOperating: "Operating & Procedures",
    cahamStation: "Station Layout, Transmitters & Receivers",
    cahamPowerSafety: "Power Supplies & Safety",
    cahamComponents: "Circuit Components",
    cahamElectronics: "Basic Electronics & Theory",
    cahamAntennas: "Feed Lines & Antennas",
    cahamPropagation: "Radio Wave Propagation",
    cahamInterference: "Interference & Suppression",
  },
  copy: {
    guestPrompt: "to save your amateur radio progress and track every question you miss",
    trainingHeading: "Train by syllabus section",
    trainingSub: "Four sets covering the eight sections of ISED's Basic syllabus. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions weighted like the real exam",
    heroSubs: [
      "Four training sets, four practice tests. Start with Regulations & Bands.",
      "Master each set, then take a practice test.",
      "Keep going. Take a practice test to see where you stand.",
      "Review your mistakes, then retake any test you haven't passed.",
      "All done. You're ready for your Basic exam.",
    ],
    sourceLine: "Based on ISED's Basic syllabus (RIC-3), RBR-4, the Radiocommunication Regulations and ISED's formula and block diagram sheet. Original questions; 50 per test, weighted like the real exam. Not affiliated with ISED.",
    analyticsKey: "cahambasic",
  },
};
```

Append `cahambasic` to the `EXAMS` array next to `nzham` (or after `crfsc`).

## lib/banks/all.ts

```ts
import "./cahambasic";
```

## types/index.ts

- `QuestionType`: add `| "CAHAM"`.
- `QuestionCategory`, under a `// Canada amateur radio Basic Qualification (ISED)` comment:

```ts
  | "cahamRegs"
  | "cahamBands"
  | "cahamOperating"
  | "cahamStation"
  | "cahamPowerSafety"
  | "cahamComponents"
  | "cahamElectronics"
  | "cahamAntennas"
  | "cahamPropagation"
  | "cahamInterference"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    cahamRegs: "Regulations & Licensing",
    cahamBands: "Bands, Power & Technical Rules",
    cahamOperating: "Operating & Procedures",
    cahamStation: "Station Layout, Transmitters & Receivers",
    cahamPowerSafety: "Power Supplies & Safety",
    cahamComponents: "Circuit Components",
    cahamElectronics: "Basic Electronics & Theory",
    cahamAntennas: "Feed Lines & Antennas",
    cahamPropagation: "Radio Wave Propagation",
    cahamInterference: "Interference & Suppression",
```

## app/globals.css

Muted maple red (356 30% 46%). Checked against every light `[data-theme]` block on 2026-11-18:
no theme within 8 degrees is within 15 saturation and 8 lightness; white text contrast about 5.7:1.
Then run `tools/gen_dark_brand_css.py`.

```css
  /* Canada amateur radio Basic Qualification (ISED) theme */
  [data-theme="cahambasic"] {
    --brand: 356 30% 46%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 356 30% 96%;
    --brand-hover: 356 30% 40%;
    --brand-dark: 356 30% 38%;
    --brand-darker: 356 28% 28%;
    --brand-muted: 356 18% 72%;
    --brand-border: 356 18% 82%;
    --brand-border-light: 356 15% 90%;
    --brand-gradient-to: 0 30% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `cahambasic: "Start-free practice for Canada's Amateur Radio Operator Certificate with Basic Qualification: ISED's regulations, bands, power limits and call signs, operating and Q signals, station layout, Ohm's law, components, antennas, propagation and interference, in four 50-question tests.",`
- `EXAM_ORG`: `cahambasic: "ISED · Amateur Radio Operator Certificate, Basic Qualification (RIC-3)",`
- Hub group: add `"cahambasic"` to `{ title: "Canada trades and workplace certificates", ids: [...] }`
  (after `crfsc`; it is the closest Canada licence group).
- `SEARCH_ALIASES`:
  `cahambasic: "canadian ham radio ham radio licence canada ham licence canada amateur radio canada amateur radio licence canada amateur radio operator certificate basic qualification basic qualification ham basic exam ised amateur radio exam ic amateur radio exam industry canada ham exam basic with honours basic honours ham ve call sign va call sign rbr-4 ric-3 amateur radio exam canada ham radio test canada canadian amateur radio exam",`
- `RELATED_OVERRIDES`: `cahambasic: ["ham", "nzham", "caelec"],` (the hub group has no other radio exam).

## lib/region.ts

`cahambasic: "CA",` in `TEST_REGIONS`, and add `"cahambasic"` to `NON_DRIVING_TESTS` (next to
`crfsc` on each line where it appears).

## lib/examFacts.ts

```ts
  cahambasic: {
    answer:
      "In Canada, Innovation, Science and Economic Development Canada (ISED) issues the Amateur Radio Operator Certificate with Basic Qualification and a call sign, which together let you operate an amateur station without a separate station licence. The Basic exam has 100 multiple-choice questions, one drawn from each of the 100 topics in ISED's Basic syllabus (RIC-3), and the pass mark is 70%. A score of 80% or more earns Basic with Honours, which adds the amateur bands below 30 MHz; Basic alone covers every band above 30 MHz. ISED-accredited examiners give the exam in person or by videoconference. It is closed book except for ISED's approved formula and block diagram sheet, a calculator that cannot store formulas or text is allowed, and there is no set time limit. Since July 15, 2025 every Basic exam uses ISED's updated question bank.",
    rows: [
      { label: "Questions", value: "100 multiple choice, one from each of 100 syllabus topics" },
      { label: "Pass mark", value: "70%; 80% or more gives Basic with Honours" },
      { label: "Time", value: "No set limit; most finish within an hour" },
      { label: "Aids", value: "ISED formula and block diagram sheet; calculator without memory" },
      { label: "Run by", value: "ISED-accredited examiners, in person or by videoconference" },
      { label: "Basic privileges", value: "All amateur bands above 30 MHz, up to 250 W DC input" },
      { label: "Honours adds", value: "All amateur bands below 30 MHz (HF)" },
    ],
    basedOn: "ISED RIC-3 Issue 5 (March 2022), RIC-1 Issue 8 (May 2025), RBR-4 Issue 3 (July 2022) and the amateur radio exam generator page (updated July 15, 2025), checked November 2026",
    source: { name: "ISED: RIC-3, Information on the Amateur Radio Service", url: "https://ised-isde.canada.ca/site/spectrum-management-telecommunications/en/licences-and-certificates/radiocom-information-circulars-ric/ric-3-information-amateur-radio-service" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## TEACHER_LED / TEACHES (components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx)

Basic courses are taught by amateur radio clubs, so it is teacher-led like `nzham` (the landing
already renders `ExamClassFaq`):
- `components/TeachNudge.tsx` `TEACHER_LED`: add `"cahambasic"` (next to `nzham`).
- `components/exam/ExamClassFaq.tsx` `TEACHES`: `cahambasic: "an amateur radio club Basic course",`

## lib/tigerAssets.ts

`BORROWED_SETS`: `cahambasic: "ham",` (borrow the FCC ham tiger).

## lib/examFreshness.json

No dated change is announced. Optional review event for the next RIC-3 issue is not needed; the
yearly review covers it.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader

Nothing required: sitemaps map over `EXAMS`, no redirects, the `radio` icon exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest 52).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing cahambasic:canada-amateur-radio-basic:34801`

## CLAUDE.md (under Additional Exams, after the NZ Amateur Radio bullet)

```md
- **Canada Amateur Radio Basic** (`cahambasic`, Innovation, Science and Economic Development Canada's exam for the Amateur Radio Operator Certificate with Basic Qualification and a VE/VA call sign, `/canada-amateur-radio-basic/*`, landing `/canada-amateur-radio-basic-practice-test`): `data/canada-amateur-radio-basic-questions.json` (200 original questions on ISED's Basic syllabus in RIC-3 Issue 5 (March 2022), RBR-4 Issue 3 (July 2022), the Radiocommunication Regulations and Act and ISED's May 2025 formula and block diagram sheet: regulations and licensing 28 (s 15.3 licence exemption, Radiotelephone General certificates as Basic equivalents, pre-April 2002 Basic as Honours, commercial kits only, software reprogramming, repeaters through s 44, remote control, supervised participation, s 47 content limits, s 48 emergencies, s 49 no remuneration, Act s 8 and s 9, change of address in 30 days, reciprocal foreign amateurs, IARP Class 2, CEPT through RAC, Schedule V prefixes, RIC-9 moves and deceased call signs), bands, power and technical rules 24 (Basic above 30 MHz, HF by Honours, Morse or Advanced, Schedule I bandwidths, 26 dB bandwidth, 70 cm 430 to 450 MHz, 220 to 222 MHz disaster relief, 60 m 100 W PEP ERP, 250 W DC input, 560 W PEP, 190 W carrier, 3 dB amplifier margin, ID every 30 minutes in English or French, retransmission below 29.5 MHz, 100% AM, crystal stability below 148 MHz, overmodulation indicator, CPC-2-0-03, s 52 orders), operating and procedures 16 (Q codes and procedure signs from ITU-R M.1172, ITU phonetics, RST), station layout 28 (ISED's receiver, transmitter, digital and HF station diagrams, image frequency, AM, SSB, FM, Baudot, ASCII), power supplies and safety 16 (Safety Code 6), components 12, basic electronics 24, feed lines and antennas 24 (300/F, 142/F, 71/F, 306/F), propagation 16, interference 12), test IDs 34801-34804, sets 34801-34804 (by syllabus section: Regulations & Bands 52, Operating & Station Layout 44, Electronics, Components & Safety 52, Antennas, Propagation & Interference 52), state `CAHAM`, prefix `CAHAM-`, 70% pass (the real pass mark; 80% gives Honours). 7/6/4/7/4/3/6/6/4/3 per test, RIC-3's 25/9/21/6/13/13/8/5 of 100 halved. The real exam: 100 questions, one per syllabus topic, no time limit, closed book except ISED's formula and block diagram sheet and a memory-free calculator, by ISED-accredited examiners in person or by videoconference (RIC-1 Issue 8); the bank ISED updated on July 15, 2025 is never copied or reworded, and the `ham` and `nzham` banks were checked so no fact-and-answer pair repeats. No fees, antenna height figures (CPC-2-0-03 is under consultation) or exam-admin questions; figures written as text naming ISED's blocks. Every calculation computed and asserted in its source file. Built by `tools/build-run-2026-11-18/cahambasic/build.py`; sources in `tools/build-run-2026-11-18/cahambasic/sources.md`. Region CA, hub group "Canada trades and workplace certificates", `[data-theme="cahambasic"]` muted maple red (356 30% 46%), borrows the FCC ham tiger, teacher-led (amateur radio club Basic courses).
```
