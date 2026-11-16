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

export interface DigestSource {
  url: string;
  exams: string[];
  /** broken: the page will not load. changed: it changed and the daily triage
   *  has not read it yet. person: the triage read it and handed it over. */
  kind: "broken" | "changed" | "person";
  /** The triage's reason (person) or the fetch error (broken). */
  reason?: string;
}

export interface DigestInput {
  now?: number;
  siteUrl: string;
  /** Open pull requests; null when GitHub could not be read. */
  prs: DigestPr[] | null;
  jobs: JobProblem[];
  /** Changed or broken official pages the triage could not settle. */
  sources: DigestSource[];
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
  /** Readable name for an exam id ("eqao9" -> "EQAO Grade 9 Math"). */
  examName?: (id: string) => string | undefined;
}

export interface DigestLine {
  /** What it is, in a few words (bold in the email). */
  text: string;
  /** One plain sentence of detail (gray). */
  detail?: string;
  href?: string;
  /** Label for the link; the line itself is never all link. */
  linkText?: string;
}

export interface DigestSection {
  title: string;
  /** One sentence: what to do about the items below. */
  todo: string;
  lines: DigestLine[];
  /** How many things, when lines were cut to MAX_LINES; else lines.length. */
  total?: number;
  /** Where to act on the whole section. */
  href?: string;
  hrefText?: string;
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
/** At most this many lines per section; the rest are "and N more". */
const MAX_LINES = 8;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

/** A fetch error in plain words. */
export function fetchErrorWords(error: string | undefined): string {
  const e = (error ?? "").trim();
  const code = e.match(/\b(\d{3})\b/)?.[1];
  if (code === "403" || code === "401") return `the site blocks automated reads (${code})`;
  if (code === "404" || code === "410") return `the page has moved or been removed (${code})`;
  if (code && code.startsWith("5")) return `the site's server is failing (${code})`;
  if (/fetch failed|timeout|timed out|ENOTFOUND|ECONN/i.test(e)) return "the site did not respond";
  return e || "it will not load";
}

const VERDICT_WORDS: Record<string, string> = {
  wrong_key: "the marked answer looks wrong",
  ambiguous: "more than one answer could be right",
  outdated: "the rule or figure looks out of date",
  unclear: "the question is unclear",
  typo: "there is a typo",
};

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function capped(lines: DigestLine[]): { lines: DigestLine[]; total: number } {
  if (lines.length <= MAX_LINES) return { lines, total: lines.length };
  return { lines: [...lines.slice(0, MAX_LINES - 1), { text: `and ${lines.length - (MAX_LINES - 1)} more` }], total: lines.length };
}

const sectionCount = (s: DigestSection) => s.total ?? s.lines.length;

export function buildOwnerDigest(input: DigestInput): OwnerDigest {
  const now = input.now ?? Date.now();
  const questionsTab = `${input.siteUrl}/admin?tab=questions`;
  const sections: DigestSection[] = [];
  const daysOld = (iso: string) => Math.max(0, Math.floor((now - Date.parse(iso)) / DAY));
  const settled = (iso: string) => !iso || now - Date.parse(iso) > SETTLE_DAYS * DAY;
  const name = (id: string) => input.examName?.(id) || id;
  const names = (ids: string[]) => (ids.length ? ids.map(name).join(", ") : "Unknown exam");

  if (input.jobs.length) {
    sections.push({
      title: "Scheduled jobs that stopped",
      todo: "Something that normally runs on its own has not run. Check the Vercel logs, or ask Claude to look.",
      lines: input.jobs.map((j) => ({ text: j.title, detail: j.detail })),
    });
  }

  const prs = (input.prs ?? []).filter((p) => !p.draft);
  if (prs.length) {
    sections.push({
      title: "Pull requests to review",
      todo: "These did not merge themselves. Merge or close each one.",
      lines: prs
        .slice()
        .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
        .map((p) => ({ text: `#${p.number} ${p.title}`, detail: daysOld(p.createdAt) === 0 ? "Opened today." : `Open ${plural(daysOld(p.createdAt), "day", "days")}.`, href: p.url, linkText: "Open on GitHub" })),
    });
  }

  const broken = input.sources.filter((s) => s.kind === "broken");
  if (broken.length) {
    sections.push({
      title: "Source links that no longer load",
      todo: "Each exam checks its official page for changes. These pages fail to load, so swap in a working official URL (ask Claude to do it).",
      href: questionsTab,
      hrefText: "See them in /admin",
      ...capped(broken.map((s) => ({
        text: names(s.exams),
        detail: `${hostOf(s.url)}: ${fetchErrorWords(s.reason)}.`,
        href: s.url,
        linkText: "Try the page",
      }))),
    });
  }

  const person = input.sources.filter((s) => s.kind === "person");
  if (person.length) {
    sections.push({
      title: "Changed pages Claude handed to you",
      todo: "The daily check read these and could not decide on its own. Read its note, then mark each one reviewed.",
      href: questionsTab,
      hrefText: "Review in /admin",
      ...capped(person.map((s) => ({ text: names(s.exams), detail: s.reason || hostOf(s.url), href: s.url, linkText: "Open the page" }))),
    });
  }

  const changed = input.sources.filter((s) => s.kind === "changed");
  if (changed.length) {
    sections.push({
      title: "Changed pages not checked yet",
      todo: "The daily check normally reads these the same morning. If they are still here next week, it is stuck.",
      href: questionsTab,
      hrefText: "See them in /admin",
      ...capped(changed.map((s) => ({ text: names(s.exams), detail: `${hostOf(s.url)} changed.`, href: s.url, linkText: "Open the page" }))),
    });
  }

  const findings = input.findings.filter((f) => settled(f.createdAt));
  if (findings.length) {
    sections.push({
      title: "Questions the audit thinks are wrong",
      todo: `The automatic fix left these open for over ${SETTLE_DAYS} days. Mark each one Fixed or Not a problem.`,
      href: questionsTab,
      hrefText: "Review in /admin",
      ...capped(findings.map((f) => ({ text: `${name(f.examId)}, ${f.questionId}`, detail: `${(VERDICT_WORDS[f.verdict] ?? f.verdict).replace(/^./, (c) => c.toUpperCase())}.` }))),
    });
  }

  const reports = input.reports.filter((r) => settled(r.createdAt));
  if (reports.length || input.openFlags) {
    const lines: DigestLine[] = [];
    if (reports.length) lines.push({ text: plural(reports.length, "student report", "student reports"), detail: `Open for more than ${SETTLE_DAYS} days.` });
    if (input.openFlags) lines.push({ text: plural(input.openFlags, "question", "questions"), detail: "Flagged by how students answer, and the audit could not clear them." });
    sections.push({ title: "Questions to double-check", todo: "Look at each one and decide whether the answer key is right.", href: questionsTab, hrefText: "Review in /admin", lines, total: reports.length + input.openFlags });
  }

  const ahead = new Date(now + FRESHNESS_AHEAD_DAYS * DAY).toISOString().slice(0, 10);
  const changes = input.freshness.filter((e) => e.state !== "done" && e.date <= ahead);
  if (changes.length) {
    sections.push({
      title: "Real exams changing soon",
      todo: `These exams change within ${FRESHNESS_AHEAD_DAYS} days (or already have). Update the question bank before or on the date.`,
      href: questionsTab,
      hrefText: "See them in /admin",
      lines: changes.map((e) => ({ text: `${name(e.exam)}, ${e.date}`, detail: e.what })),
    });
  }

  if (input.reviewDue.length) {
    const first = input.reviewDue.slice(0, 5).map((r) => name(r.exam)).join(", ");
    sections.push({
      title: "Exams due a yearly review",
      todo: "Each bank should be re-checked against its official outline once a year.",
      href: questionsTab,
      hrefText: "See them in /admin",
      lines: [{ text: plural(input.reviewDue.length, "exam", "exams"), detail: `Oldest first: ${first}.` }],
      total: input.reviewDue.length,
    });
  }

  const count = sections.reduce((n, s) => n + sectionCount(s), 0);
  const subject = count === 0 ? "Tigertest: nothing needs you this week" : `Tigertest: ${plural(count, "thing needs", "things need")} you`;
  const footerParts: string[] = [];
  if (input.sourcesHandled) footerParts.push(`${plural(input.sourcesHandled, "changed source page", "changed source pages")} handled without you in the last 7 days`);
  if (input.prs === null) footerParts.push("GitHub could not be read, so open pull requests are not listed");
  const footer = footerParts.length ? `${footerParts.join(". ")}.` : "";

  return { count, subject, sections, footer, html: renderDigest(sections, footer, count) };
}

// Email HTML: inline styles only, one column, readable on a phone. Only the
// small "Open ..." links are links, never a whole line.
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
const C = { text: "#111827", muted: "#6b7280", line: "#e5e7eb", link: "#2563eb", card: "#f9fafb" };

function renderDigest(sections: DigestSection[], footer: string, count: number): string {
  const wrap = (inner: string) =>
    `<div style="font-family:${FONT};font-size:16px;line-height:1.5;color:${C.text};max-width:560px;margin:0 auto;padding:8px 4px">${inner}</div>`;
  const foot = footer ? `<p style="margin:24px 0 0;font-size:14px;color:${C.muted}">${esc(footer)}</p>` : "";
  if (count === 0) {
    return wrap(`<p style="margin:0">Nothing needs you this week. The audits, source checks and nightly jobs all ran.</p>${foot}`);
  }

  const summary = sections
    .map((s) => `<li style="margin:2px 0">${esc(s.title)}: <strong>${sectionCount(s)}</strong></li>`)
    .join("");
  const intro = `<p style="margin:0 0 4px">This week, ${plural(count, "thing needs", "things need")} you:</p><ul style="margin:0 0 8px;padding-left:20px">${summary}</ul>`;

  const link = (href: string, text: string) =>
    `<a href="${esc(href)}" style="color:${C.link};text-decoration:none;font-size:14px;white-space:nowrap">${esc(text)} &rarr;</a>`;

  const body = sections
    .map((s) => {
      const items = s.lines
        .map((l) => {
          const detail = l.detail ? `<div style="color:${C.muted};font-size:14px">${esc(l.detail)}</div>` : "";
          const a = l.href ? `<div style="margin-top:2px">${link(l.href, l.linkText || "Open")}</div>` : "";
          return `<div style="padding:10px 0;border-top:1px solid ${C.line}"><div style="font-weight:600">${esc(l.text)}</div>${detail}${a}</div>`;
        })
        .join("");
      const where = s.href ? `<div style="padding-top:10px;border-top:1px solid ${C.line}">${link(s.href, s.hrefText || "Open")}</div>` : "";
      return (
        `<div style="margin-top:20px;padding:14px 16px;background:${C.card};border:1px solid ${C.line};border-radius:10px">` +
        `<div style="font-size:18px;font-weight:700">${esc(s.title)} <span style="color:${C.muted};font-weight:400">(${sectionCount(s)})</span></div>` +
        `<div style="color:${C.muted};font-size:14px;margin:4px 0 6px">${esc(s.todo)}</div>` +
        `${items}${where}</div>`
      );
    })
    .join("");

  return wrap(`${intro}${body}${foot}`);
}
