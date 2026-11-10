# Lifecycle trigger rollout decisions

This patch does not activate a new campaign or change cron schedules. Existing campaign flags and the existing 24-hour default frequency cap remain in place. Super Amazing retains its separate four-hour exception. Existing DMV quiet-period policy remains three days.

Identity now follows the validated event exam, then immutable firstSignupExamId, then a neutral unknown. Existing accounts without immutable signup identity are not backfilled from mutable primaryExam. Legacy study campaigns bind copy to dated per-exam study evidence. A state-specific exam is not collapsed into its family. Unknown states, invalid dates, future dates and ambiguous tied latest exams are skipped.

The pure selectJourneyCandidate helper implements a proposed 48-hour priority selection. It has no dispatcher or schedule and cannot send. Enabling it requires an explicit rollout decision, a single dispatcher, disabling overlapping legacy dispatch, and fresh transactional eligibility checks. It is not launch-ready merely because its unit tests pass.

A zero/one retained test history cannot establish a lifetime first test: v1 can be reset and v2 sync retains only 40 results. Legacy v1 campaigns retain their existing retained-history semantics, with exam scoping; v2 first/second campaigns are not newly enabled. A server-owned immutable event ledger is required before launching the proposed first-test sequence. Do not backfill first-test timestamps from retained results. Per-exam v2 drill activity also needs reliable event timestamps; v2.updatedAt is only conservative account-level suppression, never a trigger.

The proposed 24-hour first-study delay, 7–14-day combined return campaign and once-per-exam markers are not activated. Held misses, feedback, content updates and CCMA catalog/quiz variants remain held. Existing per-campaign sent markers must be honored during any migration. Existing paywall copy is constrained to positively identified DMV event locations/features; no CCMA/SAT stats promotion is enabled by this patch.
