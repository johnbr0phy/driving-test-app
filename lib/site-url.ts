/**
 * Canonical public origin for TigerTest.
 *
 * The site is served on www.tigertest.io: Vercel redirects the apex there
 * (keep that redirect a permanent 308 in Vercel → Settings → Domains) and
 * Firebase Auth is pinned to the www origin in lib/firebase.ts. Every
 * canonical tag, sitemap entry, hreflang link, og:url, email link and
 * structured-data URL must use this same host, otherwise crawlers see a
 * canonical that redirects and have to pick a winner themselves.
 *
 * NEXT_PUBLIC_SITE_URL overrides it (preview deploys, local dev).
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.tigertest.io"
).replace(/\/+$/, "");
