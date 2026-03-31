import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

// ── DELETE /api/schools/[schoolId]/students/[uid] ─────────────────────────
// Soft-delete: sets active=false rather than destroying data.
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ schoolId: string; uid: string }> }
) {
  const { schoolId, uid } = await params;
  if (!schoolId || !uid) {
    return NextResponse.json({ error: "schoolId and uid required" }, { status: 400 });
  }

  try {
    const db = getAdminDb();
    await db
      .collection("school_accounts")
      .doc(schoolId)
      .collection("students")
      .doc(uid)
      .update({ active: false, removedAt: new Date().toISOString().split("T")[0] });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[schools students DELETE]", err);
    return NextResponse.json({ error: "Failed to remove student" }, { status: 500 });
  }
}
