import { NextRequest, NextResponse } from "next/server";
import { randomInt } from "crypto";
import { getAdminDb } from "@/lib/firebase-admin";
import { requireCaller } from "@/lib/server/classAuth";
import {
  CLASS_CODE_ALPHABET,
  CLASS_CODE_LENGTH,
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

function newCode(): string {
  let code = "";
  for (let i = 0; i < CLASS_CODE_LENGTH; i++) code += CLASS_CODE_ALPHABET[randomInt(CLASS_CODE_ALPHABET.length)];
  return code;
}

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
  const state = body.examId === DMV_EXAM_ID ? body.state : null;
  if (body.examId === DMV_EXAM_ID && !isDmvState(state)) return NextResponse.json({ error: "Pick your state" }, { status: 400 });

  const db = getAdminDb();
  const mine = await db.collection("classes").where("teacherUid", "==", caller.uid).count().get();
  if (mine.data().count >= MAX_CLASSES_PER_TEACHER) {
    return NextResponse.json({ error: `You can have up to ${MAX_CLASSES_PER_TEACHER} classes` }, { status: 400 });
  }

  // A code is 31^5 (28M) wide; retry the rare collision.
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = newCode();
    try {
      await db.collection("classes").doc(code).create({
        code,
        name,
        examId: body.examId,
        state,
        teacherUid: caller.uid,
        teacherEmail: caller.email ?? null,
        teacherName,
        school,
        createdAt: new Date().toISOString(),
        memberCount: 0,
      });
      return NextResponse.json({ code });
    } catch (error: unknown) {
      if ((error as { code?: number }).code !== 6) throw error; // 6 = ALREADY_EXISTS
    }
  }
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
