import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { requireCaller } from "@/lib/server/classAuth";
import { createClassDoc } from "@/lib/server/createClass";
import { getExamById } from "@/lib/exams";
import {
  MAX_CLASSES_PER_TEACHER,
  DMV_EXAM_ID,
  cleanName,
  isDmvState,
  classExamNameById,
  isClassExamId,
  type ClassSummary,
} from "@/lib/classes";

// Instructor classes (lib/classes.ts). POST makes a class for the signed-in
// teacher; GET lists theirs.

export async function POST(request: NextRequest) {
  const caller = await requireCaller(request);
  if (!caller.ok) return caller.response;

  const body = await request.json().catch(() => ({}));
  const name = cleanName(body.name);
  const teacherName = cleanName(body.teacherName);
  const school = cleanName(body.school);
  if (!name) return NextResponse.json({ error: "Give the class a name" }, { status: 400 });
  if (!teacherName) return NextResponse.json({ error: "Add the name your students know you by" }, { status: 400 });
  if (!isClassExamId(body.examId)) return NextResponse.json({ error: "Pick an exam" }, { status: 400 });
  // A teacher's course gets its class when John marks the request ready.
  if (getExamById(body.examId)?.course) return NextResponse.json({ error: "Pick an exam" }, { status: 400 });
  const state = body.examId === DMV_EXAM_ID ? body.state : null;
  if (body.examId === DMV_EXAM_ID && !isDmvState(state)) return NextResponse.json({ error: "Pick your state" }, { status: 400 });

  const db = getAdminDb();
  const mine = await db.collection("classes").where("teacherUid", "==", caller.uid).count().get();
  if (mine.data().count >= MAX_CLASSES_PER_TEACHER) {
    return NextResponse.json({ error: `You can have up to ${MAX_CLASSES_PER_TEACHER} classes` }, { status: 400 });
  }

  const code = await createClassDoc(db, {
    name,
    examId: body.examId,
    state,
    teacherUid: caller.uid,
    teacherEmail: caller.email ?? null,
    teacherName,
    school,
  });
  if (code) return NextResponse.json({ code });
  return NextResponse.json({ error: "Couldn't make a class code. Try again." }, { status: 500 });
}

export async function GET(request: NextRequest) {
  const caller = await requireCaller(request);
  if (!caller.ok) return caller.response;
  const snap = await getAdminDb().collection("classes").where("teacherUid", "==", caller.uid).get();
  const classes: ClassSummary[] = snap.docs
    .map((d) => d.data())
    .map((c) => ({
      code: c.code,
      name: c.name,
      examId: c.examId,
      examName: classExamNameById(c.examId, c.state),
      ...(c.state ? { state: c.state } : {}),
      teacherName: c.teacherName,
      school: c.school ?? "",
      createdAt: c.createdAt,
      memberCount: c.memberCount ?? 0,
    }))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return NextResponse.json({ classes });
}
