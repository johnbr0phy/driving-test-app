# Email journey implementation review

## Delivery status

Local review patch based on 7ddbdc00a3f7aef125c060f7c64d7b1ec171ce88. GitHub main was independently checked on 8 November 2026 and had advanced to 32870997ee798bde30afcf8f598ac21a34c49504 (admin Today seven-day reporting, no email files). Vercel production deployment dpl_CdPbjbbiJeXp5rKtSFzMzph3TYmK was READY at the same 32870997ee798bde30afcf8f598ac21a34c49504 commit. Recheck again before release. No deployment, provider send, campaign switch, scheduler change or remote publication was performed.

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

Account verification and password resets remain on Firebase's working provider path. School invitation/progress/enquiry templates and handlers were audited but not migrated: milestone semantics, notification retry markers, form dedupe/rate limits, and supported branding require separate implementation. Do not describe this patch as all service email paths being hardened.

## Verification

Independent implementation review found no remaining release-blocking source defect in this narrower safety/identity patch and reran 39 focused tests. It did not approve activating the proposed journey. Local typecheck, lint (existing unrelated warnings), training-data consistency, translated-bank audit and palette drift checks pass. Final complete suite: 306 tests passed, zero failed. Final integrated typecheck, lint and palette drift check also passed. The final local commit is recorded with the handoff.

Production build did not complete in this executor: the default Node heap exhausted; retry with a six-GiB heap was killed by the environment (exit 137) during optimized compilation, without a source diagnostic. A successful preview build and remote CI on the final commit remain required.

Visual browser QA inspected CCMA mobile welcome, SAT celebration and correct/incorrect question cards. Gmail, Outlook and actual delivered-message tests were not performed. All automated mail tests use mocks; no real email was sent.
