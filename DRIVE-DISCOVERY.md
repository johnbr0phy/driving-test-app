# Drive the Question: discovery

What I learned about the repo before writing code. Read-only: nothing here touched production data.

## Stack

- Next.js 15 App Router, React 19, TypeScript, Tailwind, shadcn/ui. Path alias `@/*` is the repo root. There was no `src/` folder; `src/drive/` is new.
- State: one Zustand store (`store/useStore.ts`), persisted to localStorage and synced to Firestore `users/{uid}`.
- Tests: `node --test tests/*.test.cjs`, with `tsx/cjs` loading TS and ESM source. Lint is `next lint`. CI runs typecheck, lint, tests.
- No 3D library was installed. `three` (0.170.0, exact) is the one new dependency.

## Question data

- `data/questions.json`: 2,200 DMV questions. 160 are `Universal` (`U-001`..`U-160`, served in every state and DC) and 2,040 are `State-Specific` (40 per state).
- Fields: `questionId`, `state`, `category`, `question`, `optionA..D`, `correctAnswer` (letter), `correctIndex`, `explanation`. No handbook citation is stored on a question.
- `lib/testGenerator.ts` gives each of a state's 4 tests 40 universal and 10 state questions, so every universal question is asked in all 51 jurisdictions.

## Where answer results live

- Per user: `users/{uid}` in Firestore (training answers, finished tests). Not readable from this session and not needed.
- Aggregated: the nightly cron `/api/cron/aggregate-stats` writes `globalStats/wrongQuestions` for the DMV: the 50 universal questions with the most wrong answers, each with `wrong`, `total` and `errorRate`, plus `totalUsers`.
- That aggregate is served publicly, read-only and CDN-cached, by `GET /api/community-stats` (it feeds the Common Mistakes tab). I read it once from `https://www.tigertest.io/api/community-stats` on 2026-11-11: 50 questions, 5,505 accounts, updated 2026-11-11T03:01Z. Every one of the 50 has between 1,883 and 5,409 answers, so the 200-answer floor is met.
- Limits of that source, which shape the picks: only universal questions are aggregated (state-specific questions have no public counts), and only the top 50 by wrong answers are kept. The other 110 universal questions each have fewer than 438 wrong answers.
- `questionPicks/{examId}` (per-option pick counts, since Nov 3 2026) would add which wrong option people choose. It needs a Firestore credential, which this session does not have.

## How a question page renders

- Training: `app/training/page.tsx` renders `components/TrainingCard.tsx` (question, shuffled options, then the explanation box and Report link).
- Test results: `app/test/[id]/results` renders `components/results/ResultsDebriefBody.tsx`, which lists missed questions as re-answerable `QuizRow`s with the explanation under each.
- Miss drill: `components/MissDrill.tsx`, same row pattern.
- These three are where "Drive this question" was added (`components/drive/DriveLink.tsx`).
- The site header (`components/SiteHeader.tsx`) hides itself on "runner" paths. Drive pages are not runner paths; the scene scrolls itself to fill the screen when it starts.

## How analytics events fire

- GA4 through `window.gtag?.("event", name, params)` (see `lib/analytics.ts`: `state_selected`, `paywall_hit`, `stats_entry`...).
- Consent is handled before gtag: `ANALYTICS_INIT_SCRIPT` and `components/AnalyticsConsent.tsx` set GA's kill switch by country, cookie choice and children's-test paths. Anything sent through `window.gtag` inherits that.
- Some counters are also written to Firestore through `/api/analytics/*`. Drive v1 does not add one: no production writes.

## Other things that mattered

- No feature-flag system existed. `src/drive/flag.js` is the first one.
- `app/[slug]/...` is a catch-all for exam routes; a static `app/drive/` folder wins over it.
- Copy rules from CLAUDE.md: "Tigertest" spelling, no em dashes, `SITE_URL` for canonicals, the Premium paywall is untouched.
- Dark mode is class-based; new components carry `dark:` companions.
