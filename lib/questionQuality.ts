// "Report this question" on exam questions: the shared pieces used by the
// form (components/ReportExamQuestion.tsx), the API (/api/questions/report)
// and the /admin Questions tab. Import-light: used by client and server.
//
// Firestore: questionReports/{auto} holds one report (examId, questionId,
// reason, note, lang, page, picked, status open | fixed | dismissed,
// createdAt); analytics/questionReports keeps the running totals.

export const REPORT_REASONS = [
  { value: "wrong_answer", label: "The marked answer is wrong" },
  { value: "two_answers", label: "More than one answer is right" },
  { value: "unclear", label: "The question is unclear" },
  { value: "outdated", label: "The rule or fact is out of date" },
  { value: "typo", label: "There is a typo" },
  { value: "other", label: "Something else" },
] as const;
export type ReportReason = (typeof REPORT_REASONS)[number]["value"];
export const REPORT_REASON_VALUES: readonly string[] = REPORT_REASONS.map((r) => r.value);

export const QUESTION_ID_RE = /^[A-Za-z0-9_-]{1,48}$/;
