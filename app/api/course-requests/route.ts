import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { requireCaller } from "@/lib/server/classAuth";
import { notifyNewCourseRequest } from "@/lib/server/courseRequestEmail";
import { MAX_OPEN_COURSE_REQUESTS, cleanCourseRequest, isCourseRequestOpen, type CourseRequest } from "@/lib/courseRequests";

// A teacher's course requests (lib/courseRequests.ts). POST asks for a course
// and emails John; GET lists the signed-in teacher's own.

async function mine(uid: string): Promise<CourseRequest[]> {
  const snap = await getAdminDb().collection("courseRequests").where("teacherUid", "==", uid).get();
  return snap.docs
    .map((d) => ({ ...(d.data() as Omit<CourseRequest, "id">), id: d.id }))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function POST(request: NextRequest) {
  const caller = await requireCaller(request);
  if (!caller.ok) return caller.response;

  const cleaned = cleanCourseRequest(await request.json().catch(() => ({})));
  if (!cleaned.ok) return NextResponse.json({ error: cleaned.error }, { status: 400 });

  const open = (await mine(caller.uid)).filter(isCourseRequestOpen);
  if (open.length >= MAX_OPEN_COURSE_REQUESTS) {
    return NextResponse.json({ error: `You have ${open.length} courses being built. Reply to our email to add another.` }, { status: 400 });
  }

  const now = new Date().toISOString();
  const ref = getAdminDb().collection("courseRequests").doc();
  const doc: Omit<CourseRequest, "id"> = {
    ...cleaned.input,
    teacherUid: caller.uid,
    teacherEmail: caller.email ?? null,
    status: "requested",
    examId: null,
    classCode: null,
    createdAt: now,
    updatedAt: now,
  };
  await ref.set(doc);
  await notifyNewCourseRequest({ ...doc, id: ref.id });
  return NextResponse.json({ id: ref.id });
}

export async function GET(request: NextRequest) {
  const caller = await requireCaller(request);
  if (!caller.ok) return caller.response;
  return NextResponse.json({ requests: await mine(caller.uid) });
}
