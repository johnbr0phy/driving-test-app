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
import { makeSnapshotRetryPolicy } from "@/lib/server/emailRetryPolicy";
import {
  buildAuthMap,
  getEligibleUsers,
  processBatch,
  verifyCronSecret,
  emailedRecently,
  maxInactiveMs,
} from "@/lib/cron-email";
import { withStudyContext } from "@/lib/email-lifecycle";
import { EXAMS_V2 } from "@/lib/v2/registry";
import { EMAIL_INBOX } from "@/lib/email-inbox";
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

    const contextualUsers = users.flatMap((user) => {
      const scoped = withStudyContext(user);
      return scoped ? [scoped] : [];
    });
    const matches = (u: (typeof users)[number]) => {
      if (Date.now() - u.lastActiveAt.getTime() > maxInactiveMs(u.voice)) return false;
      // V2 retains only 40 results: absence/one result cannot establish a first.
      if (EXAMS_V2.some(e => e.id === u.examId)) return false;
      if (emailedRecently(u)) return false;      // frequency cap
      if (u.completedTests.length !== 1) return false;       // needs exactly 1 test done
      if (u.emailsSent.includes(EMAIL_KEY)) return false;    // already sent

      // Check that the completed test happened in the last 48h
      // (wide window to avoid missing anyone due to cron timing drift)
      const test = u.completedTests[0];
      const completedAt = test?.completedAt ? new Date(test.completedAt) : null;
      if (!completedAt || completedAt < twoDaysAgo || completedAt.getTime() > Date.now() - 24 * 60 * 60 * 1000) return false;

      return true;
    };
    const eligible = contextualUsers.filter(matches);

    const result = await processBatch({
      label: "second-test-nudge",
      emailKey: EMAIL_KEY,
      subject: (u) => EMAIL_INBOX.secondTestNudge(u.voice).subject,
      template: (u) => EMAIL_TEMPLATES.secondTestNudge(u.voice),
      users: eligible,
      retryPolicy: (u) => makeSnapshotRetryPolicy(u.raw, { expiresAt: Math.min(u.lastActiveAt.getTime() + maxInactiveMs(u.voice), new Date(u.completedTests[0].completedAt).getTime() + 48 * 60 * 60_000) }),
      eligible: (fresh, user) => {
        const scoped = withStudyContext({ ...user, raw: fresh, subscription: fresh.subscription ?? {}, emailsSent: Array.isArray(fresh.emailsSent) ? fresh.emailsSent : [],
          lastActiveAt: new Date(Math.max(user.lastActiveAt.getTime(), Date.parse(fresh.lastUpdated) || 0)),
        });
        return !!scoped && scoped.examId === user.examId &&
          scoped.lastUpdated?.getTime() === user.lastUpdated?.getTime() && matches(scoped);
      },
    });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("[second-test-nudge] Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
