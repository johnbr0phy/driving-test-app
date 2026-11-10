/**
 * Per-exam pages for instructors: "/teach/<exam>" for every exam that is
 * usually studied in a class (the TEACHES map in ExamClassFaq), written in
 * English. A teacher searching "CNA practice test for my class" lands on a
 * page about that test, and its button opens /teach/new with the test chosen.
 */
import { TEACHES } from "@/components/exam/ExamClassFaq";
import { TEST_CATALOG, TestCatalogEntry } from "./testCatalog";

const slugOf = (t: TestCatalogEntry) => t.dashboardHref.replace(/\/dashboard$/, "").replace(/^\//, "");

export function teachPageTests(): TestCatalogEntry[] {
  return TEST_CATALOG.filter((t) => t.id !== "dmv" && TEACHES[t.id] && (t.language ?? "en") === "en");
}

export const teachPagePath = (t: TestCatalogEntry) => `/teach/${slugOf(t)}`;

export function teachPageTestBySlug(slug: string): TestCatalogEntry | undefined {
  return teachPageTests().find((t) => slugOf(t) === slug);
}

/** The teacher page of an exam, when it has one (for the class FAQ's link). */
export function teachPathFor(examId: string): string | undefined {
  const t = teachPageTests().find((x) => x.id === examId);
  return t ? teachPagePath(t) : undefined;
}
