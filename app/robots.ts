import { SITE_URL } from "@/lib/siteUrl";
import { SITEMAP_SEGMENTS } from "@/lib/sitemaps";
import { MetadataRoute } from "next";

// App routes with nothing to cite: practice sessions, accounts, admin. The
// same list applies to every crawler, AI or not, so AI crawl budget goes to
// the landing and state pages people actually ask about.
export const DISALLOW = [
  "/api/",
  "/test/", // not "/test": that would also block the /tests hub
  "/training",
  "/practice/", // not "/practice": that would also block /practice-tests-by-state
  "/drill", // the DMV miss drill; exam drills (/cdl/drill) are noindex instead
  "/oauth/",
  "/dashboard",
  "/dmv/",
  "/settings",
  "/stats",
  "/admin",
  "/onboarding",
  "/login",
  "/signup",
  "/unsubscribe",
  "/request-test",
  "/upgrade",
  // Exam app routes (/cdl/dashboard, /teas/practice/3?level=exam, /cdl/test/1/results).
  // They are noindex (lib/examSeo.ts) and were left crawlable so Google could read
  // that, but every landing links its dashboard and v2 dashboards link 10 to 20
  // practice URLs each: thousands of noindex fetches while Search Console showed
  // 214 landings "Discovered - currently not indexed" (Nov 23 2026). Blocking them
  // sends that crawl to the landings. No sitemap URL may match these
  // (tests/robots.test.cjs).
  "/*/dashboard",
  "/*/practice/",
  "/*/test/",
  "/*/stats",
  "/*/drill",
];

// AI crawlers, named so a future tightening of the "*" group never shuts them
// out by accident. Search crawlers feed answer engines (OAI-SearchBot for
// ChatGPT Search, Claude-SearchBot, PerplexityBot); user agents fetch a page
// when someone asks about it (ChatGPT-User, Claude-User, Perplexity-User);
// the rest are training or grounding crawlers (GPTBot, ClaudeBot,
// Google-Extended for Gemini and AI Overviews, Applebot-Extended, CCBot).
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "DuckAssistBot",
  "MistralAI-User",
  "CCBot",
];

const ALLOW = ["/"];

export default function robots(): MetadataRoute.Robots {
  const siteUrl = SITE_URL;

  return {
    rules: [
      { userAgent: "*", allow: ALLOW, disallow: DISALLOW },
      { userAgent: AI_CRAWLERS, allow: ALLOW, disallow: DISALLOW },
    ],
    sitemap: [
      `${siteUrl}/sitemap.xml`,
      ...SITEMAP_SEGMENTS.map((segment) => `${siteUrl}/sitemaps/${segment}.xml`),
    ],
  };
}
