import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import type { SchoolStudent } from "@/lib/school-types";

// ── GET /api/schools/[schoolId]/students ──────────────────────────────────
// Returns all students (active + inactive) for the given school account.
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ schoolId: string }> }
) {
  const { schoolId } = await params;
  if (!schoolId) {
    return NextResponse.json({ error: "schoolId required" }, { status: 400 });
  }

  try {
    const db = getAdminDb();
    const snap = await db
      .collection("school_accounts")
      .doc(schoolId)
      .collection("students")
      .orderBy("createdAt", "asc")
      .get();

    const students: SchoolStudent[] = snap.docs.map((doc) => {
      const d = doc.data();
      return {
        uid: doc.id,
        name: d.name ?? d.email.split("@")[0],
        email: d.email,
        testsTaken: d.sectionsCompleted ?? 0,
        lastActive: d.lastActive ?? d.createdAt ?? new Date().toISOString().split("T")[0],
        active: d.active ?? true,
      };
    });

    return NextResponse.json({ students });
  } catch (err) {
    console.error("[schools students GET]", err);
    return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 });
  }
}

// ── POST /api/schools/[schoolId]/students ─────────────────────────────────
// Body: { emails: string[] }  — adds new students (skips duplicates).
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ schoolId: string }> }
) {
  const { schoolId } = await params;
  if (!schoolId) {
    return NextResponse.json({ error: "schoolId required" }, { status: 400 });
  }

  let body: { emails?: string[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const emails = (body.emails ?? [])
    .map((e) => e.trim().toLowerCase())
    .filter((e) => e.includes("@"));

  if (!emails.length) {
    return NextResponse.json({ error: "No valid emails provided" }, { status: 400 });
  }

  try {
    const db = getAdminDb();
    const schoolRef = db.collection("school_accounts").doc(schoolId);
    const studentsRef = schoolRef.collection("students");

    // Fetch existing active emails to check duplicates
    const existing = await studentsRef.where("active", "==", true).get();
    const activeEmails = new Set(existing.docs.map((d) => d.data().email?.toLowerCase()));

    const newEmails = emails.filter((e) => !activeEmails.has(e));
    if (!newEmails.length) {
      return NextResponse.json({ added: 0, skipped: emails.length });
    }

    const today = new Date().toISOString().split("T")[0];
    const batch = db.batch();

    for (const email of newEmails) {
      const ref = studentsRef.doc(); // auto-id
      batch.set(ref, {
        email,
        name: email.split("@")[0],
        sectionsCompleted: 0,
        active: true,
        createdAt: today,
        lastActive: today,
        inviteStatus: "pending",
      });
    }

    await batch.commit();

    return NextResponse.json({ added: newEmails.length, skipped: emails.length - newEmails.length });
  } catch (err) {
    console.error("[schools students POST]", err);
    return NextResponse.json({ error: "Failed to add students" }, { status: 500 });
  }
}
