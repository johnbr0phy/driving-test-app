/**
 * Cron: Upgrade Pitch
 * Schedule: daily at 11:00 UTC (vercel.json)
 *
 * Sends to users who:
 * - Signed up 24+ hours ago
 * - Have answered 50+ questions OR completed 1+ test
 * - Are not premium
 * - Haven't received this email yet
 * - Haven't received any other cron email in the last 24 hours
 *
 * Re-gated 2026-07-29. The old rule (3+ days old AND 2+ completed tests) waited
 * until most of the audience was gone: 77% of non-payers are active on exactly
 * one day, and half of all buyers purchase within 24 hours of signing up. It
 * also measured the wrong thing. Completed tests miss the 569 users who have
 * answered 25+ questions in training and never finished a test, and questions
 * answered is what actually separates buyers (median 400) from everyone else
 * (median 12).
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

const EMAIL_KEY = "upgradePitch";
const INCLUDE_LEGACY = process.env.INCLUDE_LEGACY_CONSENT === "true";
const MIN_QUESTIONS = 50;

export async function GET(req: NextRequest) {
  if (!verifyCronSecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = Date.now();
    const oneDayAgo = new Date(now - 24 * 60 * 60 * 1000);
    const authMap = await buildAuthMap();
    const users = await getEligibleUsers(authMap, INCLUDE_LEGACY);

    const eligible = users.filter((u) => {
      if (u.creationTime > oneDayAgo) return false;          // too new
      if (u.subscription?.isPremium) return false;           // already premium
      if (u.emailsSent.includes(EMAIL_KEY)) return false;    // already sent
      if (emailedRecently(u, now)) return false;             // frequency cap
      // Staleness is handled centrally by the three-day rule in
      // getEligibleUsers, so there is no idle check here.
      return u.questionsAnswered >= MIN_QUESTIONS || u.completedTests.length >= 1;
    });

    const result = await processBatch({
      label: "upgrade-pitch",
      emailKey: EMAIL_KEY,
      subject: "You're doing the work 💪",
      template: EMAIL_TEMPLATES.upgradePitch,
      users: eligible,
      extras: (u) => ({ questionCount: u.questionsAnswered.toString() }),
    });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("[upgrade-pitch] Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
