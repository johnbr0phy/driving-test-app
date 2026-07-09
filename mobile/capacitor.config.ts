import type { CapacitorConfig } from "@capacitor/cli";

/**
 * TigerTest mobile shell.
 *
 * The app is a thin native wrapper that loads the production site. The
 * site detects the shell via the appended user-agent token (see
 * lib/native-app.ts in the web app) and adapts: Google Sign-In and the
 * Stripe purchase flow are hidden, and safe-area insets are applied.
 *
 * server.url must match the origin the site is actually served on (www —
 * Vercel redirects the apex there, and Firebase Auth's authDomain is
 * www.tigertest.io).
 */
const config: CapacitorConfig = {
  appId: "io.tigertest.app",
  appName: "TigerTest",
  webDir: "www",
  server: {
    url: "https://www.tigertest.io",
    // Hosts the WebView may navigate to in-app. Anything else (Google
    // OAuth, Stripe checkout, external links) opens in the system browser.
    allowNavigation: ["tigertest.io", "*.tigertest.io"],
    // Local fallback shown when the remote site fails to load (offline).
    errorPath: "error.html",
  },
  ios: {
    appendUserAgent: "TigerTestApp/1.0 (ios)",
    // Full-bleed WebView; the site pads by env(safe-area-inset-*) when it
    // detects the shell (html.native-app in globals.css).
    contentInset: "never",
  },
  android: {
    appendUserAgent: "TigerTestApp/1.0 (android)",
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      launchAutoHide: true,
      backgroundColor: "#ffffff",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
    },
    StatusBar: {
      style: "LIGHT",
      backgroundColor: "#ffffff",
    },
  },
};

export default config;
