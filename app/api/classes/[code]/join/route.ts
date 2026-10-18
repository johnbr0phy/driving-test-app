import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase-admin";
import { MAX_CLASS_MEMBERS, cleanName, isClassCode, isMemberId, normalizeClassCode } from "@/lib/classes";

// A student joins with a name and the random memberId their browser made.
// Joining again from the same browser renames them.
export async function POST(request: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const code = normalizeClassCode((await params).code);
  const body = await request.json().catch(() => ({}));
  const name = cleanName(body.name);
  if (!isClassCode(code) || !isMemberId(body.memberId)) return NextResponse.json({ error: "invalid" }, { status: 400 });
  if (!name) return NextResponse.json({ error: "Enter your name" }, { status: 400 });

  const db = getAdminDb();
  const classRef = db.collection("classes").doc(code);
  const memberRef = classRef.collection("members").doc(body.memberId);
  const result = await db.runTransaction(async (tx) => {
    const [cls, member] = await Promise.all([tx.get(classRef), tx.get(memberRef)]);
    if (!cls.exists) return { status: 404, error: "No such class" };
    if (member.exists) {
      tx.update(memberRef, { name });
      return { status: 200 };
    }
    if ((cls.data()?.memberCount ?? 0) >= MAX_CLASS_MEMBERS) return { status: 400, error: "This class is full" };
    const now = new Date().toISOString();
    tx.create(memberRef, { name, joinedAt: now, lastActive: now, answered: 0, correct: 0, byCategory: {}, missed: {}, tests: {} });
    tx.update(classRef, { memberCount: FieldValue.increment(1) });
    return { status: 200 };
  });
  if (result.status !== 200) return NextResponse.json({ error: result.error }, { status: result.status });
  return NextResponse.json({ ok: true });
}
