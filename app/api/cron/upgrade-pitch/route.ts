/**
 * Cron: Upgrade Pitch
 * Schedule: daily at 11:00 UTC (vercel.json)
 *
 * Sends to users who:
 * - Signed up 3+ days ago
 * - Completed 2+ tests
 * - Are not premium
 * - Haven't received this email yet
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

const EMAIL_KEY = "upgradePitch";
const INCLUDE_LEGACY = process.env.INCLUDE_LEGACY_CONSENT === "true";

export async function GET(req: NextRequest) {
  if (!verifyCronSecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    const authMap = await buildAuthMap();
    const users = await getEligibleUsers(authMap, INCLUDE_LEGACY);

    const eligible = users.filter((u) => {
      if (u.creationTime > threeDaysAgo) return false;       // too new
      if (u.completedTests.length < 2) return false;         // needs 2+ tests
      if (u.subscription?.isPremium) return false;           // already premium
      if (u.emailsSent.includes(EMAIL_KEY)) return false;    // already sent
      return true;
    });

    const batch = eligible.slice(0, MAX_BATCH);
    let sent = 0;

    for (const user of batch) {
      try {
        const html = buildHtml(EMAIL_TEMPLATES.upgradePitch, user.uid, {
          testCount: user.completedTests.length.toString(),
        });
        await sendCronEmail(
          user.uid,
          user.email,
          "You're doing the work 💪",
          html,
          EMAIL_KEY
        );
        sent++;
      } catch (err) {
        console.error(`[upgrade-pitch] Failed for ${user.uid}:`, err);
      }
    }

    console.log(`[upgrade-pitch] sent=${sent} eligible=${eligible.length}`);
    return NextResponse.json({ sent, eligible: eligible.length });
  } catch (err: any) {
    console.error("[upgrade-pitch] Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
