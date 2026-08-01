/**
 * Cron: Super Amazing Mode unlocked
 * Schedule: daily at 17:00 UTC (vercel.json)
 *
 * Pure celebration, no ask. Sends to users who:
 * - Unlocked Super Amazing Mode (8/8 complete) in the last 7 days
 * - Haven't received this email yet
 * - Haven't received any other cron email in the last 4 hours
 *
 * The unlock timestamp is superAmazing.firstEnabledAt (written since PR #285
 * the first time someone switches the mode on, which is only possible at 8/8),
 * or the dedicated superAmazingUnlockedAt latch if a client ever writes one.
 *
 * The 7-day ceiling stops the first deployment from mailing anyone who
 * back-fills the field later.
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

const EMAIL_KEY = "superAmazingUnlocked";
const INCLUDE_LEGACY = process.env.INCLUDE_LEGACY_CONSENT === "true";

const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
// Short gap: finishing 8/8 is worth interrupting for, and the congratulations
// lands badly if it arrives a day late.
const GAP_MS = 4 * 60 * 60 * 1000;

export async function GET(req: NextRequest) {
  if (!verifyCronSecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = Date.now();
    const authMap = await buildAuthMap();
    const users = await getEligibleUsers(authMap, INCLUDE_LEGACY);

    const eligible = users.filter((u) => {
      if (u.emailsSent.includes(EMAIL_KEY)) return false;
      if (emailedRecently(u, now, GAP_MS)) return false;
      if (!u.superAmazingUnlockedAt) return false;
      return now - u.superAmazingUnlockedAt.getTime() <= MAX_AGE_MS;
    });

    const result = await processBatch({
      label: "super-amazing",
      emailKey: EMAIL_KEY,
      subject: "You unlocked Super Amazing Mode 🎉",
      template: EMAIL_TEMPLATES.superAmazingUnlocked,
      users: eligible,
      extras: (u) => ({ questionCount: u.questionsAnswered.toString() }),
    });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("[super-amazing] Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
