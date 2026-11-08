# Email journey implementation review

## Delivery status

Draft PR: https://github.com/johnbr0phy/driving-test-app/pull/729. The patch was cleanly reconciled with GitHub main 32870997ee798bde30afcf8f598ac21a34c49504 on 8 November 2026. Vercel production deployment dpl_CdPbjbbiJeXp5rKtSFzMzph3TYmK was READY at that same commit. Recheck the exact final PR head and production revision before release. Publishing the branch and draft PR starts review and CI; it does not activate the proposed journey. No production deployment, provider send, campaign switch or scheduler change was performed.

## Implemented

- Shared templates use contextual exam identity, actual theme colors and tiger assets, with neutral unknown fallback. Signup history is not inferred from today's selected exam.
- Super Amazing supports supported dashboard unlocks, remains once per account and preserves its four-hour gap and seven-day freshness.
- Welcome request authenticates the owner, records the first authenticated signup context, and reads stored opt-in. Browser and hourly recovery use the same durable send. Teacher setup is non-promotional service mail.
- Purchase fulfillment requires a paid, verified Stripe checkout. Historical processed payments are recognized during migration, preserving revocation/refund state and avoiding receipt backfills with unknown delivery. A session is fulfilled once; opt-out and refund records survive replay. Confirmation uses the transactional quota lane and retries through Stripe 503 handling.
- Provider sends use immutable payloads and deterministic idempotency keys. Atomic account-wide campaign claims prevent concurrent jobs spending the same cooldown. Fresh consent and event predicates cancel stale work.
- Known failures are retryable without permanent send markers. Unknown outcomes retain their claim and are quarantined after 23 hours, safely inside the provider's 24-hour idempotency retention. Manual reconciliation is required, not a blind replay.
- Daily quota fails closed on database errors. Transient provider rate limits no longer latch the entire day as exhausted. Incomplete preview markup and missing marketing postal address prevent sending.
- Legacy first/second reminders scope retained history to a dated exam. V2 absence/first-test assumptions are not newly enabled. Exit questions suppress later V2 activity and recheck their event immediately before send.

## Required before any rollout

1. Configure verified EMAIL_POSTAL_ADDRESS and EMAIL_UNSUBSCRIBE_SECRET privately. Production environment metadata was checked without decrypting or printing values: RESEND_API_KEY exists, but these two required keys are absent. Missing configuration intentionally blocks campaign mail. Do not reuse a preview address or secret.
2. Confirm deployed Firestore rules deny client reads/writes to emailDeliveries and fulfilledCheckouts, and prevent client mutation of server-owned signupOrigin/firstSignupExamId/marketingEmailLease fields. Rules are not stored in this repository and were not changed or verified.
3. Audit whether legacy Firebase email functions are deployed. Their source still exists, and deployment state was not verified. Do not run legacy and modern delivery for the same journey.
4. Verify the Stripe endpoint subscribes to checkout.session.async_payment_succeeded if delayed methods are supported. Confirm provider bounce/suppression monitoring and actual inbox rendering. Existing provider rejection is honored; no unverified suppression webhook was invented.
5. Reconcile quarantined emailDeliveries against the provider before clearing any lock. Do not retry a possibly accepted message after provider key retention expires. Daily legacy cron cadence can miss the safe replay window, so timed retries/monitoring are a release follow-up.
6. Check the exact production commit and CI on the final remote commit. This local patch is not a deployment approval.

## Explicitly not activated

The 48-hour universal cap, priority dispatcher, 24-hour new first-test sequence, seven-to-fourteen-day combined return journey and once-per-exam migration are proposals, not active scheduling. Existing 24-hour default, four-hour special cases and DMV three-day activity rule are preserved. The pure selector cannot send. The existing legacy jobs are not claimed to implement a single priority queue.

Decision needed: keep Super Amazing's four-hour earned-event exception or include it in the proposed 48-hour cap. Decide the DMV expiry before changing its three-day rule. V2 first-test sequencing requires trustworthy event history; its forty retained results do not prove lifetime first/zero completion. CCMA stats recovery needs entitlement-aware event handling and remains held. Held feedback, personal-miss, content-update and quiz campaigns are not turned on.

Account verification and the app's password reset remain on Firebase's working provider path. Existing service template subjects/preheaders were clarified, unsupported timing/readiness/enrollment promises removed, and dynamic school labels escaped. The old custom reset endpoint and school invitation/progress/enquiry handlers were not migrated: milestone semantics, notification retry markers, form dedupe/rate limits, and supported branding require separate implementation. The legacy school progress link redirects to generic teaching tools, not that student's record; the invitation signup does not establish class enrollment. Do not describe this patch as all service workflows being repaired.

Shared subjects and preview text now name the event exam and the actual next action. Purchase/reset/service notices stay literal. Existing SAT/ACT launch experiment variants and enrollment are preserved for historical consistency; truthful replacement subjects v6/v7 are held proposals outside the sending set. They do not restart a campaign or establish an open-rate improvement. Current v4/v5 copy concerns remain a separate launch-policy decision before any continued or renewed rollout.

## Verification

CTA verification covers three separate layers: generated email URLs across all registered exams and state variants; actual destination route bindings and read-only representative production HTTP responses; and mocked endpoint/authentication behavior. The permanent route matrix covers 374 identities including DMV and neutral fallback. The independent review verified 744 registered exam dashboard/stats bindings and 23 representative live URLs, with query tracking preserved through the apex-to-www redirect. Stateful feedback, tracked clicks and unsubscribe handlers are tested offline, never by following real account links. All nine feedback choices, 37 historical tracked launch links, signed one-click/browser unsubscribe and the neutral post-unsubscribe destination have permanent regression coverage.

The audit found and fixed a real stats-link problem: a fresh browser could lose the requested stats page during signup/login or navigate before the account data loaded. Stats links now retain their exact exam/path/query and wait for the current account's data, with retry on a failed read. Guest Common Mistakes access and Premium/class entitlement gates remain intact. Button labels that only open a dashboard or homepage no longer promise an automatic feature launch or sharing action. Full authenticated browser round trips with real accounts and provider-delivered emails are still not claimed.

Independent implementation review found no remaining release-blocking source defect in this narrower safety/identity patch, and the subsequent CTA review found no remaining blocking main-template CTA issue. It did not approve activating the proposed journey. The final complete local suite after CTA/subject refinements passed 330 tests, zero failed. GitHub Checks passed for the initial PR commit; final-head CI must be verified separately. Local typecheck, lint (existing unrelated warnings), generated-data and palette checks are rerun for the final head.

Production build did not complete in this executor: the default Node heap exhausted; retry with a six-GiB heap was killed by the environment (exit 137) during optimized compilation, without a source diagnostic. A successful preview build and remote CI on the final commit remain required.

Visual browser QA inspected CCMA mobile welcome, SAT celebration and correct/incorrect question cards. Gmail, Outlook and actual delivered-message tests were not performed. All automated mail tests use mocks; no real email was sent.
