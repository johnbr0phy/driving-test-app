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
import { makeSnapshotRetryPolicy } from "@/lib/server/emailRetryPolicy";
import {
  buildAuthMap,
  getEligibleUsers,
  processBatch,
  verifyCronSecret,
  emailedRecently,
  latestPaywallHit,
  maxInactiveMs,
} from "@/lib/cron-email";
import { voiceFor } from "@/lib/email-voice";
import { EMAIL_INBOX } from "@/lib/email-inbox";
import { EMAIL_TEMPLATES } from "@/lib/email-templates";
import { V2_PAYWALL_PREFIX } from "@/lib/v2/premium";
import { studyContexts, hasClassStatsAccess } from "@/lib/email-lifecycle";

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
  full_stats: "your full stats",
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

    const eligible = users.map(u => ({ ...u, examId: "dmv", voice: voiceFor("dmv"),
      questionsAnswered: studyContexts(u.raw, now).find(context => context.examId === "dmv")?.answersObserved ?? 0,
    })).filter((u) => {
      if (now - u.lastActiveAt.getTime() > maxInactiveMs(u.voice)) return false;
      if (!u.voice.hasPremium) return false;                 // only the DMV has paywalls
      if (u.subscription?.isPremium) return false;
      if (u.emailsSent.includes(EMAIL_KEY)) return false;
      if (emailedRecently(u, now, GAP_MS)) return false;
      if (u.questionsAnswered < MIN_QUESTIONS) return false;

      const hit = u.lastPaywallHit;
      if (!hit) return false;
      // Event identity is location + feature, not the account's mutable exam.
      const dashboardItem = /^(set_[34]|test_[34]|drill_test_[1-4])$/.test(hit.itemId);
      const statsItem = ["full_stats", "stats_question_list", "community_wrong_questions"].includes(hit.itemId);
      if (statsItem && hasClassStatsAccess(u.raw, "dmv")) return false;
      if (!((hit.location === "dashboard" && dashboardItem) || (hit.location === "stats_page" && statsItem))) return false;
      // This email is about the DMV paywalls. An SAT or ACT paywall would be
      // quoted back with DMV copy and a DMV link, so skip those.
      if (hit.itemId.startsWith(V2_PAYWALL_PREFIX)) return false;

      const age = now - hit.at.getTime();
      return age >= MIN_AGE_MS && age <= MAX_AGE_MS;
    });

    const result = await processBatch({
      label: "paywall-abandon",
      emailKey: EMAIL_KEY,
      subject: (u) => EMAIL_INBOX.paywallAbandon(u.voice, paywallName(u.lastPaywallHit!.itemId, u.lastPaywallHit!.label)).subject,
      template: (u) => EMAIL_TEMPLATES.paywallAbandon(u.voice),
      users: eligible,
      retryPolicy: (u) => makeSnapshotRetryPolicy(u.raw, { expiresAt: Math.min(u.lastActiveAt.getTime() + maxInactiveMs(u.voice), u.lastPaywallHit!.at.getTime() + MAX_AGE_MS) }),
      gapMs: GAP_MS,
      eligible: (fresh, user) => {
        const latest = latestPaywallHit(fresh.paywallHits);
        if (latest?.location === "stats_page" && hasClassStatsAccess(fresh, "dmv")) return false;
        const now = Date.now();
        if (!latest || now - latest.at.getTime() < MIN_AGE_MS || now - latest.at.getTime() > MAX_AGE_MS) return false;
        if ((studyContexts(fresh, now).find(context => context.examId === "dmv")?.answersObserved ?? 0) < MIN_QUESTIONS) return false;
        return fresh.subscription?.isPremium !== true && !!latest &&
          latest.key === user.lastPaywallHit?.key && latest.at.getTime() === user.lastPaywallHit.at.getTime() &&
          latest.location === user.lastPaywallHit.location && latest.itemId === user.lastPaywallHit.itemId;
      },
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
