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
- **HTL** (ASCP Histotechnologist, `/htl`): `data/htl-questions.json`, test IDs 201-204, sets 201-205, state `HTL`. 18 staining, 10 fixation, 10 embedding/microtomy, 7 processing, 5 lab operations per test (ASCP BOC guideline rev. Sept 2025).
- **CST** (NBSTSA Surgical Technologist, `/cst`): `data/cst-questions.json`, test IDs 301-304, sets 301-305, state `CST`. 6 preop, 23 intraop, 3 postop, 2 admin, 5 equipment sterilization, 6 A&P, 2 micro, 3 pharm per test (NBSTSA 2023 outline scaled from 150 items).
- **CRCST** (HSPA Sterile Processing, `/crcst`, also covers CBSPD CSPDT): `data/crcst-questions.json`, test IDs 401-404, sets 401-406, state `CRCST`. 7 departmental, 11 decontamination, 10 prep/packaging, 11 sterilization, 5 storage/inventory, 2 patient equipment, 4 professional per test (HSPA outline rev. Nov 2023).

To add an exam: add an `ExamConfig` to `lib/exams.ts`, a bank to `lib/examData.ts`, a `[data-theme]` block in `app/globals.css`, the category keys to `types/index.ts` and `i18n/*.ts`, and the `app/<slug>/` wrappers and landing. Every blueprint count times `testCount` must fit inside that category's pool.

These pages are the DMV flow, not the CDL one: `lib/examRoutes.ts` (`DMV_ROUTES` / `getExamRoutes(id)`) parameterises the shared pieces (`hooks/useTestResults.ts`, `components/results/*`, `components/MissDrill.tsx`, `components/dashboard/ProgressCard.tsx`, `lib/missedQuestions.ts`, `components/AttemptChart.tsx`) by route base, test IDs, pass line, and premium gating. Defaults reproduce DMV behaviour exactly; when changing the DMV results/drill/dashboard flow, keep every exam working.

Theme colors come from `[data-theme="cdl"|"htl"|"cst"|"crcst"]` in `app/globals.css`; `contexts/TestThemeContext.tsx` and `components/HeaderSwitch.tsx` pick the header by path.

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
