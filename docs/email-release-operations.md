# Email release operations: 8 November 2026

This is a release checklist, not evidence that production was changed. No real
email, purchase, unsubscribe, credential, production rule, or scheduler change
was performed during these checks.

## Production checks completed

- Project: `driving-test-app-a5c67`. Signed-in desktop Chrome showed the live
  Firestore rules, with the active revision dated 1 April 2026, 7:51 PM in the
  console. The catch-all denies client reads/writes of `emailDeliveries` and
  `fulfilledCheckouts`.
- The live `/users/{userId}` rule allows owners to create/update any fields when
  the existing basic user-data validation succeeds. It does **not** protect
  signup identity, delivery claims, unsubscribe flags, or purchase entitlement.
  This must be fixed before the email patch is released.
- The same project's Functions dashboard showed **Waiting for your first
  deploy**, with no deployed functions listed. The legacy email source remains
  in the repository, but this console did not show it deployed.
- Sources:
  - https://console.firebase.google.com/project/driving-test-app-a5c67/firestore/databases/-default-/security/rules
  - https://console.firebase.google.com/project/driving-test-app-a5c67/functions
- After reconnecting Chrome, Resend's signed-in dashboard showed 81 suppressed
  addresses, including bounce-origin suppressions. Recent production activity
  included a suppressed message as well as delivered messages. This verifies
  provider-side suppression is active, not that a new template reached an inbox.
  The Webhooks page showed **No webhooks yet**. No provider settings were changed.
  Sources: https://resend.com/emails/suppressions and https://resend.com/webhooks.

## Prepared rules candidate, not deployed

`firestore.email-release.rules` preserves the observed production baseline and
adds create/update restrictions for server-owned fields. It is deliberately not
selected by `firebase.json`. Updates use `affectedKeys()`, which rejects adding,
changing, or deleting these fields while allowing ordinary progress updates that
leave them unchanged. Protected fields are:

- `signupOrigin`, `firstSignupExamId`, `marketingEmailLease`
- `emailsSent`, `lastEmailSent`, `emailVariants`, `exitQuestionEmail`
- `unsubscribed`, `unsubscribedAt`, `subscription`

The current client writes `emailConsent`, and creates `createdAt` on initial
progress save, so those fields are not newly restricted in this candidate. The
candidate preserves the existing school-account policy; it is not a complete
security review of that policy or all user fields.

The four static contract tests and a separate real Firestore emulator matrix
pass. The final emulator run passed 150 cases, with no failures, against this
exact candidate, including quota-ledger access denial. The reproducible harness
is in `tests/firestore-email-emulator`; its runner rejects stale rule fixtures.
It used a demo project in an isolated cloud environment, never the production
database. Before requesting approval to publish the candidate:

1. Re-read the active rules and reconcile any changes since this snapshot.
2. Preserve and rerun the Firestore emulator acceptance matrix after any edits:
   - Valid owner create and normal progress/consent update: allow.
   - Other-user and anonymous user read/write: deny, except the existing
     explicitly public school-account policy.
   - For every protected field, owner create with it, add it, change its value,
     change a nested value, or delete it: deny.
   - Owner progress update retaining existing protected fields: allow.
   - Client read/list/write of delivery, fulfillment and quota collections: deny.
   - Existing admin read/delete and school-account flows: unchanged.
3. Obtain approval for the exact production security-rule change, retain the
   prior revision, publish only Firestore rules, and verify the active revision.
4. Do not run a general Firebase deploy: the repository contains legacy function
   source that must not be accidentally activated.

## Prepared recovery, inactive until approved rollout

- Durable email has a five-minute claim lease and a 23-hour uncertain-outcome
  replay ceiling, shorter than the provider's 24-hour idempotency retention.
  Unknown outcomes retain the claim; changed candidates or expired retries are
  quarantined. Do not clear claims or blindly resend after that window.
- `POST /api/cron/email-recovery` is protected by the existing cron secret and
  disabled unless `EMAIL_RECOVERY_MODE` is explicitly `retry` or `reconcile`.
  There is no new `vercel.json` schedule and neither mode was activated.
  `retry` handles only previously attempted uncertain deliveries. `reconcile`
  can settle stored provider-acceptance proof and quarantine unsafe records,
  without a provider send. Both modes change ledger state when enabled.
- The worker reads pending delivery rows independently of audience selection,
  so opted-out or stale users' unresolved attempts remain visible. It processes
  at most 20 rows per request, with a cursor. An approved caller must persist the
  returned cursor and wrap to the beginning when it is null. Queries and page
  errors fail visibly rather than being mistaken for an empty backlog.
- New attempts store a versioned original eligibility guard and deadline.
  Campaign guards hash the original user-data snapshot, except for our own
  delivery lease. Any other user-data change conservatively blocks replay.
  Welcome guards retain signup identity and its original 24-hour eligibility
  limit; receipt guards retain the exact still-valid purchase entitlement.
  Current consent, campaign activation and Auth recipient/disabled status are
  checked again. Old records without this contract do not auto-retry.
- Recovery retains the five-minute lease and uses the earlier of the original
  event deadline and 23-hour idempotency cutoff. It checks that deadline again
  immediately before the provider call, and caps attempts at
  eight with bounded backoff. Same-key retries retain the immutable payload,
  resolved sender and original guard. Launch experiment acceptance timestamps
  are filled at successful finalization, not regenerated into fingerprints.
- Provider acceptance is persisted with the key, fingerprint and generation.
  A later marker failure can be reconciled from that proof without sending
  again, even after the replay deadline. No operator-supplied message ID or
  incomplete dashboard search is treated as proof. Settlement preserves newer
  account locks/timestamps and does not recreate deleted user documents.
- Quota reservations are keyed by provider key and UTC day. Same-day replay
  reuses its charge; cross-day replay conservatively reserves the new day.
  A UTC-day rollover during reservation requires a new current-day reservation
  before the provider call, with bounded retries and fail-closed behavior.
  Ambiguous/shared reservations remain charged. Late failure or quota responses
  cannot decrement or exhaust a different day's budget. Reservations are in
  `emailQuotaReservations`, also protected by the default-deny rules.
- Known provider rejections are deliberately outside this timed worker. They
  release an unambiguous claim and remain retryable through their original
  workflow. Timely delivery for those cases is not guaranteed by this worker.
  A broader retry policy must be designed separately rather than assuming this
  endpoint is a general-purpose outbox.
- Most campaign jobs still run daily. To use recovery operationally, approve
  and verify a suitable cadence and quarantine monitoring. Activation and
  scheduling are separate controlled production changes, not performed here.
- Offline regressions cover provider suppression/rejection, consent withdrawal
  after an uncertain attempt, and paid Stripe receipt retry/acknowledgment. These
  do not establish live bounce/complaint monitoring or real inbox rendering.
- Provider-side suppression is verified as above. No Resend webhook is configured,
  so callback-based bounce/delivery reconciliation is not available. Operational
  alert coverage remains unverified. No provider configuration was installed.
- The signed-in TigerTest Stripe dashboard showed the active destination
  `https://www.tigertest.io/api/stripe/webhook` listening only to
  `checkout.session.completed` and `payment_intent.payment_failed`.
  `checkout.session.async_payment_succeeded` is **not subscribed**. Individual
  premium Checkout explicitly uses `payment_method_types: ['card']`, so this is
  not a blocker for that current flow. Add and verify the async event with
  approval before enabling delayed methods or relying on their fulfillment or
  receipts. Source supports it, but an unsubscribed event cannot reach the handler.
  No webhook settings or signing secrets were changed or revealed.
  Source: https://dashboard.stripe.com/acct_1StJRZCWSPkWn0VX/workbench/webhooks/we_1SyT1SCWSPkWn0VXlIwWuzx7
- Stripe's account payment-method configuration showed ACH, Bacs, Canadian
  pre-authorized debits, SEPA, bank transfers, OXXO and Multibanco disabled.
  Other non-card methods, including Stablecoins/Crypto, were enabled, so the
  entire account should not be described as card-only. The individual Checkout
  restriction above is what limits the current receipt flow. School subscription
  Checkout uses account defaults and needs its own fulfillment review before
  relying on additional payment methods.
  Source: https://dashboard.stripe.com/acct_1StJRZCWSPkWn0VX/settings/payment_methods/pmc_1StJS5CWSPkWn0VXf98BrGi1

## Configuration and acceptance holds

- The owner has deferred adding a business postal address and explicitly does
  not want a personal address in email. Leave `EMAIL_POSTAL_ADDRESS` unset.
  Prepare the remaining work without weakening the marketing-send guard. Only
  enable marketing after an approved valid address is added; do not substitute
  a personal, fabricated, or preview address. Transactional receipts and teacher
  service welcome remain distinct from marketing.
- Create/configure a production-only `EMAIL_UNSUBSCRIBE_SECRET` privately with
  approval for that credential/security change. Never print it in logs or docs.
  Recheck environment-variable names without exposing values. Earlier metadata
  inspection found the postal address and secret absent.
- Obtain exact approved test recipients before any real send. Check rendered
  welcome, earned-event, question-card and receipt mail in actual target inboxes.
  Test unsubscribe only with an approved test account, not a customer account.
- Check required CI and a READY nonproduction Vercel build for the final remote
  commit. A passing old preview is not a final-head build.
- The initial desktop pass ran out of disk space and disconnected. On reconnect,
  pending local edits were inspected before resuming, and free space recovered.
  The follow-up installed dependencies cleanly, while optimized builds remain
  delegated to Vercel to avoid overloading the Mac. Resend and Stripe access
  recovered, and the production checks above completed. No interrupted writes
  were blindly repeated.

Do not merge or call the release ready while these holds remain unresolved.
