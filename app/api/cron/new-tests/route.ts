/**
 * Cron: SAT and ACT launch + "what should we build next?"
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
 * PAUSED unless NEW_TESTS_CAMPAIGN=send is set in the environment. While
 * paused, each run only counts and logs who would get it (a daily dry run),
 * so the copy can be reviewed before anything goes out.
 *
 * DMV readers are split across the variants in lib/email-launch (one per
 * user, stable by uid, recorded as emailVariants.newTests2026 on send);
 * everyone else gets the short "what should we build next?" version and is
 * not part of the test. Results are on /admin/v2.
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
  JOHN_SENDER,
} from "@/lib/cron-email";
import { EMAIL_TEMPLATES } from "@/lib/email-templates";
import { LAUNCH_EXPERIMENT, LAUNCH_VARIANTS, pickLaunchVariant } from "@/lib/email-launch";

const EMAIL_KEY = LAUNCH_EXPERIMENT;
const INCLUDE_LEGACY = process.env.INCLUDE_LEGACY_CONSENT === "true";
const MIN_ACCOUNT_AGE_MS = 7 * DAY_MS;
const MAX_STALE_MS = 365 * DAY_MS;
/** Off unless explicitly turned on: John reviews the email first. */
const ENABLED = process.env.NEW_TESTS_CAMPAIGN === "send";

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
      const dmvUsers = eligible.filter((u) => u.voice.id === "dmv");
      const byVariant = Object.fromEntries(LAUNCH_VARIANTS.map((v) => [v.id, 0]));
      for (const u of dmvUsers) byVariant[pickLaunchVariant(u.uid).id]++;
      const summary = { paused: true, eligible: eligible.length, dmv: dmvUsers.length, other: eligible.length - dmvUsers.length, byVariant };
      console.log(`[new-tests] paused (set NEW_TESTS_CAMPAIGN=send to send): ${JSON.stringify(summary)}`);
      return NextResponse.json(summary);
    }

    const result = await processBatch({
      label: "new-tests",
      emailKey: EMAIL_KEY,
      subject: (u) =>
        u.voice.id === "dmv"
          ? pickLaunchVariant(u.uid).subject
          : "SAT and ACT are on TigerTest, and a question for you",
      template: (u) =>
        u.voice.id === "dmv" ? pickLaunchVariant(u.uid).html() : EMAIL_TEMPLATES.newTests(u.voice),
      record: (u) =>
        u.voice.id === "dmv"
          ? { emailVariants: { [LAUNCH_EXPERIMENT]: { variant: pickLaunchVariant(u.uid).id, sentAt: new Date().toISOString() } } }
          : {},
      users: eligible,
      sender: JOHN_SENDER,
    });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("[new-tests] Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
