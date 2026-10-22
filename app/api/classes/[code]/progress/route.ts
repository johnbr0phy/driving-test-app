import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { isClassCode, isMemberId, normalizeClassCode } from "@/lib/classes";
import { applyMemberProgress, memberBatch } from "@/lib/server/classMembers";

// A student's practice, batched by lib/classProgress.ts: answers (question,
// category, right or wrong, the option a wrong answer picked) and finished
// practice tests. The member update itself is lib/server/classMembers.ts,
// shared with quiz members (/api/quizzes/[code]/progress).

export async function POST(request: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const code = normalizeClassCode((await params).code);
  const body = await request.json().catch(() => ({}));
  if (!isClassCode(code) || !isMemberId(body.memberId)) return NextResponse.json({ error: "invalid" }, { status: 400 });
  const { answers, tests } = memberBatch(body);
  if (!answers.length && !tests.length) return NextResponse.json({ ok: true });

  const db = getAdminDb();
  const ref = db.collection("classes").doc(code).collection("members").doc(body.memberId);
  const found = await applyMemberProgress(db, ref, answers, tests);
  if (!found) return NextResponse.json({ error: "Not in this class" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
