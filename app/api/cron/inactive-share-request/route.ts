/**
 * Cron: Inactive Share Request
 * Schedule: daily at 15:00 UTC (vercel.json)
 *
 * Sends to users who:
 * - Have completed at least 1 test
 * - Haven't been active for 20–45 days (last test completion or lastUpdated)
 * - Haven't received this email yet
 * - Haven't received any other cron email in the last 24 hours
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

const EMAIL_KEY = "inactiveShareRequest";
const INCLUDE_LEGACY = process.env.INCLUDE_LEGACY_CONSENT === "true";
const MAX_STALE_MS = 45 * 24 * 60 * 60 * 1000;

export async function GET(req: NextRequest) {
  if (!verifyCronSecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const twentyDaysAgo = new Date(Date.now() - 20 * 24 * 60 * 60 * 1000);
    const authMap = await buildAuthMap();
    // Win-back: exempt from the three-day rule, bounded at 45 days instead.
    const users = await getEligibleUsers(authMap, INCLUDE_LEGACY, true);

    const eligible = users.filter((u) => {
      if (emailedRecently(u)) return false;      // frequency cap
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

      // ...and no more than 45. "Did you pass?" six months late is noise.
      if (lastActivity.getTime() < Date.now() - MAX_STALE_MS) return false;

      return true;
    });

    const result = await processBatch({
      label: "inactive-share-request",
      emailKey: EMAIL_KEY,
      subject: "Did you pass?",
      template: EMAIL_TEMPLATES.inactiveShareRequest,
      users: eligible,
    });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("[inactive-share-request] Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
