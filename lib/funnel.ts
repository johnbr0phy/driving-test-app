import { auth } from "@/lib/firebase";
import { isInternalBrowser } from "@/lib/internal";

// ─── Visitor funnel ──────────────────────────────────────────────────────────
// The account funnel on the /admin Growth tab starts at "Created an account", so it can't
// see anyone who left before signing up. These steps count browsers, not
// accounts, from the first page view on: each step fires at most once per
// browser (a localStorage flag), into the analytics/funnel aggregate.
//
//   visit        first page view while signed out, also counted by source
//   answered     first question answered while signed out (tried it first)
//   signup_view  first time the signup page is opened while signed out
//   dmv_picker   the DMV dashboard's state picker shown (no state yet, not
//                arriving with a ?state= link from a state landing)
//   dmv_state    a state chosen in that picker; dmv_picker minus dmv_state is
//                the browsers that met the picker and never chose a state
//   signup       account created; also stamps signupOrigins/{uid} with
//                whether it practiced first and the first visit's source and
//                landing page (kept from the visit step in localStorage)
//
// Browsers that block storage count on every page load; that's rare enough to
// ignore, and the alternative (no dedupe) is far worse.

export type FunnelStep = "visit" | "answered" | "signup_view" | "dmv_picker" | "dmv_state" | "signup";

// Where a first visit came from, so the /admin Growth tab can show how many new visitors
// AI answer engines send. Read from utm_source first (ChatGPT tags its links
// utm_source=chatgpt.com), then the referrer. Android apps send an
// android-app://<package>/ referrer, so the AI apps' package names are listed
// beside their sites. Claude's and Gemini's apps often send no referrer at all,
// so a referrer-less first visit is also flagged when it lands on a deep page
// (not the home page): nobody types tigertest.io/cdl-practice-test, but a
// link from an answer engine, a chat or a bookmark lands there.
export const VISIT_SOURCES = ["chatgpt", "perplexity", "gemini", "copilot", "claude", "ai_other", "search", "direct", "other"] as const;
export type VisitSource = (typeof VISIT_SOURCES)[number];

const SOURCE_HOSTS: [VisitSource, RegExp][] = [
  ["chatgpt", /(^|\.)(chatgpt\.com|openai\.com|com\.openai\.chatgpt)$/],
  ["perplexity", /(^|\.)(perplexity\.ai|pplx\.ai|ai\.perplexity\.app\.android)$/],
  ["gemini", /(^|\.)(gemini\.google\.com|bard\.google\.com|com\.google\.android\.apps\.bard)$/],
  // Copilot in the Edge sidebar refers from edgeservices.bing.com; Copilot on
  // bing.com itself can't be told from Bing search.
  ["copilot", /(^|\.)(copilot\.microsoft\.com|copilot\.cloud\.microsoft|copilot\.com|edgeservices\.bing\.com|com\.microsoft\.copilot)$/],
  ["claude", /(^|\.)(claude\.ai|claude\.com|com\.anthropic\.claude)$/],
  ["ai_other", /(^|\.)(deepseek\.com|grok\.com|x\.ai|meta\.ai|you\.com|phind\.com|chat\.mistral\.ai|poe\.com|kimi\.com|chat\.qwen\.ai|duck\.ai)$/],
  ["search", /(^|\.)(google\.[a-z.]+|bing\.com|duckduckgo\.com|search\.yahoo\.com|search\.brave\.com|ecosia\.org|com\.google\.android\.googlequicksearchbox)$/],
];

// utm_source values without a domain (utm_source=perplexity, =copilot).
const UTM_NAMES: [VisitSource, RegExp][] = [
  ["chatgpt", /^(chatgpt|openai)/],
  ["perplexity", /^perplexity/],
  ["gemini", /^gemini/],
  ["copilot", /^copilot/],
  ["claude", /^claude/],
  ["ai_other", /^(deepseek|grok|meta\.?ai|you|phind|mistral|poe)/],
];

function hostSource(host: string): VisitSource | null {
  const h = host.toLowerCase().replace(/^www\./, "");
  return SOURCE_HOSTS.find(([, re]) => re.test(h))?.[0] ?? null;
}

function utmSource(utm: string): VisitSource | null {
  const u = utm.toLowerCase().trim();
  return hostSource(u) ?? UTM_NAMES.find(([, re]) => re.test(u))?.[0] ?? null;
}

export function visitSource(): VisitSource {
  try {
    const utm = new URLSearchParams(window.location.search).get("utm_source");
    const fromUtm = utm ? utmSource(utm) : null;
    if (fromUtm) return fromUtm;
    if (!document.referrer) return "direct";
    const host = new URL(document.referrer).hostname;
    if (host === window.location.hostname) return "direct";
    return hostSource(host) ?? "other";
  } catch {
    return "other";
  }
}

/** A referrer-less first visit that landed somewhere other than the home page. */
function isDeepDirect(source: VisitSource): boolean {
  return source === "direct" && window.location.pathname !== "/";
}

const FLAG_PREFIX = "tigertest-funnel:";
const FIRST_VISIT_KEY = "tigertest-funnel-first-visit";

type FirstVisit = { source: VisitSource; landing: string };

function saveFirstVisit(visit: FirstVisit) {
  try {
    localStorage.setItem(FIRST_VISIT_KEY, JSON.stringify(visit));
  } catch {
    // Storage blocked: the signup is counted without a source.
  }
}

function readFirstVisit(): FirstVisit | null {
  try {
    const raw = localStorage.getItem(FIRST_VISIT_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed && (VISIT_SOURCES as readonly string[]).includes(parsed.source) && typeof parsed.landing === "string") {
      return { source: parsed.source, landing: parsed.landing };
    }
  } catch {
    // Unreadable: no source.
  }
  return null;
}

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
  if (typeof window === "undefined" || auth.currentUser || hasFlag(step) || isInternalBrowser()) return;
  setFlag(step);
  if (step !== "visit") return void post({ step });
  const source = visitSource();
  // The path only, never the query string, which can carry personal data.
  saveFirstVisit({ source, landing: window.location.pathname.slice(0, 120) });
  void post({ step, source, deep: isDeepDirect(source) || undefined });
}

/** A brand-new account. Tags it with whether this browser practiced first. */
export function trackFunnelSignup() {
  if (typeof window === "undefined" || hasFlag("signup") || isInternalBrowser(auth.currentUser?.email)) return;
  setFlag("signup");
  const firstVisit = readFirstVisit();
  void post({ step: "signup", triedFirst: hasFlag("answered"), source: firstVisit?.source, landing: firstVisit?.landing });
}

async function post(body: { step: FunnelStep; triedFirst?: boolean; source?: VisitSource; deep?: boolean; landing?: string }) {
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
