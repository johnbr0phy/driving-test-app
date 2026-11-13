import { getAdminDb } from "@/lib/firebase-admin";
import { classQuestionLookup, type ClassQuestionDisplay } from "@/lib/server/classQuestions";
import FRESHNESS from "@/lib/examFreshness.json";
import LANDING_DATES from "@/lib/landingDates.json";
import { applyFlagReviews, sourceNeedsPerson, type FlagReview, type QuestionFlag, type ReviewedFlag, type SourceTriage } from "@/lib/questionQuality";
import EXAM_SOURCES from "@/lib/examSources.json";
import { loadFlagReviews } from "@/lib/server/questionFlagReviews";

// The /admin Questions tab (components/admin/QuestionsTab.tsx): the nightly
// flags (globalStats/questionFlags), open user reports, findings from the
// weekly Claude audit (questionAuditFindings), pages whose source changed
// (sourceWatch) and dated exam changes (lib/examFreshness.json).

export interface ReportRow {
  id: string;
  examId: string;
  questionId: string;
  reason: string;
  note: string;
  lang: string;
  picked: number | null;
  /** Signed-in reporter's uid; null for a guest and for reports before Nov 6 2026. */
  uid?: string | null;
  /** The account email, or the email a guest typed; null when neither. */
  email?: string | null;
  createdAt: string;
  /** The audit's decision on this question, when it was made after the report. */
  review?: FlagReview;
}

export interface FindingRow {
  id: string;
  examId: string;
  questionId: string;
  verdict: string;
  confidence: string;
  reason: string;
  fix: string;
  modelAnswer: string;
  trigger: string[];
  runId: string;
  createdAt: string;
}

export interface SourceRow {
  id: string;
  url: string;
  exams: string[];
  changed: boolean;
  changedAt: string | null;
  ratio: number;
  failures: number;
  error: string | null;
  checkedAt: string | null;
  triage: SourceTriage | null;
}

export interface FreshnessRow {
  exam: string;
  date: string;
  kind: string;
  what: string;
  action: string;
  source: string;
  done?: string;
  state: "due" | "soon" | "later" | "done";
}

export interface QuestionHealthPayload {
  /** Flags that still need someone first, then the ones the audit cleared. */
  flags: (ReviewedFlag & { text?: ClassQuestionDisplay })[];
  flagsUpdatedAt: string | null;
  totalFlags: number;
  clearedFlags: number;
  byKind: Record<string, number>;
  answeredByExam: Record<string, { questions: number; answers: number }>;
  reports: (ReportRow & { text?: ClassQuestionDisplay })[];
  reportTotals: { total: number; byReason: Record<string, number> };
  findings: (FindingRow & { text?: ClassQuestionDisplay })[];
  lastAudit: { runId: string; at: string; checked: number; disagreements: number; findings: number; model: string } | null;
  sources: SourceRow[];
  sourcesWatched: number;
  /** Changed or broken pages the source triage settled in the last 7 days. */
  sourcesHandled: number;
  freshness: FreshnessRow[];
  reviewDue: { exam: string; lastChanged: string }[];
  generatedAt: string;
}

const DAY = 86_400_000;

export async function buildQuestionHealth(): Promise<QuestionHealthPayload> {
  const db = getAdminDb();
  const [flagsDoc, reportsSnap, totalsDoc, findingsSnap, auditSnap, sourcesSnap, reviews] = await Promise.all([
    db.doc("globalStats/questionFlags").get(),
    db.collection("questionReports").where("status", "==", "open").limit(500).get(),
    db.doc("analytics/questionReports").get(),
    db.collection("questionAuditFindings").where("status", "==", "open").limit(300).get(),
    db.collection("questionAudits").orderBy("at", "desc").limit(1).get(),
    db.collection("sourceWatch").select("url", "exams", "changed", "changedAt", "ratio", "failures", "error", "checkedAt", "triage").get(),
    loadFlagReviews(db),
  ]);

  const lookups = new Map<string, (id: string) => ClassQuestionDisplay | undefined>();
  const textFor = (examId: string, questionId: string) => {
    if (!lookups.has(examId)) lookups.set(examId, classQuestionLookup(examId));
    return lookups.get(examId)!(questionId);
  };

  const flagsData = flagsDoc.data() ?? {};
  // Joined here as well as in the nightly cron, so a review from this morning's audit shows at once.
  const reviewed = applyFlagReviews((flagsData.flags as QuestionFlag[]) ?? [], reviews);
  const flags = reviewed.flags.slice(0, 200).map((f) => ({ ...f, text: textFor(f.examId, f.questionId) }));

  const reports = reportsSnap.docs
    .map((d) => ({ id: d.id, ...(d.data() as Omit<ReportRow, "id">) }))
    .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""))
    .map((r) => {
      const review = reviews[r.examId]?.[r.questionId];
      return { ...r, ...(review && review.at > (r.createdAt || "") ? { review } : {}), text: textFor(r.examId, r.questionId) };
    });

  const findings = findingsSnap.docs
    .map((d) => ({ id: d.id, ...(d.data() as Omit<FindingRow, "id">) }))
    .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""))
    .map((f) => ({ ...f, text: textFor(f.examId, f.questionId) }));

  const audit = auditSnap.docs[0]?.data();

  const allSources: SourceRow[] = sourcesSnap.docs
    .map((d) => {
      const v = d.data();
      return {
        id: d.id,
        url: v.url,
        exams: v.exams ?? [],
        changed: v.changed === true,
        changedAt: v.changedAt ?? null,
        ratio: v.ratio ?? 0,
        failures: v.failures ?? 0,
        error: v.error ?? null,
        checkedAt: v.checkedAt ?? null,
        triage: v.triage ?? null,
      };
    });
  // The daily source triage settles most changed pages itself; /admin shows
  // only what it could not (sourceNeedsPerson), and counts the rest.
  const watchedUrls = new Set(Object.values(EXAM_SOURCES as Record<string, string[]>).flat());
  const sourcesHandled = allSources.filter((s) => s.triage && s.triage.at >= new Date(Date.now() - 7 * DAY).toISOString() && s.triage.verdict !== "needs_person").length;
  const sources = allSources.filter((s) => sourceNeedsPerson(s, watchedUrls));

  const today = new Date().toISOString().slice(0, 10);
  const soon = new Date(Date.now() + 60 * DAY).toISOString().slice(0, 10);
  const freshness: FreshnessRow[] = (FRESHNESS.events as Omit<FreshnessRow, "state">[])
    .map((e) => ({ ...e, state: (e.done ? "done" : e.date <= today ? "due" : e.date <= soon ? "soon" : "later") as FreshnessRow["state"] }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const cutoff = new Date(Date.now() - FRESHNESS.reviewAfterDays * DAY).toISOString().slice(0, 10);
  const reviewDue = Object.entries(LANDING_DATES as Record<string, string>)
    .filter(([, d]) => d < cutoff)
    .map(([exam, lastChanged]) => ({ exam, lastChanged }))
    .sort((a, b) => a.lastChanged.localeCompare(b.lastChanged));

  const totals = totalsDoc.data() ?? {};
  return {
    flags,
    flagsUpdatedAt: flagsData.updatedAt ?? null,
    totalFlags: reviewed.open,
    clearedFlags: reviewed.cleared,
    byKind: reviewed.byKind,
    answeredByExam: flagsData.answeredByExam ?? {},
    reports,
    reportTotals: { total: totals.total ?? 0, byReason: totals.byReason ?? {} },
    findings,
    lastAudit: audit
      ? { runId: auditSnap.docs[0].id, at: audit.at, checked: audit.checked ?? 0, disagreements: audit.disagreements ?? 0, findings: audit.findings ?? 0, model: audit.model ?? "" }
      : null,
    sources,
    sourcesWatched: sourcesSnap.size,
    sourcesHandled,
    freshness,
    reviewDue,
    generatedAt: new Date().toISOString(),
  };
}
