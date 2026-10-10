import { ExamV2Config } from "./types";
import { SAT } from "./exams/sat";
import { TEAS } from "./exams/teas";
import { HESI } from "./exams/hesi";
import { ASVAB } from "./exams/asvab";
import { ACCUPLACER } from "./exams/accuplacer";

export const EXAMS_V2: ExamV2Config[] = [SAT, TEAS, HESI, ASVAB, ACCUPLACER];

export function getExamV2(id: string): ExamV2Config {
  const exam = EXAMS_V2.find((e) => e.id === id);
  if (!exam) throw new Error(`Unknown v2 exam: ${id}`);
  return exam;
}

/** The v2 exam a path belongs to: its app routes or its landing page. */
export function getExamV2ByPath(pathname: string | null | undefined): ExamV2Config | undefined {
  if (!pathname) return undefined;
  return EXAMS_V2.find((e) => pathname === e.slug || pathname === e.landingPath || pathname.startsWith(`${e.slug}/`));
}

export function getSectionV2(exam: ExamV2Config, key: string) {
  const section = exam.sections.find((s) => s.key === key);
  if (!section) throw new Error(`Unknown section ${key} for ${exam.id}`);
  return section;
}

/** Flattened (section, module) stages in test order. */
export function stagesOf(exam: ExamV2Config) {
  return exam.sections.flatMap((section) => section.modules.map((module) => ({ section, module })));
}

export const v2Routes = (exam: ExamV2Config) => ({
  dashboard: exam.slug,
  test: (n: number) => `${exam.slug}/test/${n}`,
  results: (n: number) => `${exam.slug}/test/${n}/results`,
  drill: (key: string) => `${exam.slug}/train?drill=${key}`,
});
