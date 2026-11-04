import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase-admin";
import { ALL_EXAMS } from "@/lib/exams";
import { EXAMS_V2 } from "@/lib/v2/registry";
import { isBotRequest } from "@/lib/botUserAgent";
import { grantAnswers, requestIp } from "@/lib/server/answerRateLimit";
import { QUESTION_ID_RE, REPORT_REASON_VALUES } from "@/lib/questionQuality";

// "Report this question" on an exam question (DMV, registry and v2 exams;
// quizzes have their own at /api/quizzes/[code]/report-question). Each report
// is a doc in questionReports, open until it is fixed or dismissed on the
// /admin Questions tab; analytics/questionReports keeps the running totals.

const KNOWN = new Set<string>(["dmv", ...ALL_EXAMS.map((e) => e.id), ...EXAMS_V2.map((e) => e.id)]);
const LANG_RE = /^[a-z]{2}$/;

export async function POST(request: NextRequest) {
  if (isBotRequest(request)) return NextResponse.json({ ok: true });
  const body = await request.json().catch(() => ({}));
  const examId = typeof body.examId === "string" ? body.examId : "";
  const questionId = typeof body.questionId === "string" ? body.questionId : "";
  if (!KNOWN.has(examId) || !QUESTION_ID_RE.test(questionId)) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const reason = REPORT_REASON_VALUES.includes(body.reason) ? body.reason : "other";
  const note = typeof body.note === "string" ? body.note.replace(/[<>]/g, "").trim().slice(0, 500) : "";
  const lang = typeof body.lang === "string" && LANG_RE.test(body.lang) ? body.lang : "en";
  const page = typeof body.page === "string" ? body.page.slice(0, 120) : "";
  // Shown as the option the reporter thought was right, when they say so.
  const picked = Number.isInteger(body.picked) && body.picked >= 0 && body.picked < 8 ? body.picked : null;

  const db = getAdminDb();
  // About 20 reports an hour (60 a day) per address; a flood stops here.
  const allowed = await grantAnswers(db, `report:${requestIp(request)}`, 100);
  if (allowed < 100) return NextResponse.json({ ok: true });

  const now = new Date().toISOString();
  await db.collection("questionReports").add({ examId, questionId, reason, note, lang, page, picked, status: "open", createdAt: now });
  const inc = FieldValue.increment(1);
  await db.doc("analytics/questionReports").set(
    { total: inc, byReason: { [reason]: inc }, byExam: { [examId]: inc }, daily: { [now.slice(0, 10)]: inc } },
    { merge: true },
  );
  return NextResponse.json({ ok: true });
}
