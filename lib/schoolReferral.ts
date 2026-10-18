import { auth } from "@/lib/firebase";
import { isInternalBrowser } from "@/lib/internal";
import { schoolCourse, schoolKind } from "@/lib/schoolHosts";

// A visit that arrived from a school: a link a teacher posted in Canvas,
// Blackboard and the like, or a page on a school's website. Sent once per
// browser per school and course to /api/analytics/school-referral, which
// emails John the first time a school or course shows up. Signed in or not:
// a teacher checking the link counts as much as a student.

const FLAG_PREFIX = "tigertest-school:";

export function trackSchoolReferral() {
  if (typeof window === "undefined" || !document.referrer) return;
  if (isInternalBrowser(auth.currentUser?.email)) return;
  let ref: URL;
  try {
    ref = new URL(document.referrer);
  } catch {
    return;
  }
  if (ref.hostname === window.location.hostname || !schoolKind(ref.hostname)) return;

  const host = ref.hostname.toLowerCase().replace(/^www\./, "");
  const course = schoolCourse(ref.pathname);
  const flag = `${FLAG_PREFIX}${host}/${course}`;
  try {
    if (localStorage.getItem(flag) !== null) return;
    localStorage.setItem(flag, new Date().toISOString());
  } catch {
    // Storage blocked: send anyway, the server dedupes the email.
  }

  void fetch("/api/analytics/school-referral", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ host, course, landing: window.location.pathname }),
    keepalive: true,
  }).catch(() => {});
}
