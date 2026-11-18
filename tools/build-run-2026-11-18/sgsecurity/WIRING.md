# Wiring for `sgsecurity` (Singapore security officer licence, WSQ Basic Licensing Units, v1, region SG)

Files already written by the builder: `data/singapore-security-officer-questions.json` (200, PASS,
key-longest 20%), `lib/banks/sgsecurity.ts`, `app/singapore-security-officer/*` (layout, redirect,
dashboard, drill, stats, copied from `app/sira-security/`; no test or practice folders, the shared
`app/[slug]` routes serve them), `app/singapore-security-officer-practice-test/page.tsx` (copied
from the aesira landing, plus `ExamClassFaq` and `classFaqJsonLd`), `tools/build-run-2026-11-18/sgsecurity/*`
(sources, `q_*.py`, `build.py`, this file). Everything below goes in shared files.

Format note: a new security officer must pass four WSQ Basic Licensing Units (Provide Guard and
Patrol Services with Operate Basic Security Equipment, Handle Security Incidents and Services,
Recognise Terrorist Threats) before PLRD lets them be deployed. Each is assessed by an approved
training provider for a Statement of Attainment; PLRD and SSG publish no question count or pass
mark. Here: four 50-question mock tests with 70% as Tigertest's target (labelled so), four content
sets, so 4 sets + 4 tests = 8 dashboard steps. Pools are exactly 4x per-test counts.

## lib/exams.ts

Add `"sgsecurity"` to the `ExamId` union. Icon `badge` already exists (used by `security`, `aesira`).

```ts
const sgsecurity: ExamConfig = {
  id: "sgsecurity",
  stateCode: "SGSECURITY",
  idBase: 34500,
  slug: "/singapore-security-officer",
  landingPath: "/singapore-security-officer-practice-test",
  name: "Singapore Security Officer Practice Test",
  shortName: "SG Security Officer",
  examLabel: "security officer licensing units",
  fullName: "Singapore security officer licence: WSQ Basic Licensing Units (PLRD)",
  questionIdPrefix: "SGSEC-",
  icon: "badge",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // The four WSQ Basic Licensing Units a new security officer needs before PLRD deployment since
  // 1 January 2024 (STC report of 31 January 2023, Annex B; PLRD FAQ): SEC-SOP-1007-1.1 Guard and
  // Patrol with SEC-TEM-2001-1.1 Access Control Management (OBSE), SEC-ICM-1003-1.1 Incident
  // Response, SEC-OBS-1002-1.1 Threat Observation. Content from PLRD's refresher e-quiz training
  // package (its summary of the BLUs), the PSIA 2007, the Conduct Regulations 2009, the licensing
  // conditions (rev. 12 Dec 2024) and the SCDF Civil Defence Emergency Handbook (2026). PLRD and
  // SSG publish no weights, count or pass mark: this split is Tigertest's, 70% Tigertest's target.
  blueprint: {
    sgsecLaw: 6,
    sgsecGuard: 7,
    sgsecEquip: 5,
    sgsecPatrol: 7,
    sgsecCrime: 6,
    sgsecTerror: 8,
    sgsecFire: 6,
    sgsecFirstAid: 5,
  },
  trainingSets: [
    { setNumber: 1, id: 34501, name: "Licence, Guarding & Access Control", categories: ["sgsecLaw", "sgsecGuard"], size: 52, weightLabel: "13 of 50 test questions" },
    { setNumber: 2, id: 34502, name: "Equipment, Patrols & Reports", categories: ["sgsecEquip", "sgsecPatrol"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 3, id: 34503, name: "Crime & Terrorist Threats", categories: ["sgsecCrime", "sgsecTerror"], size: 56, weightLabel: "14 of 50 test questions" },
    { setNumber: 4, id: 34504, name: "Fire, Emergencies & First Aid", categories: ["sgsecFire", "sgsecFirstAid"], size: 44, weightLabel: "11 of 50 test questions" },
  ],
  categoryLabels: {
    sgsecLaw: "PSIA, Licence & Conduct",
    sgsecGuard: "Guard Duties & Access Control",
    sgsecEquip: "Security Equipment & Communications",
    sgsecPatrol: "Patrols & Incident Reporting",
    sgsecCrime: "Crime, Detention & Conflict",
    sgsecTerror: "Terrorist Threats & Suspicious Items",
    sgsecFire: "Fire & Emergencies",
    sgsecFirstAid: "First Aid & Workplace Safety",
  },
  copy: {
    guestPrompt: "to save your security officer progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Four sets on the Basic Licensing Units: licence rules, guarding and access control; equipment, patrols and reports; crime and terrorist threats; fire, emergencies and first aid. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions across every topic, 70% target",
    heroSubs: [
      "Four training sets, four mock tests. Start with Licence, Guarding & Access Control.",
      "Master each set, then test.",
      "Keep going. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Ready for your course assessment.",
    ],
    sourceLine: "Based on the Private Security Industry Act 2007, the Conduct Regulations 2009, PLRD's licensing conditions and refresher training package, and SCDF and SGSecure guidance. Original questions; 50 per test, 70% is Tigertest's target. Not affiliated with PLRD, the Singapore Police Force, SkillsFuture Singapore or any training provider.",
    analyticsKey: "sgsecurity",
  },
};
```

Append `sgsecurity` to the `EXAMS` array next to `sgvl` (or after `sgsnb`).

Check: 34501-34504 (tests and sets) must be free; `grep -n "345[0-9][0-9]" lib/exams.ts` found
nothing on 2026-11-18.

## lib/banks/all.ts

```ts
import "./sgsecurity";
```

## types/index.ts

- `QuestionType`: add `| "SGSECURITY"`.
- `QuestionCategory`, under a `// Singapore security officer (PLRD licence)` comment:

```ts
  | "sgsecLaw"
  | "sgsecGuard"
  | "sgsecEquip"
  | "sgsecPatrol"
  | "sgsecCrime"
  | "sgsecTerror"
  | "sgsecFire"
  | "sgsecFirstAid"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    sgsecLaw: "PSIA, Licence & Conduct",
    sgsecGuard: "Guard Duties & Access Control",
    sgsecEquip: "Security Equipment & Communications",
    sgsecPatrol: "Patrols & Incident Reporting",
    sgsecCrime: "Crime, Detention & Conflict",
    sgsecTerror: "Terrorist Threats & Suspicious Items",
    sgsecFire: "Fire & Emergencies",
    sgsecFirstAid: "First Aid & Workplace Safety",
```

## app/globals.css

Hue checked against every light `[data-theme]` block on 2026-11-18 (no theme within 8 degrees is
within 15 saturation and 8 lightness); white text contrast about 8.7:1. Muted mulberry grey
(330 20% 32%). Then run `tools/gen_dark_brand_css.py`.

```css
  /* Singapore security officer (PLRD licence) theme */
  [data-theme="sgsecurity"] {
    --brand: 330 20% 32%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 330 20% 96%;
    --brand-hover: 330 20% 27%;
    --brand-dark: 330 20% 26%;
    --brand-darker: 330 18% 18%;
    --brand-muted: 330 12% 70%;
    --brand-border: 330 12% 80%;
    --brand-border-light: 330 10% 89%;
    --brand-gradient-to: 335 25% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `sgsecurity: "Start-free practice for the Singapore security officer licence: the PSIA and licensing conditions, guard and patrol duties, access control and security equipment, incident response, recognising terrorist threats, fire safety and first aid, in four 50-question mock tests with every answer explained.",`
- `EXAM_ORG`: `sgsecurity: "PLRD (Singapore Police Force) · WSQ Basic Licensing Units",`
- Hub group: add `"sgsecurity"` to `{ title: "Singapore licensing exams", ids: [...] }` (after `sgvl`).
- `SEARCH_ALIASES`:
  `sgsecurity: "singapore security officer security officer licence singapore plrd security licence security guard singapore basic licensing units blu security course provide guard and patrol services pgps handle security incidents and services hsis recognise terrorist threats rtt operate basic security equipment obse access control management wsq security course security refresher quiz psia private security industry act singapore guard test",`
- `RELATED_OVERRIDES`: not needed (the group has four other members).

## lib/region.ts

`sgsecurity: "SG",` in `TEST_REGIONS`, and add `"sgsecurity"` to `NON_DRIVING_TESTS` (next to `sgvl`
on each line where `sgvl` appears).

## lib/examFacts.ts

```ts
  sgsecurity: {
    answer:
      "In Singapore, anyone paid to guard or patrol property, keep it under surveillance, act as a bodyguard or bouncer, screen people at an entrance or regulate traffic needs a security officer's licence from the Police Licensing and Regulatory Department (PLRD) under the Private Security Industry Act 2007. Since 1 January 2024, a new security officer must pass four WSQ Basic Licensing Units at an approved training provider before being deployed: Provide Guard and Patrol Services with Operate Basic Security Equipment (Access Control Management), Handle Security Incidents and Services, and Recognise Terrorist Threats, earning four Statements of Attainment. PLRD and SkillsFuture Singapore do not publish a question count or pass mark for the unit assessments. Officers licensed before 2024 must complete the access control unit by 31 December 2026, and every officer must pass PLRD's refresher e-quiz to renew the licence.",
    rows: [
      { label: "Units", value: "Guard and Patrol with Access Control; Incident Response; Recognise Terrorist Threats" },
      { label: "Assessment", value: "By the approved WSQ training provider, one Statement of Attainment per unit" },
      { label: "Questions", value: "Not published" },
      { label: "Pass mark", value: "Not published; 70% is Tigertest's target" },
      { label: "Licence", value: "Valid for the period stated on it, up to five years (PSIA s 23)" },
      { label: "Renewal", value: "Refresher e-quiz required since 1 January 2024" },
      { label: "Run by", value: "PLRD (Singapore Police Force); WSQ units under SkillsFuture Singapore" },
    ],
    basedOn: "The Private Security Industry Act 2007, PLRD's licensing conditions (rev. 12 December 2024), its FAQ on enhanced training requirements and its refresher training package, and the Security Tripartite Cluster's 2023 report, checked November 2026",
    source: { name: "Singapore Police Force: Security Progressive Wage Model Requirements", url: "https://www.police.gov.sg/E-Services/Apply-for-Security-Officer-Licence/Security-Progressive-Wage-Model-Requirements" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## TEACHER_LED / TEACHES (components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx)

The units are taught as WSQ courses by approved training providers, so it is teacher-led like
`aesira`, `iepsa` and `zapsira` (the landing already renders `ExamClassFaq`):
- `components/TeachNudge.tsx` `TEACHER_LED`: add `"sgsecurity"` (next to `sgvl` on each line).
- `components/exam/ExamClassFaq.tsx` `TEACHES`: `sgsecurity: "a WSQ Basic Licensing Units course for security officers",`

## lib/tigerAssets.ts

`BORROWED_SETS`: `sgsecurity: "security",` (borrow the security guard tiger).

## lib/examFreshness.json (dated change)

```json
{
  "exam": "sgsecurity",
  "date": "2026-12-31",
  "kind": "notice",
  "what": "Deadline for security officers licensed before 1 January 2024 to pass TSC Access Control Management (Operate Basic Security Equipment); from 1 January 2027 they cannot be deployed without it.",
  "action": "Reword the landing FAQ and examFacts answer about existing officers into past tense; check PLRD's pages for any new training requirement.",
  "source": "https://www.police.gov.sg/-/media/SPF/Files/E-services/SO/FAQs-on-Enhanced-Training-Requirements-for-Security-Officers-Updated.pdf"
}
```

Then `python3 -I tools/check_freshness.py` and `python3 -I tools/build_exam_sources.py`.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader

Nothing required: sitemaps map over `EXAMS`, no redirects, the `badge` icon exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest 56, set 3).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing sgsecurity:singapore-security-officer:34501`

## CLAUDE.md (under Additional Exams, after the SGVL bullet)

```md
- **Singapore Security Officer** (`sgsecurity`, the four WSQ Basic Licensing Units a new security officer must pass before being deployed under a security officer's licence from the Police Licensing and Regulatory Department (PLRD) (Private Security Industry Act 2007), since 1 January 2024: Provide Guard and Patrol Services with Operate Basic Security Equipment (Access Control Management), Handle Security Incidents and Services, Recognise Terrorist Threats, `/singapore-security-officer/*`, landing `/singapore-security-officer-practice-test`): `data/singapore-security-officer-questions.json` (200 original questions: PSIA, licence and conduct 24 (s 13 functions, s 14 holding out, s 2 bouncer and frisk search, s 23 validity up to five years, s 24 suspension up to six months and immediate suspension with a 14-day review, s 26 appeal to the Minister, ss 17A to 17E protections, Conduct Regulations 3 and 7A, licensing conditions: two employers at most, over-60 medical yearly, PWM grades, patrol dogs, X-ray screening certification; MOM salary and sick leave rules), guard duties and access control 28, security equipment and communications 20 (CCTV, metal detectors, call signs, Conduct Regulation 6, body worn cameras, call points, hose reels, AEDs, Public Warning System, refuge floors), patrols and incident reporting 28 (defects, cordons, casualties, Conduct Regulation 5 surveillance reports, suspicious behaviour), crime, detention and conflict 24, terrorist threats and suspicious items 32 (casing, target types, person-, vehicle- and mail-borne IED signs, UAVs, 100 m cordon, bomb threat calls, Run Hide Tell, A.I.S.U.), fire and emergencies 24, first aid and workplace safety 20 (995, 1777, R.I.C.E., burns 10 minutes, CPR about 5 cm, Press Tie Tell, PDPA)), test IDs 34501-34504, sets 34501-34504 (Licence, Guarding & Access Control 52; Equipment, Patrols & Reports 48; Crime & Terrorist Threats 56; Fire, Emergencies & First Aid 44), state `SGSECURITY`, prefix `SGSEC-`, 70% Tigertest's target (each unit is assessed by the approved training provider for a Statement of Attainment; PLRD and SSG publish no count or pass mark). 6/7/5/7/6/8/6/5 per test, Tigertest's split. Content from PLRD's refresher e-quiz training package (its summary of the BLUs, fetched as the .pdf; the .ashx link is dead), the Security Tripartite Cluster's 2023 report (Annex B unit codes), PLRD's licensing conditions (rev. 12 December 2024) and FAQ, the PSIA and Conduct Regulations on SSO, the SCDF Civil Defence Emergency Handbook (10th ed., 2026) and SGSecure; SSG's skills framework page did not render. Existing officers' access control deadline (31 December 2026) is a freshness event. No fines, fees or wage amounts. Kept clear of `aesira`, `iepsa`, `zapsira`, `uksia`, `security`, `caguard`, `mtguard`, `nzsecurity`, `cabcguard`, `caabguard` and `sgvl`. Built by `tools/build-run-2026-11-18/sgsecurity/build.py`; sources in `tools/build-run-2026-11-18/sgsecurity/sources.md`. Region SG, hub group "Singapore licensing exams", `[data-theme="sgsecurity"]` muted mulberry grey (330 20% 32%), borrows the security guard tiger, teacher-led (WSQ training providers).
```
