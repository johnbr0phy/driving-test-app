/**
 * Cron: Top prepper
 * Schedule: daily at 16:20 UTC (vercel.json)
 *
 * The people closest to paying: they have answered more questions than most
 * people on Tigertest, they opened a paywall, and they did not buy. Each gets
 * one email, once ever, with their own numbers ("more than 92% of people who
 * practise on Tigertest") and a button that opens the unlock on the dashboard
 * of the test whose paywall they saw.
 *
 * Who: not Premium, reads in English, answered TOP_PREPPER_MIN_ANSWERS or
 * more and more than TOP_PREPPER_MIN_PCT percent of accounts with any answer,
 * last paywall view 36 hours to 14 days ago (the paywall-abandon email owns
 * the first 36 hours), active in the last 14 days, no email in 24 hours, not
 * in a teacher's class for that test (the class already unlocks it). DMV and
 * v1 exams only: `_stats` does not count v2 answers, so the number would be
 * wrong for a v2 student.
 *
 * Holdout: one account in TOP_PREPPER_HOLDOUT_ONE_IN (stable by uid) gets no
 * email and is stamped `topPrepper.group = "holdout"` instead, so the
 * Conversion tab can compare purchases within 7 days with and without it.
 *
 * Paused unless TOP_PREPPER_CAMPAIGN=send: a paused run sends and stamps
 * nothing and returns the eligible count and a sample. `?dry=1` does the same
 * while live.
 */

import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { makeSnapshotRetryPolicy } from "@/lib/server/emailRetryPolicy";
import {
  buildAuthMap,
  DAY_MS,
  emailedRecently,
  getEligibleUsers,
  latestPaywallHit,
  processBatch,
  verifyCronSecret,
  type UserDoc,
} from "@/lib/cron-email";
import { topPrepperEmail } from "@/lib/email-templates";
import { topPrepperInbox, inboxLabel } from "@/lib/email-inbox";
import { voiceFor } from "@/lib/email-voice";
import { hasClassStatsAccess } from "@/lib/email-lifecycle";
import { isInternalEmail } from "@/lib/internal";
import { purchaseExam } from "@/lib/purchaseAttribution";
import { EXAMS_V2 } from "@/lib/v2/registry";
import { V2_PAYWALL_PREFIX } from "@/lib/v2/premium";
import { inTopPrepperHoldout, topPrepperPct } from "@/lib/topPrepper";

export const maxDuration = 300;

const EMAIL_KEY = "topPrepper";
const INCLUDE_LEGACY = process.env.INCLUDE_LEGACY_CONSENT === "true";
/** The paywall-abandon email covers the first 36 hours after a paywall view. */
const MIN_AGE_MS = 36 * 60 * 60 * 1000;
/** Past two weeks the paywall is no longer on their mind. */
const MAX_AGE_MS = 14 * DAY_MS;

const answersOf = (d: FirebaseFirestore.DocumentData): number => {
  const s = d._stats || {};
  const n = (Number(s.trainingQuestionsAnswered) || 0) + (Number(s.testQuestionsAnswered) || 0);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
};

/** The exam of a paywall view, or null for a v2 exam (not covered). */
function paywallExam(hit: { location: string; itemId: string }): string | null {
  if (hit.itemId.startsWith(V2_PAYWALL_PREFIX)) return null;
  const id = purchaseExam(hit.location);
  return EXAMS_V2.some((e) => e.id === id) ? null : id;
}

interface Pick { examId: string; answers: number; pct: number; item: string }

export async function GET(req: NextRequest) {
  if (!verifyCronSecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = Date.now();
    const live = process.env.TOP_PREPPER_CAMPAIGN === "send" && req.nextUrl.searchParams.get("dry") !== "1";
    const db = getAdminDb();

    // Everyone's answer count, for an honest percentile: every account with
    // at least one answer, not only the ones who agreed to email.
    const statsSnap = await db.collection("users").select("_stats").get();
    const population = statsSnap.docs.map((d) => answersOf(d.data())).filter((n) => n > 0).sort((a, b) => a - b);

    const authMap = await buildAuthMap();
    const users = await getEligibleUsers(authMap, INCLUDE_LEGACY);

    const picks = new Map<string, Pick>();
    const pickFor = (raw: Record<string, any>): Pick | null => {
      if (raw.subscription?.isPremium === true) return null;
      if (typeof raw.language === "string" && raw.language !== "en") return null;
      const hit = latestPaywallHit(raw.paywallHits);
      if (!hit) return null;
      const age = Date.now() - hit.at.getTime();
      if (age < MIN_AGE_MS || age > MAX_AGE_MS) return null;
      const examId = paywallExam(hit);
      if (!examId || voiceFor(examId).id === "unknown") return null;
      if (hasClassStatsAccess(raw, examId)) return null;
      const answers = answersOf(raw);
      const pct = topPrepperPct(population, answers);
      if (pct === null) return null;
      return { examId, answers, pct, item: inboxLabel(hit.label, "", 60) };
    };

    const eligible = users
      .filter((u) => {
        if (u.emailsSent.includes(EMAIL_KEY)) return false;
        if (u.raw.topPrepper) return false; // already sent, or held out
        if (emailedRecently(u, now)) return false;
        if (isInternalEmail(u.email)) return false;
        const pick = pickFor(u.raw);
        if (!pick) return false;
        picks.set(u.uid, pick);
        return true;
      })
      // The heaviest studiers first, since a run sends only a few.
      .sort((a, b) => picks.get(b.uid)!.answers - picks.get(a.uid)!.answers);

    const treated: UserDoc[] = eligible.filter((u) => !inTopPrepperHoldout(u.uid));

    if (!live) {
      const sample = eligible.slice(0, 10).map((u) => {
        const k = picks.get(u.uid)!;
        return { examId: k.examId, answers: k.answers, pct: k.pct, item: k.item, holdout: inTopPrepperHoldout(u.uid) };
      });
      console.log(`[top-prepper] paused: ${eligible.length} eligible (${eligible.length - treated.length} holdout)`);
      return NextResponse.json({ paused: true, eligible: eligible.length, holdout: eligible.length - treated.length, sample });
    }

    const result = await processBatch({
      label: "top-prepper",
      emailKey: EMAIL_KEY,
      subject: (u) => topPrepperInbox(picks.get(u.uid)!.pct).subject,
      template: (u) => {
        const k = picks.get(u.uid)!;
        return topPrepperEmail(voiceFor(k.examId), k);
      },
      users: treated,
      retryPolicy: (u) => makeSnapshotRetryPolicy(u.raw, { expiresAt: now + DAY_MS, campaignGate: "TOP_PREPPER_CAMPAIGN" }),
      eligible: (fresh, user) => {
        if (fresh.topPrepper) return false;
        const k = pickFor(fresh);
        return !!k && k.examId === picks.get(user.uid)!.examId;
      },
      record: (u) => {
        const k = picks.get(u.uid)!;
        return { topPrepper: { group: "sent", at: new Date().toISOString(), examId: k.examId, answers: k.answers, pct: k.pct } };
      },
    });

    // Hold out only the accounts ranked ahead of the last one mailed today,
    // so both groups enter the comparison at the same pace.
    const lastTreated = treated[Math.min(result.attempted, treated.length) - 1];
    const cut = lastTreated ? eligible.indexOf(lastTreated) : -1;
    let heldOut = 0;
    for (const u of eligible.slice(0, cut + 1)) {
      if (!inTopPrepperHoldout(u.uid)) continue;
      const k = picks.get(u.uid)!;
      await db.doc(`users/${u.uid}`).set(
        { topPrepper: { group: "holdout", at: new Date().toISOString(), examId: k.examId, answers: k.answers, pct: k.pct } },
        { merge: true },
      );
      heldOut++;
    }

    return NextResponse.json({ ...result, heldOut });
  } catch (err: any) {
    console.error("[top-prepper] Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
