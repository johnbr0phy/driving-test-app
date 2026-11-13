// Privacy rules that depend on where the visitor is, and on whether the page
// is for children. Client-safe and import-light: the inline <head> script in
// app/layout.tsx is built from these lists.
//
// - Analytics cookies (Google Analytics) need opt-in consent in the EEA, the
//   UK and Switzerland (ePrivacy / PECR). Everywhere else they run until the
//   visitor declines on /privacy.
// - Marketing email needs an unticked opt-in in those countries and in Canada
//   (CASL). Elsewhere the signup box starts ticked and every email carries a
//   one-click unsubscribe.
// - Google Analytics never runs on the children's tests (primary-school and
//   middle-school entrance exams) or for a browser that has joined a teacher's
//   class or a named quiz, whose players may be children (COPPA, UK Children's
//   Code). Those pages still count anonymously in Tigertest's own counters.

export const GA_ID = "G-28J0RC9MJ5";

/** Visitor's ISO country, from /api/geo (Vercel IP geolocation). */
export const COUNTRY_COOKIE = "tt-cc";
/** "granted" or "denied": the visitor's analytics cookie choice. */
export const CONSENT_COOKIE = "tt-consent";
export const CONSENT_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/**
 * EU and EEA members, the UK and Switzerland, plus "ZZ" (country unknown,
 * from /api/geo), which could be any of them, so it gets the same opt-in.
 */
export const COOKIE_CONSENT_COUNTRIES = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU",
  "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "IS", "LI", "NO", "GB", "CH", "ZZ",
];

/** Where marketing email needs an unticked, explicit opt-in. */
export const EMAIL_OPTIN_COUNTRIES = [...COOKIE_CONSENT_COUNTRIES, "CA"];

/**
 * Children's tests, by path prefix (landing and app pages): Times Tables, KS2
 * SATs, 11+, NSW OC and Selective, NAPLAN Year 7, JNVST and AISSEE (Class 6
 * entry), MAP Growth (grades 2 to 5; "/map-growth" also covers its landing). Also /c/ (joining a teacher's class).
 */
export const CHILD_PATH_PREFIXES = [
  "/times-tables",
  "/ks2-sats",
  "/eleven-plus",
  "/11-plus-practice-test",
  "/oc-test",
  "/nsw-selective",
  "/naplan-year-7",
  "/jnvst",
  "/aissee",
  "/map-growth",
  "/c/",
];

export function isChildPath(path: string): boolean {
  return CHILD_PATH_PREFIXES.some((p) => path === p.replace(/\/$/, "") || path.startsWith(p));
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}

export function writeCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${CONSENT_COOKIE_MAX_AGE}; samesite=lax`;
}

export function visitorCountryCookie(): string | null {
  return readCookie(COUNTRY_COOKIE);
}

export function consentChoice(): "granted" | "denied" | null {
  const v = readCookie(CONSENT_COOKIE);
  return v === "granted" || v === "denied" ? v : null;
}

/** True once the visitor has said no to analytics (any country). */
export function analyticsDeclined(): boolean {
  return consentChoice() === "denied";
}

/** Whether the signup email box starts ticked. Unknown country counts as strict. */
export function defaultEmailConsent(): boolean {
  const cc = visitorCountryCookie();
  return !!cc && !EMAIL_OPTIN_COUNTRIES.includes(cc);
}

/** In a teacher's class or a named quiz on this browser (lib/classProgress.ts storage). */
export function inClassOnThisBrowser(): boolean {
  try {
    const list = JSON.parse(localStorage.getItem("tigertest-classes") ?? "[]");
    return Array.isArray(list) && list.length > 0;
  } catch {
    return false;
  }
}

/**
 * Runs in <head> before Google Analytics loads: GA's own kill switch
 * (window["ga-disable-<id>"]) is set unless analytics is allowed here, so a
 * blocked page never sets a GA cookie or sends a hit. components/AnalyticsConsent
 * keeps it current as the person navigates and chooses.
 */
export const ANALYTICS_INIT_SCRIPT = `(function(){var k='ga-disable-${GA_ID}';try{
function ck(n){var m=document.cookie.match(new RegExp('(?:^|; )'+n+'=([^;]*)'));return m?decodeURIComponent(m[1]):null}
var cc=ck('${COUNTRY_COOKIE}'),ch=ck('${CONSENT_COOKIE}'),p=location.pathname;
var kids=${JSON.stringify(CHILD_PATH_PREFIXES)}.some(function(x){return p===x.replace(/\\/$/,'')||p.indexOf(x)===0});
var cls=false;try{var l=JSON.parse(localStorage.getItem('tigertest-classes')||'[]');cls=Array.isArray(l)&&l.length>0}catch(e){}
var strict=cc?${JSON.stringify(COOKIE_CONSENT_COUNTRIES)}.indexOf(cc)>=0:null;
var ok=!kids&&!cls&&ch!=='denied'&&(strict===false||(strict===true&&ch==='granted'));
window[k]=!ok;}catch(e){window[k]=true}})();`;

/** Same rule as ANALYTICS_INIT_SCRIPT, for the client component. */
export function analyticsAllowed(path: string): boolean {
  const cc = visitorCountryCookie();
  if (!cc) return false;
  if (isChildPath(path) || inClassOnThisBrowser()) return false;
  const choice = consentChoice();
  if (choice === "denied") return false;
  return COOKIE_CONSENT_COUNTRIES.includes(cc) ? choice === "granted" : true;
}

export function needsConsentBanner(path: string): boolean {
  const cc = visitorCountryCookie();
  return !!cc && COOKIE_CONSENT_COUNTRIES.includes(cc) && consentChoice() === null && !isChildPath(path);
}

/** Opens the banner again (the "Cookie settings" button on /privacy). */
export const REOPEN_CONSENT_EVENT = "tt-consent-reopen";
