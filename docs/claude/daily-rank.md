# Daily rank (Tiger Time)

Tells each person where they rank today by correct answers: "41 correct today. Top 14%." plus "3 more correct to pass the next 1,000 people." Added Nov 2026. It ran briefly as A/B test `dailyRank1` and was switched on for everyone on Nov 25 2026.

## Rules

- **What counts**: the first answer to each question in the person's local day, if it was right. Retries, repeats and wrong first answers never count. Speed never counts. Every engine (DMV, v1, v2, quizzes, Try one now) reports through `recordClassAnswerById` in `lib/classProgress.ts`, which calls `noteRankAnswer`.
- **Who**: a signed-in uid, or a guest's browser id (`lib/enrollment.ts getBrowserId`), hashed before storage. Internal accounts count like anyone else (John, Nov 25 2026: "I'm not going to fudge the numbers"). Test browsers (`isTestBrowser`: other hosts, automation, analytics declined) keep a local count and never sync; bots are never counted.
- **Day (Tiger Time)**: one day for everyone, midnight to midnight US Eastern time (`America/New_York`, daylight saving included; `tigerDay()`, `tigerTimeLeftMs()`). Everyone on the site is ranked against everyone else that day. The server decides the day; the browser's time zone is not used. The A/B test's next-day return still uses the person's own local day.
- **Abuse**: answers go through `grantAnswers` (`lib/server/answerRateLimit.ts`) on its own `'rank'` budget; anything over it is dropped and tallied in `analytics/dailyRank.rateLimited`. The server dedupes questions per person per day (cap 3,000) whatever the client sends.
- **Privacy**: responses carry only the caller's count, top percent, "N more" line and percentile cutoffs. Never a head count, a raw rank or anyone's identity. Cutoffs give the count needed for each percentile, which does not reveal how many people answered.
- **Copy**: `dailyRank.*` in every `i18n/*.ts`. "Top X%" is shown only for the top half (`RANK_SHOW_TOP_PERCENT_MAX`); below it the card shows the count and the "N more" line. Nothing shows until 1 correct today.

## Pieces

| File | What |
|---|---|
| `lib/dailyRank.ts` | Pure maths: local day, counter (`applyAnswers`), guest merge (`mergePeople`), histogram deltas, `topPercent`, `nextTarget`, `percentileCutoffs` |
| `lib/server/dailyRank.ts` | Firestore: `dailyRank/{day}/people/{id}` and `dailyRank/{day}/shards/{0..9}` (histogram), 15-minute in-memory distribution cache |
| `app/api/rank/today` | GET status, POST answers then status |
| `app/api/rank/merge` | At sign-in, moves today's guest day onto the account once |
| `lib/dailyRankClient.ts` | Browser store: queue, 4-second flush, live view, `useDailyRank()`, `mergeRankOnSignIn()` and `resetRankOnSignOut()` (both called from `AuthContext`; sign-out sends queued answers, then starts a fresh guest count so the chip goes, Nov 25 2026) |
| `components/DailyRank.tsx` | `DailyRankChip` (in `FocusBar` where a runner passes `rank`, never on practice tests; links to the test's stats page, `rankStatsHref`), `DailyRankCard` (DMV/v1 results, v1 set complete, v2 results, quiz results) and `DailyRankPanel` (top of every stats page: rank, the "N more" line, how to win, the countdown and one slim bar of how far up the field you are) |

## Chip to stats

The chip links to `<base>/stats` (the DMV's `/stats`), opening at the very top with the header in view (no `#today-rank` hash since Nov 27 2026; tapped on the stats page itself it scrolls to the top and refetches the rank), cutting the runner path at its `test`, `practice`, `drill` or `training` segment, so nested bases like `/real-estate/ca` work. From a runner it adds `?from=<runner path>`, and the stats page's Back link goes back there (`useRankReturnHref`, only a runner of that same stats page, else the dashboard), so a tap mid-question returns to that question (Nov 26 2026). Quizzes have no stats page, so they show no chip (Nov 25 2026) and keep their right slot. Stats pages need an account, so a guest who taps the chip lands on sign-up; their count carries over at sign-in.

## In the site header

Only where the header has a stats link to give it (since Nov 25 2026 it is never a plain label: not on the homepages, `/tests`, `/teach` or any page with no test, nor for a visitor the page shows no Your Stats link), so on test dashboards, landings and results but never runners, once the person has 1 correct answer today the chip takes the place of the Your Stats icon and links to the same stats page, and is hidden where the header has no stats link. It is `compact`: on phones just the trophy and the count (`1.2K` past 999), and the TESTS / TEACH gap tightens, so a guest's home header fits at 320px.

Colours (Nov 25 2026): the chip and the stats-page panel use the test's brand tokens (`bg-brand-light`, `text-brand-dark`, `border-brand-border-light`), not a fixed amber, so they match the test on screen in light and dark mode. v2 headers carry V2Shell's tokens (`v2-shell` class) so the header chip picks up the dark tints too.

## Tiger Time winner

- `app/api/cron/tiger-time` (daily 05:15 UTC, just after midnight Eastern) reads the finished day's top 200 counts (`topOfDay`) and writes `tigerTimeWinners/{day}` `{ uid, correct, reachedAt, at, emailed }` once and emails the winner a congratulations (`tigerTimeEmail` in `lib/email-templates.ts`: transactional, from John, no unsubscribe link, like the 1,000,000th-question email; in the account's language (`users/{uid}.language`, copy in `lib/tigerTimeEmailCopy.ts`, English when unset); skipped if the account unsubscribed; sent once, by `emailed` and the Resend idempotency key `tiger-time-<day>`): the signed-in account with the most correct answers, at least `TIGER_TIME_MIN_TO_WIN` (10), ties to whoever reached the count first (`reachedAt` on the person doc); guests cannot win (`pickTigerTimeWinner`); internal accounts can (John, Nov 25 2026). Each run also deletes rank days older than three days (`deleteOldDays`). `?day=` reruns a day: it never replaces a winner and retries an email that did not send. Every run writes `globalStats/tigerTime.updatedAt`, which the watchdog reads (`readJobHeartbeats`, 36 hours).
- No badge or trophy is shown on the site (decided Nov 25 2026); the email is the prize. Nobody else is told who won. Account deletion removes the winner records.
- The stats panel shows a live countdown to midnight Eastern ("Ends in 3:07:45"). Its "Continue practicing" button and "How it works" link (with the prize line) were removed (Nov 26 2026).
- Copy outside English says "New York time", which reads more clearly than "Eastern time" abroad.
- Guests see "Sign in to keep your rank and win Tiger Time": only accounts can win.

## Where the chip shows

`FocusBar` takes a `rank` prop; without it there is no chip.

- **Never on practice tests or mocks** (DMV `/test/<n>`, every exam's `ExamTestPage`, quiz tests): they should feel like the real exam. Their answers still count, and the rank card still shows on their results.
- **`rank="replace"`** in training sets (DMV and v1) and v2 drills: when the chip shows, it takes the right slot's place. That slot is "View stats" or the DMV stats upsell ("Stuck on the same questions?"), and the chip links to the stats page itself. So that upsell is not shown in training while the chip is.
- **`rank="beside"`** in quiz practice and flashcards (beside Shuffle, a control).
- The count is always shown, so the chip moves with every right answer (each part pops when it changes): phones "42 · Top 6%", under 360px "42", from `sm` up "42 correct · Top 6%".

## Distribution

No cron and no account scan. Each change moves the person from their old histogram bucket to the new one (`histogramDelta`) on a random shard, inside the same transaction as their own doc. A status read loads the day's 10 shard docs at most once per 15 minutes per server instance. Counts over 1,000 share one bucket.

## Who sees it

Everyone (Nov 25 2026: the A/B test was ended and its card taken off the A/B tests tab; `analytics/dailyRankTest` keeps its few hours of counts). `?rank=off` hides Tiger Time in that tab for previews, and `?rank=on` brings it back (`sessionStorage`).

## Cheat check

Before picking the winner, `pickCheckedWinner` passes over any day that looks scripted (`suspiciousDay`, days of 50+ correct only): faster than 6 correct a minute on average from the day's first answer (`firstAt` on the person doc, kept since Nov 25 2026) to reaching the count, or 200+ correct with not one wrong. The next account wins. If a passed-over day would have won, John gets an email (`tiger-time-flags-<day>`) and the winner doc keeps `passedOver`. The person is never told.

## Cleanup

No Firestore TTL policy is needed: the winner cron deletes `dailyRank/{day}` (people and shards) for days older than three days, up to seven days a run. `expiresAt` is still written in case a TTL policy is ever added.

## Not done in the prototype

- Question ids are checked by format, not against the banks.
- v2 full tests (`ExamRunner`) have their own top bar, so the chip shows in v2 drills (FocusBar) but not mid-test; the card shows on v2 results.
- A browser id is a bearer secret for its guest day: anyone who has it can merge that day into their account. Ids are random and never leave the browser except to our API.

## Places for everyone

Since Nov 25 2026 (John) every person with 1+ correct sees their place ("235th of all Tigertesters today"), not just the top 100 (`RANK_SHOW_PLACE_MAX` is unbounded). The panel no longer shows a "Next goal" box (removed Nov 25 2026, John); only first place gets a box, "Right now: 1st place". `nextGoal()` still decides first place. Under any place but first the panel adds a nudge: "Every correct answer moves you up. Keep prepping!", or in the top 10 (`RANK_NEAR_TOP`) "You're close to the top. Keep going!". A place does reveal roughly how many people practise that day; John accepted that.

## End-of-session card

`DailyRankCard` (results, finished sets) is the stats panel (`DailyRankPanel`) with `guestSignIn` and no `#today-rank` anchor: the same header, score, place and nudge, and the first-place box; guests get "Sign in to keep your rank and win Tiger Time" there instead.

When rank is visible, the stats panel shows it once as the headline, with the correct-answer count in a smaller tile. If rank is not shown, the stats panel keeps the score headline. The stats panel header uses `/tiger-time-trophy.webp`, a decorative crownless tiger holding a trophy. The rank chips and end-of-session card keep their trophy icons.
