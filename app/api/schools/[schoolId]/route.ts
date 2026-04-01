import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

// ── PATCH /api/schools/[schoolId] ─────────────────────────────────────────
// Updates mutable school fields: schoolName, adminName, adminEmail
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ schoolId: string }> }
) {
  const { schoolId } = await params;
  if (!schoolId) {
    return NextResponse.json({ error: "schoolId required" }, { status: 400 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Only allow these fields to be updated
  const allowed: Record<string, unknown> = {};
  if (typeof body.schoolName === "string" && body.schoolName.trim()) {
    allowed.schoolName = body.schoolName.trim();
  }
  if (typeof body.adminName === "string" && body.adminName.trim()) {
    allowed.adminName = body.adminName.trim();
  }
  if (typeof body.adminEmail === "string" && body.adminEmail.trim()) {
    allowed.adminEmail = body.adminEmail.trim();
  }

  if (Object.keys(allowed).length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  try {
    const db = getAdminDb();
    await db.collection("school_accounts").doc(schoolId).update(allowed);
    return NextResponse.json({ ok: true, updated: allowed });
  } catch (err) {
    console.error("[PATCH school]", err);
    return NextResponse.json({ error: "Failed to update school" }, { status: 500 });
  }
}

// ── DELETE /api/schools/[schoolId] ────────────────────────────────────────
// Deletes the school account doc (does NOT delete students subcollection —
// Firestore requires recursive deletion via Admin SDK which we do here)
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ schoolId: string }> }
) {
  const { schoolId } = await params;
  if (!schoolId) {
    return NextResponse.json({ error: "schoolId required" }, { status: 400 });
  }

  try {
    const db = getAdminDb();
    const schoolRef = db.collection("school_accounts").doc(schoolId);

    // Delete all students in subcollection first
    const studentsSnap = await schoolRef.collection("students").get();
    const batch = db.batch();
    studentsSnap.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();

    // Delete the school doc itself
    await schoolRef.delete();

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[DELETE school]", err);
    return NextResponse.json({ error: "Failed to delete school account" }, { status: 500 });
  }
}
