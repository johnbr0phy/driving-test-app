/**
 * GET /api/community-stats
 * Reads globalStats/wrongQuestions via Admin SDK (bypasses Firestore security rules).
 * Returns the pre-aggregated community wrong questions data.
 */

import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

export async function GET() {
  try {
    const db = getAdminDb();
    const snap = await db.collection("globalStats").doc("wrongQuestions").get();

    if (!snap.exists) {
      return NextResponse.json({ questions: [], totalUsers: 0, updatedAt: null });
    }

    return NextResponse.json(snap.data());
  } catch (err: any) {
    console.error("[community-stats]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
