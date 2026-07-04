/**
 * GET /api/question-difficulty
 * Reads globalStats/questionDifficulty via Admin SDK (bypasses Firestore security rules).
 * Returns the pre-aggregated per-question difficulty table:
 *   { questions: { [questionId]: { total, errorRate } }, minAttempts, totalUsers, updatedAt }
 * errorRate is an integer percent. Recomputed daily by /api/cron/aggregate-stats.
 */

import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

export async function GET() {
  try {
    const db = getAdminDb();
    const snap = await db.collection("globalStats").doc("questionDifficulty").get();

    if (!snap.exists) {
      return NextResponse.json({
        questions: {},
        minAttempts: null,
        totalUsers: 0,
        updatedAt: null,
      });
    }

    // Data only changes on the daily cron — let the CDN absorb repeat reads
    return NextResponse.json(snap.data(), {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err: any) {
    console.error("[question-difficulty]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
