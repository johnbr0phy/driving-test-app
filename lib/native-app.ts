/**
 * Detects the TigerTest native mobile app (Capacitor shell in /mobile).
 *
 * The shell appends "TigerTestApp/<version> (<platform>)" to the WebView
 * user agent (see mobile/capacitor.config.ts), which lets the site adapt:
 * - hide Google Sign-In (Google blocks OAuth inside embedded WebViews, and
 *   offering it on iOS would trigger Apple's Sign in with Apple requirement)
 * - hide the Stripe purchase flow (Apple/Google require their own billing
 *   for in-app digital purchases)
 * - apply safe-area insets for notched devices
 */
export const NATIVE_APP_UA_TOKEN = "TigerTestApp";

export function isNativeApp(): boolean {
  if (typeof navigator === "undefined") return false;
  return navigator.userAgent.includes(NATIVE_APP_UA_TOKEN);
}

export function getNativeAppPlatform(): "ios" | "android" | null {
  if (typeof navigator === "undefined") return null;
  const match = navigator.userAgent.match(/TigerTestApp\/[\d.]+ \((ios|android)\)/);
  return (match?.[1] as "ios" | "android") ?? null;
}
