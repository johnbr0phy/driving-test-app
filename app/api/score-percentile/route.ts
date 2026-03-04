/**
 * POST /api/score-percentile
 * Records a test score and returns the user's percentile rank.
 *
 * Body: { score: number, totalQuestions: number, state: string }
 * Returns: { percentile: number, totalTests: number }
 */

import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { score, totalQuestions = 50, state } = body as {
      score: number;
      totalQuestions?: number;
      state?: string;
    };

    if (typeof score !== "number") {
      return NextResponse.json({ error: "score is required" }, { status: 400 });
    }

    const percentage = Math.round((score / totalQuestions) * 100);
    const db = getAdminDb();

    // Write this score to lightweight scores collection
    await db.collection("scores").add({
      score,
      totalQuestions,
      percentage,
      state: state ?? "unknown",
      completedAt: FieldValue.serverTimestamp(),
    });

    // Fetch last 30 days of scores to compute percentile
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const snap = await db
      .collection("scores")
      .where("completedAt", ">", thirtyDaysAgo)
      .get();

    if (snap.size < 5) {
      // Not enough data yet — return null so UI skips showing it
      return NextResponse.json({ percentile: null, totalTests: snap.size });
    }

    const allPercentages: number[] = [];
    snap.forEach((doc) => {
      const pct = doc.data().percentage;
      if (typeof pct === "number") allPercentages.push(pct);
    });

    // Percentile = % of scores strictly below this score
    const below = allPercentages.filter((p) => p < percentage).length;
    const percentile = Math.round((below / allPercentages.length) * 100);

    return NextResponse.json({ percentile, totalTests: allPercentages.length });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[score-percentile]", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
