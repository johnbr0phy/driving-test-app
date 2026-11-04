import { getAdminDb } from "@/lib/firebase-admin";
import { classQuestionLookup, type ClassQuestionDisplay } from "@/lib/server/classQuestions";

// The /admin Questions tab (components/admin/QuestionsTab.tsx): open
// "Report this question" reports with each question's text, and the totals.

export interface ReportRow {
  id: string;
  examId: string;
  questionId: string;
  reason: string;
  note: string;
  lang: string;
  picked: number | null;
  createdAt: string;
}

export interface QuestionHealthPayload {
  reports: (ReportRow & { text?: ClassQuestionDisplay })[];
  reportTotals: { total: number; byReason: Record<string, number> };
  generatedAt: string;
}

export async function buildQuestionHealth(): Promise<QuestionHealthPayload> {
  const db = getAdminDb();
  const [reportsSnap, totalsDoc] = await Promise.all([
    db.collection("questionReports").where("status", "==", "open").limit(500).get(),
    db.doc("analytics/questionReports").get(),
  ]);

  const lookups = new Map<string, (id: string) => ClassQuestionDisplay | undefined>();
  const textFor = (examId: string, questionId: string) => {
    if (!lookups.has(examId)) lookups.set(examId, classQuestionLookup(examId));
    return lookups.get(examId)!(questionId);
  };

  const reports = reportsSnap.docs
    .map((d) => ({ id: d.id, ...(d.data() as Omit<ReportRow, "id">) }))
    .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""))
    .map((r) => ({ ...r, text: textFor(r.examId, r.questionId) }));

  const totals = totalsDoc.data() ?? {};
  return {
    reports,
    reportTotals: { total: totals.total ?? 0, byReason: totals.byReason ?? {} },
    generatedAt: new Date().toISOString(),
  };
}
