# CLAUDE.md

Guidance for Claude Code in this repo. This file holds the rules and the map. Details live in two places, read only what the task needs:

- **`docs/claude/<topic>.md`**: how each part of the system works (table below). Read the topic file before changing that area, and update it in the same PR when behavior changes.
- **`docs/exams/<examId>.md`**: one file per exam (format, pools, blueprint, IDs, sources, theme, mascot, quirks). Find one with `ls docs/exams | grep <word>` or `grep -ril "<name>" docs/exams`. Shared notes for groups of exams are in `docs/exams/_batches.md`. A new exam gets a new file here, never a paragraph in this file.

Keep this file short (under about 40 KB). Add a rule here only if it applies across the codebase; everything else goes in a topic or exam file.

| Topic file | Covers |
|---|---|
| `store.md` | Compact test history, queued saves, sync risks |
| `homepage-and-countries.md` | `/` search homepage, country homepages, regions, middleware, trending searches, search analytics |
| `dmv.md` | DMV routes and languages, URL shapes, guest save card, sign-up and share prompts, Super Amazing Mode |
| `v1-engine.md` | Registry exams (`lib/exams.ts`): banks, tests, topic sets, parts, shared routes and the route budget, state variants, translated and native-language exams, how to add an exam |
| `v2-engine.md` | Sectioned, timed exams (`lib/v2/`): question model, formats, runners, store and sync, dashboard, drills, Basics, walkthroughs and explainers, moving v1 to v2, how to add a v2 exam |
| `premium.md` | Premium gating (v1 locks, v2 Premium list, mocks), local prices, guest checkout, Common Mistakes |
| `classes-quizzes-mcp.md` | Instructor classes, quizzes, the MCP server and its study tools |
| `admin.md` | `/admin` tabs, caching, funnel, conversion, enrollments, internal-account and bot filtering |
| `question-quality.md` | CI bank checks, reports, pick statistics, flags, freshness, source watch, Claude audit, search gaps, build tests, exam upkeep, watchdog, owner digest |
| `seo.md` | Landings, topic/state/most-missed/teacher pages, JSON-LD, sitemaps, IndexNow, GEO, try-one-now |
| `ui.md` | Site header, focus bar, footer, logo, themes, Stageshow demos, interface vs test language, dark mode |
| `privacy.md` | Consent, GA and Vercel Analytics rules, children's tests, account deletion |
| `email.md` | Email link rules, Resend, campaigns, crons, opt-out, blocked domains |

## Commands

```bash
npm run dev       # Next.js dev server
npm run build     # Production build
npm run lint      # ESLint (next/core-web-vitals)
npm run typecheck # tsc --noEmit
npm test          # node:test suite, tests/*.test.cjs (uses tsx to load TS)
```

`.github/workflows/checks.yml` runs typecheck, lint, `npm test`, `scripts/build-training-parts.ts --check` and `scripts/review-question-banks.py` on every PR and push to main. Vercel preview deploys are off, so the production build on main is the first build (Vercel keeps the last good deploy if it fails), and that build skips typecheck and lint. Run `npm test` before pushing. When a test asserts on source text that a deliberate change moved, update the test to the new contract; never delete it. `scripts/automerge-checks.sh` is the one list of checks the self-merging bots run: add to it when adding a blocking check.

## Product and stack

**Tigertest** (always "Tigertest" in copy and the logo; never TigerTest or tigertest, except in URLs, keys and the `TigerTestApp` user-agent token) is a practice test site: the US DMV permit test for 50 states + DC, plus several hundred other exams in many countries and languages.

- Next.js 15 App Router, React 19, TypeScript. Tailwind + shadcn/ui (Radix) in `components/ui/`. Path alias `@/*` = repo root.
- Zustand store `store/useStore.ts` (localStorage + Firestore `users/{uid}` sync) for the DMV and v1 exams; `store/useV2Store.ts` for v2 exams; `store/useQuizStore.ts` for quizzes.
- Firebase Auth (email/password + Google, `contexts/AuthContext.tsx`), Firestore, Resend for email, Stripe for Premium.
- Guest mode works everywhere; guest data converts on signup.

### Three exam engines

1. **DMV** (`data/questions.json` and `questions_<lang>.json`, ~2,200 questions, `Universal` or `State-Specific`). `lib/testGenerator.ts` is deterministic: test N takes universal `[(N-1)*40 .. N*40-1]` + state-specific `[(N-1)*10 .. N*10-1]`, 50 a test, 4 tests and 4 training sets of 50 per state. Dashboard `/dmv/dashboard`, routes `/test/<n>`, `/practice/<n>`. Every state needs at least 40 state-specific questions.
2. **v1 registry exams** (`lib/exams.ts`, `ExamConfig`; banks `data/*-questions.json` registered by `lib/banks/<examId>.ts`): blueprint-weighted tests, topic-named training sets with mastery and a wrong-answer queue. See `docs/claude/v1-engine.md`.
3. **v2 exams** (`lib/v2/`, `ExamV2Config`, banks `data/v2/<id>/`): sections, modules, clocks, rich formats, scaled scores, drills with Basics. Shares nothing with v1. See `docs/claude/v2-engine.md`.

Shared mechanics: answer options are shuffled every time a question is shown (`lib/shuffleOptions.ts`, skipped for position-dependent answers like "A and B"; each language needs its wording there). Fresh training questions are asked mixed, not in ID order (`lib/trainingOrder.ts`); set and part contents stay in ID order.

### URLs

One shape for every exam: `/<exam>/dashboard`, `/<exam>/practice/<n>`, `/<exam>/test/<n>`, `/<exam>/test/<n>/results` (numbered from 1, never the store ID), plus `/<exam>/stats`. URLs come only from `getExamRoutes()` / `DMV_ROUTES` (`lib/examRoutes.ts`) and `v2Routes()` (`lib/v2/registry.ts`). Test, results and practice pages for every v1 and v2 exam are the shared `app/[slug]/...` routes: **never add `test/[id]`, `test/[id]/results` or `practice/[n]` under an exam's own folder** (Vercel's 2,048-route limit; `tests/route-budget.test.cjs`). Landings (`app/<x>-practice-test/`) are the only exam URLs meant to rank; app routes export `examAppMetadata(id)` (noindex, follow).

## Rules that apply everywhere

**Writing and copy**
- No em dashes anywhere in copy, code comments, commits or PRs.
- Plain apostrophes in metadata and JSON-LD strings; `&apos;` only in JSX text.
- Exams with Premium steps: say "Start for free" / "free to start", never that everything is free. Landing hero subtitles end "Free to start, no account needed." Page titles keep "Free ... Practice Test". Only the free v2 exams (school and children's tests) may say everything is free.
- Premium copy says what it adds (more questions, tests, timed mocks, full stats) and never promises a pass or readiness. No readiness verdicts anywhere.
- Never state a fee, figure or percentile that is not from an official source or live data. Real exam costs live only in `lib/examCosts.json`, each from the official site.
- Machine-translated and model-written copy and banks are final: no human review is planned; never hold work back or flag it for review.

**Questions and banks**
- Original questions only: never copy an official bank, sample paper, past paper or commercial prep.
- Edit an exam's sources under `tools/` and rebuild; never hand-edit only the built JSON. Fix a key in every translated bank too.
- After changing a v1 bank or a set's categories run `npx tsx scripts/build-training-parts.ts` (CI runs `--check`). After a v2 bank change run `tools/validate_v2_bank.py` (it writes `lib/v2/bankSizes.ts`).
- Bank style checks are blocking and their baselines only shrink: answer patterns, option reuse, stem length, option references by position, house-style validators (see `question-quality.md`).
- No person reviews questions. Every finding, report, flag, source change and exam update is settled by an automated run that fixes, double-checks and merges, or keeps the question. Never add a step that waits for John to judge a question. Changes to a question need an official source read and recorded, dated, in that exam's `sources.md`.
- Every dashboard must stay completable: every training set needs at least its `size` unique questions.

**Premium and money**
- Premium is one purchase (US $9.99, local prices elsewhere, `lib/pricing.ts`). v1 exams lock the last 25% of dashboard steps (`lib/examLocks.ts`). v2 exams are free unless listed in `PREMIUM_V2_IDS`; never sell school, college-entrance or children's tests. Steps a person already started stay open; class students of that exam are never locked.
- Email Premium only after an action the person took (paywall follow-up). No unprompted upsells.
- Revenue figures in /admin are always US cents via `paymentNetUsdCents()`.

**Data and analytics**
- Never filter or rewrite stored test sessions one by one on the server; server code reading questions from anything but a test's latest attempt calls `expandCompletedTests()` first (`docs/claude/store.md`).
- Internal accounts, test browsers (non-tigertest.io hosts, Claude's browser, webdriver), analytics-declined browsers and bots never count in /admin or the anonymous counters.
- GA is off on children's tests (`CHILD_PATH_PREFIXES` in `lib/privacyRegion.ts`) and for class or quiz members; add a new primary or middle-school exam there. When a feature collects new data or adds a processor, update `/privacy` and its date.
- Every new admin list uses `useTopN` + `ShowAllButton`; every admin GET route uses `requireAdmin()` and `cachedAdminPayload()`.

**URLs and email**
- Build absolute URLs on `SITE_URL` from `lib/siteUrl.ts` (www host). Emails always use full `https://www.tigertest.io/<path>` links. Never put a link in a Gmail draft made through the Gmail connector (it rewrites links); give John paste-ready text instead.
- Adding a campaign cron: bump `CAMPAIGN_CRON_COUNT` (`lib/email-quota.ts`). Every scheduled job leaves a heartbeat the watchdog can read.

**Components and themes**
- Wrappers stay thin: a change one exam needs goes in the shared `components/exam/*` or `components/v2/*` piece or a config field, so every exam keeps the same dashboard, results and landing. Quiz dashboards have their own hero (`QuizHome`); mirror dashboard hero changes there.
- New `[data-theme]` blocks: within 8 degrees of another hue, differ by 15+ points of saturation or 8+ of lightness, and pass white-text contrast. Re-run `tools/gen_dark_brand_css.py` after adding one; run `tools/add_dark_variants.py` after adding pages with hardcoded palette classes.
- Interface language is the person's; a test's own pages run in the test's language (`docs/claude/ui.md`). Never machine-translate a bank just to offer a language.

**Git and PRs**
- Self-merging bots (source triage, question audit, exam upkeep, alias-only search gaps) merge only after their checks pass; new tests always wait for John.
- Do not include any model identifier in commits, PRs, code comments or pushed files.

## Adding things

- **A v1 exam**: follow the `exam-bank` skill (`.claude/skills/exam-bank/references/wiring.md` is the full checklist) and `docs/claude/v1-engine.md`.
- **A v2 exam**: `docs/claude/v2-engine.md` ("To add a v2 exam") and the same skill.
- **Either**: write `docs/exams/<examId>.md` (what the exam is, official format and pass mark, pools and per-test blueprint, IDs, state code, prefix, sources path, build command, theme, mascot, region and hub group, what is not modelled), add `lib/examFacts.ts`, the catalog entry, theme, sitemap and llms.txt lines, and bump `lib/landingDates.json` via `scripts/build-landing-dates.ts`.
- **Running many builds**: `/build-tests` (`.claude/skills/build-tests/SKILL.md`).

## Mobile apps

`mobile/` is a Capacitor 8 shell (app id `io.tigertest.app`) loading the production site. The site detects it via the `TigerTestApp` user-agent token (`lib/native-app.ts`, `hooks/useIsNativeApp.ts`) and hides Google Sign-In and Stripe checkout. After changing `mobile/capacitor.config.ts`, run `npx cap sync` in `mobile/` and commit. Store guide: `docs/APP_STORE_DEPLOYMENT.md`.

`agentic-rewrite/` is an older multi-agent pipeline for generating and validating DMV questions (supervisor, generators, four validators, fixer).

## Environment variables

```
RESEND_API_KEY                  # Email sending (Resend)
FIREBASE_SERVICE_ACCOUNT_KEY    # Server-side Firebase admin SDK (JSON)
NEXT_PUBLIC_SITE_URL            # Site URL for metadata
ANTHROPIC_API_KEY               # Claude API for the /admin daily update (cron skips when unset)
CRON_SECRET                     # Bearer token for /api/cron/* and /api/indexnow/ping
INDEXNOW_KEY                    # 8-128 char hex key for IndexNow (Bing)
EMAIL_REPLY_TO                  # Reply-To on campaign mail (default john@tigertest.io)
CRON_MAX_BATCH                  # Per-run campaign cap (default: daily budget / cron count)
NEW_TESTS_CAMPAIGN              # "send" turns on the SAT/ACT launch email; otherwise paused (dry-run count)
EXIT_QUESTION_CAMPAIGN          # "send" turns on /api/cron/exit-question; otherwise paused
TOP_PREPPER_CAMPAIGN            # "send" turns on /api/cron/top-prepper; otherwise paused
NEW_TESTS_WINNER                # Optional launch-email variant id (v4 or v5)
QUIZZES_CAMPAIGN                # "send" turns on /api/cron/quizzes-launch; otherwise paused
MCP_TOKEN_SECRET                # HS256 key for MCP access tokens (rotating logs every client out)
EMAIL_POSTAL_ADDRESS            # Postal address in marketing email footers (CAN-SPAM)
MCP_OAUTH_ISSUER_URL            # Public site URL: MCP JWT issuer and base of tool links
RESEND_WEBHOOK_SECRET           # Signing secret of the Resend webhook (/api/webhooks/resend)
GITHUB_TOKEN                    # Optional: lifts GitHub rate limits for the Monday owner digest
```
