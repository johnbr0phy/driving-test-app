import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase-admin";
import { ALL_EXAMS } from "@/lib/exams";
import { EXAMS_V2 } from "@/lib/v2/registry";
import { isBotRequest } from "@/lib/botUserAgent";
import { grantAnswers, requestIp } from "@/lib/server/answerRateLimit";
import { QUESTION_ID_RE } from "@/lib/questionQuality";
import { pickUpdateChunks, sumPicks } from "@/lib/server/questionPickWrites";

// Anonymous option picks (lib/questionPicks.ts) summed per question into
// questionPicks/{examId}: n answers, c correct, w.{bankIndex} wrong picks,
// and s, sc, sw.{bankIndex} for strong browsers. Nothing about the sender is stored. Shares the per-IP
// answer budget of /api/analytics/questions, so a script cannot skew a key.
// Writes are split by lib/server/questionPickWrites.ts to stay under
// Firestore's 500-transforms-per-document limit.

const MAX_ITEMS = 200;
const KNOWN = new Set<string>(["dmv", ...ALL_EXAMS.map((e) => e.id), ...EXAMS_V2.map((e) => e.id)]);

export async function POST(request: NextRequest) {
  if (isBotRequest(request)) return NextResponse.json({ ok: true });
  const body = await request.json().catch(() => ({}));
  const exam = typeof body.exam === "string" ? body.exam : "";
  if (!KNOWN.has(exam) || !Array.isArray(body.items)) return NextResponse.json({ ok: false }, { status: 400 });

  const items = (body.items as unknown[])
    .slice(0, MAX_ITEMS)
    .filter((it): it is { q: string; p: number; ok: boolean; s: boolean } => {
      const x = it as Record<string, unknown>;
      return typeof x?.q === "string" && QUESTION_ID_RE.test(x.q) && Number.isInteger(x.p) && (x.p as number) >= -1 && (x.p as number) < 8;
    });
  if (!items.length) return NextResponse.json({ ok: true });

  const db = getAdminDb();
  const allowed = await grantAnswers(db, `picks:${requestIp(request)}`, items.length);
  if (allowed <= 0) return NextResponse.json({ ok: true, dropped: items.length });

  // Sum first, then write in chunks: Firestore takes at most 500 increments
  // on one document per write, and a full batch can need more.
  const ref = db.collection("questionPicks").doc(exam);
  const chunks = pickUpdateChunks(sumPicks(items.slice(0, allowed)), (x: number) => FieldValue.increment(x));
  for (const update of chunks) {
    await ref.set({ ...update, _updatedAt: new Date().toISOString() }, { merge: true });
  }
  return NextResponse.json({ ok: true });
}
