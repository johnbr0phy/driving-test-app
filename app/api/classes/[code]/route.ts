import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { classExamNameById, isClassCode, normalizeClassCode, type ClassPublicInfo } from "@/lib/classes";

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
