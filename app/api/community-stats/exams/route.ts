/**
 * GET /api/community-stats/exams
 * The tests that have Common Mistakes (enough answers, lib/communityStats.ts):
 * "dmv" and registry exam ids, as written by the nightly aggregate-stats cron.
 * The header, dashboards and landings read it to decide whether to show it.
 */

import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { COMMUNITY_DMV_KEY, COMMUNITY_MIN_QUESTIONS } from "@/lib/communityStats";

export async function GET() {
  try {
    const db = getAdminDb();
    const snap = await db.collection("globalStats").doc("examWrongQuestions").get();
    let available: string[] = Array.isArray(snap.data()?.available) ? snap.data()!.available : [];
    // Before the cron's first run with exams, the DMV list alone decides.
    if (!snap.exists) {
      const dmv = await db.collection("globalStats").doc("wrongQuestions").get();
      const n = Array.isArray(dmv.data()?.questions) ? dmv.data()!.questions.length : 0;
      available = n >= COMMUNITY_MIN_QUESTIONS ? [COMMUNITY_DMV_KEY] : [];
    }
    return NextResponse.json(
      { available },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } },
    );
  } catch (err: any) {
    console.error("[community-stats/exams]", err);
    return NextResponse.json({ available: [] }, { status: 500 });
  }
}
