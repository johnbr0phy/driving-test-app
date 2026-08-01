/**
 * Cron: Paywall Abandon
 * Schedule: daily at 12:00 UTC (vercel.json)
 *
 * The highest-intent moment in the product. Users who buy do it within minutes
 * of viewing a paywall (p90 = 12 minutes), and only 9% of the ones who walk
 * away ever return on their own. Nothing used to follow up.
 *
 * Sends to users who:
 * - Hit a paywall between 1 and 36 hours ago (logged-in hits only)
 * - Are not premium
 * - Have answered at least 10 questions (filters out bounce traffic)
 * - Haven't received this email yet
 * - Haven't received any other cron email in the last 4 hours
 *
 * The upper bound matters: it stops the first deployment from mailing the
 * entire back catalogue of people who bounced off a paywall weeks ago.
 */

import { NextRequest, NextResponse } from "next/server";
import {
  buildAuthMap,
  getEligibleUsers,
  processBatch,
  verifyCronSecret,
  emailedRecently,
} from "@/lib/cron-email";
import { EMAIL_TEMPLATES } from "@/lib/email-templates";

const EMAIL_KEY = "paywallAbandon";
const INCLUDE_LEGACY = process.env.INCLUDE_LEGACY_CONSENT === "true";

const MIN_AGE_MS = 60 * 60 * 1000; // 1 hour: let the session actually end
// 36 rather than 24 hours. The Vercel Hobby plan only allows daily crons, so a
// 24-hour window would drop anyone who bounced in the hour before a run: by the
// next run they would already be too old. 36 hours overlaps the gap.
const MAX_AGE_MS = 36 * 60 * 60 * 1000;
const MIN_QUESTIONS = 10;

// Deliberately shorter than the 24h default: the signup welcome also stamps
// lastEmailSent, and most abandon targets hit their paywall the same day they
// signed up. A flat 24h cap would suppress the majority of them.
const GAP_MS = 4 * 60 * 60 * 1000;

/** Friendly names for the paywalled items, falling back to the stored label. */
const ITEM_NAMES: Record<string, string> = {
  set_3: "Safety & Emergencies",
  set_4: "State Laws",
  test_3: "Practice Test C",
  test_4: "Practice Test D",
  community_wrong_questions: "the most-missed questions",
  stats_question_list: "your full stats",
};

function paywallName(itemId: string, label: string): string {
  return ITEM_NAMES[itemId] || label || "the locked section";
}

/** The names contain "&", which must be escaped before going into the HTML. */
function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function GET(req: NextRequest) {
  if (!verifyCronSecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = Date.now();
    const authMap = await buildAuthMap();
    const users = await getEligibleUsers(authMap, INCLUDE_LEGACY);

    const eligible = users.filter((u) => {
      if (u.subscription?.isPremium) return false;
      if (u.emailsSent.includes(EMAIL_KEY)) return false;
      if (emailedRecently(u, now, GAP_MS)) return false;
      if (u.questionsAnswered < MIN_QUESTIONS) return false;

      const hit = u.lastPaywallHit;
      if (!hit) return false;

      const age = now - hit.at.getTime();
      return age >= MIN_AGE_MS && age <= MAX_AGE_MS;
    });

    const result = await processBatch({
      label: "paywall-abandon",
      emailKey: EMAIL_KEY,
      subject: (u) => `${paywallName(u.lastPaywallHit!.itemId, u.lastPaywallHit!.label)} is still waiting`,
      template: EMAIL_TEMPLATES.paywallAbandon,
      users: eligible,
      extras: (u) => ({
        paywallName: escapeHtml(paywallName(u.lastPaywallHit!.itemId, u.lastPaywallHit!.label)),
        questionCount: u.questionsAnswered.toString(),
      }),
    });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("[paywall-abandon] Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
