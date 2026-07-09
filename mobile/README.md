# TigerTest Mobile (iOS + Android)

Capacitor 8 shell around **https://www.tigertest.io**. The native apps are a
thin WebView; all product UI is the live site, so web deploys update the apps
instantly. The site detects the shell via the user agent token
`TigerTestApp/<version> (<platform>)` (see `../lib/native-app.ts`) and hides
Google Sign-In and Stripe checkout, and applies safe-area insets.

## Layout

- `capacitor.config.ts` — app id `io.tigertest.app`, remote `server.url`,
  user-agent token, splash/status-bar config
- `www/` — placeholder + offline `error.html` (shown when the site can't load)
- `assets/logo.png` — source for generated icons/splash (`npm run assets`)
- `ios/`, `android/` — generated native projects (checked in; edit via Xcode /
  Android Studio for signing, versions, capabilities)

## Common commands

```bash
npm ci                # install
npx cap sync          # push config/plugin changes into native projects
npm run assets        # regenerate icons + splash from assets/logo.png
npm run open:ios      # open Xcode (macOS)
npm run open:android  # open Android Studio
npm run build:android # debug APK (needs Android SDK + Java 21)
```

After editing `capacitor.config.ts` or updating plugins, always run
`npx cap sync` and commit the native project changes it makes.

## Releasing

See `../docs/APP_STORE_DEPLOYMENT.md` for the full store submission guide
(signing, CI secrets, listing copy, review-compliance notes). Remember to bump
`versionCode`/`versionName` (Android) and Version/Build (iOS) on every upload.
