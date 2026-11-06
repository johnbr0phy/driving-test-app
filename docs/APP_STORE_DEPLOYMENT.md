# Tigertest: App Store & Play Store Deployment Guide

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
- **No purchase and no price in the app.** In-app purchases of digital goods
  must use Apple IAP / Google Play Billing (guidelines 3.1.1 / Play Payments
  policy), and the app may not point people to buy elsewhere. Every paywall
  in the app says only that Premium isn't available in the app (no price, no
  link, guests included), lock cards drop the price (`useShownPremiumPrice`),
  and `/api/stripe/checkout` refuses the app's user agent. Premium bought on
  the web still unlocks the app through Firebase.
- **No public quiz library or quiz making in v1** (guideline 1.2,
  user-generated content): links to `/create`, `/quizzes` and `/upgrade` are
  hidden in the app (`html.native-app` rules in `app/globals.css`) and
  `NativeAppShell` sends those routes home. Shared quiz links still play and
  carry Report.
- **Native features** (guideline 4.2): daily study reminder
  (`components/StudyReminderCard.tsx`, local notifications, on every dashboard
  and in Settings) and haptics on every answer (`lib/nativeFeatures.ts`,
  called from `recordClassAnswerById`). The plugins are in both
  `package.json` files: the site imports their JS only inside the app, the
  shell carries the native side. Adding StoreKit/Play Billing (e.g. via RevenueCat) is a good
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

1. Create app → name **Tigertest: Practice Tests**, type App, Free.
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

## iOS — App Store (no Mac needed)

The build, signing and upload run on GitHub's Mac runners
(`.github/workflows/mobile-ios-testflight.yml`). Signing is Xcode's
cloud-managed signing, authorised by an App Store Connect API key, so there are
no certificates or profiles to manage by hand.

### 1. Apple account (once)

1. Enroll at https://developer.apple.com/programs/enroll ($99/year). As an
   individual the seller name on the listing is your own name; as an
   organization it is the company's, which needs a D-U-N-S number and takes
   longer. Approval can take 1 to 2 days.
2. Note your **Team ID**: developer.apple.com > Account > Membership details.

### 2. App record (once)

App Store Connect > Apps > **+** > New App: platform iOS, name
**Tigertest: Practice Tests**, primary language English (U.S.), bundle id
`io.tigertest.app` (register it first under Certificates, Identifiers &
Profiles > Identifiers > **+** > App IDs if it is not in the list), SKU
`tigertest-ios`, full access.

### 3. API key and GitHub secrets (once)

1. App Store Connect > Users and Access > Integrations > App Store Connect API
   > Team Keys > **+**. Name it "GitHub", role **Admin** (cloud signing needs
   it). Download the `.p8` file (it can be downloaded only once) and note the
   **Key ID** and the **Issuer ID** at the top of the page.
2. GitHub > the repo > Settings > Secrets and variables > Actions > New
   repository secret, four times:
   - `APPLE_TEAM_ID`: the Team ID
   - `ASC_KEY_ID`: the Key ID
   - `ASC_ISSUER_ID`: the Issuer ID
   - `ASC_KEY_P8_BASE64`: the key file base64 encoded (`base64 -i AuthKey_XXXX.p8`
     on a Mac, `base64 -w0 AuthKey_XXXX.p8` on Linux, or
     `[Convert]::ToBase64String([IO.File]::ReadAllBytes("AuthKey_XXXX.p8"))` in
     Windows PowerShell)

### 4. Build and upload

GitHub > Actions > **iOS TestFlight** > Run workflow > version `1.0`. About 15
minutes later the build is in App Store Connect; it shows in TestFlight once
Apple has processed it. The build number is the workflow run number, so every
run uploads a new build. Bump the version only for a new App Store release.

### 5. Test on your iPhone

App Store Connect > the app > TestFlight > Internal Testing > add yourself.
Install the **TestFlight** app on the iPhone and open the invite. Check:
guest practice, sign up and sign in, a locked Premium step (it says Premium
isn't available in the app, with no price), the daily study reminder on a
dashboard (it asks for notification permission, then fires at the set time),
haptics on answers, and Settings > Delete account.

### 6. Listing and submission

Fill in the App Store tab (copy below), then **Add for Review**.

- **Screenshots:** iPhone 6.9" (1320 x 2868) is the one required size; take
  them from TestFlight on a large iPhone, or ask Claude to render them from
  the site. The app is iPhone only (no iPad screenshots needed).
- **Age rating:** answer the questionnaire honestly (no objectionable
  content); expect 4+. Do not opt into the Kids category: the site runs
  analytics and the Kids category forbids it.
- **App Privacy:** Contact Info (email, name), Identifiers (user ID), Usage
  Data (product interaction), all *linked to the user*, used for *app
  functionality* and *analytics*; *not used for tracking*. No purchases,
  location or ads.
- **Privacy policy URL:** https://www.tigertest.io/privacy
- **Sign-in required:** no (guest mode). Still give a demo account (make one
  on the site; give it Premium in Firestore so the reviewer can see it all).
- **Review notes** (paste):

  > Tigertest is a free practice-test app for driving permits and
  > licensing exams in 30 countries. No account is needed: pick a test on
  > the home screen and start answering. Native features: daily study
  > reminders (local notifications, on any test dashboard and in Settings),
  > haptic feedback on every answer, offline handling. Accounts sync
  > progress across devices and can be deleted in Settings. There are no
  > purchases in the app. Demo account: <email> / <password>.

First review usually takes 1 to 3 days.

## Store listing copy

- **Name (30):** Tigertest: Practice Tests
- **Subtitle (30):** Driving, licensing & job tests
- **Keywords (100, no exam trademarks):**
  `dmv,permit,driving,theory,learner,license,exam,quiz,study,cdl,nursing,citizenship,real estate,trade`
- **Promotional text:** Free practice tests with clear explanations. Start
  in seconds, no account needed.
- **Description:**

  > Pass your test the first time. Tigertest gives you free practice tests
  > that match the real exam, with a clear explanation for every answer.
  >
  > • Driving permit and theory tests for all 50 US states and 29 more
  >   countries
  > • Licensing, trade, healthcare and job certification exams
  > • Full practice tests that mirror the real format and pass mark
  > • Training sets that bring back every question you miss until you know it
  > • Daily study reminders and progress you can see
  > • Free to start, no account needed; sign up to sync across devices
  >
  > Tigertest is independent and not affiliated with any testing agency.

- **Category:** Education (secondary: Reference)
- **Support URL:** https://www.tigertest.io/about
- **Copyright:** 2026 <your name or company>

## Android — notes

The Android listing name and copy above apply to Google Play too. Play's
Data safety form takes the same answers as App Privacy.

## Follow-ups worth considering

1. **Push notifications** (`@capacitor/push-notifications` + FCM/APNs) for
   study reminders — the strongest guard against an Apple 4.2 rejection and a
   retention lever the email crons already approximate.
2. **In-app purchases** via RevenueCat (StoreKit 2 + Play Billing) so premium
   can be bought in-app.
3. **Native Google/Apple sign-in** via `@capacitor-firebase/authentication`.
4. **Deep links / universal links** so tigertest.io URLs open the app.
