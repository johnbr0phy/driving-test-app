import { NextRequest, NextResponse } from "next/server";
import { FieldPath } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase-admin";
import { isClassCode, isMemberId, normalizeClassCode, type ClassHistoryAnswer } from "@/lib/classes";

// One-time repair from a student's own browser history (lib/classProgress.ts
// recoverClassMisses). Before Oct 19 2026 a progress batch with no wrong
// answers replaced the member's `missed` map with an empty one. This rebuilds
// it: misses per question since the student joined, keeping the higher of
// the stored and recovered counts so it never double counts.

const MAX_ANSWERS = 3000;

function validAnswer(a: unknown): a is ClassHistoryAnswer {
  const x = a as ClassHistoryAnswer;
  return !!x && typeof x.ok === "boolean" && /^[A-Za-z0-9_-]{1,64}$/.test(String(x.q)) && !Number.isNaN(Date.parse(String(x.t)));
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const code = normalizeClassCode((await params).code);
  const body = await request.json().catch(() => ({}));
  if (!isClassCode(code) || !isMemberId(body.memberId)) return NextResponse.json({ error: "invalid" }, { status: 400 });
  const answers: ClassHistoryAnswer[] = Array.isArray(body.answers) ? body.answers.slice(-MAX_ANSWERS).filter(validAnswer) : [];

  const db = getAdminDb();
  const ref = db.collection("classes").doc(code).collection("members").doc(body.memberId);
  const found = await db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists) return false;
    const data = snap.data() ?? {};
    const joined = Date.parse(data.joinedAt ?? "") || 0;
    const stored = (data.missed ?? {}) as Record<string, number>;
    const recovered: Record<string, number> = {};
    for (const a of answers) {
      if (a.ok || Date.parse(a.t) < joined) continue;
      recovered[a.q] = (recovered[a.q] ?? 0) + 1;
    }
    const raised = Object.entries(recovered).filter(([q, n]) => n > (stored[q] ?? 0));
    if (raised.length) {
      const [[q0, n0], ...rest] = raised;
      tx.update(ref, new FieldPath("missed", q0), n0, ...rest.flatMap(([q, n]) => [new FieldPath("missed", q), n]));
    }
    return true;
  });
  if (!found) return NextResponse.json({ error: "Not in this class" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
