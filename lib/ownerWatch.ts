// The two things that let the site run without someone watching it:
//
// 1. The watchdog (/api/cron/watchdog, daily): every scheduled job leaves a
//    timestamp behind. When one is older than it should be, the job stopped
//    or keeps failing, and John gets one email about it (jobAlerts()).
// 2. The owner digest (/api/cron/owner-digest, Mondays): one email listing
//    only what needs a person (buildOwnerDigest()): stopped jobs and open pull
//    requests. Question quality never appears there; what the automation
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
  /** What the automation settled on its own in the last 7 days, for the footer. */
  handled: HandledWeek;
}

/**
 * Question quality is not in the digest: the daily audit, the source triage
 * and the weekly exam upkeep settle findings, student reports, flags, changed
 * pages, dated exam changes and yearly reviews themselves (John, Nov 19 2026:
 * he does not review question banks). Only these counts are reported.
 */
export interface HandledWeek {
  /** Questions changed by a merged fix. */
  fixed: number;
  /** Findings checked against the source and kept as they were. */
  kept: number;
  /** Students emailed how their report ended. */
  replies: number;
  /** Changed or broken official pages the triage settled. */
  sources: number;
  /** Dated exam changes and yearly reviews merged. */
  upkeep: number;
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

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

export function buildOwnerDigest(input: DigestInput): OwnerDigest {
  const now = input.now ?? Date.now();
  const sections: DigestSection[] = [];
  const daysOld = (iso: string) => Math.max(0, Math.floor((now - Date.parse(iso)) / DAY));

  if (input.jobs.length) {
    sections.push({
      title: "Jobs that stopped running",
      lines: input.jobs.map((j) => ({ text: `${j.title}. ${j.detail}` })),
    });
  }

  // Automatic fix PRs merge or close themselves, so what is left open is new tests and work started by hand.
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

  const count = sections.reduce((n, s) => n + s.lines.length, 0);
  const subject = count === 0 ? "Tigertest: nothing needs you this week" : `Tigertest: ${plural(count, "thing needs", "things need")} you`;
  const h = input.handled;
  const done: string[] = [];
  if (h.fixed) done.push(`${plural(h.fixed, "question", "questions")} fixed`);
  if (h.kept) done.push(`${plural(h.kept, "doubted question", "doubted questions")} checked and kept`);
  if (h.replies) done.push(`${plural(h.replies, "student", "students")} told how their report ended`);
  if (h.sources) done.push(`${plural(h.sources, "changed official page", "changed official pages")} handled`);
  if (h.upkeep) done.push(`${plural(h.upkeep, "exam update", "exam updates")} merged`);
  const footerParts: string[] = [];
  if (done.length) footerParts.push(`Handled without you in the last 7 days: ${done.join(", ")}`);
  if (input.prs === null) footerParts.push("GitHub could not be read, so open pull requests are not listed");
  const footer = footerParts.length ? `${footerParts.join(". ")}.` : "";

  const body = count === 0
    ? `<p>Nothing needs you this week. The audits, source triage, exam upkeep and nightly jobs all ran.</p>`
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
