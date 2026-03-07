/**
 * Cron: Inactive Share Request
 * Schedule: daily at 15:00 UTC (vercel.json)
 *
 * Sends to users who:
 * - Have completed at least 1 test
 * - Haven't been active for 20+ days (last test completion or lastUpdated)
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

const EMAIL_KEY = "inactiveShareRequest";
const INCLUDE_LEGACY = process.env.INCLUDE_LEGACY_CONSENT === "true";

export async function GET(req: NextRequest) {
  if (!verifyCronSecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const twentyDaysAgo = new Date(Date.now() - 20 * 24 * 60 * 60 * 1000);
    const authMap = await buildAuthMap();
    const users = await getEligibleUsers(authMap, INCLUDE_LEGACY);

    const eligible = users.filter((u) => {
      if (u.completedTests.length === 0) return false;         // never tested
      if (u.emailsSent.includes(EMAIL_KEY)) return false;      // already sent

      // Find the most recent activity: last test completion or lastUpdated
      const lastTestDate = u.completedTests.reduce(
        (latest: Date | null, test: any) => {
          const d = test?.completedAt ? new Date(test.completedAt) : null;
          if (!d) return latest;
          return !latest || d > latest ? d : latest;
        },
        null
      );

      const lastActivity = [lastTestDate, u.lastUpdated]
        .filter((d): d is Date => d instanceof Date)
        .reduce((a, b) => (a > b ? a : b), new Date(0));

      // Must not have been active in the last 20 days
      if (lastActivity > twentyDaysAgo) return false;

      return true;
    });

    const batch = eligible.slice(0, MAX_BATCH);
    let sent = 0;

    for (const user of batch) {
      try {
        const html = buildHtml(EMAIL_TEMPLATES.inactiveShareRequest, user.uid);
        await sendCronEmail(
          user.uid,
          user.email,
          "Did you pass?",
          html,
          EMAIL_KEY
        );
        sent++;
      } catch (err) {
        console.error(`[inactive-share-request] Failed for ${user.uid}:`, err);
      }
    }

    console.log(`[inactive-share-request] sent=${sent} eligible=${eligible.length}`);
    return NextResponse.json({ sent, eligible: eligible.length });
  } catch (err: any) {
    console.error("[inactive-share-request] Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
