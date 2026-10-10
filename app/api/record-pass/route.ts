/**
 * "Yes, I passed!" from the unsubscribe page. Stamps the user doc so the
 * admin view and future win-back logic can tell a graduate from a dropout.
 * The page called this endpoint for months while it did not exist.
 */

import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { uidFromToken } from "@/lib/unsubscribe";

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json().catch(() => ({}));
    const uid = uidFromToken(token);
    if (!uid) {
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 400 });
    }

    await getAdminDb()
      .collection("users")
      .doc(uid)
      .set({ passReported: true, passReportedAt: new Date().toISOString() }, { merge: true });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[record-pass] failed:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
