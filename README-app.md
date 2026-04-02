# TigerTest — Native App (Capacitor)

This project uses CapacitorJS to wrap the Next.js web app as a native iOS/Android app for App Store and Google Play submission.

## Prerequisites

- **Node.js** 18+
- **Xcode** 15+ (iOS) with CocoaPods (`sudo gem install cocoapods`)
- **Android Studio** (Android) with SDK 33+
- **ImageMagick** (optional, for icon generation): `brew install imagemagick`

## Setup

After cloning, install dependencies:

```bash
npm install
```

Add native platforms (one-time):

```bash
npx cap add ios
npx cap add android
```

## Building

```bash
npm run build:app    # Static export + sync to native projects
```

## Running on Device / Simulator

```bash
npm run app:ios      # Opens Xcode — build and run from there
npm run app:android  # Opens Android Studio — build and run from there
```

## App Store Submission (iOS)

1. `npm run build:app`
2. `npm run app:ios` (opens Xcode)
3. Select a real device or "Any iOS Device" as target
4. Product → Archive
5. Window → Organizer → Distribute App

## Google Play Submission (Android)

1. `npm run build:app`
2. `npm run app:android` (opens Android Studio)
3. Build → Generate Signed Bundle / APK
4. Upload AAB to Google Play Console

## Generating App Icons

Place a 512x512 (or larger) icon at `public/icon-512.png`, then:

```bash
npm run icons
```

This generates all required iOS icon sizes. Run `npx cap add ios` first.

## Notes

- The app uses `output: "export"` for static HTML generation. API routes (`app/api/`) are **not included** in the static export — they must be hosted separately (e.g., on Vercel) and the app must call them via absolute URLs.
- `X-Frame-Options` is set to `SAMEORIGIN` to allow the Capacitor WebView to load the app.
