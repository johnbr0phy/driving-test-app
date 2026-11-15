import { TEST_CATALOG, TEST_GROUPS } from '@/lib/testCatalog';
import { regionOfTest, type TestRegion } from '@/lib/region';
import type { OpportunitiesPayload } from '@/lib/server/opportunities';

// The /admin Tests tab: one row per test in the catalog, joined to the Today
// tab's per-exam numbers (lib/server/opportunities). A test with no practice
// yet still gets a row, with zeros.

export interface AdminTestRow {
  id: string;
  name: string;
  group: string;
  region: TestRegion;
  href: string;
  questions: number;
  /** Catalog price label ("3 free, 1 premium"), or "Free". */
  pricing: string;
  premium: boolean;
  languages: number;
  answers7d: number;
  answersPrev7d: number;
  answers30d: number;
  answersAll: number;
  learners: number;
  paywallHits30d: number;
  purchases30d: number;
  purchasesAll: number;
  revenue30dCents: number;
  revenueAllCents: number;
}

export function buildAdminTestRows(exams: OpportunitiesPayload['exams']): AdminTestRow[] {
  const groupOf = new Map<string, string>();
  for (const g of TEST_GROUPS) for (const t of g.tests) if (!groupOf.has(t.id)) groupOf.set(t.id, g.title);
  const stats = new Map(exams.map((e) => [e.id, e]));
  return TEST_CATALOG.map((t) => {
    const e = stats.get(t.id);
    return {
      id: t.id,
      name: t.name,
      group: groupOf.get(t.id) ?? e?.group ?? 'Other',
      region: e?.region ?? regionOfTest(t.id),
      href: t.href,
      questions: t.questions,
      pricing: t.pricing ?? 'Free',
      premium: !!t.pricing,
      languages: t.languages.length,
      answers7d: e?.answers7d ?? 0,
      answersPrev7d: e?.answersPrev7d ?? 0,
      answers30d: e?.answers30d ?? 0,
      answersAll: e?.answersAll ?? 0,
      learners: e?.enrolled ?? 0,
      paywallHits30d: e?.paywallHits30d ?? 0,
      purchases30d: e?.purchases30d ?? 0,
      purchasesAll: e?.purchasesAll ?? 0,
      revenue30dCents: e?.revenue30dCents ?? 0,
      revenueAllCents: e?.revenueAllCents ?? 0,
    };
  }).sort((a, b) => b.answers30d - a.answers30d || b.answersAll - a.answersAll || a.name.localeCompare(b.name));
}
