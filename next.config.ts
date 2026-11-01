import type { NextConfig } from "next";

// Captured once at build/server-start — used as the Last-Modified header
// on SEO-facing routes so Bingbot, ChatGPT-Bot, etc. see a fresh value
// after each deploy without per-request work.
const BUILD_LAST_MODIFIED = new Date().toUTCString();

const nextConfig: NextConfig = {
  // OG cards read tiger faces from the 256 px copies in assets/og-tigers/
  // (lib/server/ogTigers.ts, built by scripts/build-og-tigers.mjs), never from
  // public/tigers/, which grows with every exam and pushed these functions past
  // Vercel's 250 MB limit when it was traced in.
  outputFileTracingIncludes: {
    "/api/og/score-card": ["./assets/og-tigers/**/*.png"],
    "/og/[examId]": ["./assets/og-tigers/*/tiger_face_03.png", "./public/fonts/share/*"],
    "/og/q/[code]": ["./public/tiger.png", "./public/tiger_face_03.png"],
  },
  // Keep the big public asset folders out of the image functions.
  outputFileTracingExcludes: {
    "/api/og/score-card": ["./public/tigers/**", "./public/landing/**", "./public/basics-audio/**", "./public/logos/**"],
    "/og/[examId]": ["./public/tigers/**", "./public/landing/**", "./public/basics-audio/**", "./public/logos/**"],
    "/og/q/[code]": ["./public/tigers/**", "./public/landing/**", "./public/basics-audio/**", "./public/logos/**"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "*.firebasestorage.app",
      },
    ],
  },
  // Serve the Firebase Auth helper from our own domain so the Google
  // sign-in round trip stays same-origin. Browsers that partition
  // third-party storage (notably Chrome on iOS) intermittently drop the
  // cross-origin handoff from firebaseapp.com back to tigertest.io.
  // Pairs with authDomain: "tigertest.io" in lib/firebase.ts.
  async rewrites() {
    return [
      {
        source: "/__/auth/:path*",
        destination:
          "https://driving-test-app-a5c67.firebaseapp.com/__/auth/:path*",
      },
      {
        source: "/__/firebase/:path*",
        destination:
          "https://driving-test-app-a5c67.firebaseapp.com/__/firebase/:path*",
      },
      // IndexNow key file at the host root (/<key>.txt). The key's location
      // sets which URLs it may submit, so a key served under /api/indexnow/
      // could only vouch for URLs under that folder.
      {
        source: "/:key([0-9a-fA-F]{8,128}).txt",
        destination: "/api/indexnow/key",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/states/:slug",
        destination: "/:slug-dmv-practice-test",
        permanent: true,
      },
      // The DMV dashboard lives beside the exam dashboards now, and picks the
      // state itself. Not permanent: old links (emails, Stripe returns,
      // bookmarks) keep working and their query strings carry over.
      { source: "/dashboard", destination: "/dmv/dashboard", permanent: false },
      { source: "/onboarding/select-state", destination: "/dmv/dashboard", permanent: false },
      // Connector setup and the quiz maker are one page now; #add-to-claude
      // and #add-to-chatgpt anchors survive the redirect.
      { source: "/connect", destination: "/create", permanent: true },
      {
        source: "/questions",
        destination: "/stats",
        permanent: true,
      },
      // Certification landings moved to keyword URLs; the app keeps the short base.
      // The driving-school program became instructor classes at /teach.
      { source: "/schools", destination: "/teach", permanent: true },
      { source: "/schools/:path*", destination: "/teach", permanent: true },
      // The admin pages became tabs on /admin (Oct 2026).
      { source: "/admin/opportunities", destination: "/admin", permanent: false },
      { source: "/admin/v2", destination: "/admin?tab=growth", permanent: false },
      { source: "/admin/teach", destination: "/admin?tab=teachers", permanent: false },
      // Every exam has the same app URLs: /<exam>/dashboard, /<exam>/practice/<n>
      // and /<exam>/test/<n> (bare /<exam> redirects to its dashboard). These map
      // the older shapes: /training?set=n (DMV and v1), /<exam>/train?drill=key
      // (v2; the page swaps the key for its number). Old store-ID test URLs
      // (/cdl/test/101) are mapped by the test page itself.
      { source: "/training", has: [{ type: "query", key: "set", value: "(?<set>\\d+)" }], destination: "/practice/:set", permanent: true },
      { source: "/:exam/training", has: [{ type: "query", key: "set", value: "(?<set>\\d+)" }], destination: "/:exam/practice/:set", permanent: true },
      { source: "/:exam/training", destination: "/:exam/dashboard", permanent: true },
      { source: "/:exam/:state([a-z]{2})/training", has: [{ type: "query", key: "set", value: "(?<set>\\d+)" }], destination: "/:exam/:state/practice/:set", permanent: true },
      { source: "/:exam/:state([a-z]{2})/training", destination: "/:exam/:state/dashboard", permanent: true },
      { source: "/:exam/train", has: [{ type: "query", key: "drill", value: "(?<drill>[A-Za-z0-9_-]+)" }], destination: "/:exam/practice/:drill", permanent: true },
      { source: "/:exam/train", destination: "/:exam/dashboard", permanent: true },
      // These exams moved to the v2 engine (tests 1 and 2); old v1 test ids go to the dashboard.
      { source: "/emt/test/:id(17\\d\\d)/:rest*", destination: "/emt/dashboard", permanent: true },
      { source: "/aws-cloud-practitioner/test/:id(23\\d\\d)/:rest*", destination: "/aws-cloud-practitioner/dashboard", permanent: true },
      { source: "/comptia-a-plus/test/:id(24\\d\\d)/:rest*", destination: "/comptia-a-plus/dashboard", permanent: true },
      { source: "/comptia-security-plus/test/:id(28\\d\\d)/:rest*", destination: "/comptia-security-plus/dashboard", permanent: true },
    ];
  },
  async headers() {
    const seoPaths = [
      "/",
      "/practice-tests-by-state",
      "/tests",
      "/citizenship-test",
      "/:exam(.+-practice-test)",
      "/es/examenes-practica-por-estado",
      "/vi/thi-thu-dmv-theo-tieu-bang",
      "/ko/juibyeol-dmv-pilgi-siheom",
      "/zh/gezhou-dmv-bishi-lianxi",
      "/vi/:state(.+-thi-thu-dmv)",
      "/ko/:state(.+-dmv-pilgi-siheom)",
      "/zh/:state(.+-dmv-bishi-lianxi)",
      "/:state(.+-dmv-practice-test)",
      "/es/:state(.+-examen-practica-dmv)",
    ];

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        // The Firebase Auth helper (proxied via rewrites above) loads
        // /__/auth/iframe inside an iframe on our own pages, which the
        // global DENY would block. Later rules override earlier ones.
        source: "/__/auth/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
        ],
      },
      ...seoPaths.map((source) => ({
        source,
        headers: [
          {
            key: "Last-Modified",
            value: BUILD_LAST_MODIFIED,
          },
        ],
      })),
    ];
  },
};

export default nextConfig;
