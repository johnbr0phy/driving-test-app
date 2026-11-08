/**
 * Cron: Super Amazing Mode unlocked
 * Schedule: daily at 17:00 UTC (vercel.json)
 *
 * Pure celebration, no ask. Sends to users who:
 * - Unlocked Super Amazing Mode on any supported dashboard in the last 7 days
 * - Haven't received this email yet
 * - Haven't received any other cron email in the last 4 hours
 *
 * The per-dashboard superAmazingUnlocks latch proves which exam earned it.
 * Old unscoped timestamps alone are not enough. The original account-wide
 * timestamp still bounds freshness so later backfills cannot revive old wins.
 */

import { NextRequest, NextResponse } from "next/server";
import {
  buildAuthMap,
  getEligibleUsers,
  processBatch,
  verifyCronSecret,
  emailedRecently,
  maxInactiveMs,
} from "@/lib/cron-email";
import { EMAIL_TEMPLATES } from "@/lib/email-templates";
import { voiceFor } from "@/lib/email-voice";
import { recentSuperAmazingUnlock } from "@/lib/super-amazing-email";

const EMAIL_KEY = "superAmazingUnlocked";
const INCLUDE_LEGACY = process.env.INCLUDE_LEGACY_CONSENT === "true";

// Short gap: finishing a dashboard is worth interrupting for, and congratulations
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

    const eligible = users.flatMap((u) => {
      if (u.emailsSent.includes(EMAIL_KEY)) return [];
      if (emailedRecently(u, now, GAP_MS)) return [];
      const unlock = recentSuperAmazingUnlock(u.raw, now);
      if (!unlock) return [];
      const voice = voiceFor(unlock.examId);
      if (now - u.lastActiveAt.getTime() > maxInactiveMs(voice)) return [];
      // An account can change exams after earning the reward. Link back to
      // the dashboard that actually earned it, including state variants.
      return [{ ...u, examId: unlock.examId, voice }];
    });

    const result = await processBatch({
      label: "super-amazing",
      emailKey: EMAIL_KEY,
      subject: "You unlocked Super Amazing Mode 🎉",
      template: (u) => EMAIL_TEMPLATES.superAmazingUnlocked(u.voice),
      users: eligible,
      gapMs: GAP_MS,
      eligible: (data, user) => {
        const unlock = recentSuperAmazingUnlock(data, Date.now());
        return unlock?.examId === user.examId &&
          Date.now() - user.lastActiveAt.getTime() <= maxInactiveMs(user.voice);
      },
    });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("[super-amazing] Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
