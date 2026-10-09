import { EXAMS, ExamConfig } from "./exams";

// Every practice test on the site, for the /tests hub, the header test
// switcher, the footer and the "other tests" strip on the DMV homepage.
// `href` is always the SEO landing page, never the dashboard, so internal
// links point at the page we want ranked.
export interface TestCatalogEntry {
  id: string;
  /** Short name for menus, e.g. "DMV". */
  shortName: string;
  /** Card title, e.g. "DMV Permit Test". */
  name: string;
  /** Who it is for / issuing body. */
  org: string;
  blurb: string;
  href: string;
  dashboardHref: string;
  questions: number;
  icon: "car" | "truck" | ExamConfig["icon"];
  /** data-theme used for the card accent; undefined = DMV orange. */
  theme?: string;
}

const dmv: TestCatalogEntry = {
  id: "dmv",
  shortName: "DMV",
  name: "DMV Permit Test",
  org: "All 50 states + DC",
  blurb: "State-specific permit and driver's license knowledge tests. Signs, rules of the road, safety and your state's laws.",
  href: "/",
  dashboardHref: "/dashboard",
  questions: 200,
  icon: "car",
};

const cdl: TestCatalogEntry = {
  id: "cdl",
  shortName: "CDL",
  name: "CDL General Knowledge",
  org: "Commercial Driver's License",
  blurb: "600 questions across 12 practice tests covering the CDL general knowledge exam.",
  href: "/cdl-practice-test",
  dashboardHref: "/cdl/dashboard",
  questions: 600,
  icon: "truck",
  theme: "cdl",
};

const EXAM_BLURBS: Record<string, string> = {
  htl: "ASCP histotechnologist and histotechnician certification. Fixation, processing, embedding, microtomy, staining and lab operations.",
  cst: "NBSTSA surgical technologist certification. Preoperative, intraoperative and postoperative care, sterilization, anatomy, microbiology and pharmacology.",
  crcst: "HSPA sterile processing certification, also covers the CBSPD CSPDT. Decontamination, packaging, sterilization, storage and patient care equipment.",
};

const examEntry = (exam: ExamConfig): TestCatalogEntry => ({
  id: exam.id,
  shortName: exam.shortName,
  name: exam.name,
  org: exam.examLabel,
  blurb: EXAM_BLURBS[exam.id] ?? exam.fullName,
  href: exam.slug,
  dashboardHref: `${exam.slug}/dashboard`,
  questions: exam.testCount * exam.questionsPerTest,
  icon: exam.icon,
  theme: exam.id,
});

export const TEST_CATALOG: TestCatalogEntry[] = [dmv, cdl, ...EXAMS.map(examEntry)];

export const DRIVING_TESTS = TEST_CATALOG.filter((t) => t.id === "dmv" || t.id === "cdl");
export const CERTIFICATION_TESTS = TEST_CATALOG.filter((t) => t.id !== "dmv" && t.id !== "cdl");

/** Which catalog entry a pathname belongs to (DMV is the fallback). */
export function getCatalogEntryByPath(pathname: string | null | undefined): TestCatalogEntry {
  if (!pathname) return dmv;
  for (const t of TEST_CATALOG) {
    if (t.id === "dmv") continue;
    if (pathname === t.href || pathname.startsWith(t.dashboardHref.replace(/\/dashboard$/, "") + "/")) return t;
  }
  return dmv;
}
