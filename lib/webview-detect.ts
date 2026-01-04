/**
 * Detects if the current browser is an embedded WebView (in-app browser)
 * These browsers don't support Google Sign-In popups due to security restrictions
 */
export function isEmbeddedBrowser(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  const userAgent = navigator.userAgent || navigator.vendor || '';

  // Common WebView/in-app browser patterns
  const webViewPatterns = [
    // LinkedIn in-app browser
    /\bLinkedIn\b/i,
    // Facebook in-app browser
    /\bFB(AN|AV|_IAB)\b/i,
    /\bFBIOS\b/i,
    /\bFacebook\b/i,
    // Instagram in-app browser
    /\bInstagram\b/i,
    // Twitter/X in-app browser
    /\bTwitter\b/i,
    // TikTok in-app browser
    /\bBytedance\b/i,
    /\bTikTok\b/i,
    // Snapchat in-app browser
    /\bSnapchat\b/i,
    // Pinterest in-app browser
    /\bPinterest\b/i,
    // Line in-app browser
    /\bLine\b/i,
    // WeChat in-app browser
    /\bMicroMessenger\b/i,
    // Generic WebView indicators
    /\bwv\b/i,
    /\bWebView\b/i,
    // iOS WebView
    /\b(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i,
    // Android WebView
    /\bAndroid.*Version\/[\d.]+.*Chrome\/[\d.]+ Mobile/,
  ];

  // Check for standalone mode (PWA) - this is fine, not a WebView
  const isStandalone =
    ('standalone' in window.navigator && (window.navigator as any).standalone) ||
    window.matchMedia('(display-mode: standalone)').matches;

  if (isStandalone) {
    return false;
  }

  // Check user agent against WebView patterns
  for (const pattern of webViewPatterns) {
    if (pattern.test(userAgent)) {
      return true;
    }
  }

  return false;
}

/**
 * Opens the current page in the device's default browser
 */
export function openInDefaultBrowser(): void {
  if (typeof window === 'undefined') return;

  const currentUrl = window.location.href;

  // Try different methods to open in external browser
  // Method 1: window.open with _system target (works in some WebViews)
  const newWindow = window.open(currentUrl, '_system');

  // Method 2: If that didn't work, try _blank
  if (!newWindow) {
    window.open(currentUrl, '_blank');
  }
}
