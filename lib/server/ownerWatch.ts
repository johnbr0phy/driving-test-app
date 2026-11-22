import type { Firestore } from "firebase-admin/firestore";
import type { DigestPr, HandledWeek, JobHeartbeat, JobProblem, WatchdogState } from "@/lib/ownerWatch";
import FRESHNESS from "@/lib/examFreshness.json";
import REVIEWS from "@/lib/examReviews.json";

// Firestore and GitHub reads for the watchdog and the weekly owner digest
// (lib/ownerWatch.ts has the rules).

export const WATCHDOG_DOC = "analytics/watchdog";

const iso = (v: unknown): string | null => (typeof v === "string" && v ? v : null);

/**
 * The newest timestamp each scheduled job left behind. A job is listed here
 * only when a finished run always writes one, so a quiet day is never mistaken
 * for a broken job.
 */
export async function readJobHeartbeats(db: Firestore): Promise<JobHeartbeat[]> {
  const [stats, flags, source, brief, audit, aiAnswers] = await Promise.all([
    db.doc("globalStats/studyTimes").get(),
    db.doc("globalStats/questionFlags").get(),
    db.collection("sourceWatch").orderBy("checkedAt", "desc").limit(1).get(),
    db.collection("dailyBriefs").orderBy("date", "desc").limit(1).get(),
    db.collection("questionAudits").orderBy("at", "desc").limit(1).get(),
    db.collection("aiAnswerChecks").orderBy("date", "desc").limit(1).get(),
  ]);
  const jobs: JobHeartbeat[] = [
    {
      id: "aggregate-stats",
      title: "Nightly community stats (Common Mistakes, exit questions, study times)",
      lastAt: iso(stats.data()?.updatedAt),
      maxAgeHours: 36,
      hint: "Check /api/cron/aggregate-stats in the Vercel logs.",
    },
    {
      id: "question-health",
      title: "Nightly question flags",
      lastAt: iso(flags.data()?.updatedAt),
      maxAgeHours: 36,
      hint: "Check /api/cron/question-health in the Vercel logs.",
    },
    {
      id: "source-watch",
      title: "Daily read of the official source pages",
      lastAt: iso(source.docs[0]?.data().checkedAt),
      maxAgeHours: 36,
      hint: "Check /api/cron/source-watch in the Vercel logs.",
    },
    {
      id: "question-audit",
      title: "Weekly question audit",
      lastAt: iso(audit.docs[0]?.data().at),
      // Mondays; nine days allows one late or re-run week before it is a problem.
      maxAgeHours: 9 * 24,
      hint: "Check the Question audit workflow in GitHub Actions.",
    },
    {
      id: "ai-answers",
      title: "AI answer check (Mon, Wed, Fri)",
      lastAt: iso(aiAnswers.docs[0]?.data().at),
      // Fri to Mon is 3 days; five allows one missed run.
      maxAgeHours: 5 * 24,
      hint: "Check the AI answer check workflow in GitHub Actions.",
    },
  ];
  // Weekdays only, and only where the key that writes it is set.
  if (process.env.ANTHROPIC_API_KEY) {
    jobs.push({
      id: "daily-brief",
      title: "Daily update on the /admin Today tab",
      lastAt: iso(brief.docs[0]?.data().generatedAt),
      maxAgeHours: 4 * 24,
      hint: "Check /api/cron/daily-brief in the Vercel logs.",
    });
  }
  return jobs;
}

export async function readWatchdogState(db: Firestore): Promise<WatchdogState & { problems?: JobProblem[]; checkedAt?: string }> {
  return ((await db.doc(WATCHDOG_DOC).get()).data() ?? {}) as WatchdogState & { problems?: JobProblem[]; checkedAt?: string };
}

/**
 * Open pull requests on the site's repository, or null when GitHub cannot be
 * read. The repository is public, so no token is needed; GITHUB_TOKEN, when
 * set, only lifts the rate limit.
 */
export async function readOpenPrs(): Promise<DigestPr[] | null> {
  const owner = process.env.VERCEL_GIT_REPO_OWNER;
  const repo = process.env.VERCEL_GIT_REPO_SLUG;
  const slug = process.env.GITHUB_REPOSITORY || (owner && repo ? `${owner}/${repo}` : "");
  if (!slug) return null;
  try {
    const res = await fetch(`https://api.github.com/repos/${slug}/pulls?state=open&per_page=50`, {
      headers: {
        accept: "application/vnd.github+json",
        "user-agent": "owner-digest",
        ...(process.env.GITHUB_TOKEN ? { authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      },
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const rows = (await res.json()) as { number: number; title: string; html_url: string; created_at: string; draft?: boolean }[];
    return rows.map((r) => ({ number: r.number, title: r.title, url: r.html_url, createdAt: r.created_at, draft: r.draft === true }));
  } catch {
    return null;
  }
}

/** What the question automation settled by itself in the last 7 days (the digest's footer). */
export async function readHandledWeek(db: Firestore, now = Date.now()): Promise<HandledWeek> {
  const since = new Date(now - 7 * 86_400_000).toISOString();
  const day = since.slice(0, 10);
  const [findings, replies, sources] = await Promise.all([
    db.collection("questionAuditFindings").where("closedAt", ">=", since).select("status").get(),
    db.collection("questionReports").where("emailedAt", ">=", since).select().get(),
    db.collection("sourceWatch").where("triage.at", ">=", since).select("triage").get(),
  ]);
  const upkeep =
    (FRESHNESS.events as { done?: string }[]).filter((e) => e.done && e.done >= day).length +
    Object.values(REVIEWS as Record<string, string>).filter((d) => d >= day).length;
  return {
    fixed: findings.docs.filter((d) => d.data().status === "fixed").length,
    kept: findings.docs.filter((d) => d.data().status === "dismissed").length,
    replies: replies.size,
    sources: sources.docs.filter((d) => d.data().triage?.verdict !== "needs_person").length,
    upkeep,
  };
}
