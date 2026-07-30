/**
 * Cron: Re-engagement
 * Schedule: daily at 09:00 UTC (vercel.json)
 *
 * Sends to users who:
 * - Signed up 7+ days ago
 * - Have completed at least 1 test
 * - Haven't been active for 5+ days (last test completion)
 * - Haven't received this email yet
 */

import { NextRequest, NextResponse } from "next/server";
import {
  buildAuthMap,
  getEligibleUsers,
  processBatch,
  verifyCronSecret,
} from "@/lib/cron-email";
import { EMAIL_TEMPLATES } from "@/lib/email-templates";

const EMAIL_KEY = "reengagement";
const INCLUDE_LEGACY = process.env.INCLUDE_LEGACY_CONSENT === "true";

export async function GET(req: NextRequest) {
  if (!verifyCronSecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const fiveDaysAgo = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000);
    const authMap = await buildAuthMap();
    const users = await getEligibleUsers(authMap, INCLUDE_LEGACY);

    const eligible = users.filter((u) => {
      if (u.creationTime > sevenDaysAgo) return false;       // too new
      if (u.completedTests.length === 0) return false;       // never tested
      if (u.emailsSent.includes(EMAIL_KEY)) return false;    // already sent

      // Find the most recent test completion date
      const lastTestDate = u.completedTests.reduce(
        (latest: Date | null, test: any) => {
          const d = test?.completedAt ? new Date(test.completedAt) : null;
          if (!d) return latest;
          return !latest || d > latest ? d : latest;
        },
        null
      );

      // Must not have tested in the last 5 days
      if (!lastTestDate || lastTestDate > fiveDaysAgo) return false;

      return true;
    });

    const result = await processBatch({
      label: "reengagement",
      emailKey: EMAIL_KEY,
      subject: "Test coming up soon?",
      template: EMAIL_TEMPLATES.reengagement,
      users: eligible,
    });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("[reengagement] Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
