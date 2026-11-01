import { EXAMS, ExamConfig } from "@/lib/exams";
import { EXAMS_V2 } from "@/lib/v2/registry";
import type { ExamV2Config } from "@/lib/v2/types";

// The shared exam app routes, app/[slug]/test/[id], app/[slug]/test/[id]/results
// and app/[slug]/practice/[n], serve every v1 and v2 exam. Each exam used to
// carry its own three copies, about 650 dynamic routes in all, which passed
// Vercel's 2,048-route deployment limit in Nov 2026. A per-exam folder that
// still has its own test/ or practice/ folder wins over these routes.

export type ExamAppRoute = { kind: "v1"; exam: ExamConfig } | { kind: "v2"; exam: ExamV2Config };

/** The exam whose app lives at /<slug> (families only: state versions keep their own [state] routes). */
export function examForAppSlug(slug: string): ExamAppRoute | undefined {
  const path = `/${slug}`;
  const v1 = EXAMS.find((e) => e.slug === path);
  if (v1) return { kind: "v1", exam: v1 };
  const v2 = EXAMS_V2.find((e) => e.slug === path);
  return v2 ? { kind: "v2", exam: v2 } : undefined;
}

/**
 * Load an exam's question bank, which registers itself on import. Each bank
 * is its own chunk, so a page only downloads the exam it shows. all.ts (every
 * bank, for scripts) and the state-variant modules are never loaded here.
 */
export function loadExamBank(route: ExamAppRoute): Promise<unknown> {
  const id = route.exam.id;
  return route.kind === "v1"
    ? import(/* webpackExclude: /(all|States)\.ts$/ */ `./banks/${id}`)
    : import(`./v2/banks/${id}`);
}
