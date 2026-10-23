import { SITEMAP_SEGMENTS } from "@/lib/sitemaps";
import { MetadataRoute } from "next";

// App routes with nothing to cite: practice sessions, accounts, admin. The
// same list applies to every crawler, AI or not, so AI crawl budget goes to
// the landing and state pages people actually ask about.
const DISALLOW = [
  "/api/",
  "/test",
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
  // Exam app routes (/cdl/dashboard, /teas/test/...) are not listed
  // here: they carry a noindex meta tag (lib/examSeo.ts), which
  // crawlers only see when allowed to fetch the page.
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

// "/test" is a prefix rule, so it also caught the /tests hub. The longer
// allow wins for Google and Bing.
const ALLOW = ["/", "/tests"];

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

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
