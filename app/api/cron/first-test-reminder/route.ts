/**
 * Cron: First Test Reminder
 * Schedule: daily at 10:00 UTC (vercel.json)
 *
 * Sends to users who:
 * - Signed up 24+ hours ago
 * - Have completed 0 tests
 * - Haven't received this email yet
 * - Have emailConsent = true (or missing, if INCLUDE_LEGACY_CONSENT=true)
 */

import { NextRequest, NextResponse } from "next/server";
import {
  buildAuthMap,
  getEligibleUsers,
  sendCronEmail,
  verifyCronSecret,
  buildHtml,
  MAX_BATCH,
} from "@/lib/cron-email";
import { EMAIL_TEMPLATES } from "@/lib/email-templates";

const EMAIL_KEY = "firstTestReminder";
const INCLUDE_LEGACY = process.env.INCLUDE_LEGACY_CONSENT === "true";

export async function GET(req: NextRequest) {
  if (!verifyCronSecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const authMap = await buildAuthMap();
    const users = await getEligibleUsers(authMap, INCLUDE_LEGACY);

    const eligible = users.filter((u) => {
      if (u.creationTime > oneDayAgo) return false;          // too new
      if (u.completedTests.length > 0) return false;         // already tested
      if (u.emailsSent.includes(EMAIL_KEY)) return false;    // already sent
      return true;
    });

    const batch = eligible.slice(0, MAX_BATCH);
    let sent = 0;

    for (const user of batch) {
      try {
        const html = buildHtml(EMAIL_TEMPLATES.firstTestReminder, user.uid);
        await sendCronEmail(
          user.uid,
          user.email,
          "Quick check-in from TigerTest",
          html,
          EMAIL_KEY
        );
        sent++;
      } catch (err) {
        console.error(`[first-test-reminder] Failed for ${user.uid}:`, err);
      }
    }

    console.log(`[first-test-reminder] sent=${sent} eligible=${eligible.length}`);
    return NextResponse.json({ sent, eligible: eligible.length });
  } catch (err: any) {
    console.error("[first-test-reminder] Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
