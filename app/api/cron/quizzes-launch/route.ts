/**
 * Cron: quizzes launch ("Turn anything into a practice test")
 * Schedule: daily at 13:30 UTC (vercel.json)
 *
 * One-off campaign to the whole consented base announcing quizzes
 * (lib/quizzes.ts): the person's own material as a practice test, from
 * Claude or ChatGPT through the MCP server or from the paste box on /create.
 * Sends to users who:
 * - Signed up 7+ days ago
 * - Were active within the last 365 days (older addresses bounce and get
 *   flagged, which hurts delivery of the transactional mail too)
 * - Haven't received this email yet
 * - Haven't received any other cron email in the last 24 hours
 *
 * Exempt from the quiet-days rule on purpose, like new-tests: it is for
 * everyone, including people who finished with their exam.
 *
 * PAUSED unless QUIZZES_CAMPAIGN=send is set in the environment. While
 * paused, each run only counts and logs who would get it (a daily dry run),
 * so the copy can be reviewed before anything goes out. No variants.
 *
 * Drains at MAX_BATCH per day, most recently active first, so the freshest
 * addresses go out while the budget is tightest.
 */

import { NextRequest, NextResponse } from "next/server";
import {
  buildAuthMap,
  getEligibleUsers,
  processBatch,
  verifyCronSecret,
  emailedRecently,
  DAY_MS,
  JOHN_SENDER,
} from "@/lib/cron-email";
import { EMAIL_TEMPLATES } from "@/lib/email-templates";

const EMAIL_KEY = "quizzesLaunch2026";
const SUBJECT = "Turn anything into a practice test";
const INCLUDE_LEGACY = process.env.INCLUDE_LEGACY_CONSENT === "true";
const MIN_ACCOUNT_AGE_MS = 7 * DAY_MS;
const MAX_STALE_MS = 365 * DAY_MS;
/** Off unless explicitly turned on: John reviews the email first. */
const ENABLED = process.env.QUIZZES_CAMPAIGN === "send";

export async function GET(req: NextRequest) {
  if (!verifyCronSecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = Date.now();
    const authMap = await buildAuthMap();
    const users = await getEligibleUsers(authMap, INCLUDE_LEGACY, true);

    const eligible = users
      .filter((u) => {
        if (emailedRecently(u)) return false;
        if (u.emailsSent.includes(EMAIL_KEY)) return false;
        if (u.creationTime.getTime() > now - MIN_ACCOUNT_AGE_MS) return false;
        if (u.lastActiveAt.getTime() < now - MAX_STALE_MS) return false;
        return true;
      })
      .sort((a, b) => b.lastActiveAt.getTime() - a.lastActiveAt.getTime());

    if (!ENABLED) {
      const summary = { paused: true, eligible: eligible.length };
      console.log(`[quizzes-launch] paused (set QUIZZES_CAMPAIGN=send to send): ${JSON.stringify(summary)}`);
      return NextResponse.json(summary);
    }

    const result = await processBatch({
      label: "quizzes-launch",
      emailKey: EMAIL_KEY,
      subject: SUBJECT,
      template: (u) => EMAIL_TEMPLATES.quizzesLaunch(u.voice),
      users: eligible,
      sender: JOHN_SENDER,
    });

    return NextResponse.json(result);
  } catch (err: unknown) {
    console.error("[quizzes-launch] Error:", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Unknown error" }, { status: 500 });
  }
}
