# Firestore email rules acceptance

This isolated harness passed **150 tests, zero failures** on 8 November 2026
against the exact candidate at repository blob
`ad5631c00c25f965305880a6648e5042cd87e321`. It used Firestore emulator 1.19.8,
Node 24.22.1 and OpenJDK 21.0.13. No production database or credentials were used.

## Run

Requires Node 22 or newer and Java 21. From the repository root:

```sh
cd tests/firestore-email-emulator
npm ci --ignore-scripts
npm test
```

The separate package lock pins emulator-test dependencies. The Firebase CLI may
download the official emulator JAR on first use. Do not install these packages
into the application root. Results appear in `results.json`; permission-denied
logs for negative tests are expected.

The runner rejects fixture drift from the root `firestore.email-release.rules`.
After intentional candidate edits, copy the updated candidate into this directory
and rerun the full matrix. Do not replace the production Firebase configuration.

## Scope and safety

The demo-only project is `demo-email-rules`. Services bind to loopback, the UI is
disabled, and the JVM uses at most 512 MB heap and two processors. The test code
refuses to run without a loopback emulator host.

Coverage includes normal owner create/progress/consent writes; every protected
field on create, add, replace, nested change and delete; retaining protected
values during progress writes; other-user and anonymous denial; all client CRUD
and list denial for `emailDeliveries`, `fulfilledCheckouts` and
`emailQuotaReservations`; and preserved admin/school baseline behavior.

Nested-change tests seed maps even for normally scalar fields to exercise
top-level `affectedKeys()` protection for legacy data. Existing broad school
access and the email-based admin check are preserved, not endorsed as a complete
security audit. See `docs/email-release-operations.md` at the repository root.

Before publication, re-read live rules, reconcile changes, obtain approval for
the exact security change, retain rollback rules, and deploy only Firestore rules.
