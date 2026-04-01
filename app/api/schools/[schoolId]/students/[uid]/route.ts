import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

type Params = { params: Promise<{ schoolId: string; uid: string }> };

// ── PATCH /api/schools/[schoolId]/students/[uid] ──────────────────────────
// Deactivate: sets active=false, keeps the record in Firestore.
export async function PATCH(
  _req: NextRequest,
  { params }: Params
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
      .update({ active: false, deactivatedAt: new Date().toISOString().split("T")[0] });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[schools students PATCH]", err);
    return NextResponse.json({ error: "Failed to deactivate student" }, { status: 500 });
  }
}

// ── DELETE /api/schools/[schoolId]/students/[uid] ─────────────────────────
// Hard delete: permanently removes the student document from the subcollection.
export async function DELETE(
  _req: NextRequest,
  { params }: Params
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
      .delete();

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[schools students DELETE]", err);
    return NextResponse.json({ error: "Failed to remove student" }, { status: 500 });
  }
}
