/**
 * Cron: First Test Reminder (stalled study)
 * Schedule: daily at 16:00 UTC (vercel.json)
 *
 * Sends to users who:
 * - Have answered 25+ questions in training
 * - Have completed 0 tests
 * - Have been idle for 6+ hours, but were last active within 3 days
 * - Haven't received this email yet
 * - Haven't received any other cron email in the last 24 hours
 *
 * Re-gated 2026-07-29. The old rule fired 24 hours after signup to anyone with
 * zero tests, including the many accounts that never answered a question. It now
 * waits for evidence of real study and lands the same day, which matters when
 * 77% of non-payers are only ever active on one day.
 */

import { NextRequest, NextResponse } from "next/server";
import {
  buildAuthMap,
  getEligibleUsers,
  processBatch,
  verifyCronSecret,
  maxInactiveMs,
  emailedRecently,
} from "@/lib/cron-email";
import { withStudyContext } from "@/lib/email-lifecycle";
import { EXAMS_V2 } from "@/lib/v2/registry";
import { EMAIL_TEMPLATES } from "@/lib/email-templates";

const EMAIL_KEY = "firstTestReminder";
const INCLUDE_LEGACY = process.env.INCLUDE_LEGACY_CONSENT === "true";

const MIN_QUESTIONS = 25;
const IDLE_MS = 6 * 60 * 60 * 1000; // give the session time to actually end

export async function GET(req: NextRequest) {
  if (!verifyCronSecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = Date.now();
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
      if (u.completedTests.length > 0) return false;         // already tested
      if (u.emailsSent.includes(EMAIL_KEY)) return false;    // already sent
      if (emailedRecently(u, now)) return false;             // frequency cap
      if (u.questionsAnswered < MIN_QUESTIONS) return false; // never really started

      // lastUpdated is rebound to dated exam activity; any newer account
      // activity also defers this reminder.
      if (!u.lastUpdated) return false;
      // Beyond the exam's quiet-days window, reengagement owns them.
      const idle = now - Math.max(u.lastUpdated.getTime(), u.lastActiveAt.getTime());
      return idle >= IDLE_MS && idle <= maxInactiveMs(u.voice);
    };
    const eligible = contextualUsers.filter(matches);

    const result = await processBatch({
      label: "first-test-reminder",
      emailKey: EMAIL_KEY,
      subject: "Quick check-in from Tigertest",
      template: (u) => EMAIL_TEMPLATES.firstTestReminder(u.voice),
      users: eligible,
      eligible: (fresh, user) => {
        const scoped = withStudyContext({ ...user, raw: fresh, subscription: fresh.subscription ?? {}, emailsSent: Array.isArray(fresh.emailsSent) ? fresh.emailsSent : [],
          lastActiveAt: new Date(Math.max(user.lastActiveAt.getTime(), Date.parse(fresh.lastUpdated) || 0)),
        });
        return !!scoped && scoped.examId === user.examId &&
          scoped.lastUpdated?.getTime() === user.lastUpdated?.getTime() && matches(scoped);
      },
      extras: (u) => ({ questionCount: u.questionsAnswered.toString() }),
    });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("[first-test-reminder] Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
