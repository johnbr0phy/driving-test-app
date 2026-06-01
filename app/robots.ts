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
          "/cdl/dashboard",
          "/cdl/stats",
          "/cdl/test",
          "/cdl/training",
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
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
