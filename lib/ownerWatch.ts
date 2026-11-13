// The two things that let the site run without someone watching it:
//
// 1. The watchdog (/api/cron/watchdog, daily): every scheduled job leaves a
//    timestamp behind. When one is older than it should be, the job stopped
//    or keeps failing, and John gets one email about it (jobAlerts()).
// 2. The owner digest (/api/cron/owner-digest, Mondays): one email listing
//    only what needs a person (buildOwnerDigest()). Everything the automation
//    settled by itself is a count in the last line, nothing more.
//
// Pure functions only, pinned by tests/owner-watch.test.cjs. The Firestore and
// GitHub reads are in lib/server/ownerWatch.ts.

const HOUR = 3_600_000;
const DAY = 24 * HOUR;

/** One scheduled job and the newest timestamp it left behind. */
export interface JobHeartbeat {
  id: string;
  /** What stops working when it stops, in plain words. */
  title: string;
  /** ISO time of its last finished run; null when it never left one. */
  lastAt: string | null;
  /** Older than this and the job has missed a run. */
  maxAgeHours: number;
  /** Where to look. */
  hint: string;
}

export interface JobProblem {
  id: string;
  title: string;
  detail: string;
}

function ago(ms: number): string {
  const h = Math.round(ms / HOUR);
  if (h < 48) return `${h} hours ago`;
  return `${Math.round(ms / DAY)} days ago`;
}

/** The jobs whose last run is too old. */
export function staleJobs(jobs: JobHeartbeat[], now = Date.now()): JobProblem[] {
  const out: JobProblem[] = [];
  for (const j of jobs) {
    const at = j.lastAt ? Date.parse(j.lastAt) : NaN;
    if (Number.isNaN(at)) {
      out.push({ id: j.id, title: j.title, detail: `It has never recorded a run. ${j.hint}` });
    } else if (now - at > j.maxAgeHours * HOUR) {
      out.push({ id: j.id, title: j.title, detail: `It last finished ${ago(now - at)} (expected within ${j.maxAgeHours} hours). ${j.hint}` });
    }
  }
  return out;
}

export interface WatchdogState {
  /** Problem ids already emailed about. */
  alertedIds?: string[];
  alertedAt?: string | null;
}

/** A problem that stays broken is emailed again after this long. */
export const REPEAT_ALERT_DAYS = 3;

/**
 * Whether to email: a problem John has not been told about, or the same
 * problems still there REPEAT_ALERT_DAYS after the last email. No problems,
 * no email.
 */
export function shouldAlert(problems: JobProblem[], state: WatchdogState, now = Date.now()): boolean {
  if (problems.length === 0) return false;
  const told = new Set(state.alertedIds ?? []);
  if (problems.some((p) => !told.has(p.id))) return true;
  const at = state.alertedAt ? Date.parse(state.alertedAt) : NaN;
  return Number.isNaN(at) || now - at > REPEAT_ALERT_DAYS * DAY;
}

// ── The weekly digest ────────────────────────────────────────────────────────

export interface DigestPr {
  number: number;
  title: string;
  url: string;
  createdAt: string;
  draft?: boolean;
}

export interface DigestInput {
  now?: number;
  siteUrl: string;
  /** Open pull requests; null when GitHub could not be read. */
  prs: DigestPr[] | null;
  jobs: JobProblem[];
  /** Changed or broken official pages the triage could not settle. */
  sources: { url: string; exams: string[]; reason: string }[];
  /** Audit findings still open (the fix run could not settle them). */
  findings: { examId: string; questionId: string; verdict: string; createdAt: string }[];
  /** Statistical flags not cleared by a review. */
  openFlags: number;
  /** Open student reports, with when each was made. */
  reports: { createdAt: string }[];
  /** Dated exam changes not marked done. */
  freshness: { exam: string; date: string; what: string; state: string }[];
  /** Exams past their yearly review, oldest first. */
  reviewDue: { exam: string; lastChanged: string }[];
  /** Pages the source triage handled alone in the last 7 days. */
  sourcesHandled: number;
}

export interface DigestSection {
  title: string;
  lines: { text: string; href?: string }[];
  /** Where to act on the whole section. */
  href?: string;
}

export interface OwnerDigest {
  /** Things that need a person. Zero means the email says so in one line. */
  count: number;
  subject: string;
  sections: DigestSection[];
  footer: string;
  html: string;
}

/** A finding or report the daily run has had this long to settle and did not. */
export const SETTLE_DAYS = 2;
/** Dated exam changes are listed this many days ahead. */
export const FRESHNESS_AHEAD_DAYS = 30;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

export function buildOwnerDigest(input: DigestInput): OwnerDigest {
  const now = input.now ?? Date.now();
  const questionsTab = `${input.siteUrl}/admin?tab=questions`;
  const sections: DigestSection[] = [];
  const daysOld = (iso: string) => Math.max(0, Math.floor((now - Date.parse(iso)) / DAY));
  const settled = (iso: string) => !iso || now - Date.parse(iso) > SETTLE_DAYS * DAY;

  if (input.jobs.length) {
    sections.push({
      title: "Jobs that stopped running",
      lines: input.jobs.map((j) => ({ text: `${j.title}. ${j.detail}` })),
    });
  }

  const prs = (input.prs ?? []).filter((p) => !p.draft);
  if (prs.length) {
    sections.push({
      title: "Pull requests waiting for you",
      lines: prs
        .slice()
        .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
        .map((p) => ({ text: `#${p.number} ${p.title} (open ${plural(daysOld(p.createdAt), "day", "days")})`, href: p.url })),
    });
  }

  if (input.sources.length) {
    sections.push({
      title: "Official pages the triage could not settle",
      href: questionsTab,
      lines: input.sources.slice(0, 8).map((s) => ({
        text: `${s.exams.join(", ") || "unknown exam"}: ${s.reason || "not triaged yet"}`,
        href: s.url,
      })),
    });
  }

  const findings = input.findings.filter((f) => settled(f.createdAt));
  if (findings.length) {
    sections.push({
      title: "Audit findings the fix run left open",
      href: questionsTab,
      lines: findings.slice(0, 8).map((f) => ({ text: `${f.examId} ${f.questionId}: ${f.verdict}` })),
    });
  }

  const reports = input.reports.filter((r) => settled(r.createdAt));
  if (reports.length || input.openFlags) {
    const lines: DigestSection["lines"] = [];
    if (reports.length) lines.push({ text: `${plural(reports.length, "student report", "student reports")} open for more than ${SETTLE_DAYS} days` });
    if (input.openFlags) lines.push({ text: `${plural(input.openFlags, "question", "questions")} flagged by answer statistics and not cleared by the audit` });
    sections.push({ title: "Questions students or statistics doubt", href: questionsTab, lines });
  }

  const ahead = new Date(now + FRESHNESS_AHEAD_DAYS * DAY).toISOString().slice(0, 10);
  const changes = input.freshness.filter((e) => e.state !== "done" && e.date <= ahead);
  if (changes.length) {
    sections.push({
      title: "Exam changes due or coming within 30 days",
      href: questionsTab,
      lines: changes.map((e) => ({ text: `${e.exam}, ${e.date}: ${e.what}` })),
    });
  }

  if (input.reviewDue.length) {
    const first = input.reviewDue.slice(0, 5).map((r) => r.exam).join(", ");
    sections.push({
      title: "Yearly reviews due",
      href: questionsTab,
      lines: [{ text: `${plural(input.reviewDue.length, "exam", "exams")} last changed over a year ago, oldest first: ${first}` }],
    });
  }

  const count = sections.reduce((n, s) => n + s.lines.length, 0);
  const subject = count === 0 ? "Tigertest: nothing needs you this week" : `Tigertest: ${plural(count, "thing needs", "things need")} you`;
  const footerParts: string[] = [];
  if (input.sourcesHandled) footerParts.push(`${plural(input.sourcesHandled, "changed source page", "changed source pages")} handled without you in the last 7 days`);
  if (input.prs === null) footerParts.push("GitHub could not be read, so open pull requests are not listed");
  const footer = footerParts.length ? `${footerParts.join(". ")}.` : "";

  const body = count === 0
    ? `<p>Nothing needs you this week. The audits, source triage and nightly jobs all ran.</p>`
    : sections
        .map((s) => {
          const items = s.lines
            .map((l) => `<li>${l.href ? `<a href="${esc(l.href)}">${esc(l.text)}</a>` : esc(l.text)}</li>`)
            .join("");
          const where = s.href ? ` <a href="${esc(s.href)}">Open</a>` : "";
          return `<p><strong>${esc(s.title)}</strong>${where}</p><ul>${items}</ul>`;
        })
        .join("");
  const html = `${body}${footer ? `<p style="color:#666">${esc(footer)}</p>` : ""}`;

  return { count, subject, sections, footer, html };
}
