import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { requireClassOwner } from "@/lib/server/classAuth";
import { classExamNameById, cleanName, isClassCode, normalizeClassCode, type ClassPublicInfo } from "@/lib/classes";

// What the join page shows: the class, its exam and its teacher. Public.
export async function GET(_request: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const code = normalizeClassCode((await params).code);
  if (!isClassCode(code)) return NextResponse.json({ error: "No such class" }, { status: 404 });
  const snap = await getAdminDb().collection("classes").doc(code).get();
  if (!snap.exists) return NextResponse.json({ error: "No such class" }, { status: 404 });
  const c = snap.data()!;
  const info: ClassPublicInfo = {
    code,
    name: c.name,
    examId: c.examId,
    examName: classExamNameById(c.examId, c.state),
    ...(c.state ? { state: c.state } : {}),
    teacherName: c.teacherName,
    school: c.school ?? "",
  };
  return NextResponse.json(info);
}

// Rename a class (its teacher or a site admin). Class quizzes carry a copy of
// the name for their gate, so those are renamed too.
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const code = normalizeClassCode((await params).code);
  if (!isClassCode(code)) return NextResponse.json({ error: "No such class" }, { status: 404 });
  const owner = await requireClassOwner(request, code);
  if (!owner.ok) return owner.response;

  const body = await request.json().catch(() => ({}));
  const name = cleanName(body.name);
  if (!name) return NextResponse.json({ error: "Give the class a name" }, { status: 400 });

  const db = getAdminDb();
  const batch = db.batch();
  batch.update(db.collection("classes").doc(code), { name });
  const quizzes = await db.collection("quizzes").where("classCode", "==", code).get();
  for (const q of quizzes.docs) batch.update(q.ref, { className: name });
  await batch.commit();
  return NextResponse.json({ name });
}
