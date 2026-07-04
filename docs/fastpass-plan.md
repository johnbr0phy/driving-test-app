# TigerTest FastPass — Plan

Reposition premium from "more content" to "pass fast." Rename Premium → **TigerTest FastPass**, sharpen who it's for, and add the killer feature: **skip what everyone gets right, drill what everyone gets wrong.**

## Do we know which questions everyone gets right/wrong? (Yes — mostly)

We already have the data pipeline:

- Every training answer is appended to `trainingAnswerHistory` in the Zustand store (`store/useStore.ts:392,452`) and synced to Firestore per user.
- A daily cron (`app/api/cron/aggregate-stats/route.ts`, 03:00 UTC) aggregates that history across all real users (test accounts filtered out), computes per-question correct/wrong counts, and writes the **top 20 most-missed universal questions** (min 5 attempts) to `globalStats/wrongQuestions`.
- `/api/community-stats` serves that doc; `/stats` renders it via `CommunityWrongQuestions` (first 2 free, rest paywalled).

**Gaps to close for FastPass:**

1. **"Everyone gets right" is computed but thrown away.** The cron builds full per-question counts, then keeps only the 20 worst. We just need to persist the whole difficulty table.
2. **Universal questions only.** The cron skips anything not prefixed `U-`, so state-specific questions have no community difficulty. Fix: aggregate them too (they'll have thinner data — handle with a fallback).
3. **Training answers only.** Practice-test answers live in `completedTests` but are never recorded per-question, so difficulty data is blind to test-mode performance. Optional fix: also mine `completedTests` in the cron (question IDs + correctness are recoverable from stored sessions).
4. **Top-20 cap.** FastPass needs the full ranked list to build a study deck, not a leaderboard.

## Phase 1 — Data: full difficulty table

Extend `aggregate-stats` cron (no new cron needed):

- Compute counts for **all** questions (universal + state-specific), optionally folding in `completedTests` answers.
- Write a second doc `globalStats/questionDifficulty`: `{ [questionId]: { total, errorRate } }` for every question with ≥ N attempts (start N=10 for universal, N=5 for state-specific; tune once we see volume in the admin dashboard).
- Keep writing `wrongQuestions` unchanged (stats page keeps working).
- Serve via a new lean endpoint `/api/question-difficulty` (or extend `/api/community-stats`), cached — it's one doc read.

Classification (client-side, from the table):
- **"Gimme"** — errorRate ≤ ~10% with enough attempts → skippable.
- **"Hard"** — errorRate ≥ ~35% → FastPass deck material.
- **No data** — treat as normal (never skip a question we know nothing about).

## Phase 2 — Feature: FastPass Focus mode

The core value: a training mode that serves **only hard questions**.

- New deck builder in `lib/testGenerator.ts` (or a sibling `lib/fastpass.ts`): take the user's state question pool, rank by community errorRate, drop gimmes, and prepend the user's own wrong-queue (personal misses always outrank community stats).
- Route: `/training?mode=focus` reusing the existing training UI + mastery/wrong-queue mechanics — no new question UI needed.
- Dashboard: a FastPass card above the 4 training sets — "Focus Mode: the N questions people actually fail" — locked for free users, opens the paywall on tap.
- Gate: behind `hasPremiumAccess()` like sets 3–4. Free teaser stays: 2 visible community wrong-questions on `/stats` plus the existing daily missed-question strip.

## Phase 3 — Rebrand: Premium → TigerTest FastPass

Internal field names (`subscription.isPremium`, `hasPremiumAccess`, Stripe env vars) stay — this is a copy/positioning rename, not a data migration.

Surfaces to update:
- `i18n/en.ts` + `i18n/es.ts` — all `paywall.*`, `common.premium`, dashboard/test/stats premium strings.
- `components/PaywallModal.tsx` + benefits list — lead with speed: "Skip the 100+ questions everyone gets right. Drill the ones people fail."
- `components/PremiumBadge.tsx` → FastPass badge.
- `lib/stripe.ts` `PREMIUM_PRODUCT` name/description (checkout line item).
- `lib/email-templates.ts` + `app/api/cron/upgrade-pitch/route.ts` — upgrade email copy.
- Landing page (`app/page.tsx`) and rotating test-header CTAs (`i18n` `ctas`).
- Price stays $9.99 one-time unless we decide otherwise.

New paywall framing — who it's for:
- "Test this week? You don't have time for 200 questions."
- Failed once / retakers: "Cheaper than a retest" already lands — keep it.
- Benefits pivot from content quantity to time saved: "Focus Mode: only the questions people fail" / "Skip what everyone gets right" / "See your weak spots" / plus the existing unlocks (Sets 3–4, Test 4).

## Phase 4 — Rollout & verification

1. Ship Phase 1, run the cron manually (`CRON_SECRET` bearer), sanity-check `questionDifficulty` coverage in the admin dashboard (how many questions clear the attempt threshold, per state).
2. Ship Phases 2–3 together (feature + rename in one release so the paywall promise matches reality).
3. `npm run build` + `npm run lint` (no test framework exists); manually drive: paywall → Stripe test checkout → Focus mode unlock; guest → signup conversion path.
4. Watch `trackPaywallHit` analytics (`/api/analytics/paywall`) for conversion delta between old and new framing.

## Open decisions

1. **Hard threshold:** fixed errorRate cutoff (≥35%) vs. top-N per state (e.g. worst 75)? Top-N gives a predictable deck size for marketing copy ("the 75 questions people fail").
2. **Count test answers in community stats,** or keep training-only? (More data vs. slightly different answer conditions — options are shuffled in tests.)
3. **Name check:** "FastPass" has Disney associations — fine with it, or prefer e.g. "Fast Track"? Assuming FastPass per the brief.
4. **Does Focus Mode replace Sets 3–4 as the headline benefit,** or sit alongside them? (Plan assumes alongside — nothing is taken away.)
5. **Stripe product rename:** update the display name on the existing product, or create a new product? (Plan assumes rename-in-place; past receipts keep old name.)
