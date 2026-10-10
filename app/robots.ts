import { SITEMAP_SEGMENTS } from "@/lib/sitemaps";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/test",
          "/training",
          "/dashboard",
          "/settings",
          "/stats",
          "/admin",
          "/onboarding",
          "/login",
          "/signup",
          "/unsubscribe",
          // Exam app routes (/cdl/dashboard, /teas/test/...) are not listed
          // here: they carry a noindex meta tag (lib/examSeo.ts), which
          // crawlers only see when allowed to fetch the page.
        ],
      },
      // Explicitly allow major AI crawlers
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // Google's AI training/grounding crawler (Gemini, AI Overviews). Gated
      // separately from Googlebot, so it must be allowed explicitly.
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // OpenAI's search crawler (ChatGPT Search), distinct from GPTBot.
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // Perplexity's user-initiated fetch agent, distinct from PerplexityBot.
      {
        userAgent: "Perplexity-User",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // Apple Intelligence / Siri grounding crawler.
      {
        userAgent: "Applebot-Extended",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // Common Crawl — feeds many downstream LLM training sets.
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: [
      `${siteUrl}/sitemap.xml`,
      ...SITEMAP_SEGMENTS.map((segment) => `${siteUrl}/sitemaps/${segment}.xml`),
    ],
  };
}
