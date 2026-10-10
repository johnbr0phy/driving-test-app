/**
 * Cron: New tests announcement + "what should we build next?"
 * Schedule: daily at 13:00 UTC (vercel.json)
 *
 * One-off campaign to the whole consented base. Sends to users who:
 * - Signed up 7+ days ago (newer accounts are mid-onboarding and saw the
 *   current catalog at signup)
 * - Were active within the last 365 days. Older addresses bounce and get
 *   flagged, which hurts delivery of the transactional mail too.
 * - Haven't received this email yet
 * - Haven't received any other cron email in the last 24 hours
 *
 * Exempt from the quiet-days rule on purpose: the people it is for are the
 * ones who finished with TigerTest and may need it for something else.
 *
 * Drains at MAX_BATCH per day, most recently active first, so the freshest
 * addresses go out while the budget is tightest. Set CRON_MAX_BATCH and
 * RESEND_DAILY_LIMIT higher for the run if the audience is large.
 */

import { NextRequest, NextResponse } from "next/server";
import {
  buildAuthMap,
  getEligibleUsers,
  processBatch,
  verifyCronSecret,
  emailedRecently,
  DAY_MS,
} from "@/lib/cron-email";
import { EMAIL_TEMPLATES } from "@/lib/email-templates";
import { TEST_CATALOG } from "@/lib/testCatalog";

const EMAIL_KEY = "newTests2026";
const INCLUDE_LEGACY = process.env.INCLUDE_LEGACY_CONSENT === "true";
const MIN_ACCOUNT_AGE_MS = 7 * DAY_MS;
const MAX_STALE_MS = 365 * DAY_MS;

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

    const newCount = TEST_CATALOG.length - 1;
    const result = await processBatch({
      label: "new-tests",
      emailKey: EMAIL_KEY,
      subject: (u) =>
        u.voice.id === "dmv"
          ? `${newCount} new practice tests, and a question for you`
          : "New tests on TigerTest, and a question for you",
      template: (u) => EMAIL_TEMPLATES.newTests(u.voice),
      users: eligible,
    });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("[new-tests] Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
