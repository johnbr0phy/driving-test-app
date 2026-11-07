import { getAdminDb } from "@/lib/firebase-admin";
import { getExamById } from "@/lib/exams";

// Builds the "Retention by layout" card from analytics/layoutRetention
// (lib/layoutRetention, every browser, guests included). A return rate only
// counts cohorts old enough to have reached that mark, so recent starts never
// drag a rate down.

type Counts = Record<string, number>;
export type RetentionRow = { starts: number; returned: number; tStarts: number; tReturned: number; nStarts: number; nReturned: number };
export type LayoutRetentionPayload = {
  since: string;
  layouts: Record<"I" | "S", { starts: number; test0: number; testLater: number; returns: Record<string, RetentionRow> }>;
  exams: { id: string; name: string; layout: "I" | "S"; starts: number; test0: number }[];
  updatedAt: string;
};

/** First day of data: the client tracker (lib/layoutRetention) shipped then. */
export const LAYOUT_RETENTION_SINCE = "2026-11-08";
export const RETURN_DAYS = [1, 7, 14, 30];
const DAY = 86_400_000;

export async function buildLayoutRetention(): Promise<LayoutRetentionPayload> {
  const doc = (await getAdminDb().doc("analytics/layoutRetention").get()).data() ?? {};
  const cohorts = (doc.cohorts ?? {}) as Record<string, Partial<Record<"I" | "S", Counts>>>;
  const today = Date.parse(new Date().toISOString().slice(0, 10) + "T00:00:00Z");
  const layouts = {} as LayoutRetentionPayload["layouts"];

  for (const L of ["I", "S"] as const) {
    const all = Object.values(cohorts).map((c) => c[L] ?? {});
    const sum = (rows: Counts[], k: string) => rows.reduce((n, r) => n + (r[k] ?? 0), 0);
    const returns: Record<string, RetentionRow> = {};
    for (const d of RETURN_DAYS) {
      // Cohorts that started at least d+1 days ago, so every browser in them could have reached day d.
      const old = Object.entries(cohorts)
        .filter(([date]) => Date.parse(`${date}T00:00:00Z`) <= today - (d + 1) * DAY)
        .map(([, c]) => c[L] ?? {});
      const starts = sum(old, "start");
      const tStarts = sum(old, "test0");
      returns[`d${d}`] = {
        starts,
        returned: sum(old, `ret${d}`),
        tStarts,
        tReturned: sum(old, `ret${d}_t`),
        nStarts: starts - tStarts,
        nReturned: sum(old, `ret${d}_n`),
      };
    }
    layouts[L] = { starts: sum(all, "start"), test0: sum(all, "test0"), testLater: sum(all, "testLater"), returns };
  }

  const exams = Object.entries((doc.exams ?? {}) as Record<string, Counts & { layout?: "I" | "S" }>)
    .filter(([, e]) => (e.start ?? 0) >= 10 && (e.layout === "I" || e.layout === "S"))
    .map(([id, e]) => ({ id, name: getExamById(id)?.name ?? id, layout: e.layout as "I" | "S", starts: e.start ?? 0, test0: e.test0 ?? 0 }))
    .sort((a, b) => b.starts - a.starts);

  return { since: LAYOUT_RETENTION_SINCE, layouts, exams, updatedAt: new Date().toISOString() };
}
