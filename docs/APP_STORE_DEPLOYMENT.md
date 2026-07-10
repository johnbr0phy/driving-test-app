# TigerTest — App Store & Play Store Deployment Guide

The mobile apps live in `/mobile`: a Capacitor shell (`io.tigertest.app`) that
loads https://www.tigertest.io in a native WebView. The site detects the shell
via its user agent (`TigerTestApp/1.0 (ios|android)`) and adapts — see
`lib/native-app.ts`. Because all product UI is the live website, **shipping web
changes updates both apps instantly with no store re-submission** (only native
changes — icons, splash, Capacitor config/plugins — require a new build).

> **Prerequisite:** the web-side changes on this branch (shell detection,
> Google sign-in gating, paywall gating, safe-area CSS) must be deployed to
> production **before** submitting the apps, since the apps load the live site.

## One-time accounts

| | Where | Cost |
|---|---|---|
| Apple Developer Program | https://developer.apple.com/programs/enroll | $99/year |
| Google Play Console | https://play.google.com/console/signup | $25 once |

## Compliance decisions baked into this build

- **No Google Sign-In in the app.** Google blocks OAuth in embedded WebViews
  (`disallowed_useragent`), and offering third-party login on iOS triggers the
  Sign in with Apple requirement (App Review Guideline 4.8). Email/password
  works fully; existing Google-account users can use password reset to add a
  password, or a native-auth plugin can be added later
  (`@capacitor-firebase/authentication`).
- **No Stripe purchase in the app.** In-app purchases of digital goods must use
  Apple IAP / Google Play Billing (guidelines 3.1.1 / Play Payments policy).
  The paywall in the app shows an informational notice instead of the $9.99
  checkout. Premium purchased on the web syncs to the app automatically via
  Firebase. Adding StoreKit/Play Billing (e.g. via RevenueCat) is a good
  follow-up if in-app conversion matters.
- **Guest mode works** without an account, so reviewers can exercise the core
  product immediately (helps with guideline 2.1 review).
- **Minimum-functionality risk (guideline 4.2).** Apple sometimes rejects
  website-wrapper apps. Mitigations already in place: app-specific behavior
  (native splash/status bar/safe areas, app-tailored auth and paywall), full
  offline error handling, and a clearly app-like product (a study tool, not a
  brochure). If a rejection cites 4.2, the standard path is adding a native
  capability (push notifications for study reminders is the usual fix and a
  natural fit here).

## Android — Google Play

### 1. Create the signing keystore (once, keep forever)

```bash
keytool -genkey -v -keystore tigertest-release.keystore \
  -alias tigertest -keyalg RSA -keysize 2048 -validity 10000
```

Store the keystore and both passwords in a password manager. Losing it does not
brick the app (Play App Signing re-signs for you — enroll when prompted), but
you still need it to sign uploads.

### 2. Build the release bundle

Either locally:

```bash
cd mobile
npm ci && npx cap sync android
ANDROID_KEYSTORE_PATH=/path/to/tigertest-release.keystore \
ANDROID_KEYSTORE_PASSWORD=... ANDROID_KEY_ALIAS=tigertest ANDROID_KEY_PASSWORD=... \
npm run build:android:release
# → android/app/build/outputs/bundle/release/app-release.aab
```

Or via CI: add repo secrets `ANDROID_KEYSTORE_BASE64` (`base64 -w0 tigertest-release.keystore`),
`ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS`, `ANDROID_KEY_PASSWORD`, set the
repo variable `ANDROID_RELEASE_ENABLED=true`, then run the **Mobile Android
Build** workflow — the signed AAB is uploaded as an artifact.

### 3. Play Console setup

1. Create app → name **TigerTest — DMV Practice Test**, type App, Free.
2. Upload `app-release.aab` to **Internal testing** first; promote to
   Production after a smoke test on a real device.
3. Complete the required declarations:
   - **Privacy policy:** https://www.tigertest.io/privacy
   - **Data safety:** collects email + name (account), app activity (test
     progress), stored in Firebase; no data sold; data encrypted in transit;
     account deletion available in-app (Settings) — verify this matches the
     current privacy policy before submitting.
   - **Content rating questionnaire:** Education/Reference → Everyone.
   - **Target audience:** 13+ (teen learner drivers).
4. Store listing: see copy below. Screenshots: phone screenshots (min 2,
   1080×1920 or similar) — take them in the app from an emulator/device.

Review typically takes 1–7 days for a new developer account.

### Version bumps

Increment `versionCode` (and `versionName`) in `mobile/android/app/build.gradle`
for every upload — Play rejects duplicate version codes.

## iOS — App Store

Two paths: **CI release (no Mac needed)** or local Xcode. No CocoaPods
either way — Capacitor 8 uses Swift Package Manager.

### Path A: release from CI (no Mac)

One-time setup after enrolling in the Apple Developer Program:

1. **Team ID:** https://developer.apple.com/account → Membership details →
   copy the 10-character Team ID.
2. **API key:** https://appstoreconnect.apple.com → Users and Access →
   Integrations → App Store Connect API → Team Keys → **+**. Name it
   `github-ci`, role **Admin** (needed so CI can create the distribution
   certificate). Download the `.p8` file (one chance only) and note the
   **Key ID** and **Issuer ID** shown on that page.
3. **GitHub secrets:** repo → Settings → Secrets and variables → Actions →
   add `APPLE_TEAM_ID`, `APPSTORE_KEY_ID`, `APPSTORE_ISSUER_ID`, and
   `APPSTORE_P8_BASE64` (`base64 -i AuthKey_XXXX.p8 | pbcopy` on macOS).
4. **App record:** in App Store Connect → My Apps → **+** → New App:
   platform iOS, name **TigerTest: DMV Practice Test**, bundle id
   `io.tigertest.app` (register it at developer.apple.com → Identifiers if
   it's not in the dropdown), SKU `tigertest-ios`.

Then run the **Mobile iOS Release (TestFlight)** workflow (Actions tab →
Run workflow). It archives with cloud-managed signing and uploads straight
to App Store Connect; the build appears in TestFlight ~10–15 minutes later
(Apple runs a brief automated processing pass). Each run auto-increments
the build number; bump the repo variable `IOS_MARKETING_VERSION` for new
user-facing versions.

### Path B: local Xcode

### 1. Local setup

```bash
cd mobile
npm ci && npx cap sync ios
npm run open:ios   # opens Xcode
```

In Xcode, select the **App** target:
- **Signing & Capabilities:** select your team; bundle id `io.tigertest.app`
  (register it automatically via "Automatically manage signing").
- Run on a simulator/device to smoke-test.

### 2. App Store Connect

1. https://appstoreconnect.apple.com → My Apps → **+** → New App: platform iOS,
   bundle id `io.tigertest.app`, SKU `tigertest-ios`.
2. Fill in the listing (copy below), upload screenshots for 6.7" and 6.5"
   iPhones (and 12.9" iPad if you keep iPad support enabled; otherwise untick
   iPad in the target's supported destinations).
3. **App Privacy:** same disclosures as Play data safety (email, name,
   usage data; linked to identity; no tracking).
4. **App Review notes:** mention guest mode ("tap Try it free — no account
   needed"), and provide a demo email/password account with Premium enabled so
   reviewers can see gated content.

### 3. Archive & upload

Xcode → Product → Archive → Distribute App → App Store Connect. Then submit
for review in App Store Connect (first review usually 1–3 days). TestFlight
first is recommended.

### Version bumps

Bump **Version** (CFBundleShortVersionString) and **Build** in the Xcode target
(or `ios/App/App.xcodeproj`) for each upload.

## Store listing copy (both stores)

- **Name:** TigerTest: DMV Practice Test
- **Subtitle / short description:** Pass your permit test first try. All 50
  states + DC.
- **Keywords (iOS):** dmv,permit test,practice test,driving test,drivers ed,
  learners permit,dmv test 2026
- **Description:**

  > Pass your DMV written test the first time. TigerTest gives you real
  > exam-style practice questions for all 50 states + DC — free.
  >
  > • 200 questions per state, matched to your state's handbook
  > • 4 full practice tests that mirror the real exam
  > • Training mode with spaced repetition on what you get wrong
  > • Instant feedback with clear explanations
  > • Progress tracking and per-question stats
  > • English and Spanish
  >
  > Start practicing in seconds — no account required. Create a free account
  > to sync progress across devices.

- **Category:** Education
- **Privacy policy URL:** https://www.tigertest.io/privacy
- **Support URL:** https://www.tigertest.io

## Follow-ups worth considering

1. **Push notifications** (`@capacitor/push-notifications` + FCM/APNs) for
   study reminders — the strongest guard against an Apple 4.2 rejection and a
   retention lever the email crons already approximate.
2. **In-app purchases** via RevenueCat (StoreKit 2 + Play Billing) so premium
   can be bought in-app.
3. **Native Google/Apple sign-in** via `@capacitor-firebase/authentication`.
4. **Deep links / universal links** so tigertest.io URLs open the app.
