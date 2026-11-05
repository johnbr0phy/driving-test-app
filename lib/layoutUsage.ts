// Types for the "Dashboard layout" card on the /admin Growth tab
// (lib/server/layoutUsage.ts, /api/admin/layout-usage).

export type LayoutGroup = "interleaved" | "setsFirst";

export type LayoutAgg = {
  people: number;
  startedTest: number;
  finishedTest: number;
  medianAnswers: number;
  /** Build-time only; never in the payload. */
  answers?: number[];
};

export type LayoutUsagePayload = {
  accounts: number;
  switchDate: string;
  followDays: number;
  before: { from: string; to: string };
  after: { from: string; to: string; ready: boolean };
  allTime: Record<LayoutGroup, LayoutAgg>;
  /** New users of exams seen in both windows, first `followDays` days each. */
  cohort: Record<LayoutGroup, { before: LayoutAgg; after: LayoutAgg; exams: number }>;
  exams: (LayoutAgg & { id: string; name: string; group: LayoutGroup })[];
  updatedAt: string;
};
