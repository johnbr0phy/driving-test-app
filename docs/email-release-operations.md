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

Four static contract tests pass. They do not compile the rules or prove actual
Firestore behavior. Before requesting approval to publish the candidate:

1. Re-read the active rules and reconcile any changes since this snapshot.
2. Run Firestore emulator tests or the nonpublishing Rules Playground for:
   - Valid owner create and normal progress/consent update: allow.
   - Other-user and anonymous user read/write: deny, except the existing
     explicitly public school-account policy.
   - For every protected field, owner create with it, add it, change its value,
     change a nested value, or delete it: deny.
   - Owner progress update retaining existing protected fields: allow.
   - Client read/write of both delivery/fulfillment collections: deny.
   - Existing admin read/delete and school-account flows: unchanged.
3. Obtain approval for the exact production security-rule change, retain the
   prior revision, publish only Firestore rules, and verify the active revision.
4. Do not run a general Firebase deploy: the repository contains legacy function
   source that must not be accidentally activated.

## Retry and provider operations still required

- Durable email has a five-minute claim lease and a 23-hour uncertain-outcome
  replay ceiling, shorter than the provider's 24-hour idempotency retention.
  Unknown outcomes retain the claim; changed candidates or expired retries are
  quarantined. Do not clear claims or blindly resend after that window.
- Most campaign jobs run daily. Their next scheduled run may therefore miss the
  safe replay window. The hourly welcome backstop covers welcome, not every
  campaign. A timed retry process plus quarantine monitoring must be agreed and
  tested before release. Do not simply replay stored marketing payloads: fresh
  consent and the original event's eligibility must still hold. Scheduling or
  activating that process is a separate controlled production change.
- Offline regressions cover provider suppression/rejection, consent withdrawal
  after an uncertain attempt, and paid Stripe receipt retry/acknowledgment. These
  do not establish live bounce/complaint monitoring or real inbox rendering.
- Inspect Resend's suppression/bounce controls and operational alerts. No new
  webhook or provider configuration has been installed.
- Verify the production Stripe endpoint subscribes to
  `checkout.session.async_payment_succeeded` if delayed methods are enabled.
  Source handles that event and returns a retryable response for receipt errors;
  deployed event subscriptions were not verified.

## Configuration and acceptance holds

- Obtain the exact business postal address approved for marketing footers.
  Do not substitute a personal or preview address.
- Create/configure a production-only `EMAIL_UNSUBSCRIBE_SECRET` privately with
  approval for that credential/security change. Never print it in logs or docs.
  Recheck environment-variable names without exposing values. Earlier metadata
  inspection found the postal address and secret absent.
- Obtain exact approved test recipients before any real send. Check rendered
  welcome, earned-event, question-card and receipt mail in actual target inboxes.
  Test unsubscribe only with an approved test account, not a customer account.
- Check required CI and a READY nonproduction Vercel build for the final remote
  commit. A passing old preview is not a final-head build.
- During this pass, desktop disk space prevented a clean installation/full
  optimized build. Offline checks used a lockfile-matching installed dependency
  tree. Browser access later disconnected while opening Resend; the Mac was
  locked. Provider and Stripe dashboard checks need Chrome reconnected/unlocked.

Do not merge or call the release ready while these holds remain unresolved.
