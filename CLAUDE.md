# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Next.js dev server
npm run build     # Production build
npm run lint      # ESLint (next/core-web-vitals)
npm start         # Start production server
```

No test framework is configured. There are no unit or integration tests.

## Architecture

**TigerTest** is a DMV practice test app built with Next.js 15 (App Router), React 19, TypeScript, and Firebase.

### Stack
- **UI:** Tailwind CSS + shadcn/ui (Radix primitives) in `/components/ui/`
- **State:** Zustand store (`/store/useStore.ts`) with localStorage persistence + Firebase Firestore sync
- **Auth:** Firebase Authentication (email/password + Google OAuth) via `/contexts/AuthContext.tsx`
- **Backend:** Firebase Firestore for user data, Resend for transactional email
- **Path alias:** `@/*` maps to project root

### Key Data Flow

All question data lives in `/data/questions.json` (~2,200 questions covering 50 states + DC). Questions are either `Universal` (shared across states) or `State-Specific`.

**Test generation** (`/lib/testGenerator.ts`) is deterministic — each of 4 tests gets a fixed slice of questions:
- Test N gets universal questions `[(N-1)*40 .. N*40-1]` + state-specific `[(N-1)*10 .. N*10-1]`
- 50 questions per test, 200 total per state
- Answer options are shuffled per attempt (skipped for position-dependent answers like "A and B")

**Training sets** mirror tests: 4 sets of 50 questions with mastery-based progression and a wrong-answer queue for spaced repetition.

### Zustand Store Structure

The store in `/store/useStore.ts` is the single source of truth. Key sections:
- `selectedState` — drives which questions are loaded; clearing state clears all progress
- `currentTests` — in-progress test sessions (questions, answers, timestamps)
- `completedTests` — full history of finished tests
- `training` / `trainingSets` — training mode progress with mastery tracking
- Firebase sync: `loadUserData()`, `saveToFirestore()`, `convertGuestToUser()`
- Data versioning (`DATA_VERSION = 2`) with migration logic on load

### Routing

App Router pages in `/app/`. Key routes:
- `/` — landing page
- `/dashboard` — main hub (4 tests + 4 training sets)
- `/test/[id]` — practice test (1-4)
- `/test/[id]/results` — test results with performance breakdown
- `/training` — mastery-based training with `?set=1-4` for specific sets
- `/stats` — per-question performance analytics
- `/onboarding/select-state` — state selection flow
- `/admin` — admin dashboard (restricted by email in `/lib/admin.ts`)

Guest mode allows using the app without an account; guest data converts on signup.

### Additional Exams (CDL, HTL, CST, CRCST)

Non-DMV exams reuse the DMV components and store, namespaced by ID range and a
pseudo state code so progress never collides with DMV data. All of them are driven by the registry in `lib/exams.ts` (`ExamConfig`: state code, ID bases, slug, landing path, blueprint, training sets, category labels, dashboard copy). Banks live in `lib/examData.ts`; `lib/examTestGenerator.ts` builds blueprint-weighted deterministic tests (test N takes slice N of each category pool, sorted by question ID) and training sets (one or more categories per set). Pages under `app/<slug>/` are thin wrappers around `components/exam/*` (dashboard, test, results, training, drill, stats) plus a static SEO landing (`app/<slug>/page.tsx`, or `landingPath` when it lives elsewhere). `lib/testCatalog.ts` lists every test (DMV + registry) for the `/tests` hub, header switcher and footer.
- **CDL** (general knowledge, `/cdl/*`, landing `/cdl-practice-test`): `data/cdl-questions.json` (600 questions, 13 categories), test IDs 101-106, training set IDs 121-126 (`setIdBase` 120, so old sequential-set progress at 101-112 is ignored rather than misread), state `CDL`, 80% pass. 9 safe driving, 7 inspection, 5 basic control, 5 braking, 4 systems, 4 cargo, 4 emergencies, 3 hazards, 3 alcohol/drugs, 2 weather, 2 railroad, 1 night, 1 mountain per test.
- **CDL Endorsements** (`/cdl-endorsements/*`, landing `/cdl-endorsement-practice-test`): `data/cdl-endorsement-questions.json` (200 questions from FMCSA CDL Manual sections 4, 5, 6, 8, 9), test IDs 701-704, sets 701-705 (one per endorsement: HazMat 52, Air Brakes 44, Combination 40, Tank 32, Passenger 32), state `CDLE`, 80% pass. Mixed tests: 13 hazmat, 11 air brakes, 10 combination, 8 tank, 8 passenger. Question prefix `CDLE-` (distinct from CDL general knowledge `CDL-`).
- **Motorcycle** (permit knowledge test, `/motorcycle/*`, landing `/motorcycle-practice-test`): `data/motorcycle-questions.json` (200 questions from the MSF Motorcycle Operator Manual), test IDs 501-504, sets 501-505, state `MOTO`, 80% pass. 7 preparation, 10 control, 9 positioning, 7 intersections/passing, 6 hazards, 6 special situations, 5 alcohol per test. Universal content; state-specific rules are not asserted.
- **Citizenship** (USCIS 2025 civics test, `/citizenship/*`, landing `/citizenship-test`): `data/civics-questions.json` (200 multiple-choice items expanded from the official 128-question list, source text in the session scratchpad), test IDs 601-604, sets 601-604, state `CIVICS`, 60% pass like the real test. 6 principles, 18 government, 4 rights, 7 colonial, 4 1800s, 7 recent history, 4 symbols/holidays per test. Items naming current officials say "as of 2026" and point to uscis.gov/citizenship/testupdates.
- **Part 107** (FAA remote pilot UAG test, `/part-107/*`, landing `/part-107-practice-test`): `data/part107-questions.json` (200 questions, no figure-dependent items), test IDs 801-804, sets 801-805, state `P107`, 70% pass. 10 regulations, 10 airspace, 7 weather, 5 loading/performance, 18 operations per test (FAA ACS weighting).
- **Ham Radio** (FCC Technician, `/ham-radio/*`, landing `/ham-radio-technician-practice-test`): `data/ham-questions.json` is the official NCVEC 2026-2030 pool (397 of 409 questions; the 12 needing a schematic figure are excluded) with written explanations, IDs `HAM-T1-001..` interleaved across groups so test slices spread like the real draw. Test IDs 901-904 (35 questions each, like the real exam), sets 901-906, state `HAM`, 74% pass (26 of 35). Blueprint is the real per-subelement draw (6/3/3/2/4/4/4/4/2/3). Rebuild with the session scratchpad `tools/build_ham.py` when the pool changes.
- **EPA 608** (refrigerant technician certification, `/epa-608/*`, landing `/epa-608-practice-test`): `data/epa608-questions.json` (200 questions: Core 72, Type I 40, Type II 52, Type III 36), test IDs 1001-1004, sets 1001-1004 (one per real section), state `EPA608`, 72% pass (18 of 25 per real section). Mixed tests: 18 core, 10 type I, 13 type II, 9 type III.
- **CNA** (nurse aide written exam, `/cna/*`, landing `/cna-practice-test`): `data/cna-questions.json` (200 questions on the NNAAP outline), test IDs 1101-1104, sets 1101-1104, state `CNA`, 70% pass. 8 ADL, 19 basic nursing, 4 restorative, 5 emotional, 1 spiritual/cultural, 4 communication, 4 rights, 1 legal, 4 team per test.
- **PTCB** (pharmacy technician PTCE, `/ptcb/*`, landing `/ptcb-practice-test`): `data/ptcb-questions.json` (200 questions: medications 72, patient safety 48, order entry 44, federal 36), test IDs 1201-1204, sets 1201-1204, state `PTCB`, 70% pass. 18 medications, 12 patient safety, 11 order entry, 9 federal per test (PTCE outline effective Jan 2026). Federal law only.
- **Phlebotomy** (NHA CPT, `/phlebotomy/*`, landing `/phlebotomy-practice-test`): `data/phlebotomy-questions.json` (200 questions: routine 56, safety 52, patient prep 40, processing 28, special 24), test IDs 1301-1304, sets 1301-1304, state `PHLEB`, 70% pass. 14 routine, 13 safety, 10 prep, 7 processing, 6 special per test (NHA CPT 2025 test plan).
- **CCMA** (NHA clinical medical assistant, `/ccma/*`, landing `/ccma-practice-test`): `data/ccma-questions.json` (200 questions across 12 categories: the 7 NHA domains with clinical patient care split into its 6 subareas), test IDs 1401-1404, sets 1401-1404, state `CCMA`, 70% pass. Per test: 5 foundations, 3 A&P, 5 intake/vitals, 9 general care, 5 infection/safety, 3 lab, 4 phlebotomy, 2 EKG, 4 coordination, 4 admin, 4 communication, 2 law (CCMA 3.0 test plan).
- **CET** (NHA EKG technician, `/ekg/*`, landing `/ekg-technician-practice-test`): `data/cet-questions.json` (200 questions: acquisition 88, safety and patient care 64, analysis 48), test IDs 1501-1504, sets 1501-1503, state `CET`, 70% pass. 22 acquisition, 16 safety, 12 analysis per test (NHA CET test plan). No images: rhythm items describe the strip in words.
- **DANB** (dental assistant CDA, `/dental-assistant/*`, landing `/dental-assistant-practice-test`): `data/danb-questions.json` (200 questions: GC chairside 52, evaluation 16, patient management 16, materials 16; RHS 52; ICE 48), test IDs 1601-1604, sets 1601-1604, state `DANB`, 70% pass. Mixed tests 25 GC (4/4/13/4), 13 RHS, 12 ICE (DANB GC outline, RHS and ICE outlines rev. March 2025). Expanded functions "where state law allows".
- **EMT** (NREMT EMT cognitive exam, `/emt/*`, landing `/emt-practice-test`): `data/emt-questions.json` (200 questions: scene 36, primary 80, secondary 16, treatment 44, operations 24), test IDs 1701-1704, sets 1701-1704, state `EMT`, 70% pass. 9 scene, 20 primary, 4 secondary, 11 treatment, 6 operations per test (NREMT specifications April 2025). Single-answer items only; "per local protocol" instead of any agency rule.
- **Food Manager** (Certified Food Protection Manager, `/food-manager/*`, landing `/food-manager-practice-test`): `data/food-manager-questions.json` (200 questions: contamination 32, flow 48, time/temperature 40, hygiene 32, cleaning 24, facilities 12, management 12), test IDs 1801-1804, sets 1801-1804, state `FOODMGR`, 70% pass. 8/12/10/8/6/3/3 per test. FDA Food Code figures; no provider named in questions.
- **Real Estate** (salesperson national exam, `/real-estate/*`, landing `/real-estate-practice-test`): `data/real-estate-questions.json` (200 questions across the 8 Pearson VUE outline areas: property 28, ownership 24, valuation 28, contracts/agency 40, practice 24, disclosures 20, financing 16, math 20), test IDs 1901-1904, sets 1901-1904, state `REALESTATE`, 70% pass. 7/6/7/10/6/5/4/5 per test. National portion only, never state law.
- **Life & Health Insurance** (producer exam general portion, `/life-health-insurance/*`, landing `/life-health-insurance-practice-test`): `data/life-health-questions.json` (200 questions across 9 areas: regulation 16, general 20, life basics 20, life types 24, life provisions 32, annuities/tax 20, health basics 20, health provisions 20, health types 28), test IDs 2001-2004, sets 2001-2004, state `LIFEHEALTH`, 70% pass. 4/5/5/6/8/5/5/5/7 per test. General portion only, never state rules.
- **Notary** (notary public exam, `/notary/*`, landing `/notary-practice-test`): `data/notary-questions.json` (200 questions: acts 56, identification 40, journal/seal 40, ethics 40, commission 24), test IDs 2101-2104, sets 2101-2104, state `NOTARY`, 70% pass. 14/10/10/10/6 per test. General law only; state figures are "varies by state".
- **TEAS** (ATI TEAS 7, `/teas/*`, landing `/teas-practice-test`): `data/teas-questions.json` (200 questions: reading 52 with embedded passages, math 44, science 60, English 44), test IDs 2201-2204, sets 2201-2204, state `TEAS`, 70% pass. 13/11/15/11 per test. Reading stems run up to 110 words.
- **AWS CCP** (Cloud Practitioner CLF-C02, `/aws-cloud-practitioner/*`, landing `/aws-cloud-practitioner-practice-test`): `data/aws-ccp-questions.json` (200 questions: concepts 48, security 60, technology 68, billing 24), test IDs 2301-2304, sets 2301-2304, state `AWSCCP`, 70% pass. 12/15/17/6 per test. Single-answer items; a new "IT certifications" hub group.
- **CompTIA A+** (220-1201/220-1202, `/comptia-a-plus/*`, landing `/comptia-a-plus-practice-test`): `data/comptia-aplus-questions.json` (200 questions across the 9 domains: mobile 12, networking 24, hardware 24, cloud 12, hw troubleshooting 28, OS 28, security 28, sw troubleshooting 24, operational 20), test IDs 2401-2404, sets 2401-2404, state `APLUS`, 70% pass. 3/6/6/3/7/7/7/6/5 per test (25 per core).
- **Food Handler** (food handler card, `/food-handler/*`, landing `/food-handler-practice-test`): `data/food-handler-questions.json` (200 questions: basics 40, hygiene 40, contamination/allergens 40, time/temperature 48, cleaning 32), test IDs 2501-2504, sets 2501-2504, state `FOODHANDLER`, 75% pass. 10/10/10/12/8 per test. FDA Food Code figures; no provider named in questions; state card rules are "varies".
- **Boating** (boater safety certificate, `/boating/*`, landing `/boating-license-practice-test`): `data/boating-questions.json` (200 questions: basics 32, equipment 40, navigation 48, operation 48, emergencies 32), test IDs 2601-2604, sets 2601-2605, state `BOATING`, 80% pass. 8/10/12/12/8 per test. NASBLA standards and federal rules only; state ages and PWC rules are "varies". New hub group "Outdoor & recreation licenses".
- **Hunter Safety** (hunter education, `/hunter-safety/*`, landing `/hunter-safety-practice-test`): `data/hunter-questions.json` (200 questions: firearm safety 60, firearms/ammo 32, techniques 32, wildlife 32, ethics/laws 24, survival 20), test IDs 2701-2704, sets 2701-2705, state `HUNTER`, 80% pass. 15/8/8/8/6/5 per test. IHEA standards only; state rules are "varies".
- **Security+** (CompTIA SY0-701, `/comptia-security-plus/*`, landing `/comptia-security-plus-practice-test`): `data/comptia-secplus-questions.json` (200 questions: concepts 24, threats 44, architecture 36, operations 56, governance 40), test IDs 2801-2804, sets 2801-2805, state `SECPLUS`, 83% pass (750 of 900). 6/11/9/14/10 per test.
- **HESI A2** (nursing admission assessment, `/hesi/*`, landing `/hesi-a2-practice-test`): `data/hesi-questions.json` (200 questions: math 36, reading 32 with embedded passages, vocabulary 32, grammar 32, biology 24, chemistry 20, A&P 24), test IDs 2901-2904, sets 2901-2904, state `HESI`, 75% pass. 9/8/8/8/6/5/6 per test. Reading stems run up to 130 words. No physics.
- **ASVAB** (military entrance, `/asvab/*`, landing `/asvab-practice-test`): `data/asvab-questions.json` (200 questions across the 8 written subtests: general science 20, arithmetic reasoning 36, word knowledge 36, paragraph comprehension 28, math knowledge 36, electronics 16, auto/shop 16, mechanical 12), test IDs 3001-3004, sets 3001-3004, state `ASVAB`, 70% pass (no official pass mark; AFQT minimums vary by branch). 5/9/9/7/9/4/4/3 per test, weighted toward the AFQT. Assembling Objects omitted (figures). Hub group "College, military & nursing school entrance".
- **CPR** (CPR, AED and first aid written exam, `/cpr/*`, landing `/cpr-practice-test`): `data/cpr-questions.json` (200 questions: basics 32, adult CPR/AED 48, child/infant 40, choking 24, first aid 56), test IDs 3101-3104, sets 3101-3104, state `CPR`, 84% pass. 8/12/10/6/14 per test. Current AHA/ILCOR guidelines; no provider named in stems. Hub group "Emergency services".
- **OSHA 10** (Outreach course final, `/osha-10/*`, landing `/osha-10-practice-test`): `data/osha-questions.json` (200 questions: intro/rights 32, falls 36, electrical 28, struck-by/caught-in 28, HazCom/PPE 40, health/tools/fire 36), test IDs 3201-3204, sets 3201-3205, state `OSHA`, 70% pass. 8/9/7/7/10/9 per test. Construction and general industry figures both stated. New hub group "Workplace & job certifications" (also holds food handler).
- **Forklift** (operator written evaluation, `/forklift/*`, landing `/forklift-certification-practice-test`): `data/forklift-questions.json` (200 questions: basics 40, stability 48, inspection 32, operation 48, loads 32), test IDs 3301-3304, sets 3301-3304, state `FORKLIFT`, 75% pass. 10/12/8/12/8 per test. OSHA 1910.178 and ANSI B56.1 only.
- **Alcohol Server** (responsible beverage service exam, `/alcohol-server/*`, landing `/alcohol-server-practice-test`): `data/alcohol-server-questions.json` (200 questions: effects 44, intoxication 40, IDs 40, intervention 40, law 36), test IDs 3401-3404, sets 3401-3404, state `ALCOHOL`, 70% pass. 11/10/10/10/9 per test. No provider named; 21 and 0.08 national, all else "varies by state".
- **ACCUPLACER** (Next-Generation placement test, `/accuplacer/*`, landing `/accuplacer-practice-test`): `data/accuplacer-questions.json` (200 questions: reading 52 with embedded passages, writing 48, arithmetic 40, QAS 40, AAF 20), test IDs 3501-3504, sets 3501-3504, state `ACCUPLACER`, 70% pass (placement marker, not an official pass). 13/12/10/10/5 per test. WritePlacer essay excluded.
- **Security Guard** (unarmed guard card exam, `/security-guard/*`, landing `/security-guard-practice-test`): `data/security-guard-questions.json` (200 questions: role 32, legal 44, observation 40, reports 32, emergency 36, safety 16), test IDs 3601-3604, sets 3601-3604, state `SECGUARD`, 70% pass. 8/11/10/8/9/4 per test. Universal portion only; hours and powers "vary by state". Exam id `security` (distinct from `secplus`).
- **Lifeguard** (certification written exam, `/lifeguard/*`, landing `/lifeguard-practice-test`): `data/lifeguard-questions.json` (200 questions: professional/surveillance 40, recognition 32, rescue 48, care 48, facility 32), test IDs 3701-3704, sets 3701-3704, state `LIFEGUARD`, 80% pass. 10/8/12/12/8 per test. No provider named. Hub group "Outdoor & recreation licenses".
- **P&C Insurance** (property and casualty producer exam, general portion, `/property-casualty-insurance/*`, landing `/property-casualty-insurance-practice-test`): `data/property-casualty-questions.json` (200 questions: general 28, policy 28, homeowners 36, auto 36, commercial 32, liability 24, other 16), test IDs 3801-3804, sets 3801-3804, state `PNC`, 70% pass. 7/7/9/9/8/6/4 per test. Never state law.
- **HTL** (ASCP Histotechnologist, `/htl/*`, landing `/htl-practice-test`, `/htl` redirects there): `data/htl-questions.json`, test IDs 201-204, sets 201-205, state `HTL`. 18 staining, 10 fixation, 10 embedding/microtomy, 7 processing, 5 lab operations per test (ASCP BOC guideline rev. Sept 2025).
- **CST** (NBSTSA Surgical Technologist, `/cst/*`, landing `/cst-practice-test`): `data/cst-questions.json`, test IDs 301-304, sets 301-305, state `CST`. 6 preop, 23 intraop, 3 postop, 2 admin, 5 equipment sterilization, 6 A&P, 2 micro, 3 pharm per test (NBSTSA 2023 outline scaled from 150 items).
- **CRCST** (HSPA Sterile Processing, `/crcst/*`, landing `/crcst-practice-test`, also covers CBSPD CSPDT): `data/crcst-questions.json`, test IDs 401-404, sets 401-406, state `CRCST`. 7 departmental, 11 decontamination, 10 prep/packaging, 11 sterilization, 5 storage/inventory, 2 patient equipment, 4 professional per test (HSPA outline rev. Nov 2023).

To add an exam: add an `ExamConfig` to `lib/exams.ts`, a bank to `lib/examData.ts`, a `[data-theme]` block in `app/globals.css`, the category keys to `types/index.ts` and `i18n/*.ts`, and the `app/<slug>/` wrappers and landing. Every blueprint count times `testCount` must fit inside that category's pool.

### v2 exams (SAT and the other sectioned, timed exams)

`lib/v2/`, `components/v2/`, `store/useV2Store.ts`, `data/v2/` and `app/sat/` are a second engine that shares nothing with the v1 flow above (no `useStore`, no `lib/exams.ts`, no `QuestionCard`). It exists for exams the v1 shape cannot express: sections and modules with a clock, free navigation with flagging, passages beside the question, KaTeX, figures, multi-select and numeric (student-produced) answers, adaptive module 2, scaled scores.
- **Question model** is `QuestionV2` in `lib/v2/types.ts`, documented with examples in `data/v2/SCHEMA.md`. Banks are JSON arrays tagged by `section`, `test`, `module` and optional `variant` (`lower`/`upper` for adaptive module 2); the test builder in `lib/v2/session.ts` filters on those tags, so adding a test is content only. Rich text (`components/v2/RichText.tsx`) handles `$...$` KaTeX, bold, italic, `__underline__`, bullets and pipe tables. Figures are SVG files under `public/figures/<exam>/`.
- **Exam config** is `ExamV2Config` (`lib/v2/exams/sat.ts`, registered in `lib/v2/registry.ts`): sections, modules with time limits, calculator and reference sheet, a raw-to-scaled curve per section (`curve()` anchors, an estimate, not an official table), a composite, drills by domain, goal choices.
- **Two modes, two devices.** `ExamRunner` is the desktop simulation (full-screen, timed, review screen, break, keyboard shortcuts A-E and arrows, calculator and reference panels) and also works on phones with a fixed bottom bar. `DrillRunner` is the phone-first mastery drill (one tap checks, misses come back until mastered, same mechanics as v1 training sets). Both use `QuestionView` and go full-screen via `.v2-focus` so site chrome never competes with the question.
- **Store** `useV2Store` persists to localStorage under `tigertest-v2` (sessions, results, drills, goals). It is not yet synced to Firestore; when adding sync, mirror the object under a `v2` field on the user document rather than touching `useStore`.
- **SAT** (`/sat`, not yet linked from the catalog or indexed): `data/v2/sat/{rw,ma}-m{1,2}.json`, 98 original items for Practice Test 1 (R&W 27 + 27 in 32 min modules, Math 22 + 22 in 35 min modules with 6 numeric items each). Module 2 is adaptive in the engine; the seed test ships one module 2 per section, so add `variant` tagged items to turn it on.
- To add a v2 exam: an `ExamV2Config` in `lib/v2/exams/`, register it, add the bank import in `lib/v2/bank.ts`, and `app/<slug>/` wrappers copied from `app/sat/`.

### SEO conventions

- **Landing pages** (`app/<x>-practice-test/page.tsx`) are the only exam URLs meant to rank. Each sets its own metadata (title, description, canonical, Open Graph image at `/og/<examId>` from `app/og/[examId]/route.tsx`) and a `WebApplication` + `FAQPage` JSON-LD graph, renders `<ExamLandingBreadcrumbs examId>` right after it (visible crumb + `BreadcrumbList`, parent is `/tests`) and `<ExamRelatedTests examId>` before the final CTA (cross-links within the exam's hub group from `relatedTests()` in `lib/testCatalog.ts`). Write metadata and JSON-LD strings with plain apostrophes; `&apos;` only belongs in JSX text.
- **App routes** (`app/<slug>/layout.tsx`) export `examAppMetadata(id)` from `lib/examSeo.ts`: the exam's own title and `noindex, follow`. They are deliberately not disallowed in `app/robots.ts` so crawlers can read the tag. DMV app routes keep their robots.txt disallow.
- **Footer** links stay inside the current test's cluster (`relatedTests`): DMV pages link to CDL, endorsements and motorcycle plus the `/tests` hub, never all thirty exams.
- **Sitemap** is an index (`app/sitemap.xml/route.ts`) over per-family files in `app/sitemaps/[segment]/route.ts` (`dmv`, `dmv-es-vi-ko`, `exams`, `schools`) built by `lib/sitemaps.ts`, so Search Console shows DMV coverage separately. `lastmod` comes from the hand-bumped dates in `lib/seoDates.ts`; bump the relevant constant when a page family's content changes.

These pages are the DMV flow, not the CDL one: `lib/examRoutes.ts` (`DMV_ROUTES` / `getExamRoutes(id)`) parameterises the shared pieces (`hooks/useTestResults.ts`, `components/results/*`, `components/MissDrill.tsx`, `components/dashboard/ProgressCard.tsx`, `lib/missedQuestions.ts`, `components/AttemptChart.tsx`) by route base, test IDs, pass line, and premium gating. Defaults reproduce DMV behaviour exactly; when changing the DMV results/drill/dashboard flow, keep every exam working.

Theme colors come from the `[data-theme="<examId>"]` blocks in `app/globals.css`; `contexts/TestThemeContext.tsx` and `components/HeaderSwitch.tsx` pick the header by path.

### Mobile Apps

`/mobile/` contains a Capacitor 8 shell (app id `io.tigertest.app`) that loads
the production site in a native WebView for iOS and Android. The site detects
the shell via a `TigerTestApp` user-agent token (`lib/native-app.ts`,
`hooks/useIsNativeApp.ts`) and hides Google Sign-In and Stripe checkout
(store-policy compliance) and applies safe-area CSS. After changing
`mobile/capacitor.config.ts`, run `npx cap sync` in `/mobile` and commit the
result. Store submission guide: `docs/APP_STORE_DEPLOYMENT.md`.

### Agentic Question Rewrite System

`/agentic-rewrite/` contains a multi-agent pipeline for generating and validating questions. A supervisor agent orchestrates generators and four validator agents (distribution, memorization, format, answer-length) with a fixer agent for corrections. State question files live in `/agentic-rewrite/states/`.

## Environment Variables

```
RESEND_API_KEY                  # Email sending (Resend)
FIREBASE_SERVICE_ACCOUNT_KEY    # Server-side Firebase admin SDK (JSON)
NEXT_PUBLIC_SITE_URL            # Site URL for metadata
CRON_SECRET                     # Bearer token for /api/cron/* and /api/indexnow/ping
INDEXNOW_KEY                    # 8–128 char hex key for IndexNow (Bing) submissions
```
