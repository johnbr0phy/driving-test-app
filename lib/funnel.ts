import { auth } from "@/lib/firebase";

// ─── Visitor funnel ──────────────────────────────────────────────────────────
// The account funnel on /admin/v2 starts at "Created an account", so it can't
// see anyone who left before signing up. These steps count browsers, not
// accounts, from the first page view on: each step fires at most once per
// browser (a localStorage flag), into the analytics/funnel aggregate.
//
//   visit        first page view while signed out, also counted by source
//   answered     first question answered while signed out (tried it first)
//   signup_view  first time the signup page is opened while signed out
//   signup       account created; also stamps users/{uid}.signupOrigin
//
// Browsers that block storage count on every page load; that's rare enough to
// ignore, and the alternative (no dedupe) is far worse.

export type FunnelStep = "visit" | "answered" | "signup_view" | "signup";

// Where a first visit came from, so /admin/v2 can show how many new visitors
// AI answer engines send. Read from utm_source first (ChatGPT tags its links
// utm_source=chatgpt.com), then the referrer.
export const VISIT_SOURCES = ["chatgpt", "perplexity", "gemini", "copilot", "claude", "search", "direct", "other"] as const;
export type VisitSource = (typeof VISIT_SOURCES)[number];

const SOURCE_HOSTS: [VisitSource, RegExp][] = [
  ["chatgpt", /(^|\.)(chatgpt\.com|openai\.com)$/],
  ["perplexity", /(^|\.)perplexity\.ai$/],
  ["gemini", /(^|\.)gemini\.google\.com$/],
  ["copilot", /(^|\.)copilot\.microsoft\.com$/],
  ["claude", /(^|\.)claude\.ai$/],
  ["search", /(^|\.)(google\.[a-z.]+|bing\.com|duckduckgo\.com|search\.yahoo\.com|search\.brave\.com|ecosia\.org)$/],
];

function hostSource(host: string): VisitSource | null {
  const h = host.toLowerCase().replace(/^www\./, "");
  return SOURCE_HOSTS.find(([, re]) => re.test(h))?.[0] ?? null;
}

export function visitSource(): VisitSource {
  try {
    const utm = new URLSearchParams(window.location.search).get("utm_source");
    const fromUtm = utm ? hostSource(utm) : null;
    if (fromUtm) return fromUtm;
    if (!document.referrer) return "direct";
    const host = new URL(document.referrer).hostname;
    if (host === window.location.hostname) return "direct";
    return hostSource(host) ?? "other";
  } catch {
    return "other";
  }
}

const FLAG_PREFIX = "tigertest-funnel:";

function hasFlag(step: FunnelStep): boolean {
  try {
    return localStorage.getItem(FLAG_PREFIX + step) !== null;
  } catch {
    return false;
  }
}

function setFlag(step: FunnelStep) {
  try {
    localStorage.setItem(FLAG_PREFIX + step, new Date().toISOString());
  } catch {
    // Storage blocked; see the note above.
  }
}

/** Steps before signup: counted only while nobody is signed in. */
export function trackFunnelStep(step: Exclude<FunnelStep, "signup">) {
  if (typeof window === "undefined" || auth.currentUser || hasFlag(step)) return;
  setFlag(step);
  void post(step === "visit" ? { step, source: visitSource() } : { step });
}

/** A brand-new account. Tags it with whether this browser practiced first. */
export function trackFunnelSignup() {
  if (typeof window === "undefined" || hasFlag("signup")) return;
  setFlag("signup");
  void post({ step: "signup", triedFirst: hasFlag("answered") });
}

async function post(body: { step: FunnelStep; triedFirst?: boolean; source?: VisitSource }) {
  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    const user = auth.currentUser;
    if (body.step === "signup" && user) {
      try {
        headers.Authorization = `Bearer ${await user.getIdToken()}`;
      } catch {
        // Count it without the per-account stamp.
      }
    }
    await fetch("/api/analytics/funnel", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      keepalive: true,
    });
  } catch {
    // Analytics must never surface errors to the user.
  }
}
