import { getAdminDb } from "@/lib/firebase-admin";
import FRESHNESS from "@/lib/examFreshness.json";
import EXAM_SOURCES from "@/lib/examSources.json";
import { applyFlagReviews, sourceNeedsPerson, type QuestionFlag, type WatchedSource } from "@/lib/questionQuality";
import type { HandledWeek } from "@/lib/ownerWatch";
import { loadFlagReviews } from "@/lib/server/questionFlagReviews";
import { readHandledWeek } from "@/lib/server/ownerWatch";

// The /admin Questions tab (components/admin/QuestionsTab.tsx): a read-only
// log of what the question automation did. Nothing here waits for a person
// (John, Nov 19 2026): the daily audit settles flags and student reports and
// fixes findings in PRs that merge themselves, the source triage settles
// changed official pages, the weekly exam upkeep applies dated exam changes
// and yearly reviews, and students are emailed how their report ended.

export interface ClosedFinding {
  examId: string;
  questionId: string;
  verdict: string;
  outcome: "fixed" | "kept" | "gave_up";
  note: string;
  at: string;
}

export interface ClosedReport {
  examId: string;
  questionId: string;
  reason: string;
  outcome: "fixed" | "right" | "closed";
  /** True once the student was emailed; false when they left no email or it is still to go. */
  emailed: boolean;
  at: string;
}

export interface QuestionHealthPayload {
  lastAudit: { at: string; checked: number; findings: number; signalsCleared: number } | null;
  week: HandledWeek;
  /** Still inside the automatic runs (they settle each within a few days). */
  inProgress: { findings: number; reports: number; flags: number; sources: number };
  findings: ClosedFinding[];
  reports: ClosedReport[];
  /** Dated exam changes not done yet: the weekly upkeep takes each when it is due. */
  upcoming: { exam: string; date: string; what: string; recheck?: string }[];
  generatedAt: string;
}

const DAY = 86_400_000;

export async function buildQuestionHealth(): Promise<QuestionHealthPayload> {
  const db = getAdminDb();
  const since = new Date(Date.now() - 14 * DAY).toISOString();
  const [week, flagsDoc, openFindings, openReports, closedFindings, closedReports, auditSnap, sourcesSnap, reviews] = await Promise.all([
    readHandledWeek(db),
    db.doc("globalStats/questionFlags").get(),
    db.collection("questionAuditFindings").where("status", "==", "open").select().get(),
    db.collection("questionReports").where("status", "==", "open").select().get(),
    db.collection("questionAuditFindings").where("closedAt", ">=", since).get(),
    db.collection("questionReports").where("closedAt", ">=", since).get(),
    db.collection("questionAudits").orderBy("at", "desc").limit(1).get(),
    db.collection("sourceWatch").select("url", "changed", "changedAt", "failures", "triage").get(),
    loadFlagReviews(db),
  ]);

  const flags = applyFlagReviews((flagsDoc.data()?.flags as QuestionFlag[]) ?? [], reviews);
  const watched = new Set(Object.values(EXAM_SOURCES as Record<string, string[]>).flat());
  const sources = sourcesSnap.docs.filter((d) => {
    const v = d.data();
    const s: WatchedSource = { url: v.url, changed: v.changed === true, changedAt: v.changedAt ?? null, failures: v.failures ?? 0, triage: v.triage ?? null };
    return sourceNeedsPerson(s, watched);
  }).length;

  const findings: ClosedFinding[] = closedFindings.docs
    .map((d) => {
      const f = d.data();
      return {
        examId: f.examId,
        questionId: f.questionId,
        verdict: f.verdict,
        outcome: (f.status === "fixed" ? "fixed" : f.gaveUp ? "gave_up" : "kept") as ClosedFinding["outcome"],
        note: f.closedNote ?? f.reason ?? "",
        at: f.closedAt,
      };
    })
    .sort((a, b) => b.at.localeCompare(a.at))
    .slice(0, 100);

  const reports: ClosedReport[] = closedReports.docs
    .map((d) => {
      const r = d.data();
      return {
        examId: r.examId,
        questionId: r.questionId,
        reason: r.reason,
        outcome: (r.replyOutcome ?? "closed") as ClosedReport["outcome"],
        emailed: !!r.emailedAt,
        at: r.closedAt,
      };
    })
    .sort((a, b) => b.at.localeCompare(a.at))
    .slice(0, 100);

  const audit = auditSnap.docs[0]?.data();
  const upcoming = (FRESHNESS.events as { exam: string; date: string; what: string; done?: string; recheck?: string }[])
    .filter((e) => !e.done)
    .map(({ exam, date, what, recheck }) => ({ exam, date, what, ...(recheck ? { recheck } : {}) }))
    .sort((a, b) => (a.recheck ?? a.date).localeCompare(b.recheck ?? b.date));

  return {
    lastAudit: audit ? { at: audit.at, checked: audit.checked ?? 0, findings: audit.findings ?? 0, signalsCleared: audit.signalsCleared ?? 0 } : null,
    week,
    inProgress: { findings: openFindings.size, reports: openReports.size, flags: flags.open, sources },
    findings,
    reports,
    upcoming,
    generatedAt: new Date().toISOString(),
  };
}
