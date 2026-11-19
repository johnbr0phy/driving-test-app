import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
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

// Edit a class's details (its teacher or a site admin): any of name,
// teacherName and school, for a teacher who got one wrong when making it.
// Class quizzes carry copies of the class and teacher names for their gate,
// so those change too. The exam is fixed: progress is stored against it.
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const code = normalizeClassCode((await params).code);
  if (!isClassCode(code)) return NextResponse.json({ error: "No such class" }, { status: 404 });
  const owner = await requireClassOwner(request, code);
  if (!owner.ok) return owner.response;

  const body = await request.json().catch(() => ({}));
  const update: { name?: string; teacherName?: string; school?: string } = {};
  if (body.name !== undefined) {
    const name = cleanName(body.name);
    if (!name) return NextResponse.json({ error: "Give the class a name" }, { status: 400 });
    update.name = name;
  }
  if (body.teacherName !== undefined) {
    const teacherName = cleanName(body.teacherName);
    if (!teacherName) return NextResponse.json({ error: "Add the name your students know you by" }, { status: 400 });
    update.teacherName = teacherName;
  }
  // School is optional, so an empty one clears it.
  if (body.school !== undefined) update.school = cleanName(body.school);
  if (!Object.keys(update).length) return NextResponse.json({ error: "Nothing to change" }, { status: 400 });

  const db = getAdminDb();
  const batch = db.batch();
  batch.update(db.collection("classes").doc(code), update);
  if (update.name !== undefined || update.teacherName !== undefined) {
    const quizzes = await db.collection("quizzes").where("classCode", "==", code).get();
    const quizUpdate: Record<string, string> = {};
    if (update.name !== undefined) quizUpdate.className = update.name;
    if (update.teacherName !== undefined) quizUpdate.classTeacherName = update.teacherName;
    for (const q of quizzes.docs) batch.update(q.ref, quizUpdate);
  }
  await batch.commit();
  return NextResponse.json(update);
}

// Delete a class (its teacher or a site admin): the class doc and every
// student's member doc. Quizzes set to "My class" become "Only me", so they
// are kept for the teacher but nobody else can open them. Students' browsers
// hear 410 on their next progress report and drop the membership.
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const code = normalizeClassCode((await params).code);
  if (!isClassCode(code)) return NextResponse.json({ error: "No such class" }, { status: 404 });
  const owner = await requireClassOwner(request, code);
  if (!owner.ok) return owner.response;

  const db = getAdminDb();
  const quizzes = await db.collection("quizzes").where("classCode", "==", code).get();
  if (!quizzes.empty) {
    const batch = db.batch();
    for (const q of quizzes.docs) {
      batch.update(q.ref, {
        visibility: "private",
        classCode: FieldValue.delete(),
        className: FieldValue.delete(),
        classTeacherName: FieldValue.delete(),
      });
    }
    await batch.commit();
  }
  await db.recursiveDelete(db.collection("classes").doc(code));
  return NextResponse.json({ ok: true, quizzesMadePrivate: quizzes.size });
}
