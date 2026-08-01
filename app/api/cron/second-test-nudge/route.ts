/**
 * Cron: Second Test Nudge
 * Schedule: daily at 14:00 UTC (vercel.json)
 *
 * Replaces the Firebase Firestore onUpdate trigger.
 * Sends to users who:
 * - Completed exactly 1 test
 * - That test was completed in the last 24–48 hours (catches yesterday's completions)
 * - Haven't received this email yet
 * - Haven't received any other cron email in the last 24 hours
 *
 * Note: Without a real-time trigger, this fires once daily.
 * Max delay vs. the original trigger: ~24 hours. Acceptable for this use case.
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

const EMAIL_KEY = "secondTestNudge";
const INCLUDE_LEGACY = process.env.INCLUDE_LEGACY_CONSENT === "true";

export async function GET(req: NextRequest) {
  if (!verifyCronSecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);
    const authMap = await buildAuthMap();
    const users = await getEligibleUsers(authMap, INCLUDE_LEGACY);

    const eligible = users.filter((u) => {
      if (emailedRecently(u)) return false;      // frequency cap
      if (u.completedTests.length !== 1) return false;       // needs exactly 1 test done
      if (u.emailsSent.includes(EMAIL_KEY)) return false;    // already sent

      // Check that the completed test happened in the last 48h
      // (wide window to avoid missing anyone due to cron timing drift)
      const test = u.completedTests[0];
      const completedAt = test?.completedAt ? new Date(test.completedAt) : null;
      if (!completedAt || completedAt < twoDaysAgo) return false;

      return true;
    });

    const result = await processBatch({
      label: "second-test-nudge",
      emailKey: EMAIL_KEY,
      subject: "Nice work on test #1!",
      template: EMAIL_TEMPLATES.secondTestNudge,
      users: eligible,
    });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("[second-test-nudge] Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
