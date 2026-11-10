/** Root-relative application destinations only; never forward arbitrary URLs. */
export function safeAuthDestination(raw: string | null | undefined, fallback = '/dmv/dashboard'): string {
  if (!raw || !raw.startsWith('/') || raw.startsWith('//') || /[\\\u0000-\u0020]/.test(raw)) return fallback;
  try {
    // Also reject encoded slash/backslash/control tricks before browser routing.
    const decoded = decodeURIComponent(raw);
    if (decoded.startsWith('//') || /[\\\u0000-\u001f\u007f]/.test(decoded)) return fallback;
    const decodedPath = decodeURIComponent(raw.split(/[?#]/, 1)[0]);
    if (/(?:^|\/)\.{1,2}(?:\/|$)/.test(decodedPath)) return fallback;
    const normalizedPath = new URL(decodedPath, 'https://tigertest.io').pathname;
    if (/^\/(login|signup)(?:\/|$)/.test(normalizedPath)) return fallback;
    const url = new URL(raw, 'https://tigertest.io');
    if (url.origin !== 'https://tigertest.io' || /^\/(login|signup)(?:\/|$)/.test(url.pathname)) return fallback;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch { return fallback; }
}
export function signupForDestination(path: string, query = ''): string {
  const destination = safeAuthDestination(`${path}${query ? `?${query}` : ''}`);
  return `/signup?redirect=${encodeURIComponent(destination)}`;
}
export function accountNavigationState(input: {
  hydrated: boolean; authLoading: boolean; uid: string | null; loadedUid: string | null; firestoreLoaded: boolean;
}): { ready: boolean; loadFailed: boolean } {
  const settled = input.hydrated && !input.authLoading;
  const accountLoaded = !input.uid || input.loadedUid === input.uid;
  return { ready: settled && accountLoaded, loadFailed: settled && !!input.uid && input.firestoreLoaded && !accountLoaded };
}
