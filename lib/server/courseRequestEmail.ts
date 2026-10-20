import { sendEmail } from "@/lib/resend";
import { CAMPAIGN_REPLY_TO } from "@/lib/cron-email";
import type { CourseRequest } from "@/lib/courseRequests";

// The three course request emails: John hears about a new request at once;
// the teacher hears when the course is ready to look over and when their
// class is ready. All transactional, so a busy campaign day never holds them.

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

export function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const p = (html: string) => `<p style="margin:0 0 14px;font-size:15px;line-height:1.5;color:#111827">${html}</p>`;
const button = (href: string, label: string) =>
  `<p style="margin:20px 0"><a href="${href}" style="background:#111827;color:#fff;padding:12px 20px;border-radius:999px;text-decoration:none;font-weight:600;font-size:15px">${label}</a></p>`;
const wrap = (body: string) => `<div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;max-width:560px">${body}</div>`;

export async function notifyNewCourseRequest(r: CourseRequest) {
  const res = await sendEmail({
    kind: "transactional",
    to: CAMPAIGN_REPLY_TO,
    replyTo: r.teacherEmail ?? undefined,
    subject: `Course request: ${r.courseName} (${r.level})`,
    html: wrap(
      p(`<strong>${escapeHtml(r.courseName)}</strong> · ${escapeHtml(r.level)}`) +
        p(`${escapeHtml(r.teacherName)}${r.school ? `, ${escapeHtml(r.school)}` : ""} · ${escapeHtml(r.teacherEmail ?? "no email")}`) +
        (r.neededBy ? p(`Needed by: ${escapeHtml(r.neededBy)}`) : "") +
        p(`<strong>Topics</strong><br>${r.topics.map(escapeHtml).join("<br>")}`) +
        (r.materials ? p(`<strong>Materials</strong><br>${escapeHtml(r.materials).replace(/\n/g, "<br>")}`) : "") +
        p(`Request id: ${r.id}. Build it with docs/COURSE_REQUESTS.md, then mark it on <a href="${SITE_URL}/admin?tab=teachers">/admin</a>. Reply to reach the teacher.`),
    ),
  });
  if (!res.ok) console.error("[course-request] notify failed:", res.error);
}

export async function emailCourseForReview(r: CourseRequest, previewPath: string) {
  if (!r.teacherEmail) return { ok: false, error: "The teacher has no email" };
  return sendEmail({
    kind: "transactional",
    to: r.teacherEmail,
    replyTo: CAMPAIGN_REPLY_TO,
    subject: `Your ${r.courseName} course is ready to look over`,
    html: wrap(
      p(`Hi ${escapeHtml(r.teacherName)},`) +
        p(`Your <strong>${escapeHtml(r.courseName)}</strong> course is built. Before your students see it, take a look: try a practice set and a test, and tell me anything that's wrong or missing.`) +
        button(`${SITE_URL}${previewPath}`, "Preview the course") +
        p("Just reply to this email with any changes. When it looks right, I'll set up your class and send you the link to share.") +
        p("John, TigerTest"),
    ),
  });
}

export async function emailCourseClassReady(r: CourseRequest, code: string) {
  if (!r.teacherEmail) return { ok: false, error: "The teacher has no email" };
  return sendEmail({
    kind: "transactional",
    to: r.teacherEmail,
    replyTo: CAMPAIGN_REPLY_TO,
    subject: `Your ${r.courseName} class is ready`,
    html: wrap(
      p(`Hi ${escapeHtml(r.teacherName)},`) +
        p(`Your <strong>${escapeHtml(r.courseName)}</strong> class is ready. Post this link for your students. They type their name and start practicing, no account needed:`) +
        p(`<strong style="font-size:18px">tigertest.io/c/${code}</strong>`) +
        p("You'll see each student's progress, the topics the class is weakest on and the questions they miss most on your class page.") +
        button(`${SITE_URL}/teach/classes/${code}`, "Open your class page") +
        p("Reply any time if a question needs fixing.") +
        p("John, TigerTest"),
    ),
  });
}
