// The one public origin every canonical, sitemap, hreflang, JSON-LD and
// llms.txt URL is built on. The site is served from www (Vercel sends
// tigertest.io to www with a redirect), so a bare tigertest.io from the
// environment is lifted to www: a canonical must never point at a redirect.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.tigertest.io")
  .replace(/\/$/, "")
  .replace("://tigertest.io", "://www.tigertest.io");
