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
