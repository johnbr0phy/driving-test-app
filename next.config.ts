import type { NextConfig } from "next";

// Captured once at build/server-start — used as the Last-Modified header
// on SEO-facing routes so Bingbot, ChatGPT-Bot, etc. see a fresh value
// after each deploy without per-request work.
const BUILD_LAST_MODIFIED = new Date().toUTCString();

const nextConfig: NextConfig = {
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
    ];
  },
  async redirects() {
    return [
      {
        source: "/states/:slug",
        destination: "/:slug-dmv-practice-test",
        permanent: true,
      },
      {
        source: "/questions",
        destination: "/stats",
        permanent: true,
      },
    ];
  },
  async headers() {
    const seoPaths = [
      "/",
      "/practice-tests-by-state",
      "/cdl-practice-test",
      "/es/examenes-practica-por-estado",
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
