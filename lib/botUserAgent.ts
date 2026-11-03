// Who is a bot, by user agent. No imports: middleware.ts uses it too.
//
// The anonymous counters behind /admin (visits, answers, searches, paywall
// views, shares...) count people, so every analytics route drops a request
// that `isBotUserAgent()` flags. Three kinds of bot:
//
// 1. Named crawlers ("bot", "spider", AI fetchers acting for a person).
// 2. Automation that says so (HeadlessChrome, curl, python-requests...).
// 3. Scraper fleets posing as desktop Chrome on a version months out of date.
//    Desktop Chrome and Edge update themselves within weeks, so a desktop
//    Chrome far behind the current release is a frozen headless build. In Nov
//    2026 fleets from China, Hong Kong and Singapore ran Chrome 103 to 150
//    while people were on 156 and 157, and each one fired the first-visit
//    beacon on every page load. Phones are never judged by version (Samsung
//    Internet and some in-app browsers report an older engine).

/** Named crawlers and AI fetchers. Claude-User and Perplexity-User carry no "bot", so they are named. */
export const CRAWLER_UA =
  /bot|crawler|spider|slurp|bingpreview|facebookexternalhit|embedly|preview|lighthouse|claude-user|perplexity-user|chatgpt|google-extended|ccbot|anthropic/i;

/** Automation that names itself. */
const AUTOMATION_UA =
  /headless|phantomjs|puppeteer|playwright|selenium|webdriver|electron\/|curl\/|wget\/|python-|python\/|aiohttp|httpx|go-http-client|java\/|okhttp|axios\/|node-fetch|undici|libwww|scrapy|httpclient/i;

// Chrome's stable major on a known date, and the release cadence since 2023 (4 weeks).
const CHROME_ANCHOR_MAJOR = 156;
const CHROME_ANCHOR_MS = Date.UTC(2026, 9, 20); // 20 Oct 2026
const CHROME_CYCLE_MS = 28 * 24 * 60 * 60 * 1000;
/** A desktop Chrome this many majors behind current stable is treated as a bot (about 5 months). */
export const STALE_CHROME_MAJORS = 5;

/** Current stable Chrome major, estimated from the release cadence. */
export function currentChromeMajor(now = Date.now()): number {
  return CHROME_ANCHOR_MAJOR + Math.max(0, Math.floor((now - CHROME_ANCHOR_MS) / CHROME_CYCLE_MS));
}

// Windows 10/11, macOS and Linux only: ChromeOS (school Chromebooks past their
// update date) and Windows 7/8 (frozen at Chrome 109) keep old versions for real people.
const DESKTOP_UA = /Windows NT 10\.0|Macintosh|X11/;
const MOBILE_UA = /Mobile|Android|iPhone|iPad|iPod|CrOS/;

export function isBotUserAgent(ua: string | null | undefined, now = Date.now()): boolean {
  if (!ua || ua.length < 20) return true;
  if (CRAWLER_UA.test(ua) || AUTOMATION_UA.test(ua)) return true;
  if (DESKTOP_UA.test(ua) && !MOBILE_UA.test(ua)) {
    const m = /\bChrome\/(\d+)\./.exec(ua);
    if (m && Number(m[1]) <= currentChromeMajor(now) - STALE_CHROME_MAJORS) return true;
  }
  return false;
}

/** For API routes: true when the request came from a bot and must not be counted. */
export function isBotRequest(request: { headers: { get(name: string): string | null } }): boolean {
  return isBotUserAgent(request.headers.get('user-agent'));
}
