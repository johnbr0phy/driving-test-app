/**
 * Cron: Paywall Follow-Up
 * Schedule: daily at 12:00 UTC (vercel.json)
 *
 * Retargets users who hit a paywall but didn't convert. Sends to users who:
 * - Hit a paywall 1-14 days ago (never same-day — feels like surveillance;
 *   never stale — the intent is gone)
 * - Are not premium
 * - Haven't received this email yet (strictly one-shot — the copy promises
 *   "this is the only email we'll send about it")
 * - Haven't received ANY email in the last 48h (avoids stacking with
 *   upgrade-pitch, which runs an hour earlier)
 *
 * The email is personalized to the paywall they hit most often, but only at
 * the feature level ("Full stats is behind the premium wall") — no timestamps,
 * counts, or "we saw you" language.
 */

import { NextRequest, NextResponse } from "next/server";
import {
  buildAuthMap,
  getEligibleUsers,
  sendCronEmail,
  verifyCronSecret,
  buildHtml,
  MAX_BATCH,
  PaywallHit,
} from "@/lib/cron-email";
import { EMAIL_TEMPLATES } from "@/lib/email-templates";

const EMAIL_KEY = "paywallFollowUp";
const INCLUDE_LEGACY = process.env.INCLUDE_LEGACY_CONSENT === "true";

const DAY_MS = 24 * 60 * 60 * 1000;
const MIN_HIT_AGE_MS = 1 * DAY_MS;
const MAX_HIT_AGE_MS = 14 * DAY_MS;
const EMAIL_COOLDOWN_MS = 2 * DAY_MS;

// Feature-level copy per paywall itemId. Kept generic on purpose — the email
// names the feature they wanted, not when or how often they wanted it.
const FEATURE_COPY: Record<string, { name: string; blurb: string }> = {
  test_4: {
    name: "practice test 4",
    blurb:
      "One more full 50-question exam means one more dry run before the real thing. Each test covers different questions, so test 4 is 50 questions you haven't been graded on yet.",
  },
  set_4: {
    name: "training set 4",
    blurb:
      "Training set 4 is 50 more questions with instant feedback and spaced repetition on the ones you miss — the fastest way to patch the gaps the tests found.",
  },
  full_stats: {
    name: "the full stats page",
    blurb:
      "The full stats page shows your performance question by question — which ones you always get right, and which ones keep tripping you up. It turns \"am I ready?\" into an actual number.",
  },
  stats_question_list: {
    name: "the full question breakdown",
    blurb:
      "The full question breakdown lists every question you've seen with your track record on each — so you study the ones you actually miss instead of re-reading everything.",
  },
  community_wrong_questions: {
    name: "the most-missed questions list",
    blurb:
      "The most-missed questions list shows the questions other test-takers in your state get wrong most often — the exact ones most likely to trip you up on exam day.",
  },
};

const DEFAULT_COPY = {
  name: "a premium feature",
  blurb:
    "Premium is everything we couldn't fit in the free tier: a fourth full practice test, a fourth training set, and complete stats on every question you've answered.",
};

/** Pick the paywall the user cares about most: highest count, then most recent. */
function pickTopHit(hits: PaywallHit[]): PaywallHit {
  return hits.reduce((best, h) => {
    if (h.count !== best.count) return h.count > best.count ? h : best;
    return h.lastAt > best.lastAt ? h : best;
  });
}

export async function GET(req: NextRequest) {
  if (!verifyCronSecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = Date.now();
    const authMap = await buildAuthMap();
    const users = await getEligibleUsers(authMap, INCLUDE_LEGACY);

    const eligible: { uid: string; email: string; hit: PaywallHit }[] = [];

    for (const u of users) {
      if (u.subscription?.isPremium) continue;
      if (u.emailsSent.includes(EMAIL_KEY)) continue;
      if (u.lastEmailSent && now - u.lastEmailSent.getTime() < EMAIL_COOLDOWN_MS) continue;

      const recentHits = Object.values(u.paywallHits).filter((h) => {
        const t = Date.parse(h?.lastAt ?? "");
        if (Number.isNaN(t)) return false;
        const age = now - t;
        return age >= MIN_HIT_AGE_MS && age <= MAX_HIT_AGE_MS;
      });
      if (recentHits.length === 0) continue;

      eligible.push({ uid: u.uid, email: u.email, hit: pickTopHit(recentHits) });
    }

    const batch = eligible.slice(0, MAX_BATCH);
    let sent = 0;

    for (const { uid, email, hit } of batch) {
      try {
        const copy = FEATURE_COPY[hit.itemId] ?? DEFAULT_COPY;
        const html = buildHtml(EMAIL_TEMPLATES.paywallFollowUp, uid, {
          featureName: copy.name,
          featureBlurb: copy.blurb,
        });
        await sendCronEmail(uid, email, "About that locked feature 🔒", html, EMAIL_KEY);
        sent++;
      } catch (err) {
        console.error(`[paywall-followup] Failed for ${uid}:`, err);
      }
    }

    console.log(`[paywall-followup] sent=${sent} eligible=${eligible.length}`);
    return NextResponse.json({ sent, eligible: eligible.length });
  } catch (err: any) {
    console.error("[paywall-followup] Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
