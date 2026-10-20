import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { requireCaller } from "@/lib/server/classAuth";
import { createClassDoc } from "@/lib/server/createClass";
import { emailCourseClassReady, emailCourseForReview } from "@/lib/server/courseRequestEmail";
import { COURSES, getExamById } from "@/lib/exams";
import type { AdminCourseRequestsPayload, CourseRequest } from "@/lib/courseRequests";

// Course requests on the /admin Teachers tab (lib/courseRequests.ts).
//   GET                         every request, newest first
//   POST {id, action, examId?}  action:
//     building   mark it in progress (no email)
//     review     link the built course and email the teacher a preview link
//     ready      link the course, make the teacher's class on it (once) and
//                email them the class link
//     declined   won't be built (no email: reply to the teacher yourself)

const ACTIONS = ["building", "review", "ready", "declined"] as const;
type Action = (typeof ACTIONS)[number];

async function requireAdmin(request: NextRequest) {
  const caller = await requireCaller(request);
  if (!caller.ok) return caller;
  if (!caller.admin) return { ok: false as const, response: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  return caller;
}

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin.ok) return admin.response;
  const snap = await getAdminDb().collection("courseRequests").get();
  const payload: AdminCourseRequestsPayload = {
    requests: snap.docs
      .map((d) => ({ ...(d.data() as Omit<CourseRequest, "id">), id: d.id }))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    courses: COURSES.map((c) => ({ id: c.id, name: c.name, dashboard: `${c.slug}/dashboard`, requestId: c.course!.requestId })),
  };
  return NextResponse.json(payload, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin.ok) return admin.response;

  const body = await request.json().catch(() => ({}));
  const action = body.action as Action;
  if (!ACTIONS.includes(action)) return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  if (typeof body.id !== "string" || !body.id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const db = getAdminDb();
  const ref = db.collection("courseRequests").doc(body.id);
  const snap = await ref.get();
  if (!snap.exists) return NextResponse.json({ error: "No such request" }, { status: 404 });
  const req = { ...(snap.data() as Omit<CourseRequest, "id">), id: snap.id };
  const now = new Date().toISOString();

  if (action === "building" || action === "declined") {
    await ref.update({ status: action, updatedAt: now });
    return NextResponse.json({ ok: true });
  }

  const examId = typeof body.examId === "string" && body.examId ? body.examId : req.examId;
  const course = examId ? getExamById(examId) : undefined;
  if (!course?.course) return NextResponse.json({ error: "Pick the built course first" }, { status: 400 });

  if (action === "review") {
    await ref.update({ status: "review", examId: course.id, updatedAt: now });
    const sent = await emailCourseForReview(req, `${course.slug}/dashboard`);
    return NextResponse.json({ ok: true, emailed: sent.ok, ...(sent.ok ? {} : { warning: `Saved, but the email failed: ${sent.error}` }) });
  }

  // ready: one class per request, so a second click resends the link instead of making another.
  let code = req.classCode;
  if (!code) {
    code = await createClassDoc(db, {
      name: req.courseName.slice(0, 40),
      examId: course.id,
      state: null,
      teacherUid: req.teacherUid,
      teacherEmail: req.teacherEmail,
      teacherName: req.teacherName,
      school: req.school,
      courseRequestId: req.id,
    });
    if (!code) return NextResponse.json({ error: "Couldn't make a class code. Try again." }, { status: 500 });
  }
  await ref.update({ status: "ready", examId: course.id, classCode: code, updatedAt: now });
  const sent = await emailCourseClassReady(req, code);
  return NextResponse.json({ ok: true, classCode: code, emailed: sent.ok, ...(sent.ok ? {} : { warning: `Class ${code} made, but the email failed: ${sent.error}` }) });
}
