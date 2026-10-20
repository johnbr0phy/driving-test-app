// Teacher course requests: a teacher whose test isn't on the site describes
// their course (name, level, topics) on /teach/course; John builds it by hand
// (docs/COURSE_REQUESTS.md) as a private course in lib/exams.ts COURSES, then
// marks the request ready from the /admin Teachers tab, which makes the
// teacher's class on it and emails them the link.
//
// Firestore: courseRequests/{id} = CourseRequest minus id.

export const COURSE_REQUEST_STATUSES = ["requested", "building", "review", "ready", "declined"] as const;
export type CourseRequestStatus = (typeof COURSE_REQUEST_STATUSES)[number];

export const COURSE_STATUS_LABELS: Record<CourseRequestStatus, string> = {
  requested: "Requested",
  building: "Building",
  review: "Ready for your review",
  ready: "Ready",
  declined: "Not built",
};

export const MIN_COURSE_TOPICS = 2;
export const MAX_COURSE_TOPICS = 20;
export const MAX_TOPIC_LENGTH = 80;
export const MAX_COURSE_FIELD = 80;
export const MAX_COURSE_MATERIALS = 2000;
/** Requests a teacher can have open (not ready or declined) at once. */
export const MAX_OPEN_COURSE_REQUESTS = 3;

export interface CourseRequest {
  id: string;
  teacherUid: string;
  teacherEmail: string | null;
  /** As students know them; becomes the class's teacher name. */
  teacherName: string;
  school: string;
  /** "AP Biology"; also the class name. */
  courseName: string;
  /** Who takes it: "11th grade", "first-year nursing". */
  level: string;
  topics: string[];
  /** Syllabus, chapter list or a link, as pasted. */
  materials: string;
  /** Free text: "before Nov 10". */
  neededBy: string;
  status: CourseRequestStatus;
  /** The built course (lib/exams.ts COURSES), set at review or ready. */
  examId: string | null;
  /** The class made on it when marked ready. */
  classCode: string | null;
  createdAt: string;
  updatedAt: string;
}

/** GET /api/admin/course-requests. */
export interface AdminCourseRequestsPayload {
  requests: CourseRequest[];
  /** Built courses (lib/exams.ts COURSES) a request can be linked to. */
  courses: { id: string; name: string; dashboard: string; requestId: string }[];
}

export interface CourseRequestInput {
  courseName: string;
  level: string;
  topics: string[];
  materials: string;
  neededBy: string;
  teacherName: string;
  school: string;
}

const oneLine = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[<>{}\\]/g, "").replace(/\s+/g, " ").trim().slice(0, max) : "";

/** One topic per line (or an array), cleaned and deduped. */
export function parseTopics(v: unknown): string[] {
  const lines = Array.isArray(v) ? v : typeof v === "string" ? v.split(/\r?\n/) : [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const line of lines) {
    const t = oneLine(line, MAX_TOPIC_LENGTH).replace(/^[-*•\d.)\s]+/, "");
    if (t && !seen.has(t.toLowerCase())) {
      seen.add(t.toLowerCase());
      out.push(t);
    }
  }
  return out.slice(0, MAX_COURSE_TOPICS);
}

/** The form, validated: the input or a message to show the teacher. */
export function cleanCourseRequest(body: Record<string, unknown>): { ok: true; input: CourseRequestInput } | { ok: false; error: string } {
  const input: CourseRequestInput = {
    courseName: oneLine(body.courseName, MAX_COURSE_FIELD),
    level: oneLine(body.level, MAX_COURSE_FIELD),
    topics: parseTopics(body.topics),
    materials: typeof body.materials === "string" ? body.materials.replace(/[<>]/g, "").trim().slice(0, MAX_COURSE_MATERIALS) : "",
    neededBy: oneLine(body.neededBy, MAX_COURSE_FIELD),
    teacherName: oneLine(body.teacherName, 40),
    school: oneLine(body.school, 40),
  };
  if (!input.courseName) return { ok: false, error: "Name the course" };
  if (!input.level) return { ok: false, error: "Say who takes the course" };
  if (input.topics.length < MIN_COURSE_TOPICS) return { ok: false, error: `List at least ${MIN_COURSE_TOPICS} topics, one per line` };
  if (!input.teacherName) return { ok: false, error: "Add the name your students know you by" };
  return { ok: true, input };
}

export const isCourseRequestOpen = (r: Pick<CourseRequest, "status">) => r.status !== "ready" && r.status !== "declined";
