import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase-admin";
import { ALL_EXAMS } from "@/lib/exams";
import { EXAMS_V2 } from "@/lib/v2/registry";
import { isBotRequest } from "@/lib/botUserAgent";
import { grantAnswers, requestIp } from "@/lib/server/answerRateLimit";
import { QUESTION_ID_RE } from "@/lib/questionQuality";

// Anonymous option picks (lib/questionPicks.ts) summed per question into
// questionPicks/{examId}: n answers, c correct, w.{bankIndex} wrong picks,
// and s, sc, sw.{bankIndex} for strong browsers. Nothing about the sender is stored. Shares the per-IP
// answer budget of /api/analytics/questions, so a script cannot skew a key.

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

  // Sum first, so one write covers the whole batch.
  const sums: Record<string, { n: number; c: number; w: Record<string, number>; s: number; sc: number; sw: Record<string, number> }> = {};
  for (const it of items.slice(0, allowed)) {
    const q = (sums[it.q] ??= { n: 0, c: 0, w: {}, s: 0, sc: 0, sw: {} });
    const p = String(it.p);
    q.n++;
    if (it.ok) q.c++;
    const wrongPick = !it.ok && it.p >= 0;
    if (wrongPick) q.w[p] = (q.w[p] || 0) + 1;
    if (it.s === true) {
      q.s++;
      if (it.ok) q.sc++;
      if (wrongPick) q.sw[p] = (q.sw[p] || 0) + 1;
    }
  }
  const inc = (x: number) => FieldValue.increment(x);
  const update: Record<string, unknown> = {};
  for (const [qid, q] of Object.entries(sums)) {
    update[qid] = {
      n: inc(q.n),
      ...(q.c && { c: inc(q.c) }),
      ...(Object.keys(q.w).length && { w: Object.fromEntries(Object.entries(q.w).map(([k, v]) => [k, inc(v)])) }),
      ...(q.s && {
        s: inc(q.s),
        ...(q.sc && { sc: inc(q.sc) }),
        ...(Object.keys(q.sw).length && { sw: Object.fromEntries(Object.entries(q.sw).map(([k, v]) => [k, inc(v)])) }),
      }),
    };
  }
  await db.collection("questionPicks").doc(exam).set({ ...update, _updatedAt: new Date().toISOString() }, { merge: true });
  return NextResponse.json({ ok: true });
}
