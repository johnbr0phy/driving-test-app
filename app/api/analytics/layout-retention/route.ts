import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase-admin";
import { getExamById } from "@/lib/exams";
import { isBotRequest } from "@/lib/botUserAgent";

// Retention-by-layout milestones from every browser (lib/layoutRetention).
// One aggregate doc, analytics/layoutRetention:
//   cohorts.<start date>.<I|S>.<event>   by the day the browser started, so the
//                                       admin card only counts cohorts old
//                                       enough to have reached a return mark
//   exams.<exam>.<event>, exams.<exam>.layout
// Return events are also counted as <event>_t (tested on day 0) or _n.
// Anonymous totals only; nothing about the browser is stored.
const EVENTS = new Set(["start", "test0", "testLater", "ret1", "ret7", "ret14", "ret30"]);
const DAY = 86_400_000;

export async function POST(request: NextRequest) {
  if (isBotRequest(request)) return NextResponse.json({ ok: true });
  try {
    const body = await request.json().catch(() => ({}));
    const event = typeof body.event === "string" ? body.event : "";
    const layout = body.layout === "I" || body.layout === "S" ? body.layout : null;
    const start = typeof body.start === "string" && /^\d{4}-\d{2}-\d{2}$/.test(body.start) ? body.start : null;
    const exam = typeof body.exam === "string" ? getExamById(body.exam) : undefined;
    const startMs = start ? Date.parse(`${start}T00:00:00Z`) : NaN;
    // A start date in the last 400 days (a day of slack for time zones ahead of UTC).
    if (!EVENTS.has(event) || !layout || !exam || Number.isNaN(startMs) || startMs > Date.now() + DAY || startMs < Date.now() - 400 * DAY) {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    }

    const bumps: Record<string, unknown> = { [event]: FieldValue.increment(1) };
    if (event.startsWith("ret")) bumps[`${event}_${body.t0 === true ? "t" : "n"}`] = FieldValue.increment(1);

    await getAdminDb()
      .doc("analytics/layoutRetention")
      .set({ cohorts: { [start!]: { [layout]: bumps } }, exams: { [exam.id]: { layout, ...bumps } } }, { merge: true });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error tracking layout retention:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
