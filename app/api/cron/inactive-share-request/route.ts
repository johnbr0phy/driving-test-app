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
import { withStudyContext } from "@/lib/email-lifecycle";
import { EXAMS_V2 } from "@/lib/v2/registry";
import { EMAIL_INBOX } from "@/lib/email-inbox";
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

    const contextualUsers = users.flatMap((user) => {
      const scoped = withStudyContext(user);
      return scoped ? [scoped] : [];
    });
    const matches = (u: (typeof users)[number]) => {
      // Rebinding context must not activate an unapproved V2 campaign audience.
      if (EXAMS_V2.some(exam => exam.id === u.examId)) return false;
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

      const lastActivity = [lastTestDate, u.lastUpdated, u.lastActiveAt]
        .filter((d): d is Date => d instanceof Date)
        .reduce((a, b) => (a > b ? a : b), new Date(0));

      // Must not have been active in the last 20 days
      if (lastActivity > twentyDaysAgo) return false;

      // ...and no more than 45. "Did you pass?" six months late is noise.
      if (lastActivity.getTime() < Date.now() - MAX_STALE_MS) return false;

      return true;
    };
    const eligible = contextualUsers.filter(matches);

    const result = await processBatch({
      label: "inactive-share-request",
      emailKey: EMAIL_KEY,
      subject: (u) => EMAIL_INBOX.inactiveShareRequest(u.voice).subject,
      template: (u) => EMAIL_TEMPLATES.inactiveShareRequest(u.voice),
      users: eligible,
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
    console.error("[inactive-share-request] Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
