// Which referrers are schools: learning management systems (Canvas,
// Blackboard...) and school websites (.edu, k12). Pure so the client and the
// /api/analytics/school-referral route classify the same way.

export const SCHOOL_KINDS = ["canvas", "blackboard", "brightspace", "moodle", "schoology", "google_classroom", "sakai", "edu", "k12"] as const;
export type SchoolKind = (typeof SCHOOL_KINDS)[number];

export const SCHOOL_KIND_LABELS: Record<SchoolKind, string> = {
  canvas: "Canvas",
  blackboard: "Blackboard",
  brightspace: "Brightspace (D2L)",
  moodle: "Moodle",
  schoology: "Schoology",
  google_classroom: "Google Classroom",
  sakai: "Sakai",
  edu: "College website",
  k12: "K-12 school website",
};

// Order matters: an LMS on a school's own domain (canvas.uni.edu) is the LMS.
// Subdomain guesses (learn., canvas.) only count on school domains, so
// learn.microsoft.com is not Blackboard.
const SCHOOL_DOMAIN = String.raw`\.(edu(\.[a-z]{2})?|k12\.[a-z]{2}\.us)$`;
const onSchool = (prefix: string) => new RegExp(`^(${prefix})\\..+${SCHOOL_DOMAIN}`);

const SCHOOL_HOSTS: [SchoolKind, RegExp][] = [
  ["canvas", /(^|\.)instructure\.com$/],
  ["canvas", onSchool("canvas")],
  ["blackboard", /(^|\.)blackboard\.com$/],
  ["blackboard", onSchool("bb|blackboard|learn|mycourses")],
  ["brightspace", /(^|\.)(brightspace\.com|desire2learn\.com|d2l\.com)$/],
  ["brightspace", onSchool("d2l|brightspace")],
  ["moodle", /(^|\.)moodlecloud\.com$/],
  ["moodle", onSchool("moodle|elearning")],
  ["schoology", /(^|\.)schoology\.com$/],
  ["google_classroom", /^classroom\.google\.com$/],
  ["sakai", onSchool("sakai")],
  ["edu", /\.edu(\.[a-z]{2})?$/],
  ["k12", /\.k12\.[a-z]{2}\.us$/],
];

export function schoolKind(host: string): SchoolKind | null {
  const h = host.toLowerCase().replace(/^www\./, "");
  return SCHOOL_HOSTS.find(([, re]) => re.test(h))?.[0] ?? null;
}

/** The course a link was posted in, when the referrer path names one
 *  (Canvas, Blackboard and Brightspace keep the course id in the path). */
export function schoolCourse(path: string): string {
  const m =
    path.match(/\/courses\/(\d{1,12})\b/) ??
    path.match(/\/ultra\/courses\/(_\d{1,12}_\d{1,4})\b/) ??
    path.match(/\/d2l\/(?:le\/)?(?:home|content|lessons)\/(\d{1,12})\b/);
  return m ? m[1] : "";
}
