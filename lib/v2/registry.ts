import { ExamV2Config } from "./types";
import { SAT } from "./exams/sat";
import { TEAS } from "./exams/teas";
import { HESI } from "./exams/hesi";
import { NCLEX } from "./exams/nclex";
import { ASVAB } from "./exams/asvab";
import { ACCUPLACER } from "./exams/accuplacer";
import { ACT } from "./exams/act";

export const EXAMS_V2: ExamV2Config[] = [SAT, ACT, TEAS, HESI, ASVAB, ACCUPLACER, NCLEX];

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
  /** A drill's front door: the Basics overview when it has one, else the questions. */
  drill: (key: string) => `${exam.slug}/train?drill=${key}`,
  /** Straight to the exam-level questions (DrillRunner). */
  drillQuestions: (key: string) => `${exam.slug}/train?drill=${key}&level=exam`,
  basics: (key: string, skillId: string) => `${exam.slug}/train?drill=${key}&skill=${skillId}`,
});
