# Wiring for `cosmoinstructor` (NIC National Instructor Theory Examination, US, v1)

Files already written by the builder: `data/cosmetology-instructor-questions.json` (200, PASS,
key-longest 24%, key>1.2x 21%, key strictly shortest 21%; seeded balanced key slots, seed 40800), `lib/banks/cosmoinstructor.ts`,
`app/cosmetology-instructor/*` (layout, redirect, dashboard, drill, stats, copied from
`app/esthetician/`; no test or practice folders, the shared `app/[slug]` routes serve them),
`app/cosmetology-instructor-practice-test/page.tsx` (copied from
`app/esthetician-practice-test/`), `tools/build-run-2026-11-18/cosmoinstructor/*` (sources,
`q_*.py`, `build.py`, this file). Everything below goes in shared files.

Rebuild: `python3 -I tools/build-run-2026-11-18/cosmoinstructor/build.py`, then validate:
`python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/cosmetology-instructor-questions.json --pool ciCurriculum=24 --pool ciLearners=16 --pool ciMaterials=12 --pool ciAssessPlan=12 --pool ciMethods=20 --pool ciObstacles=12 --pool ciCommunication=16 --pool ciTime=8 --pool ciEvaluation=12 --pool ciEnvironment=20 --pool ciProfessional=28 --pool ciSafety=20`

Format: 4 tests x 50, five topic sets (36/40/40/44/40), 9 dashboard steps; pools exactly 4x per
test. Pass line 80% (each board sets the cut; South Carolina requires 80% for instructor
licensure).

## lib/exams.ts

Add `"cosmoinstructor"` to the `ExamId` union. Icon `graduation` already exists.

```ts
const cosmoinstructor: ExamConfig = {
  id: "cosmoinstructor",
  stateCode: "CINSTR",
  idBase: 40800,
  slug: "/cosmetology-instructor",
  landingPath: "/cosmetology-instructor-practice-test",
  name: "Cosmetology Instructor Practice Test",
  shortName: "Instructor",
  examLabel: "Cosmetology instructor exam",
  fullName: "NIC National Instructor Theory Examination",
  questionIdPrefix: "CINST-",
  icon: "graduation",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // NIC National Instructor Theory Examination CIB, effective December 1, 2024, revised
  // January 1, 2026: 85 items, 75 scored, 90 minutes. Instructional Planning 33% (here 16:
  // curriculum 6, learners 4, materials 3, assessment planning 3), Instructional Methods 33%
  // (here 17: methods 5, obstacles 3, communication 4, time management 2, evaluation 3), Theory
  // and Practical Classroom 34% (here 17: environment 5, professional responsibilities 7,
  // safety 5); the split inside each domain is Tigertest's. Each board sets its pass mark
  // (South Carolina: 80% for instructors). References: Milady Professional Educator 4th ed.,
  // McKeachie's Teaching Tips 14th ed., Pivot Point Fundamentals: Mindful Teaching 2nd ed.
  // Federal rules: FERPA (34 CFR 99), 34 CFR 668.34, OSHA 29 CFR 1910.37, .151, .157, .1030.
  // All items original.
  blueprint: {
    ciCurriculum: 6,
    ciLearners: 4,
    ciMaterials: 3,
    ciAssessPlan: 3,
    ciMethods: 5,
    ciObstacles: 3,
    ciCommunication: 4,
    ciTime: 2,
    ciEvaluation: 3,
    ciEnvironment: 5,
    ciProfessional: 7,
    ciSafety: 5,
  },
  trainingSets: [
    { setNumber: 1, id: 40801, name: "Curriculum & Lesson Planning", categories: ["ciCurriculum", "ciMaterials"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 2, id: 40802, name: "Learners & Assessment", categories: ["ciLearners", "ciAssessPlan", "ciEvaluation"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 3, id: 40803, name: "Teaching Methods & Obstacles", categories: ["ciMethods", "ciObstacles", "ciTime"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 4, id: 40804, name: "Communication & Professional Duties", categories: ["ciCommunication", "ciProfessional"], size: 44, weightLabel: "11 of 50 test questions" },
    { setNumber: 5, id: 40805, name: "Learning Environment & Safety", categories: ["ciEnvironment", "ciSafety"], size: 40, weightLabel: "10 of 50 test questions" },
  ],
  categoryLabels: {
    ciCurriculum: "Curriculum & Lesson Plans",
    ciLearners: "Learning Styles & Needs",
    ciMaterials: "Instructional Materials",
    ciAssessPlan: "Planning Assessments",
    ciMethods: "Methods of Instruction",
    ciObstacles: "Obstacles to Learning",
    ciCommunication: "Communication Skills",
    ciTime: "Time Management",
    ciEvaluation: "Assessing Student Learning",
    ciEnvironment: "Learning Environments",
    ciProfessional: "Professional Responsibilities",
    ciSafety: "Safe Learning Environment",
  },
  copy: {
    guestPrompt: "to save your instructor exam progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets on the NIC instructor theory outline: curriculum and lesson planning; learners and assessment; teaching methods and obstacles; communication and professional duties; and the learning environment and safety. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions in the NIC proportions, 80% readiness line",
    heroSubs: [
      "Five training sets, four practice tests. Start with Curriculum & Lesson Planning.",
      "Master each set, then test.",
      "Keep going. Every topic you master shows up on the tests.",
      "Fix the misses, then retake.",
      "All done. Go pass your instructor exam.",
    ],
    sourceLine: "Based on the NIC National Instructor Theory Examination outline (bulletin effective December 1, 2024, revised January 1, 2026: 85 items, 75 scored, 90 minutes). Original questions. Some states use a different exam; check your board. Not affiliated with NIC.",
    analyticsKey: "cosmoinstructor",
  },
};
```

Append `cosmoinstructor` to the `EXAMS` array after `esthetician` (or after `nailtech`), so the
cosmetology family sits together.

Check: 40801-40805 (tests 40801-40804, sets 40801-40805) must be free; the run assigned idBase
40800 (ascpmls is 40700).

## lib/banks/all.ts

```ts
import "./cosmoinstructor";
```

## types/index.ts

- `QuestionType`: add `| "CINSTR"`.
- `QuestionCategory`, under a `// Cosmetology instructor (NIC instructor theory)` comment:

```ts
  | "ciCurriculum"
  | "ciLearners"
  | "ciMaterials"
  | "ciAssessPlan"
  | "ciMethods"
  | "ciObstacles"
  | "ciCommunication"
  | "ciTime"
  | "ciEvaluation"
  | "ciEnvironment"
  | "ciProfessional"
  | "ciSafety"
```

(grep found no existing `"ci...` category keys.)

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    ciCurriculum: "Curriculum & Lesson Plans",
    ciLearners: "Learning Styles & Needs",
    ciMaterials: "Instructional Materials",
    ciAssessPlan: "Planning Assessments",
    ciMethods: "Methods of Instruction",
    ciObstacles: "Obstacles to Learning",
    ciCommunication: "Communication Skills",
    ciTime: "Time Management",
    ciEvaluation: "Assessing Student Learning",
    ciEnvironment: "Learning Environments",
    ciProfessional: "Professional Responsibilities",
    ciSafety: "Safe Learning Environment",
```

## app/globals.css

Suggested hue 304 25% 42%, muted plum (white text 6.0:1). Checked with a script against every
light `[data-theme]` block in `app/globals.css` plus the hues in this run's other WIRING.md files
(esthetician 330 20% 40% is 26 degrees away): nothing within 8 degrees clashes. Re-check
against builders who finish later. Then run `tools/gen_dark_brand_css.py`.

```css
  /* Cosmetology instructor theme: muted plum */
  [data-theme="cosmoinstructor"] {
    --brand: 304 25% 42%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 304 25% 96%;
    --brand-hover: 304 25% 36%;
    --brand-dark: 304 25% 30%;
    --brand-darker: 304 25% 20%;
    --brand-muted: 304 15% 70%;
    --brand-border: 304 15% 80%;
    --brand-border-light: 304 15% 89%;
    --brand-gradient-to: 320 25% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `cosmoinstructor: "Cosmetology, barber, esthetics and nail instructor license prep on the NIC Instructor theory outline: lesson planning, learning styles, teaching methods, communication, assessment and reliability, learning environments, professional responsibilities (FERPA, academic progress) and classroom safety.",`
- `EXAM_ORG`: `cosmoinstructor: "NIC (National-Interstate Council of State Boards of Cosmetology) · instructor theory",`
- Hub group "Workplace & job certifications": insert `"cosmoinstructor"` right after
  `"esthetician"` (after `"nailtech"` if esthetician is not in yet).
- `SEARCH_ALIASES`:
  `cosmoinstructor: "cosmetology instructor nic instructor cosmo instructor cosmetology teacher beauty instructor barber instructor esthetics instructor esthetician instructor nail instructor instructor license instructor theory instructor exam cosmetology educator",`
  Add a case to `tests/test-search-aliases.test.cjs`: `"cosmetology instructor"` finds
  `cosmoinstructor` (and check `"cosmetology"` alone still finds `cosmetology` first, and
  "driving instructor" / "adi" still find the UK ADI test).
- `RELATED_OVERRIDES`: none needed (hub group has many members); optionally
  `cosmoinstructor: ["cosmetology", "barber", "praxisplt"]` if the related row reads better.

## lib/region.ts

Nothing: US is the default region.

## lib/examFacts.ts

```ts
  cosmoinstructor: {
    answer:
      "Most US states license cosmetology, barbering, esthetics and nail technology instructors, and many state boards require the NIC National Instructor Theory Examination, developed by the National-Interstate Council of State Boards of Cosmetology. It has 85 multiple-choice questions, 75 of them scored, in 90 minutes, each with four options and one correct answer. The outline has three domains: Instructional Planning, 33 percent (syllabi, course outlines, lesson plans, learning styles, instructional materials and choosing assessments), Instructional Methods, 33 percent (lecture, demonstration and group learning, obstacles to learning, communication, time management and assessing student learning), and Theory and Practical Classroom, 34 percent (physical and virtual learning environments, professional responsibilities and a safe learning environment). Each state board sets its passing score; South Carolina, for example, requires 80 percent for instructor licensure. Instructor training hours, teaching experience, fees and continuing education vary by state, and some states use a different exam.",
    rows: [
      { label: "Questions", value: "85 (75 scored), four options each" },
      { label: "Time", value: "90 minutes" },
      { label: "Passing score", value: "Set by each board; 80% in South Carolina" },
      { label: "Domains", value: "Planning 33%, Methods 33%, Classroom 34%" },
      { label: "Also required", value: "Often a practical or teaching exam (varies by state)" },
      { label: "Developed by", value: "NIC (National-Interstate Council of State Boards of Cosmetology)" },
    ],
    basedOn: "the NIC National Instructor Theory Examination candidate information bulletin, effective December 1, 2024 (revised January 1, 2026), checked November 2026",
    source: { name: "NIC Instructor Theory CIB", url: "https://prov-testing.github.io/nic_cib/instructor_national_theory_english.html" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date, comment naming `cosmoinstructor`.

## TEACHER_LED / TEACHES

Taught in instructor training programs at cosmetology and barber schools:
- `components/TeachNudge.tsx` `TEACHER_LED`: add `"cosmoinstructor"`.
- `components/exam/ExamClassFaq.tsx` `TEACHES`: `cosmoinstructor: "in an instructor training program",`

## lib/tigerAssets.ts

`BORROWED_SETS`: `cosmoinstructor: "cosmetology",` (the landing uses
`getTigerAsset("cosmoinstructor", 3)`). A Praxis tiger would also fit; cosmetology keeps the
family look.

## lib/examFreshness.json

Nothing dated: no newer NIC instructor outline announced as of 2026-11-18 (the CIB was revised
January 1, 2026). The yearly review covers it.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts`. No set exceeds 60 (largest 44), so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing cosmoinstructor:cosmetology-instructor:40801`

## CLAUDE.md (under Additional Exams, after the Esthetician bullet, or after Barber)

```md
- **Cosmetology Instructor** (`cosmoinstructor`, NIC National Instructor Theory Examination, the written licensure exam for cosmetology, barber, esthetics and nail technology instructors in NIC states, `/cosmetology-instructor/*`, landing `/cosmetology-instructor-practice-test`): `data/cosmetology-instructor-questions.json` (200 original questions on the NIC Instructor theory CIB effective December 1, 2024, revised January 1, 2026 (85 items, 75 scored, 90 minutes; Instructional Planning 33%, Instructional Methods 33%, Theory and Practical Classroom 34%): curriculum and lesson plans 24, learning styles and needs 16, instructional materials 12, planning assessments 12, methods of instruction 20, obstacles to learning 12, communication 16, time management 8, assessing student learning (reliability, validity, item analysis) 12, learning environments 20, professional responsibilities (FERPA 34 CFR 99, Title IV satisfactory academic progress 34 CFR 668.34) 28, safe learning environment (OSHA 29 CFR 1910.37, .151, .157, .1030) 20), test IDs 40801-40804, sets 40801-40805 (Curriculum & Lesson Planning 36, Learners & Assessment 40, Teaching Methods & Obstacles 40, Communication & Professional Duties 44, Learning Environment & Safety 40), state `CINSTR`, prefix `CINST-`, 80% pass (each board sets its cut; South Carolina requires 80% for instructors). 6/4/3/3, 5/3/4/2/3 and 5/7/5 per test (16/17/17; the split inside each domain is Tigertest's). Instructor training hours, teaching experience, fees and continuing education vary by state and are not asked; the NIC sample questions' facts were avoided as keys. Checked against `praxisplt`, `texesppr`, `cosmetology`, `barber`, `esthetician`, `nailtech` and `deaevo` for repeated fact-and-answer pairs. Built by `tools/build-run-2026-11-18/cosmoinstructor/build.py`; sources in `tools/build-run-2026-11-18/cosmoinstructor/sources.md`. Region US, hub group "Workplace & job certifications" (after esthetician), `[data-theme="cosmoinstructor"]` muted plum (304 25% 42%), borrows the cosmetology tiger, teacher-led (instructor training programs).
```

## Notes for the integrator

- `tools/check_sources.py` fails to import under the Mac's Python 3.9 (`Path | None`); it passed
  ("8 primary pages, 0 secondary, 9 dated reads") from a copy with
  `from __future__ import annotations` added.
- osha.gov returned 403; all OSHA facts were read from the eCFR text instead.
- The nailtech bank file is `data/nail-technician-questions.json`; it was scanned.
